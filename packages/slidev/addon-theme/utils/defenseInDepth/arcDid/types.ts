export type TArcDiDOrder = 'outer-to-inner' | 'inner-to-outer';
export type TArcDiDPartPosition = 'top' | 'middle' | 'bottom' | 'center';
export type TArcDiDOrientation =
  | boolean
  | number
  | 'tangent'
  | 'auto'
  | (string & {});

export interface IArcDiDPoint {
  readonly x: number;
  readonly y: number;
}

export interface IArcDiDPartItem {
  readonly label: string;
  readonly angle?: number;
  readonly radius?: number;
  readonly radialOffset?: number;
  readonly color?: string;
  readonly icon?: string;
  readonly span?: number;
  readonly position?: TArcDiDPartPosition;
  readonly maxWidth?: number | string;
  readonly rotate?: TArcDiDOrientation;
  readonly skew?: TArcDiDOrientation;
  readonly active?: boolean;
}

export interface IArcDiDSectorItem {
  readonly parts: readonly (string | IArcDiDPartItem)[];
  readonly split?: boolean;
  readonly angle?: number;
  readonly span?: number;
  readonly color?: string;
  readonly rotate?: TArcDiDOrientation;
  readonly skew?: TArcDiDOrientation;
}

export interface IArcDiDLayerItem {
  readonly title?: string;
  readonly parts?: readonly (string | IArcDiDPartItem)[];
  readonly sectors?: readonly (
    | IArcDiDSectorItem
    | readonly (string | IArcDiDPartItem)[]
  )[];
  readonly color?: string;
  readonly textColor?: string;
  readonly titleAngleSpan?: number;
  readonly titleWidth?: number;
}

export interface IArcDiDPartGeometry {
  readonly index: number;
  readonly sectorIndex?: number;
  readonly trackIndex?: number;
  readonly position?: TArcDiDPartPosition;
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
  readonly rotate?: TArcDiDOrientation;
  readonly skew?: TArcDiDOrientation;
  readonly rotationAngle?: number;
  readonly active?: boolean;
}

export interface IArcDiDSectorGeometry {
  readonly index: number;
  readonly startAngle: number;
  readonly endAngle: number;
  readonly midAngle: number;
  readonly span: number;
  readonly path: string;
  readonly split: boolean;
  readonly dividerPaths: readonly string[];
  readonly color?: string;
  readonly rotate?: TArcDiDOrientation;
  readonly skew?: TArcDiDOrientation;
  readonly parts: readonly IArcDiDPartGeometry[];
}

export interface IArcDiDLayerGeometry {
  readonly index: number;
  readonly innerRadius: number;
  readonly outerRadius: number;
  readonly midRadius: number;
  readonly thickness: number;
  readonly path: string;
  readonly titlePosition: IArcDiDPoint;
  readonly titlePath?: string;
  readonly titleLeft?: number;
  readonly titleRight?: number;
  readonly sectors: readonly IArcDiDSectorGeometry[];
  readonly parts: readonly IArcDiDPartGeometry[];
}

export interface IArcDiDDecorativeArc {
  readonly path: string;
  readonly strokeWidth: number;
  readonly opacity: number;
}

export interface IArcDiDGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly cx: number;
  readonly cy: number;
  readonly innerRadius: number;
  readonly outerRadius: number;
  readonly count: number;
  readonly layers: readonly IArcDiDLayerGeometry[];
  readonly decorativeArcs: readonly IArcDiDDecorativeArc[];
  readonly innerCutoutPath?: string;
}

export interface ICreateArcDiDOptions {
  readonly viewBoxWidth?: number;
  readonly viewBoxHeight?: number;
  readonly cx?: number;
  readonly cy?: number;
  readonly innerRadius?: number;
  readonly outerRadius?: number;
  readonly count?: number;
  readonly gap?: number;
  readonly order?: TArcDiDOrder;
  readonly titleAngleSpan?: number;
  readonly titleWidth?: number;
  readonly layers?: readonly IArcDiDLayerItem[];
}
