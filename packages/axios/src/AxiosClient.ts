import {
  deepCamelizeKeys,
  deepPascalizeKeys,
  deepSnakeizeKeys,
} from '@alphacifer/core-utils/objectUtils';
import axios, {
  type AxiosError,
  AxiosHeaders,
  type AxiosInstance,
  type AxiosRequestConfig,
  type CreateAxiosDefaults,
  type InternalAxiosRequestConfig,
  type RawAxiosHeaders,
} from 'axios';

import { TokenStorage } from './TokenStorage';

interface IRefreshTokenResult {
  accessToken: string;
  refreshToken: string;
}

interface IRefreshTokenParams {
  refreshToken: string;
}

const keyTransform = {
  camel: deepCamelizeKeys,
  snake: deepSnakeizeKeys,
  pascal: deepPascalizeKeys,
} as const;

export type TKeyTransform = keyof typeof keyTransform;

export interface IRetryableRequestConfig<TBody = unknown>
  extends InternalAxiosRequestConfig<TBody> {
  _retry?: boolean;
}

export interface IConfiguration extends CreateAxiosDefaults {
  storage?: TokenStorage;
  onUnauthenticated?: () => Promise<void> | void;
  onRefreshToken?: (
    params: IRefreshTokenParams,
  ) => Promise<IRefreshTokenResult>;
}

export interface IRequestParams
  extends Omit<
    AxiosRequestConfig,
    'data' | 'method' | 'onUploadProgress' | 'url'
  > {
  url: string;
  paramsTransform?: TKeyTransform;
}

export interface IMutateParams<TBody = unknown> extends IRequestParams {
  data?: TBody;
  dataTransform?: TKeyTransform;
  onUploadProgress?: AxiosRequestConfig<TBody>['onUploadProgress'];
}

interface IRequestConfig<TBody = unknown> extends AxiosRequestConfig<TBody> {
  dataTransform?: TKeyTransform;
  paramsTransform?: TKeyTransform;
}

export class AxiosClient {
  #client: AxiosInstance;
  #storage: TokenStorage;
  #onRefreshToken?: IConfiguration['onRefreshToken'];
  #refreshTokenPromise?: Promise<IRefreshTokenResult>;
  #onUnauthenticated?: IConfiguration['onUnauthenticated'];

  private constructor(
    client: AxiosInstance,
    storage: TokenStorage,
    onUnauthenticated?: IConfiguration['onUnauthenticated'],
    onRefreshToken?: IConfiguration['onRefreshToken'],
  ) {
    this.#client = client;
    this.#storage = storage;
    this.#registerInterceptors();
    this.#onRefreshToken = onRefreshToken;
    this.#onUnauthenticated = onUnauthenticated;
  }

  public static create({
    onRefreshToken,
    onUnauthenticated,
    storage = new TokenStorage(),
    ...config
  }: IConfiguration = {}): AxiosClient {
    return new AxiosClient(
      axios.create(config),
      storage,
      onUnauthenticated,
      onRefreshToken,
    );
  }

  public async get<TResponse>({
    url,
    ...rest
  }: IRequestParams): Promise<TResponse> {
    return this.#request<TResponse>({
      ...rest,
      url,
      method: 'get',
    });
  }

  public async post<TResponse, TBody = unknown>({
    url,
    data,
    ...rest
  }: IMutateParams<TBody>): Promise<TResponse> {
    return this.#request<TResponse, TBody>({
      ...rest,
      url,
      data,
      method: 'post',
    });
  }

  public async put<TResponse, TBody = unknown>({
    url,
    data,
    ...rest
  }: IMutateParams<TBody>): Promise<TResponse> {
    return this.#request<TResponse, TBody>({
      ...rest,
      url,
      data,
      method: 'put',
    });
  }

  public async delete<TResponse, TBody = unknown>({
    url,
    data,
    ...rest
  }: IMutateParams<TBody>): Promise<TResponse> {
    return this.#request<TResponse, TBody>({
      ...rest,
      url,
      data,
      method: 'delete',
    });
  }

  async #request<TResponse, TBody = unknown>({
    url,
    data,
    params,
    dataTransform = 'camel',
    paramsTransform = 'camel',
    ...rest
  }: IRequestConfig<TBody>): Promise<TResponse> {
    const transformedData = this.#transformData(data, dataTransform);
    const transformedParams = this.#transformData(params, paramsTransform);
    const response = await this.#client.request<TResponse>({
      ...rest,
      url,
      params: transformedParams,
      data: transformedData as TBody,
    });

    const responseData = response.data as object &
      TResponse & { data?: unknown };
    const hasDataWrapper = Object.hasOwn(responseData, 'data');

    if (hasDataWrapper) {
      return deepCamelizeKeys(responseData.data) as TResponse;
    }

    return deepCamelizeKeys(responseData) as TResponse;
  }

  #transformData<TData>(data: TData, transform: TKeyTransform): unknown {
    return keyTransform[transform](data);
  }

  #createHeaders<TBody>(headers: AxiosRequestConfig<TBody>['headers']) {
    if (headers instanceof AxiosHeaders) {
      return headers;
    }

    return AxiosHeaders.from(headers as RawAxiosHeaders | undefined);
  }

  #registerInterceptors(): void {
    this.#client.interceptors.request.use((config) => {
      return this.#withBearerToken(config);
    });

    this.#client.interceptors.response.use(
      (response) => {
        return response;
      },
      (error: AxiosError) => {
        return this.#retryWithRefreshedToken(error);
      },
    );
  }

  async #retryWithRefreshedToken(error: AxiosError): Promise<unknown> {
    const config = error.config as IRetryableRequestConfig | undefined;

    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    if (!config || config._retry || !this.#onRefreshToken) {
      await this.#onUnauthenticated?.();

      return Promise.reject(error);
    }

    config._retry = true;

    try {
      const refreshToken = await this.#storage.refreshToken;

      if (!refreshToken) {
        await this.#onUnauthenticated?.();

        return Promise.reject(error);
      }

      this.#refreshTokenPromise ??= this.#onRefreshToken({
        refreshToken,
      }).finally(() => {
        this.#refreshTokenPromise = undefined;
      });

      const result = await this.#refreshTokenPromise;

      this.#storage.accessToken = result.accessToken;
      this.#storage.refreshToken = result.refreshToken;

      const headers = this.#createHeaders(config.headers);

      headers.set('Authorization', `Bearer ${result.accessToken}`);

      return this.#client.request({
        ...config,
        headers,
      });
    } catch {
      await this.#storage.clearToken();
      await this.#onUnauthenticated?.();

      return Promise.reject(error);
    }
  }

  async #withBearerToken<TBody>(
    config: InternalAxiosRequestConfig<TBody>,
  ): Promise<InternalAxiosRequestConfig<TBody>> {
    const withCredentials =
      config.withCredentials ?? this.#client.defaults.withCredentials ?? false;

    if (withCredentials) {
      return Promise.resolve(config);
    }

    const headers = this.#createHeaders(config.headers);

    if (headers.has('Authorization')) {
      return Promise.resolve(config);
    }

    const token = await this.#storage.accessToken;

    if (!token) {
      return config;
    }

    headers.set('Authorization', `Bearer ${token}`);

    return {
      ...config,
      headers,
    };
  }
}
