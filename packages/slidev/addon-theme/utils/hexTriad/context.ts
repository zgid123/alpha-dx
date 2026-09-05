import type { ComputedRef, InjectionKey } from 'vue';

import type { IHexTriadItem } from './resolveHexTriadItems';

export interface IHexTriadRootContext {
  readonly animation?: ComputedRef<boolean>;
  readonly items: ComputedRef<readonly IHexTriadItem[]>;
  readonly registerCallout: () => {
    readonly index: number;
    readonly item: ComputedRef<IHexTriadItem>;
    readonly setBadgeText: (text: string | number) => void;
  };
}

export interface IHexTriadCalloutContext {
  readonly index: number;
  readonly item: ComputedRef<IHexTriadItem>;
  readonly setBadgeText: (text: string | number) => void;
}

export const HEX_TRIAD_ROOT_KEY: InjectionKey<IHexTriadRootContext> =
  Symbol('HEX_TRIAD_ROOT_KEY');

export const HEX_TRIAD_CALLOUT_KEY: InjectionKey<IHexTriadCalloutContext> =
  Symbol('HEX_TRIAD_CALLOUT_KEY');
