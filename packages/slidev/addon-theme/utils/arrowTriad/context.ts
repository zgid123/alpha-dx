import type { ComputedRef, InjectionKey } from 'vue';

import type { IResolvedArrowTriadItem } from './resolveArrowTriadItems';

export type TArrowTriadLayout =
  | '2-left-1-right'
  | '1-left-2-right'
  | '2-left'
  | '1-left';

export interface IArrowTriadRegistration {
  readonly index: number;
  readonly item: ComputedRef<IResolvedArrowTriadItem>;
}

export interface IArrowTriadRootContext {
  readonly animation: ComputedRef<boolean>;
  readonly layout: ComputedRef<TArrowTriadLayout>;
  readonly registerCallout: () => IArrowTriadRegistration;
  readonly items: ComputedRef<
    readonly [
      IResolvedArrowTriadItem,
      IResolvedArrowTriadItem,
      IResolvedArrowTriadItem,
    ]
  >;
}

export interface IArrowTriadCalloutContext {
  readonly item: ComputedRef<IResolvedArrowTriadItem>;
  readonly index: number;
}

export const ARROW_TRIAD_ROOT_KEY: InjectionKey<IArrowTriadRootContext> =
  Symbol('ARROW_TRIAD_ROOT_KEY');

export const ARROW_TRIAD_CALLOUT_KEY: InjectionKey<IArrowTriadCalloutContext> =
  Symbol('ARROW_TRIAD_CALLOUT_KEY');
