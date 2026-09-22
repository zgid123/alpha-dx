import type { ComputedRef, InjectionKey } from 'vue';

import type { IArcComparisonGeometry } from './createArcComparisonGeometry';
import type { IResolvedArcComparisonItem } from './resolveArcComparisonItems';

export interface IArcComparisonRootContext {
  readonly animation: ComputedRef<boolean>;
  readonly startDelay: ComputedRef<number>;
  readonly pointsCount: ComputedRef<number>;
  readonly geo: ComputedRef<IArcComparisonGeometry>;
  readonly as?: ComputedRef<'layout' | null | undefined>;
  readonly isMoved?: ComputedRef<boolean>;
  readonly edgeOffset?: ComputedRef<number>;
}

export interface IArcComparisonSideContext {
  readonly side: 'left' | 'right';
  readonly color: ComputedRef<string>;
  readonly title: ComputedRef<string>;
  readonly setTitle: (title: string) => void;
  readonly registerCallout: (id?: symbol) => number | ComputedRef<number>;
  readonly unregisterCallout?: (id: symbol) => void;
  readonly count: ComputedRef<number>;
}

export interface IArcComparisonCalloutContext {
  readonly side: 'left' | 'right';
  readonly index: number;
  readonly color: ComputedRef<string>;
  readonly item: ComputedRef<IResolvedArcComparisonItem>;
}

export const ARC_COMPARISON_ROOT_KEY: InjectionKey<IArcComparisonRootContext> =
  Symbol('ARC_COMPARISON_ROOT_KEY');

export const ARC_COMPARISON_SIDE_KEY: InjectionKey<IArcComparisonSideContext> =
  Symbol('ARC_COMPARISON_SIDE_KEY');

export const ARC_COMPARISON_CALLOUT_KEY: InjectionKey<IArcComparisonCalloutContext> =
  Symbol('ARC_COMPARISON_CALLOUT_KEY');
