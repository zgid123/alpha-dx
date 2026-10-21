import type { ComputedRef, InjectionKey } from 'vue';

import type {
  IGearTriadItem,
  IResolvedGearTriadItem,
} from './resolveGearTriadItems';

export interface IGearTriadRegistration {
  readonly index: number;
  readonly item: ComputedRef<IResolvedGearTriadItem>;
}

export interface IGearTriadRootContext {
  readonly animation: ComputedRef<boolean>;
  readonly isShifted: ComputedRef<boolean>;
  readonly currentStep: ComputedRef<number>;
  readonly activeOptionIndex: ComputedRef<number>;
  readonly hasDetails: ComputedRef<boolean>;
  readonly registerCallout: (
    override?: ComputedRef<IGearTriadItem> | (() => IGearTriadItem),
  ) => IGearTriadRegistration;
  readonly registerDetails: () => void;
  readonly items: ComputedRef<
    readonly [
      IResolvedGearTriadItem,
      IResolvedGearTriadItem,
      IResolvedGearTriadItem,
    ]
  >;
}

export interface IGearTriadCalloutContext {
  readonly item: ComputedRef<IResolvedGearTriadItem>;
  readonly index: number;
}

export interface IGearTriadDetailsContext {
  readonly activeItem: ComputedRef<IResolvedGearTriadItem>;
  readonly activeOptionIndex: ComputedRef<number>;
  readonly registerContent: (option?: number) => { index: number };
}

export const GEAR_TRIAD_ROOT_KEY: InjectionKey<IGearTriadRootContext> = Symbol(
  'GEAR_TRIAD_ROOT_KEY',
);

export const GEAR_TRIAD_CALLOUT_KEY: InjectionKey<IGearTriadCalloutContext> =
  Symbol('GEAR_TRIAD_CALLOUT_KEY');

export const GEAR_TRIAD_DETAILS_KEY: InjectionKey<IGearTriadDetailsContext> =
  Symbol('GEAR_TRIAD_DETAILS_KEY');
