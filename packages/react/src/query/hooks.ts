import {
  type QueryClient,
  type QueryKey,
  useQueryClient,
} from '@tanstack/react-query';
import { produce } from 'immer';
import { useCallback } from 'react';

interface IUseSetDataParams {
  queryKey: QueryKey;
  queryClient?: QueryClient;
}

export type TSetDataFunc<TData, TReturnData> = (
  func: (data: TData) => TReturnData,
) => void;

export function useSetData<
  TData,
  TSelectParam = TData,
  TSelect = (data: TSelectParam) => TData,
  TFuncData = TSelect extends (data: TSelectParam) => infer TSelectReturn
    ? TSelectReturn
    : TData,
  TFuncReturn = TSelect extends (data: TSelectParam) => infer TSelectReturn
    ? TSelectReturn
    : TData,
>({
  queryKey,
  queryClient,
}: IUseSetDataParams): TSetDataFunc<TFuncData, TFuncReturn> {
  const qClient = useQueryClient();
  const selectedClient = queryClient || qClient;

  return useCallback(
    (func: (data: TFuncData) => TFuncReturn) => {
      selectedClient.setQueryData(
        queryKey,
        produce((data: never) => {
          return func(data);
        }),
      );
    },
    [queryKey, selectedClient],
  );
}
