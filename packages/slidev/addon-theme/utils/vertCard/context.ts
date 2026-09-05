import type { ComputedRef, InjectionKey } from 'vue';

export type TVertCardBadgeVariant = 'outside' | 'inside' | 'none' | 'hidden';

export interface IVertCardContext {
  readonly color: ComputedRef<string>;
  readonly cardBg: ComputedRef<string>;
  readonly lightColor: ComputedRef<string>;
  readonly titleColor: ComputedRef<string>;
  readonly stripeColor: ComputedRef<string>;
  readonly hasDivider?: ComputedRef<boolean>;
  readonly step: ComputedRef<string | number>;
  readonly textColor: ComputedRef<string | undefined>;
  readonly badgeVariant: ComputedRef<TVertCardBadgeVariant>;
}

export const VERT_CARD_KEY: InjectionKey<IVertCardContext> =
  Symbol('VERT_CARD');
