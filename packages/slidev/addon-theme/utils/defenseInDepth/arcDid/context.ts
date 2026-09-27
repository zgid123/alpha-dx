import type { ComputedRef, InjectionKey, Ref } from 'vue';

import type {
  IArcDiDGeometry,
  IArcDiDLayerGeometry,
  IArcDiDPartItem,
  IArcDiDSectorGeometry,
  IArcDiDSectorItem,
  TArcDiDOrder,
} from './types';

export interface IArcDiDRegisteredSectorData {
  readonly parts?: readonly IArcDiDPartItem[];
  readonly split?: boolean;
  readonly angle?: number;
  readonly span?: number;
  readonly color?: string;
  readonly index?: number;
  readonly rotate?: boolean | number | 'tangent' | 'auto';
  readonly skew?: boolean | number | string;
}

export interface IArcDiDRegisteredLayerData {
  readonly title?: string;
  readonly color?: string;
  readonly parts?: readonly IArcDiDPartItem[];
  readonly sectors?: readonly IArcDiDSectorItem[];
  readonly index?: number;
}

export interface IArcDiDRootContext {
  readonly geo: ComputedRef<IArcDiDGeometry>;
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
  readonly order: ComputedRef<TArcDiDOrder>;
  readonly animation: ComputedRef<boolean>;
  readonly interactive: ComputedRef<boolean>;
  readonly startDelay: ComputedRef<number>;
  readonly getLayerColor: (index: number) => string;
  readonly registerLayer: (
    token?: symbol,
    dataRef?: ComputedRef<IArcDiDRegisteredLayerData | undefined>,
  ) => {
    index: ComputedRef<number>;
    unregister: () => void;
  };
}

export interface IArcDiDSectorContext {
  readonly sectorIndex: ComputedRef<number>;
  readonly sectorGeo: ComputedRef<IArcDiDSectorGeometry | undefined>;
  readonly rotate?: ComputedRef<
    boolean | number | 'tangent' | 'auto' | undefined
  >;
  readonly skew?: ComputedRef<boolean | number | string | undefined>;
  readonly registerPart: (
    token?: symbol,
    partDataRef?: ComputedRef<IArcDiDPartItem | undefined>,
  ) => {
    index: ComputedRef<number>;
    unregister: () => void;
  };
}

export interface IArcDiDLayerContext {
  readonly layerIndex: ComputedRef<number>;
  readonly layerGeo: ComputedRef<IArcDiDLayerGeometry | undefined>;
  readonly isActive: ComputedRef<boolean>;
  readonly color: ComputedRef<string>;
  readonly textColor?: ComputedRef<string | undefined>;
  readonly title: ComputedRef<string | undefined>;
  readonly setTitle: (title: string) => void;
  readonly partsCount: ComputedRef<number>;
  readonly registerPart: (
    token?: symbol,
    partDataRef?: ComputedRef<IArcDiDPartItem | undefined>,
  ) => {
    index: ComputedRef<number>;
    unregister: () => void;
  };
  readonly registerSector: (
    token?: symbol,
    sectorDataRef?: ComputedRef<IArcDiDRegisteredSectorData | undefined>,
  ) => {
    index: ComputedRef<number>;
    unregister: () => void;
  };
}

export const ARC_DID_ROOT_KEY: InjectionKey<IArcDiDRootContext> =
  Symbol('ARC_DID_ROOT_KEY');

export const ARC_DID_LAYER_KEY: InjectionKey<IArcDiDLayerContext> =
  Symbol('ARC_DID_LAYER_KEY');

export const ARC_DID_SECTOR_KEY: InjectionKey<IArcDiDSectorContext> =
  Symbol('ARC_DID_SECTOR_KEY');
