import { immer } from 'zustand/middleware/immer';
import { devtools, type DevtoolsOptions } from 'zustand/middleware';
import {
  create,
  type StoreApi,
  type StateCreator,
  type UseBoundStore,
} from 'zustand';

import { createSelectors } from './createSelectors';

import type { TWithImmer, TWithDevtools } from './interface';

type TData<T> = StateCreator<
  T,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [['zustand/devtools', never], ['zustand/immer', never]]
>;

type TCreateStoreReturn<T> = UseBoundStore<
  TWithImmer<TWithDevtools<TWithImmer<TWithDevtools<StoreApi<T>>>>>
> & {
  use: {
    [key in keyof Required<T>]: () => T[key];
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
