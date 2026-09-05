import type { ComputedRef, InjectionKey } from 'vue';

export interface IChevronCardContext {
  readonly step: ComputedRef<string | number>;
  readonly color: ComputedRef<string>;
  readonly cardBg: ComputedRef<string>;
  readonly textColor: ComputedRef<string | undefined>;
  readonly titleColor: ComputedRef<string | undefined>;
}

export const CHEVRON_CARD_KEY: InjectionKey<IChevronCardContext> =
  Symbol('CHEVRON_CARD_KEY');
