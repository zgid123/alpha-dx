import type { StoreApi, UseBoundStore } from 'zustand';

export type TWithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export function createSelectors<S extends UseBoundStore<StoreApi<object>>>(
  store: S,
): TWithSelectors<S> {
  const selectorsStore = store as TWithSelectors<typeof store>;
  selectorsStore.use = {};

  for (const k of Object.keys(selectorsStore.getState())) {
    // biome-ignore lint/suspicious/noExplicitAny: ignore
    (selectorsStore.use as any)[k] = () =>
      selectorsStore((s) => s[k as keyof typeof s]);
  }

  return selectorsStore;
}
