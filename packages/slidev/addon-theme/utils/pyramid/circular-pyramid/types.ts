import type { IPyramidPalette } from '../shared';

export interface ICircularLayerGeometry {
  readonly index: number;
  readonly cx: number;
  readonly cy: number;
  readonly rx: number;
  readonly ry: number;
  readonly cylinderHeight: number;
  readonly cylinderPath: string;
  readonly bottomArcPath: string;
  readonly topEllipsePath: string;
  readonly slabCenterY?: number;
}

export interface ICircularPyramidGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly count: number;
  readonly layers: readonly ICircularLayerGeometry[];
}

export interface ICreateCircularPyramidOptions {
  readonly count?: number;
  readonly viewBoxWidth?: number;
  readonly viewBoxHeight?: number;
  readonly topRadius?: number;
  readonly bottomRadius?: number;
  readonly cylinderHeight?: number;
  readonly ratio?: number;
  readonly cx?: number;
}

export interface ICircularPyramidPalette extends IPyramidPalette {}
