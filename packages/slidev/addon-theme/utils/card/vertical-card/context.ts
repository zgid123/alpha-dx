import type { ComputedRef, InjectionKey } from 'vue';

export type TVerticalCardBadgeVariant =
  | 'outside'
  | 'inside'
  | 'none'
  | 'hidden';

export interface IVerticalCardContext {
  readonly color: ComputedRef<string>;
  readonly cardBg: ComputedRef<string>;
  readonly hasDivider?: ComputedRef<boolean>;
  readonly step: ComputedRef<string | number>;
  readonly textColor: ComputedRef<string | undefined>;
  readonly badgeVariant: ComputedRef<TVerticalCardBadgeVariant>;
}

export const VERT_CARD_KEY: InjectionKey<IVerticalCardContext> =
  Symbol('VERT_CARD');
