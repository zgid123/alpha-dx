import type { ComputedRef, InjectionKey } from 'vue';

import type { IHexagonTriadItem } from './resolveHexagonTriadItems';

export interface IHexagonTriadRootContext {
  readonly animation?: ComputedRef<boolean>;
  readonly items: ComputedRef<readonly IHexagonTriadItem[]>;
  readonly registerCallout: () => {
    readonly index: number;
    readonly item: ComputedRef<IHexagonTriadItem>;
    readonly setBadgeText: (text: string | number) => void;
  };
}

export interface IHexagonTriadCalloutContext {
  readonly index: number;
  readonly item: ComputedRef<IHexagonTriadItem>;
  readonly setBadgeText: (text: string | number) => void;
}

export const HEX_TRIAD_ROOT_KEY: InjectionKey<IHexagonTriadRootContext> =
  Symbol('HEX_TRIAD_ROOT_KEY');

export const HEX_TRIAD_CALLOUT_KEY: InjectionKey<IHexagonTriadCalloutContext> =
  Symbol('HEX_TRIAD_CALLOUT_KEY');
