/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import type {
  UseQueryOptions,
  UseSuspenseQueryOptions,
} from '@tanstack/react-query';

export type TQueryKey = `qk_${string}`;
export type TMutationKey = `mk_${string}`;

type TPrimitive =
  | string
  | Function
  | number
  | boolean
  | Symbol
  | undefined
  | null;

type TDeepOmitHelper<T, K extends keyof T> = {
  [P in K]: T[P] extends infer TP
    ? TP extends TPrimitive
      ? TP
      : TP extends any[]
        ? TDeepOmitArray<TP, K>
        : TDeepOmit<TP, K>
    : never;
};

type TDeepOmit<T, K> = T extends TPrimitive
  ? T
  : TDeepOmitHelper<T, Exclude<keyof T, K>>;

type TDeepOmitArray<T extends any[], K> = {
  [P in keyof T]: TDeepOmit<T[P], K>;
};

export type TAsyncFunc<T> = (...params: any[]) => Promise<T>;

export type TFunc<TData, TVariables> = (data: TVariables) => TData;

export type TQueryKeyParams<
  T,
  P extends TAsyncFunc<unknown> = TAsyncFunc<T>,
  TParams extends TDeepOmitArray<Parameters<P>, 'signal'> = TDeepOmitArray<
    Parameters<P>,
    'signal'
  >,
> = [string, TParams];

export type TIsUnknownOrAny<T> = T extends boolean | {}
  ? false
  : boolean extends boolean & T
    ? true
    : false;

export interface IErrorProps {
  name: string;
  code: number;
  detail: string;
  message: string;
  isNetworkError: boolean;
}

export type TInitialData<TData> = Partial<TData> | (() => Partial<TData>);

export type TOptions<
  TQueryFn extends TAsyncFunc<TQueryFnData>,
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends TQueryKeyParams<TData, TQueryFn>,
  TSelect = unknown,
  TUseQueryOptions extends UseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  > = UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
> = Omit<
  TUseQueryOptions,
  'queryKey' | 'queryFn' | 'initialData' | 'select'
> & {
  initialData?: TSelect extends (data: TData) => infer TSelectReturn
    ? TSelectReturn
    : TInitialData<TData>;
};

export type TSuspenseOptions<
  TQueryFn extends TAsyncFunc<TQueryFnData>,
  TQueryFnData,
  TError,
  TData,
  TQueryKey extends TQueryKeyParams<TData, TQueryFn>,
  TSelect = unknown,
  TUseSuspenseQueryOptions extends UseSuspenseQueryOptions<
    TQueryFnData,
    TError,
    TData,
    TQueryKey
  > = UseSuspenseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
> = Omit<
  TUseSuspenseQueryOptions,
  'queryKey' | 'queryFn' | 'initialData' | 'select'
> & {
  initialData?: TSelect extends (data: TData) => infer TSelectReturn
    ? TSelectReturn
    : TInitialData<TData>;
};
