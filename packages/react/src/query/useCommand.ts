import {
  type MutationFunction,
  type UseMutationOptions,
  type UseMutationResult,
  useMutation,
} from '@tanstack/react-query';

import type { IErrorProps } from './interface';

export const useCommand = <
  TData = unknown,
  TVariables = void,
  TContext = unknown,
>(
  mutationFunc: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, IErrorProps, TVariables, TContext>,
    'mutationFn'
  >,
): UseMutationResult<TData, IErrorProps, TVariables, TContext> => {
  return useMutation({ ...options, mutationFn: mutationFunc });
};
