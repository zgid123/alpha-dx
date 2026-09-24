import type { IPyramidPalette } from '../shared';

export interface ISquareLayerGeometry {
  readonly index: number;
  readonly cx: number;
  readonly cy: number;
  readonly rx: number;
  readonly ry: number;
  readonly slabHeight: number;
  readonly cornerRadius: number;
  readonly topFacePath: string;
  readonly innerFacePath: string;
  readonly sidePath: string;
  readonly leftSidePath: string;
  readonly rightSidePath: string;
  readonly bottomEdgePath: string;
  readonly slabCenterY?: number;
}

export interface ISquarePyramidGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly count: number;
  readonly layers: readonly ISquareLayerGeometry[];
}

export interface ICreateSquarePyramidOptions {
  readonly count?: number;
  readonly viewBoxWidth?: number;
  readonly viewBoxHeight?: number;
  readonly topSize?: number;
  readonly bottomSize?: number;
  readonly slabHeight?: number;
  readonly ratio?: number;
  readonly cx?: number;
  readonly cornerRadiusRatio?: number;
}

export interface ISquarePyramidPalette extends IPyramidPalette {}
