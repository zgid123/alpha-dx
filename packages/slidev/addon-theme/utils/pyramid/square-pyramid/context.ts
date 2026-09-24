import type { ComputedRef, InjectionKey, Ref } from 'vue';

import type { IPyramidPalette, IPyramidRegistration } from '../shared';
import type { ISquareLayerGeometry, ISquarePyramidGeometry } from './types';

export interface ISquarePyramidRegistration extends IPyramidRegistration {}

export interface ISquarePyramidRootContext {
  readonly count: ComputedRef<number>;
  readonly activeIndex: Ref<number> | ComputedRef<number>;
  readonly color: ComputedRef<string>;
  readonly geo: ComputedRef<ISquarePyramidGeometry>;
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

export interface ISquarePyramidStackContext {
  readonly index: ComputedRef<number>;
  readonly isActive: ComputedRef<boolean>;
  readonly step: ComputedRef<string | number>;
  readonly color?: ComputedRef<string>;
  readonly layerGeo?: ComputedRef<ISquareLayerGeometry | undefined>;
  readonly deltaY?: ComputedRef<number>;
  readonly connectorWidth?: ComputedRef<number>;
  readonly setActive?: () => void;
}

export const SQUARE_PYRAMID_ROOT_KEY: InjectionKey<ISquarePyramidRootContext> =
  Symbol('SQUARE_PYRAMID_ROOT_KEY');

export const SQUARE_PYRAMID_STACK_KEY: InjectionKey<ISquarePyramidStackContext> =
  Symbol('SQUARE_PYRAMID_STACK_KEY');
