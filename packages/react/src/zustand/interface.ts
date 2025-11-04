import type { Draft } from 'immer';
import type {
  Mutate,
  StoreApi,
  StateCreator,
  UseBoundStore,
  StoreMutatorIdentifier,
} from 'zustand';

type TWrite<T, U> = Omit<T, keyof U> & U;

type TSkipTwo<T> = T extends {
  length: 0;
}
  ? []
  : T extends {
        length: 1;
      }
    ? []
    : T extends {
          length: 0 | 1;
        }
      ? []
      : T extends [unknown, unknown, ...infer A]
        ? A
        : T extends [unknown, unknown?, ...infer A]
          ? A
          : T extends [unknown?, unknown?, ...infer A]
            ? A
            : never;

type TStoreImmer<S> = S extends {
  getState: () => infer T;
  setState: infer SetState;
}
  ? SetState extends (...a: infer A) => infer Sr
    ? {
        setState(
          nextStateOrUpdater: T | Partial<T> | ((state: Draft<T>) => void),
          shouldReplace?: boolean | undefined,
          ...a: TSkipTwo<A>
        ): Sr;
      }
    : never
  : never;

export type TWithImmer<S> = TWrite<S, TStoreImmer<S>>;

export type TCreate = {
  <T, Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>,
  ): UseBoundStore<Mutate<StoreApi<T>, Mos>>;
  <T>(): <Mos extends [StoreMutatorIdentifier, unknown][] = []>(
    initializer: StateCreator<T, [], Mos>,
  ) => UseBoundStore<Mutate<StoreApi<T>, Mos>>;
  <S extends StoreApi<unknown>>(store: S): UseBoundStore<S>;
};

type TCast<T, U> = T extends U ? T : U;

type TTakeTwo<T> = T extends {
  length: 0;
}
  ? [undefined, undefined]
  : T extends {
        length: 1;
      }
    ? [...a0: TCast<T, unknown[]>, a1: undefined]
    : T extends {
          length: 0 | 1;
        }
      ? [...a0: TCast<T, unknown[]>, a1: undefined]
      : T extends {
            length: 2;
          }
        ? T
        : T extends {
              length: 1 | 2;
            }
          ? T
          : T extends {
                length: 0 | 1 | 2;
              }
            ? T
            : T extends [infer A0, infer A1, ...unknown[]]
              ? [A0, A1]
              : T extends [infer A0, (infer A1)?, ...unknown[]]
                ? [A0, A1?]
                : T extends [(infer A0)?, (infer A1)?, ...unknown[]]
                  ? [A0?, A1?]
                  : never;

type TStoreDevtools<S> = S extends {
  setState: (...a: infer Sa) => infer Sr;
}
  ? {
      setState<
        A extends
          | string
          | {
              type: unknown;
            },
      >(
        ...a: [...a: TTakeTwo<Sa>, action?: A]
      ): Sr;
    }
  : never;

export type TWithDevtools<S> = TWrite<S, TStoreDevtools<S>>;
