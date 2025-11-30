import {
  create,
  type StateCreator,
  type StoreApi,
  type UseBoundStore,
} from 'zustand';
import { type DevtoolsOptions, devtools } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

import { createSelectors } from './createSelectors';
import type { TWithDevtools, TWithImmer } from './interface';

export type TData<T> = StateCreator<
  T,
  [['zustand/devtools', never], ['zustand/immer', never]],
  []
>;

export type TCreateStoreReturn<T> = UseBoundStore<
  TWithImmer<TWithDevtools<TWithImmer<TWithDevtools<StoreApi<T>>>>>
> & {
  use: {
    [Key in keyof Required<T>]: () => T[Key];
  };
};

export function createStore<T = unknown>(
  data: TData<T>,
  options?: DevtoolsOptions,
): TCreateStoreReturn<T> {
  const store = create(devtools(immer(data), options));

  return createSelectors(
    store as UseBoundStore<StoreApi<object>>,
  ) as TCreateStoreReturn<T>;
}
