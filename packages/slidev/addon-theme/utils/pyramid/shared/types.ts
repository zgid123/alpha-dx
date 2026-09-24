export interface IColorModifierParams {
  readonly hex: string;
  readonly ratio?: number;
}

export interface IPyramidPalette {
  readonly activeTopStart: string;
  readonly activeTopEnd: string;
  readonly activeSideStart: string;
  readonly activeSideEnd: string;
  readonly activeStroke: string;
  readonly defaultTopStart: string;
  readonly defaultTopEnd: string;
  readonly defaultSideStart: string;
  readonly defaultSideEnd: string;
  readonly defaultStroke: string;
  readonly glow: string;
}

export interface IPyramidRegistration {
  readonly index: number;
  readonly unregister: () => void;
}

export interface IComputePyramidStackingParams {
  readonly count: number;
  readonly viewBoxHeight: number;
  readonly slabHeight: number;
  readonly radii: readonly { readonly rx: number; readonly ry: number }[];
}

export interface IPyramidStackingResult {
  readonly startCy: number;
  readonly stepYList: readonly number[];
  readonly actualTotalHeight: number;
}
