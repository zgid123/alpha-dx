/** biome-ignore-all lint/style/useNamingConvention: ignore */
import type {
  AxiosAdapter,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { AxiosError, AxiosHeaders } from 'axios';

import { AxiosClient, TokenStorage } from '../index';

interface IRequestLogEntry {
  readonly url?: string;
  readonly data?: unknown;
  readonly params?: unknown;
  readonly method?: string;
  readonly baseURL?: string;
  readonly headers: AxiosHeaders;
  readonly hasDataProperty: boolean;
  readonly hasOnUploadProgress: boolean;
}

interface IUserResponse {
  readonly id: string;
  readonly name: string;
}

interface IUserProfileResponse {
  readonly userId: string;
  readonly fullName: string;
}

interface ICreateUserBody {
  readonly name: string;
}

interface IDeleteUsersBody {
  readonly ids: string[];
}

interface ICreateProfileCamelBody {
  readonly firstName: string;
  readonly contactInfo: {
    readonly emailAddress: string;
  };
}

function createStorageDriver(
  itemByKey: Map<string, string> = new Map(),
): Storage {
  return {
    getItem: (key: string) => itemByKey.get(key) ?? null,
    key: () => null,
    clear: () => {
      itemByKey.clear();
    },
    length: itemByKey.size,
    removeItem: (key: string) => {
      itemByKey.delete(key);
    },
    setItem: (key: string, value: string) => {
      itemByKey.set(key, value);
    },
  } as Storage;
}

function createAdapter(params: {
  data: unknown;
  requests: IRequestLogEntry[];
}): AxiosAdapter {
  return async (
    config: InternalAxiosRequestConfig,
  ): Promise<AxiosResponse<unknown>> => {
    params.requests.push({
      url: config.url,
      data: parseRequestData(config.data),
      params: config.params,
      method: config.method,
      baseURL: config.baseURL,
      headers: AxiosHeaders.from(config.headers.toJSON()),
      hasDataProperty: Object.hasOwn(config, 'data'),
      hasOnUploadProgress: typeof config.onUploadProgress === 'function',
    });

    return {
      config,
      status: 200,
      data: params.data,
      headers: {},
      statusText: 'OK',
    };
  };
}

function createUnauthorizedThenSuccessAdapter(params: {
  data: unknown;
  requests: IRequestLogEntry[];
}): AxiosAdapter {
  return async (
    config: InternalAxiosRequestConfig,
  ): Promise<AxiosResponse<unknown>> => {
    params.requests.push({
      url: config.url,
      data: parseRequestData(config.data),
      params: config.params,
      method: config.method,
      baseURL: config.baseURL,
      headers: AxiosHeaders.from(config.headers.toJSON()),
      hasDataProperty: Object.hasOwn(config, 'data'),
      hasOnUploadProgress: typeof config.onUploadProgress === 'function',
    });

    const response: AxiosResponse<unknown> = {
      config,
      data: {
        message: 'Unauthorized',
      },
      status: 401,
      headers: {},
      statusText: 'Unauthorized',
    };

    if (params.requests.length === 1) {
      throw new AxiosError(
        'Unauthorized',
        AxiosError.ERR_BAD_REQUEST,
        config,
        undefined,
        response,
      );
    }

    return {
      config,
      status: 200,
      data: params.data,
      headers: {},
      statusText: 'OK',
    };
  };
}

function createUnauthorizedAdapter(params: {
  requests: IRequestLogEntry[];
}): AxiosAdapter {
  return async (
    config: InternalAxiosRequestConfig,
  ): Promise<AxiosResponse<unknown>> => {
    params.requests.push({
      url: config.url,
      data: parseRequestData(config.data),
      params: config.params,
      method: config.method,
      baseURL: config.baseURL,
      headers: AxiosHeaders.from(config.headers.toJSON()),
      hasDataProperty: Object.hasOwn(config, 'data'),
      hasOnUploadProgress: typeof config.onUploadProgress === 'function',
    });

    const response: AxiosResponse<unknown> = {
      config,
      data: {
        message: 'Unauthorized',
      },
      status: 401,
      headers: {},
      statusText: 'Unauthorized',
    };

    throw new AxiosError(
      'Unauthorized',
      AxiosError.ERR_BAD_REQUEST,
      config,
      undefined,
      response,
    );
  };
}

function createErrorAdapter(params: {
  requests: IRequestLogEntry[];
  status: number;
  statusText: string;
}): AxiosAdapter {
  return async (
    config: InternalAxiosRequestConfig,
  ): Promise<AxiosResponse<unknown>> => {
    params.requests.push({
      url: config.url,
      data: parseRequestData(config.data),
      params: config.params,
      method: config.method,
      baseURL: config.baseURL,
      headers: AxiosHeaders.from(config.headers.toJSON()),
      hasDataProperty: Object.hasOwn(config, 'data'),
      hasOnUploadProgress: typeof config.onUploadProgress === 'function',
    });

    const response: AxiosResponse<unknown> = {
      config,
      data: {
        message: params.statusText,
      },
      status: params.status,
      headers: {},
      statusText: params.statusText,
    };

    throw new AxiosError(
      params.statusText,
      AxiosError.ERR_BAD_REQUEST,
      config,
      undefined,
      response,
    );
  };
}

function createUnauthorizedOnceByUrlAdapter(params: {
  data: unknown;
  requests: IRequestLogEntry[];
}): AxiosAdapter {
  const attemptCountByUrl = new Map<string, number>();

  return async (
    config: InternalAxiosRequestConfig,
  ): Promise<AxiosResponse<unknown>> => {
    params.requests.push({
      url: config.url,
      data: parseRequestData(config.data),
      params: config.params,
      method: config.method,
      baseURL: config.baseURL,
      headers: AxiosHeaders.from(config.headers.toJSON()),
      hasDataProperty: Object.hasOwn(config, 'data'),
      hasOnUploadProgress: typeof config.onUploadProgress === 'function',
    });

    const url = config.url ?? '';
    const attemptCount = (attemptCountByUrl.get(url) ?? 0) + 1;

    attemptCountByUrl.set(url, attemptCount);

    if (attemptCount === 1) {
      const response: AxiosResponse<unknown> = {
        config,
        data: {
          message: 'Unauthorized',
        },
        status: 401,
        headers: {},
        statusText: 'Unauthorized',
      };

      throw new AxiosError(
        'Unauthorized',
        AxiosError.ERR_BAD_REQUEST,
        config,
        undefined,
        response,
      );
    }

    return {
      config,
      status: 200,
      data: params.data,
      headers: {},
      statusText: 'OK',
    };
  };
}

function parseRequestData(data: unknown): unknown {
  if (typeof data !== 'string') {
    return data;
  }

  return JSON.parse(data) as unknown;
}

describe('AxiosClient', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  suite('#create', () => {
    it('creates a client with axios config', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        baseURL: 'https://api.example.com',
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
        headers: {
          authorization: 'Bearer token',
        },
      });

      const response = await client.get<IUserResponse>({
        url: '/users/user-1',
      });

      expect(response).toEqual({
        id: 'user-1',
        name: 'Alpha',
      });
      expect(requests).toHaveLength(1);
      expect(requests[0]?.baseURL).toBe('https://api.example.com');
      expect(requests[0]?.headers.get('Authorization')).toBe('Bearer token');
    });
  });

  suite('#get', () => {
    it('calls axios with get and returns response data', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
      });

      const response = await client.get<IUserResponse>({
        url: '/users/user-1',
        params: {
          include: 'roles',
        },
      });

      expect(response.name).toBe('Alpha');
      expect(requests[0]?.url).toBe('/users/user-1');
      expect(requests[0]?.params).toEqual({
        include: 'roles',
      });
      expect(requests[0]?.method).toBe('get');
    });

    it('camelizes response data before returning it', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            user_id: 'user-1',
            full_name: 'Alpha',
          },
        }),
      });

      const response = await client.get<IUserProfileResponse>({
        url: '/users/user-1',
      });

      expect(response).toEqual({
        userId: 'user-1',
        fullName: 'Alpha',
      });
    });

    it('unwraps response data wrapper before returning it', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            data: {
              user_id: 'user-1',
              full_name: 'Alpha',
            },
          },
        }),
      });

      const response = await client.get<IUserProfileResponse>({
        url: '/users/user-1',
      });

      expect(response).toEqual({
        userId: 'user-1',
        fullName: 'Alpha',
      });
    });

    it('camelizes params by default before passing them to axios', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
      });

      await client.get<IUserResponse>({
        url: '/users',
        params: {
          include_roles: true,
          account_status: 'active',
        },
      });

      expect(requests[0]?.params).toEqual({
        includeRoles: true,
        accountStatus: 'active',
      });
    });

    it('uses request-level params transform before passing params to axios', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
      });

      await client.get<IUserResponse>({
        url: '/users',
        paramsTransform: 'snake',
        params: {
          includeRoles: true,
          accountStatus: 'active',
        },
      });

      expect(requests[0]?.params).toEqual({
        include_roles: true,
        account_status: 'active',
      });
    });

    it('uses request-level pascal params transform before passing params to axios', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
      });

      await client.get<IUserResponse>({
        url: '/users',
        paramsTransform: 'pascal',
        params: {
          includeRoles: true,
          accountStatus: 'active',
        },
      });

      expect(requests[0]?.params).toEqual({
        IncludeRoles: true,
        AccountStatus: 'active',
      });
    });

    it('uses a Bearer token from storage when withCredentials is false', async () => {
      const requests: IRequestLogEntry[] = [];
      const storage = new TokenStorage(
        createStorageDriver(new Map([['accessToken', 'stored-token']])),
      );
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
        storage,
        withCredentials: false,
      });

      await client.get<IUserResponse>({
        url: '/users/user-1',
      });

      expect(requests[0]?.headers.get('Authorization')).toBe(
        'Bearer stored-token',
      );
    });

    it('uses the default token key from localStorage', async () => {
      const requests: IRequestLogEntry[] = [];
      vi.stubGlobal(
        'localStorage',
        createStorageDriver(new Map([['accessToken', 'default-token']])),
      );

      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
        withCredentials: false,
      });

      await client.get<IUserResponse>({
        url: '/users/user-1',
      });

      expect(requests[0]?.headers.get('Authorization')).toBe(
        'Bearer default-token',
      );
    });

    it('does not use a Bearer token when withCredentials is true', async () => {
      const requests: IRequestLogEntry[] = [];
      const storage = new TokenStorage(
        createStorageDriver(new Map([['accessToken', 'stored-token']])),
      );
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
        storage,
        withCredentials: true,
      });

      await client.get<IUserResponse>({
        url: '/users/user-1',
      });

      expect(requests[0]?.headers.has('Authorization')).toBe(false);
    });

    it('uses request-level withCredentials to choose Bearer token auth', async () => {
      const requests: IRequestLogEntry[] = [];
      const storage = new TokenStorage(
        createStorageDriver(new Map([['accessToken', 'stored-token']])),
      );
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
        storage,
        withCredentials: true,
      });

      await client.get<IUserResponse>({
        url: '/users/user-1',
        withCredentials: false,
      });

      expect(requests[0]?.headers.get('Authorization')).toBe(
        'Bearer stored-token',
      );
    });

    it('does not replace an explicit Authorization header', async () => {
      const requests: IRequestLogEntry[] = [];
      const storage = new TokenStorage(
        createStorageDriver(new Map([['accessToken', 'stored-token']])),
      );
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
        storage,
        withCredentials: false,
      });

      await client.get<IUserResponse>({
        headers: {
          authorization: 'Bearer explicit-token',
        },
        url: '/users/user-1',
      });

      expect(requests[0]?.headers.get('Authorization')).toBe(
        'Bearer explicit-token',
      );
    });

    it('rejects non-401 errors without refreshing or unauthenticating', async () => {
      const requests: IRequestLogEntry[] = [];
      const onRefreshToken = vi.fn(async () => {
        return {
          accessToken: 'new-access-token',
          refreshToken: 'new-refresh-token',
        };
      });
      const onUnauthenticated = vi.fn();
      const client = AxiosClient.create({
        adapter: createErrorAdapter({
          requests,
          status: 500,
          statusText: 'Server Error',
        }),
        onRefreshToken,
        onUnauthenticated,
      });

      await expect(
        client.get<IUserResponse>({
          url: '/users/user-1',
        }),
      ).rejects.toThrow('Server Error');

      expect(requests).toHaveLength(1);
      expect(onRefreshToken).not.toHaveBeenCalled();
      expect(onUnauthenticated).not.toHaveBeenCalled();
    });

    it('refreshes tokens and retries once when a request receives 401', async () => {
      const requests: IRequestLogEntry[] = [];
      const storage = new TokenStorage(
        createStorageDriver(
          new Map([
            ['accessToken', 'expired-token'],
            ['refreshToken', 'stored-refresh-token'],
          ]),
        ),
      );
      const onRefreshToken = vi.fn(async () => {
        return {
          accessToken: 'new-access-token',
          refreshToken: 'new-refresh-token',
        };
      });
      const client = AxiosClient.create({
        adapter: createUnauthorizedThenSuccessAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
        storage,
        onRefreshToken,
        withCredentials: false,
      });

      const response = await client.get<IUserResponse>({
        url: '/users/user-1',
      });

      expect(response).toEqual({
        id: 'user-1',
        name: 'Alpha',
      });
      expect(requests).toHaveLength(2);
      expect(requests[0]?.headers.get('Authorization')).toBe(
        'Bearer expired-token',
      );
      expect(requests[1]?.headers.get('Authorization')).toBe(
        'Bearer new-access-token',
      );
      expect(onRefreshToken).toHaveBeenCalledWith({
        refreshToken: 'stored-refresh-token',
      });
      await expect(storage.accessToken).resolves.toBe('new-access-token');
      await expect(storage.refreshToken).resolves.toBe('new-refresh-token');
    });

    it('reuses an in-flight refresh when concurrent requests receive 401', async () => {
      const requests: IRequestLogEntry[] = [];
      const storage = new TokenStorage(
        createStorageDriver(
          new Map([
            ['accessToken', 'expired-token'],
            ['refreshToken', 'stored-refresh-token'],
          ]),
        ),
      );
      let resolveRefreshToken: (result: {
        accessToken: string;
        refreshToken: string;
      }) => void = () => {
        return undefined;
      };
      const onRefreshToken = vi.fn(() => {
        return new Promise<{
          accessToken: string;
          refreshToken: string;
        }>((resolve) => {
          resolveRefreshToken = resolve;
        });
      });
      const client = AxiosClient.create({
        adapter: createUnauthorizedOnceByUrlAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
        storage,
        onRefreshToken,
        withCredentials: false,
      });

      const firstRequest = client.get<IUserResponse>({
        url: '/users/user-1',
      });
      const secondRequest = client.get<IUserResponse>({
        url: '/users/user-2',
      });

      await vi.waitFor(() => {
        expect(onRefreshToken).toHaveBeenCalledTimes(1);
      });

      resolveRefreshToken({
        accessToken: 'new-access-token',
        refreshToken: 'new-refresh-token',
      });

      await expect(Promise.all([firstRequest, secondRequest])).resolves.toEqual(
        [
          {
            id: 'user-1',
            name: 'Alpha',
          },
          {
            id: 'user-1',
            name: 'Alpha',
          },
        ],
      );
      expect(requests).toHaveLength(4);
      expect(onRefreshToken).toHaveBeenCalledWith({
        refreshToken: 'stored-refresh-token',
      });
      expect(onRefreshToken).toHaveBeenCalledTimes(1);
      expect(requests[2]?.headers.get('Authorization')).toBe(
        'Bearer new-access-token',
      );
      expect(requests[3]?.headers.get('Authorization')).toBe(
        'Bearer new-access-token',
      );
    });

    it('calls onUnauthenticated when a 401 cannot be retried', async () => {
      const requests: IRequestLogEntry[] = [];
      const onUnauthenticated = vi.fn();
      const client = AxiosClient.create({
        adapter: createUnauthorizedAdapter({
          requests,
        }),
        onUnauthenticated,
      });

      await expect(
        client.get<IUserResponse>({
          url: '/users/user-1',
        }),
      ).rejects.toThrow('Unauthorized');

      expect(requests).toHaveLength(1);
      expect(onUnauthenticated).toHaveBeenCalledTimes(1);
    });

    it('calls onUnauthenticated when retry still receives 401', async () => {
      const requests: IRequestLogEntry[] = [];
      const storage = new TokenStorage(
        createStorageDriver(
          new Map([
            ['accessToken', 'expired-token'],
            ['refreshToken', 'stored-refresh-token'],
          ]),
        ),
      );
      const onRefreshToken = vi.fn(async () => {
        return {
          accessToken: 'new-access-token',
          refreshToken: 'new-refresh-token',
        };
      });
      const onUnauthenticated = vi.fn();
      const client = AxiosClient.create({
        adapter: createUnauthorizedAdapter({
          requests,
        }),
        storage,
        onRefreshToken,
        onUnauthenticated,
        withCredentials: false,
      });

      await expect(
        client.get<IUserResponse>({
          url: '/users/user-1',
        }),
      ).rejects.toThrow('Unauthorized');

      expect(requests).toHaveLength(2);
      expect(onRefreshToken).toHaveBeenCalledTimes(1);
      expect(onUnauthenticated).toHaveBeenCalledTimes(1);
      expect(requests[1]?.headers.get('Authorization')).toBe(
        'Bearer new-access-token',
      );
    });

    it('calls onUnauthenticated when a 401 has no refresh token', async () => {
      const requests: IRequestLogEntry[] = [];
      const storage = new TokenStorage(
        createStorageDriver(new Map([['accessToken', 'expired-token']])),
      );
      const onRefreshToken = vi.fn(async () => {
        return {
          accessToken: 'new-access-token',
          refreshToken: 'new-refresh-token',
        };
      });
      const onUnauthenticated = vi.fn();
      const client = AxiosClient.create({
        adapter: createUnauthorizedAdapter({
          requests,
        }),
        storage,
        onRefreshToken,
        onUnauthenticated,
        withCredentials: false,
      });

      await expect(
        client.get<IUserResponse>({
          url: '/users/user-1',
        }),
      ).rejects.toThrow('Unauthorized');

      expect(requests).toHaveLength(1);
      expect(onRefreshToken).not.toHaveBeenCalled();
      expect(onUnauthenticated).toHaveBeenCalledTimes(1);
    });

    it('clears tokens and calls onUnauthenticated when refresh fails', async () => {
      const requests: IRequestLogEntry[] = [];
      const storage = new TokenStorage(
        createStorageDriver(
          new Map([
            ['accessToken', 'expired-token'],
            ['refreshToken', 'stored-refresh-token'],
          ]),
        ),
      );
      const onRefreshToken = vi.fn(async () => {
        throw new Error('Refresh failed');
      });
      const onUnauthenticated = vi.fn();
      const client = AxiosClient.create({
        adapter: createUnauthorizedAdapter({
          requests,
        }),
        storage,
        onRefreshToken,
        onUnauthenticated,
        withCredentials: false,
      });

      await expect(
        client.get<IUserResponse>({
          url: '/users/user-1',
        }),
      ).rejects.toThrow('Unauthorized');

      expect(requests).toHaveLength(1);
      expect(onRefreshToken).toHaveBeenCalledWith({
        refreshToken: 'stored-refresh-token',
      });
      expect(onUnauthenticated).toHaveBeenCalledTimes(1);
      await expect(storage.accessToken).resolves.toBeUndefined();
      await expect(storage.refreshToken).resolves.toBeUndefined();
    });
  });

  suite('#post', () => {
    it('calls axios with post body and returns response data', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
      });

      const response = await client.post<IUserResponse, ICreateUserBody>({
        url: '/users',
        data: {
          name: 'Alpha',
        },
        onUploadProgress: () => {
          return undefined;
        },
      });

      expect(response.id).toBe('user-1');
      expect(requests[0]?.url).toBe('/users');
      expect(requests[0]?.data).toEqual({
        name: 'Alpha',
      });
      expect(requests[0]?.method).toBe('post');
      expect(requests[0]?.hasOnUploadProgress).toBe(true);
    });

    it('camelizes body data by default before passing it to axios', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
      });

      await client.post<IUserResponse>({
        url: '/users',
        data: {
          first_name: 'Alpha',
          contact_info: {
            email_address: 'alpha@example.com',
          },
        },
      });

      expect(requests[0]?.data).toEqual({
        firstName: 'Alpha',
        contactInfo: {
          emailAddress: 'alpha@example.com',
        },
      });
    });

    it('uses request-level body data transform before passing data to axios', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
      });

      await client.post<IUserResponse, ICreateProfileCamelBody>({
        url: '/users',
        dataTransform: 'snake',
        data: {
          firstName: 'Alpha',
          contactInfo: {
            emailAddress: 'alpha@example.com',
          },
        },
      });

      expect(requests[0]?.data).toEqual({
        first_name: 'Alpha',
        contact_info: {
          email_address: 'alpha@example.com',
        },
      });
    });

    it('uses request-level pascal body data transform before passing data to axios', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Alpha',
          },
        }),
      });

      await client.post<IUserResponse>({
        url: '/users',
        dataTransform: 'pascal',
        data: {
          first_name: 'Alpha',
          contact_info: {
            email_address: 'alpha@example.com',
          },
        },
      });

      expect(requests[0]?.data).toEqual({
        FirstName: 'Alpha',
        ContactInfo: {
          EmailAddress: 'alpha@example.com',
        },
      });
    });
  });

  suite('#put', () => {
    it('calls axios with put body and returns response data', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            id: 'user-1',
            name: 'Updated Alpha',
          },
        }),
      });

      const response = await client.put<IUserResponse, ICreateUserBody>({
        url: '/users/user-1',
        data: {
          name: 'Updated Alpha',
        },
      });

      expect(response.name).toBe('Updated Alpha');
      expect(requests[0]?.url).toBe('/users/user-1');
      expect(requests[0]?.data).toEqual({
        name: 'Updated Alpha',
      });
      expect(requests[0]?.method).toBe('put');
    });
  });

  suite('#delete', () => {
    it('calls axios with delete and returns response data', async () => {
      const requests: IRequestLogEntry[] = [];
      const client = AxiosClient.create({
        adapter: createAdapter({
          requests,
          data: {
            deleted: true,
          },
        }),
      });

      const response = await client.delete<
        { readonly deleted: boolean },
        IDeleteUsersBody
      >({
        url: '/users/user-1',
        data: {
          ids: ['user-1'],
        },
      });

      expect(response.deleted).toBe(true);
      expect(requests[0]?.url).toBe('/users/user-1');
      expect(requests[0]?.data).toEqual({
        ids: ['user-1'],
      });
      expect(requests[0]?.method).toBe('delete');
    });
  });
});
