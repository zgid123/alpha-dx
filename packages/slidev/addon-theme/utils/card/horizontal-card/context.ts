import type { ComputedRef, InjectionKey } from 'vue';

export type THorizontalCardBadgeVariant = 'outside' | 'none' | 'hidden';

export interface IHorizontalCardContext {
  readonly color: ComputedRef<string>;
  readonly step: ComputedRef<string | number>;
  readonly textColor: ComputedRef<string | undefined>;
}

export const HORIZ_CARD_KEY: InjectionKey<IHorizontalCardContext> =
  Symbol('HORIZ_CARD');
