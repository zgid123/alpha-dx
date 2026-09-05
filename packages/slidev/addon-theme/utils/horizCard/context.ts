import type { ComputedRef, InjectionKey } from 'vue';

export interface IHorizCardContext {
  readonly color: ComputedRef<string>;
  readonly cardBg: ComputedRef<string>;
  readonly lightColor: ComputedRef<string>;
  readonly titleColor: ComputedRef<string>;
  readonly step: ComputedRef<string | number>;
  readonly textColor: ComputedRef<string | undefined>;
}

export const HORIZ_CARD_KEY: InjectionKey<IHorizCardContext> =
  Symbol('HORIZ_CARD');
