/** biome-ignore-all lint/suspicious/noExplicitAny: generic usage */
import type { Hono } from 'hono';
import type { ExtractSchema, MergeSchemaPath, Schema } from 'hono/types';

interface IResponse<T> extends Response {
  jsonData: {
    data: T;
    message: string;
  };
}

interface IOptions {
  headers?: HeadersInit;
}

export class HonoTest<
  T extends Hono<any, Schema> = Hono<any, Schema>,
  // @ts-expect-error
  TExtract = keyof MergeSchemaPath<ExtractSchema<T>, '/'>,
  // @ts-expect-error
  TPath = TExtract | Omit<string, TExtract>,
> {
  #app: T;

  private constructor(app: T) {
    this.#app = app;
  }

  static create<T extends Hono<any, Schema> = Hono<any, Schema>>(
    app: T,
  ): HonoTest<T> {
    return new HonoTest(app);
  }

  public post<TData = any>(
    path: TPath,
    data?: any,
    options?: IOptions,
  ): Promise<IResponse<TData>> {
    return this.#request<TData>('POST', path as string, data, options);
  }

  public get<TData = any>(
    path: TPath,
    data?: any,
    options?: IOptions,
  ): Promise<IResponse<TData>> {
    const pathString = `${path}?${new URLSearchParams(data).toString()}`;

    return this.#request<TData>('GET', pathString, undefined, options);
  }

  public put<TData = any>(
    path: TPath,
    data?: any,
    options?: IOptions,
  ): Promise<IResponse<TData>> {
    return this.#request<TData>('PUT', path as string, data, options);
  }

  public delete<TData = any>(
    path: TPath,
    data?: any,
    options?: IOptions,
  ): Promise<IResponse<TData>> {
    return this.#request<TData>('DELETE', path as string, data, options);
  }

  async #request<TData>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    path: string,
    data?: TData,
    options: IOptions = {},
  ): Promise<IResponse<TData>> {
    const { headers } = options;

    const result = await this.#app.request(path, {
      method,
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        ...headers,
      },
      ...options,
    });

    return {
      ...result,
      jsonData: await result.json(),
    };
  }
}
