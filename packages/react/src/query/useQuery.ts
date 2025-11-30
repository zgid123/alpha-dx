import {
  type InitialDataFunction,
  type QueryClient,
  type UseQueryResult,
  useQueryClient,
  useQuery as useTanstackQuery,
} from '@tanstack/react-query';
import { useRef } from 'react';
import { isDate, isNullish, isPlainObject } from 'remeda';

import { type TSetDataFunc, useSetData } from './hooks';
import type {
  IErrorProps,
  TAsyncFunc,
  TOptions,
  TQueryKeyParams,
} from './interface';

export type TUseQueryReturn<
  TQueryFnData = unknown,
  TDefaultValue = unknown,
  TQueryFn extends TAsyncFunc<TQueryFnData> = TAsyncFunc<TQueryFnData>,
  TData = Awaited<ReturnType<TQueryFn>>,
  TSelect = unknown,
  TError = IErrorProps,
  TQueryKey extends TQueryKeyParams<TData, TQueryFn> = TQueryKeyParams<
    TData,
    TQueryFn
  >,
  TQueryOptions extends TOptions<
    TQueryFn,
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TSelect
  > = TOptions<TQueryFn, TQueryFnData, TError, TData, TQueryKey, TSelect>,
  TInitialDataOption = TQueryOptions['initialData'],
  TUseQueryResult = UseQueryResult<TData, TError>,
> = (TSelect extends (data: TData) => infer TSelectReturn
  ? TInitialDataOption extends TSelectReturn
    ? Omit<TUseQueryResult, 'data'> & {
        data: TSelectReturn;
      }
    : TInitialDataOption extends Partial<TSelectReturn>
      ? Omit<TUseQueryResult, 'data'> & {
          data: TSelectReturn;
        }
      : TDefaultValue extends undefined
        ? Omit<TUseQueryResult, 'data'> & {
            data?: TSelectReturn;
          }
        : Omit<TUseQueryResult, 'data'> & {
            data: TSelectReturn;
          }
  : TInitialDataOption extends Partial<TData>
    ? Omit<TUseQueryResult, 'data'> & {
        data: TData;
      }
    : TInitialDataOption extends () => TData
      ? Omit<TUseQueryResult, 'data'> & {
          data: TData;
        }
      : TInitialDataOption extends () => Partial<TData>
        ? Omit<TUseQueryResult, 'data'> & {
            data: TData;
          }
        : TUseQueryResult) & {
  setData: TSetDataFunc<TData, TData>;
};

export function useQuery<
  TQueryFnData = unknown,
  TError = IErrorProps,
  TQueryFn extends TAsyncFunc<TQueryFnData> = TAsyncFunc<TQueryFnData>,
  TData = Awaited<ReturnType<TQueryFn>>,
  TSelectParam = TData,
  TSelect = (data: TSelectParam) => TData,
  TDefaultValue =
    | (TSelect extends (data: TSelectParam) => infer TSelectReturn
        ? TSelectReturn
        : TData)
    | undefined,
  TQueryKey extends TQueryKeyParams<TData, TQueryFn> = TQueryKeyParams<
    TData,
    TQueryFn
  >,
  TQueryOptions extends TOptions<
    TQueryFn,
    TQueryFnData,
    TError,
    TData,
    TQueryKey,
    TSelect
  > = TOptions<TQueryFn, TQueryFnData, TError, TData, TQueryKey, TSelect>,
  TInitialDataOption = TQueryOptions['initialData'],
  TUseQueryResult = UseQueryResult<TData, TError>,
>(
  queryFn: TQueryFn,
  key: TQueryKey,
  options: TQueryOptions = {} as TQueryOptions,
  additionalOptions: {
    select?: TSelect;
    defaultValue?: TDefaultValue;
  } = {},
  queryClient?: QueryClient,
): TUseQueryReturn<
  TQueryFnData,
  TDefaultValue,
  TQueryFn,
  TData,
  TSelect,
  TError,
  TQueryKey,
  TQueryOptions,
  TInitialDataOption,
  TUseQueryResult
> {
  const { select, defaultValue } = additionalOptions;
  const defaultValueRef = useRef(defaultValue);
  const qClient = useQueryClient();
  const selectedClient = queryClient || qClient;
  const { initialData, ...opts } = options;
  const setData = useSetData<TData>({
    queryKey: key,
    queryClient: selectedClient,
  });

  const { data, ...methods } = useTanstackQuery({
    queryKey: key,
    queryFn: ({ queryKey, signal }) => {
      const params = ((queryKey as unknown as [string, []])[1] ||
        []) as unknown[];

      if (params.length) {
        params.forEach((param) => {
          if (
            !isDate(param) &&
            !Array.isArray(param) &&
            !isNullish(param) &&
            isPlainObject(param)
          ) {
            // biome-ignore lint/suspicious/noExplicitAny: ignore
            (param as any).signal = signal;
          }
        });
      } else {
        params.push({ signal });
      }

      return queryFn(...params);
    },
    retry: false,
    refetchOnWindowFocus: false,
    select: select as (data: TQueryFnData) => TData,
    initialData: initialData as
      | TQueryFnData
      | InitialDataFunction<TQueryFnData>,
    ...opts,
  });

  return {
    ...methods,
    setData,
    data: data || defaultValueRef.current,
  } as unknown as TUseQueryReturn<
    TQueryFnData,
    TDefaultValue,
    TQueryFn,
    TData,
    TSelect,
    TError,
    TQueryKey,
    TQueryOptions,
    TInitialDataOption,
    TUseQueryResult
  >;
}
