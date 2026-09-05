import type { ComputedRef, InjectionKey } from 'vue';

import type { IArcCompareGeometry } from './createArcCompareGeometry';
import type { IResolvedArcCompareItem } from './resolveArcCompareItems';

export interface IArcCompareRootContext {
  readonly animation: ComputedRef<boolean>;
  readonly startDelay: ComputedRef<number>;
  readonly pointsCount: ComputedRef<number>;
  readonly geo: ComputedRef<IArcCompareGeometry>;
}

export interface IArcCompareSideContext {
  readonly side: 'left' | 'right';
  readonly color: ComputedRef<string>;
  readonly title: ComputedRef<string>;
  readonly setTitle: (title: string) => void;
  readonly registerCallout: () => number;
  readonly count: ComputedRef<number>;
}

export interface IArcCompareCalloutContext {
  readonly side: 'left' | 'right';
  readonly index: number;
  readonly color: ComputedRef<string>;
  readonly item: ComputedRef<IResolvedArcCompareItem>;
}

export const ARC_COMPARE_ROOT_KEY: InjectionKey<IArcCompareRootContext> =
  Symbol('ARC_COMPARE_ROOT_KEY');

export const ARC_COMPARE_SIDE_KEY: InjectionKey<IArcCompareSideContext> =
  Symbol('ARC_COMPARE_SIDE_KEY');

export const ARC_COMPARE_CALLOUT_KEY: InjectionKey<IArcCompareCalloutContext> =
  Symbol('ARC_COMPARE_CALLOUT_KEY');
