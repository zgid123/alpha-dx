import {
  clampPyramidCount,
  computePyramidStacking,
  DEFAULT_PYRAMID_COLOR,
  darkenColor,
  lightenColor,
  MAX_PYRAMID_COUNT,
  MIN_PYRAMID_COUNT,
  resolvePyramidPalette,
} from '../shared';
import type {
  ICircularLayerGeometry,
  ICircularPyramidGeometry,
  ICircularPyramidPalette,
  ICreateCircularPyramidOptions,
} from './types';

export const DEFAULT_CIRCULAR_PYRAMID_COLOR = DEFAULT_PYRAMID_COLOR;
export const DEFAULT_CIRCULAR_PYRAMID_STACK_COLORS: readonly string[] = [
  '#3b82f6', // 0: Blue
  '#6366f1', // 1: Indigo
  '#10b981', // 2: Emerald
  '#f59e0b', // 3: Amber
  '#ec4899', // 4: Pink
  '#06b6d4', // 5: Cyan
] as const;

export const MIN_CIRCULAR_COUNT = MIN_PYRAMID_COUNT;
export const MAX_CIRCULAR_COUNT = MAX_PYRAMID_COUNT;

export { darkenColor, lightenColor };

export function clampCircularCount(count?: number): number {
  return clampPyramidCount(count);
}

export function resolveCircularPyramidPalette(
  baseColor: string = DEFAULT_CIRCULAR_PYRAMID_COLOR,
): ICircularPyramidPalette {
  return resolvePyramidPalette(baseColor);
}

export function createCircularPyramidGeometry(
  options: ICreateCircularPyramidOptions = {},
): ICircularPyramidGeometry {
  const viewBoxWidth = options.viewBoxWidth ?? 960;
  const viewBoxHeight = options.viewBoxHeight ?? 440;
  const count = clampCircularCount(options.count);
  const ratio = options.ratio ?? 0.45;

  const cx = options.cx ?? viewBoxWidth / 2;
  const cylinderHeight = options.cylinderHeight ?? (count >= 5 ? 7 : 8);

  if (count === 1) {
    const rx = options.topRadius ?? 120;
    const ry = Number((rx * ratio).toFixed(2));
    const cy = Number((viewBoxHeight / 2 - cylinderHeight / 2).toFixed(2));

    const topEllipsePath = `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
    const cylinderPath = `M ${cx - rx} ${cy} L ${cx - rx} ${cy + cylinderHeight} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + cylinderHeight} L ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy} Z`;
    const bottomArcPath = `M ${cx - rx} ${cy + cylinderHeight} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + cylinderHeight}`;

    const slabCenterY = Number((cy + cylinderHeight / 2).toFixed(2));

    return {
      viewBoxWidth,
      viewBoxHeight,
      count: 1,
      layers: [
        {
          index: 0,
          cx,
          cy,
          rx,
          ry,
          cylinderHeight,
          cylinderPath,
          bottomArcPath,
          topEllipsePath,
          slabCenterY,
        },
      ],
    };
  }

  const topRadius =
    options.topRadius ??
    (count <= 2 ? 120 : Math.max(80, 115 - (count - 3) * 8));
  const bottomRadius = options.bottomRadius ?? 215;

  const radii: { rx: number; ry: number }[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const rx = Number((topRadius + t * (bottomRadius - topRadius)).toFixed(2));
    const ry = Number((rx * ratio).toFixed(2));
    radii.push({ rx, ry });
  }

  const { startCy, stepYList } = computePyramidStacking({
    count,
    viewBoxHeight,
    slabHeight: cylinderHeight,
    radii,
  });

  const layers: ICircularLayerGeometry[] = [];
  let currentCy = startCy;

  for (let i = 0; i < count; i++) {
    const rx = radii[i]?.rx ?? topRadius;
    const ry = radii[i]?.ry ?? topRadius * ratio;
    const cy = Number(currentCy.toFixed(2));

    const topEllipsePath = `M ${cx - rx} ${cy} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;
    const cylinderPath = `M ${cx - rx} ${cy} L ${cx - rx} ${cy + cylinderHeight} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + cylinderHeight} L ${cx + rx} ${cy} A ${rx} ${ry} 0 0 1 ${cx - rx} ${cy} Z`;
    const bottomArcPath = `M ${cx - rx} ${cy + cylinderHeight} A ${rx} ${ry} 0 0 0 ${cx + rx} ${cy + cylinderHeight}`;
    const slabCenterY = Number((cy + cylinderHeight / 2).toFixed(2));

    layers.push({
      index: i,
      cx,
      cy,
      rx,
      ry,
      cylinderHeight,
      cylinderPath,
      bottomArcPath,
      topEllipsePath,
      slabCenterY,
    });

    if (i < count - 1) {
      currentCy += stepYList[i] ?? 0;
    }
  }

  return {
    viewBoxWidth,
    viewBoxHeight,
    count,
    layers,
  };
}
