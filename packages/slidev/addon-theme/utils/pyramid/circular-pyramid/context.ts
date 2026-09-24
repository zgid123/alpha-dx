import type { ComputedRef, InjectionKey, Ref } from 'vue';

import type { IPyramidPalette, IPyramidRegistration } from '../shared';
import type { ICircularLayerGeometry, ICircularPyramidGeometry } from './types';

export interface ICircularPyramidRegistration extends IPyramidRegistration {}

export interface ICircularPyramidRootContext {
  readonly count: ComputedRef<number>;
  readonly activeIndex: Ref<number> | ComputedRef<number>;
  readonly color: ComputedRef<string>;
  readonly geo: ComputedRef<ICircularPyramidGeometry>;
  readonly palette: ComputedRef<IPyramidPalette>;
  readonly animation: ComputedRef<boolean>;
  readonly interactive: ComputedRef<boolean>;
  readonly titleWidthPx: ComputedRef<number>;
  readonly contentWidthPx: ComputedRef<number>;
  readonly contentRightOffsetPx: ComputedRef<number>;
  readonly registerStack: (
    id?: symbol,
    color?: ComputedRef<string | undefined>,
  ) => {
    index: ComputedRef<number>;
    unregister: () => void;
  };
  readonly getLayerColor: (index: number) => string;
  readonly setActiveIndex: (index: number) => void;
  readonly getCardDeltaY?: (index: number) => number;
}

export interface ICircularPyramidStackContext {
  readonly index: ComputedRef<number>;
  readonly isActive: ComputedRef<boolean>;
  readonly step: ComputedRef<string | number>;
  readonly color?: ComputedRef<string>;
  readonly layerGeo?: ComputedRef<ICircularLayerGeometry | undefined>;
  readonly deltaY?: ComputedRef<number>;
  readonly connectorWidth?: ComputedRef<number>;
  readonly setActive?: () => void;
}

export const CIRCULAR_PYRAMID_ROOT_KEY: InjectionKey<ICircularPyramidRootContext> =
  Symbol('CIRCULAR_PYRAMID_ROOT_KEY');

export const CIRCULAR_PYRAMID_STACK_KEY: InjectionKey<ICircularPyramidStackContext> =
  Symbol('CIRCULAR_PYRAMID_STACK_KEY');
