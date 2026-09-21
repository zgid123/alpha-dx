import type { ComputedRef, InjectionKey } from 'vue';

import type {
  IRectOrbitTetradItem,
  IResolvedRectOrbitTetradItem,
} from './resolveRectOrbitTetradItems';

export interface IRectOrbitTetradRegistration {
  readonly index: number;
  readonly item: ComputedRef<IResolvedRectOrbitTetradItem>;
  readonly setCustomBadge?: (text: string | number) => void;
}

export interface IRectOrbitTetradRootContext {
  readonly animation?: ComputedRef<boolean>;
  readonly registerCallout: (
    props?: IRectOrbitTetradItem,
  ) => IRectOrbitTetradRegistration;
  readonly items: ComputedRef<readonly IResolvedRectOrbitTetradItem[]>;
}

export interface IRectOrbitTetradCalloutContext {
  readonly index: number;
  readonly item: ComputedRef<IResolvedRectOrbitTetradItem>;
}

export const RECT_ORBIT_TETRAD_ROOT_KEY: InjectionKey<IRectOrbitTetradRootContext> =
  Symbol('RECT_ORBIT_TETRAD_ROOT_KEY');

export const RECT_ORBIT_TETRAD_CALLOUT_KEY: InjectionKey<IRectOrbitTetradCalloutContext> =
  Symbol('RECT_ORBIT_TETRAD_CALLOUT_KEY');
