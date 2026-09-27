export interface IColorModifierParams {
  readonly hex: string;
  readonly ratio?: number;
}

export interface IDefenseInDepthPalette {
  readonly layerColors: readonly string[];
  readonly dotColor: string;
  readonly dotGlowColor: string;
  readonly strokeColor: string;
  readonly decorativeStrokeColor: string;
}
