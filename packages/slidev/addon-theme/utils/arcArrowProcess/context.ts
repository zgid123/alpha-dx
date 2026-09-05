import type { ComputedRef, InjectionKey } from 'vue';

import type { IResolvedArcArrowProcessItem } from './resolveArcArrowProcessItems';

export interface IArcArrowProcessRegistration {
  readonly index: number;
  readonly item: ComputedRef<IResolvedArcArrowProcessItem>;
}

export interface IArcArrowProcessRootContext {
  readonly items: ComputedRef<readonly IResolvedArcArrowProcessItem[]>;
  readonly count: ComputedRef<number>;
  readonly animation: ComputedRef<boolean>;
  readonly registerCallout: () => IArcArrowProcessRegistration;
  readonly setCalloutColor?: (index: number, color: string | undefined) => void;
}

export interface IArcArrowProcessCalloutContext {
  readonly item: ComputedRef<IResolvedArcArrowProcessItem>;
  readonly index: number;
  readonly count: number;
}

export const ARC_ARROW_PROCESS_ROOT_KEY: InjectionKey<IArcArrowProcessRootContext> =
  Symbol('ARC_ARROW_PROCESS_ROOT_KEY');

export const ARC_ARROW_PROCESS_CALLOUT_KEY: InjectionKey<IArcArrowProcessCalloutContext> =
  Symbol('ARC_ARROW_PROCESS_CALLOUT_KEY');
