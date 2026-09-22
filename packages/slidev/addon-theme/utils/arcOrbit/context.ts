import type { ComputedRef, InjectionKey } from 'vue';

import type {
  IArcOrbitGeometry,
  TArcOrbitPosition,
} from './createArcOrbitGeometry';
import type {
  IArcOrbitItem,
  IResolvedArcOrbitItem,
} from './resolveArcOrbitItems';

export interface IArcOrbitRootContext {
  readonly position: ComputedRef<TArcOrbitPosition>;
  readonly color: ComputedRef<string>;
  readonly pointsCount: ComputedRef<number>;
  readonly geo: ComputedRef<IArcOrbitGeometry>;
  readonly animation: ComputedRef<boolean>;
  readonly startDelay: ComputedRef<number>;
  readonly title: ComputedRef<string>;
  readonly setTitle: (title: string) => void;
  readonly registerCallout: (id?: symbol) => number | ComputedRef<number>;
  readonly unregisterCallout?: (id: symbol) => void;
  readonly edgeOffset?: ComputedRef<number>;
  readonly items?: ComputedRef<readonly IArcOrbitItem[] | undefined>;
}

export interface IArcOrbitCalloutContext {
  readonly position: TArcOrbitPosition;
  readonly index: number;
  readonly color: ComputedRef<string>;
  readonly item: ComputedRef<IResolvedArcOrbitItem>;
}

export const ARC_ORBIT_ROOT_KEY: InjectionKey<IArcOrbitRootContext> =
  Symbol('ARC_ORBIT_ROOT_KEY');

export const ARC_ORBIT_CALLOUT_KEY: InjectionKey<IArcOrbitCalloutContext> =
  Symbol('ARC_ORBIT_CALLOUT_KEY');
