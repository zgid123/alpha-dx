export type TArcDefenseInDepthOrder = 'outer-to-inner' | 'inner-to-outer';
export type TArcDefenseInDepthPartPosition =
  | 'top'
  | 'middle'
  | 'bottom'
  | 'center';
export type TArcDefenseInDepthOrientation =
  | boolean
  | number
  | 'tangent'
  | 'auto'
  | (string & {});

export interface IArcDefenseInDepthPoint {
  readonly x: number;
  readonly y: number;
}

export interface IArcDefenseInDepthPartItem {
  readonly label: string;
  readonly angle?: number;
  readonly radius?: number;
  readonly radialOffset?: number;
  readonly color?: string;
  readonly icon?: string;
  readonly span?: number;
  readonly position?: TArcDefenseInDepthPartPosition;
  readonly maxWidth?: number | string;
  readonly rotate?: TArcDefenseInDepthOrientation;
  readonly skew?: TArcDefenseInDepthOrientation;
  readonly active?: boolean;
}

export interface IArcDefenseInDepthSectorItem {
  readonly parts: readonly (string | IArcDefenseInDepthPartItem)[];
  readonly split?: boolean;
  readonly angle?: number;
  readonly span?: number;
  readonly color?: string;
  readonly rotate?: TArcDefenseInDepthOrientation;
  readonly skew?: TArcDefenseInDepthOrientation;
}

export interface IArcDefenseInDepthLayerItem {
  readonly title?: string;
  readonly parts?: readonly (string | IArcDefenseInDepthPartItem)[];
  readonly sectors?: readonly (
    | IArcDefenseInDepthSectorItem
    | readonly (string | IArcDefenseInDepthPartItem)[]
  )[];
  readonly color?: string;
  readonly textColor?: string;
  readonly titleAngleSpan?: number;
  readonly titleWidth?: number;
}

export interface IArcDefenseInDepthPartGeometry {
  readonly index: number;
  readonly sectorIndex?: number;
  readonly trackIndex?: number;
  readonly position?: TArcDefenseInDepthPartPosition;
  readonly label: string;
  readonly angle: number;
  readonly radius: number;
  readonly x: number;
  readonly y: number;
  readonly color?: string;
  readonly icon?: string;
  readonly startAngle?: number;
  readonly endAngle?: number;
  readonly midAngle?: number;
  readonly path?: string;
  readonly innerRadius?: number;
  readonly outerRadius?: number;
  readonly maxContentWidth?: number;
  readonly rotate?: TArcDefenseInDepthOrientation;
  readonly skew?: TArcDefenseInDepthOrientation;
  readonly rotationAngle?: number;
  readonly active?: boolean;
}

export interface IArcDefenseInDepthSectorGeometry {
  readonly index: number;
  readonly startAngle: number;
  readonly endAngle: number;
  readonly midAngle: number;
  readonly span: number;
  readonly path: string;
  readonly split: boolean;
  readonly dividerPaths: readonly string[];
  readonly color?: string;
  readonly rotate?: TArcDefenseInDepthOrientation;
  readonly skew?: TArcDefenseInDepthOrientation;
  readonly parts: readonly IArcDefenseInDepthPartGeometry[];
}

export interface IArcDefenseInDepthLayerGeometry {
  readonly index: number;
  readonly innerRadius: number;
  readonly outerRadius: number;
  readonly midRadius: number;
  readonly thickness: number;
  readonly path: string;
  readonly titlePosition: IArcDefenseInDepthPoint;
  readonly titlePath?: string;
  readonly titleLeft?: number;
  readonly titleRight?: number;
  readonly sectors: readonly IArcDefenseInDepthSectorGeometry[];
  readonly parts: readonly IArcDefenseInDepthPartGeometry[];
}

export interface IArcDefenseInDepthDecorativeArc {
  readonly path: string;
  readonly strokeWidth: number;
  readonly opacity: number;
}

export interface IArcDefenseInDepthGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly cx: number;
  readonly cy: number;
  readonly innerRadius: number;
  readonly outerRadius: number;
  readonly count: number;
  readonly layers: readonly IArcDefenseInDepthLayerGeometry[];
  readonly decorativeArcs: readonly IArcDefenseInDepthDecorativeArc[];
  readonly innerCutoutPath?: string;
}

export interface ICreateArcDefenseInDepthOptions {
  readonly viewBoxWidth?: number;
  readonly viewBoxHeight?: number;
  readonly cx?: number;
  readonly cy?: number;
  readonly innerRadius?: number;
  readonly outerRadius?: number;
  readonly count?: number;
  readonly gap?: number;
  readonly order?: TArcDefenseInDepthOrder;
  readonly titleAngleSpan?: number;
  readonly titleWidth?: number;
  readonly layers?: readonly IArcDefenseInDepthLayerItem[];
}
