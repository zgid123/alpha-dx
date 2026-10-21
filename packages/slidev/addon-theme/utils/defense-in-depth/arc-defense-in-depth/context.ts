import type { ComputedRef, InjectionKey, Ref } from 'vue';

import type {
  IArcDefenseInDepthGeometry,
  IArcDefenseInDepthLayerGeometry,
  IArcDefenseInDepthPartItem,
  IArcDefenseInDepthSectorGeometry,
  IArcDefenseInDepthSectorItem,
  TArcDefenseInDepthOrder,
  TArcDefenseInDepthOrientation,
} from './types';

export interface IArcDefenseInDepthRegisteredSectorData {
  readonly parts?: readonly IArcDefenseInDepthPartItem[];
  readonly split?: boolean;
  readonly angle?: number;
  readonly span?: number;
  readonly color?: string;
  readonly index?: number;
  readonly rotate?: TArcDefenseInDepthOrientation;
  readonly skew?: TArcDefenseInDepthOrientation;
}

export interface IArcDefenseInDepthRegisteredLayerData {
  readonly title?: string;
  readonly color?: string;
  readonly parts?: readonly IArcDefenseInDepthPartItem[];
  readonly sectors?: readonly IArcDefenseInDepthSectorItem[];
  readonly index?: number;
  readonly titleAngleSpan?: number;
  readonly titleWidth?: number;
}

export interface IArcDefenseInDepthRootContext {
  readonly geo: ComputedRef<IArcDefenseInDepthGeometry>;
  readonly count: ComputedRef<number>;
  readonly activeIndex: Ref<number> | ComputedRef<number>;
  readonly setActiveIndex: (index: number) => void;
  readonly activePart?:
    | Ref<string | number | undefined>
    | ComputedRef<string | number | undefined>;
  readonly setActivePart?: (part: string | number | undefined) => void;
  readonly hasAnyActivePart?: ComputedRef<boolean>;
  readonly isPartActive?: (
    label?: string,
    index?: number,
    activeProp?: boolean,
  ) => boolean;
  readonly color: ComputedRef<string>;
  readonly colors: ComputedRef<readonly string[] | undefined>;
  readonly order: ComputedRef<TArcDefenseInDepthOrder>;
  readonly animation: ComputedRef<boolean>;
  readonly interactive: ComputedRef<boolean>;
  readonly startDelay: ComputedRef<number>;
  readonly getLayerColor: (index: number) => string;
  readonly registerLayer: (
    token?: symbol,
    dataRef?: ComputedRef<IArcDefenseInDepthRegisteredLayerData | undefined>,
  ) => {
    index: ComputedRef<number>;
    unregister: () => void;
  };
}

export interface IArcDefenseInDepthSectorContext {
  readonly sectorIndex: ComputedRef<number>;
  readonly sectorGeo: ComputedRef<IArcDefenseInDepthSectorGeometry | undefined>;
  readonly rotate?: ComputedRef<TArcDefenseInDepthOrientation | undefined>;
  readonly skew?: ComputedRef<TArcDefenseInDepthOrientation | undefined>;
  readonly registerPart: (
    token?: symbol,
    partDataRef?: ComputedRef<IArcDefenseInDepthPartItem | undefined>,
  ) => {
    index: ComputedRef<number>;
    unregister: () => void;
  };
}

export interface IArcDefenseInDepthLayerContext {
  readonly layerIndex: ComputedRef<number>;
  readonly layerGeo: ComputedRef<IArcDefenseInDepthLayerGeometry | undefined>;
  readonly isActive: ComputedRef<boolean>;
  readonly color: ComputedRef<string>;
  readonly textColor?: ComputedRef<string | undefined>;
  readonly title: ComputedRef<string | undefined>;
  readonly setTitle: (title: string) => void;
  readonly partsCount: ComputedRef<number>;
  readonly registerPart: (
    token?: symbol,
    partDataRef?: ComputedRef<IArcDefenseInDepthPartItem | undefined>,
  ) => {
    index: ComputedRef<number>;
    unregister: () => void;
  };
  readonly registerSector: (
    token?: symbol,
    sectorDataRef?: ComputedRef<
      IArcDefenseInDepthRegisteredSectorData | undefined
    >,
  ) => {
    index: ComputedRef<number>;
    unregister: () => void;
  };
}

export const ARC_DID_ROOT_KEY: InjectionKey<IArcDefenseInDepthRootContext> =
  Symbol('ARC_DID_ROOT_KEY');

export const ARC_DID_LAYER_KEY: InjectionKey<IArcDefenseInDepthLayerContext> =
  Symbol('ARC_DID_LAYER_KEY');

export const ARC_DID_SECTOR_KEY: InjectionKey<IArcDefenseInDepthSectorContext> =
  Symbol('ARC_DID_SECTOR_KEY');
