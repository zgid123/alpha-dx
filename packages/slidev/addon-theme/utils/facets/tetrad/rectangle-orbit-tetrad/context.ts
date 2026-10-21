import type { ComputedRef, InjectionKey } from 'vue';

import type {
  IRectangleOrbitTetradItem,
  IResolvedRectangleOrbitTetradItem,
} from './resolveRectangleOrbitTetradItems';

export interface IRectangleOrbitTetradRegistration {
  readonly index: number;
  readonly item: ComputedRef<IResolvedRectangleOrbitTetradItem>;
  readonly setCustomBadge?: (text: string | number) => void;
}

export interface IRectangleOrbitTetradRootContext {
  readonly animation?: ComputedRef<boolean>;
  readonly registerCallout: (
    props?: IRectangleOrbitTetradItem,
  ) => IRectangleOrbitTetradRegistration;
  readonly items: ComputedRef<readonly IResolvedRectangleOrbitTetradItem[]>;
}

export interface IRectangleOrbitTetradCalloutContext {
  readonly index: number;
  readonly item: ComputedRef<IResolvedRectangleOrbitTetradItem>;
}

export const RECT_ORBIT_TETRAD_ROOT_KEY: InjectionKey<IRectangleOrbitTetradRootContext> =
  Symbol('RECT_ORBIT_TETRAD_ROOT_KEY');

export const RECT_ORBIT_TETRAD_CALLOUT_KEY: InjectionKey<IRectangleOrbitTetradCalloutContext> =
  Symbol('RECT_ORBIT_TETRAD_CALLOUT_KEY');
