import type { StoreApi, UseBoundStore } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  store: S,
) => {
  const selectorsStore = store as WithSelectors<typeof store>;
  selectorsStore.use = {};
  for (const k of Object.keys(selectorsStore.getState())) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (selectorsStore.use as any)[k] = () =>
      selectorsStore((s) => s[k as keyof typeof s]);
  }

  return selectorsStore;
};
