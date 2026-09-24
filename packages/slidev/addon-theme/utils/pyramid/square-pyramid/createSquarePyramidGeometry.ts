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
  ICreateSquarePyramidOptions,
  ISquareLayerGeometry,
  ISquarePyramidGeometry,
  ISquarePyramidPalette,
} from './types';

export const DEFAULT_SQUARE_PYRAMID_COLOR = DEFAULT_PYRAMID_COLOR;
export const DEFAULT_SQUARE_PYRAMID_STACK_COLORS: readonly string[] = [
  '#ec4899', // 0: Pink (matches top slab)
  '#8b5cf6', // 1: Purple (matches 2nd slab)
  '#3b82f6', // 2: Blue (matches 3rd slab)
  '#06b6d4', // 3: Cyan (matches 4th slab)
  '#14b8a6', // 4: Teal (matches 5th slab)
  '#f59e0b', // 5: Amber (warm accent)
] as const;

export const MIN_SQUARE_COUNT = MIN_PYRAMID_COUNT;
export const MAX_SQUARE_COUNT = MAX_PYRAMID_COUNT;

export { darkenColor, lightenColor };

export function clampSquareCount(count?: number): number {
  return clampPyramidCount(count);
}

export function resolveSquarePyramidPalette(
  baseColor: string = DEFAULT_SQUARE_PYRAMID_COLOR,
): ISquarePyramidPalette {
  return resolvePyramidPalette(baseColor);
}

function buildSquarePaths({
  cx,
  cy,
  rx,
  ry,
  dx,
  dy,
  slabHeight,
}: {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  dx: number;
  dy: number;
  slabHeight: number;
}) {
  const topFacePath = [
    `M ${cx - dx} ${cy - ry + dy}`,
    `Q ${cx} ${cy - ry} ${cx + dx} ${cy - ry + dy}`,
    `L ${cx + rx - dx} ${cy - dy}`,
    `Q ${cx + rx} ${cy} ${cx + rx - dx} ${cy + dy}`,
    `L ${cx + dx} ${cy + ry - dy}`,
    `Q ${cx} ${cy + ry} ${cx - dx} ${cy + ry - dy}`,
    `L ${cx - rx + dx} ${cy + dy}`,
    `Q ${cx - rx} ${cy} ${cx - rx + dx} ${cy - dy}`,
    'Z',
  ].join(' ');

  const innerRatio = 0.65;
  const rxInner = Number((rx * innerRatio).toFixed(2));
  const ryInner = Number((ry * innerRatio).toFixed(2));
  const dxInner = Number((dx * innerRatio).toFixed(2));
  const dyInner = Number((dy * innerRatio).toFixed(2));

  const innerFacePath = [
    `M ${cx - dxInner} ${cy - ryInner + dyInner}`,
    `Q ${cx} ${cy - ryInner} ${cx + dxInner} ${cy - ryInner + dyInner}`,
    `L ${cx + rxInner - dxInner} ${cy - dyInner}`,
    `Q ${cx + rxInner} ${cy} ${cx + rxInner - dxInner} ${cy + dyInner}`,
    `L ${cx + dxInner} ${cy + ryInner - dyInner}`,
    `Q ${cx} ${cy + ryInner} ${cx - dxInner} ${cy + ryInner - dyInner}`,
    `L ${cx - rxInner + dxInner} ${cy + dyInner}`,
    `Q ${cx - rxInner} ${cy} ${cx - rxInner + dxInner} ${cy - dyInner}`,
    'Z',
  ].join(' ');

  const sidePath = [
    `M ${cx - rx + 0.5 * dx} ${cy}`,
    `Q ${cx - rx + 0.5 * dx} ${cy + 0.5 * dy} ${cx - rx + dx} ${cy + dy}`,
    `L ${cx - dx} ${cy + ry - dy}`,
    `Q ${cx} ${cy + ry} ${cx + dx} ${cy + ry - dy}`,
    `L ${cx + rx - dx} ${cy + dy}`,
    `Q ${cx + rx - 0.5 * dx} ${cy + 0.5 * dy} ${cx + rx - 0.5 * dx} ${cy}`,
    `L ${cx + rx - 0.5 * dx} ${cy + slabHeight}`,
    `Q ${cx + rx - 0.5 * dx} ${cy + slabHeight + 0.5 * dy} ${cx + rx - dx} ${cy + slabHeight + dy}`,
    `L ${cx + dx} ${cy + ry + slabHeight - dy}`,
    `Q ${cx} ${cy + ry + slabHeight} ${cx - dx} ${cy + ry + slabHeight - dy}`,
    `L ${cx - rx + dx} ${cy + slabHeight + dy}`,
    `Q ${cx - rx + 0.5 * dx} ${cy + slabHeight + 0.5 * dy} ${cx - rx + 0.5 * dx} ${cy + slabHeight}`,
    'Z',
  ].join(' ');

  const leftSidePath = [
    `M ${cx - rx + 0.5 * dx} ${cy}`,
    `Q ${cx - rx + 0.5 * dx} ${cy + 0.5 * dy} ${cx - rx + dx} ${cy + dy}`,
    `L ${cx - dx} ${cy + ry - dy}`,
    `Q ${cx} ${cy + ry} ${cx} ${cy + ry - 0.5 * dy}`,
    `L ${cx} ${cy + ry + slabHeight - 0.5 * dy}`,
    `Q ${cx} ${cy + ry + slabHeight} ${cx - dx} ${cy + ry + slabHeight - dy}`,
    `L ${cx - rx + dx} ${cy + slabHeight + dy}`,
    `Q ${cx - rx + 0.5 * dx} ${cy + slabHeight + 0.5 * dy} ${cx - rx + 0.5 * dx} ${cy + slabHeight}`,
    'Z',
  ].join(' ');

  const rightSidePath = [
    `M ${cx} ${cy + ry - 0.5 * dy}`,
    `Q ${cx} ${cy + ry} ${cx + dx} ${cy + ry - dy}`,
    `L ${cx + rx - dx} ${cy + dy}`,
    `Q ${cx + rx - 0.5 * dx} ${cy + 0.5 * dy} ${cx + rx - 0.5 * dx} ${cy}`,
    `L ${cx + rx - 0.5 * dx} ${cy + slabHeight}`,
    `Q ${cx + rx - 0.5 * dx} ${cy + slabHeight + 0.5 * dy} ${cx + rx - dx} ${cy + slabHeight + dy}`,
    `L ${cx + dx} ${cy + ry + slabHeight - dy}`,
    `Q ${cx} ${cy + ry + slabHeight} ${cx} ${cy + ry + slabHeight - 0.5 * dy}`,
    'Z',
  ].join(' ');

  const bottomEdgePath = [
    `M ${cx - rx + 0.5 * dx} ${cy + slabHeight}`,
    `Q ${cx - rx + 0.5 * dx} ${cy + slabHeight + 0.5 * dy} ${cx - rx + dx} ${cy + slabHeight + dy}`,
    `L ${cx - dx} ${cy + ry + slabHeight - dy}`,
    `Q ${cx} ${cy + ry + slabHeight} ${cx + dx} ${cy + ry + slabHeight - dy}`,
    `L ${cx + rx - dx} ${cy + slabHeight + dy}`,
    `Q ${cx + rx - 0.5 * dx} ${cy + slabHeight + 0.5 * dy} ${cx + rx - 0.5 * dx} ${cy + slabHeight}`,
  ].join(' ');

  return {
    topFacePath,
    innerFacePath,
    sidePath,
    leftSidePath,
    rightSidePath,
    bottomEdgePath,
  };
}

export function createSquarePyramidGeometry(
  options: ICreateSquarePyramidOptions = {},
): ISquarePyramidGeometry {
  const viewBoxWidth = options.viewBoxWidth ?? 960;
  const viewBoxHeight = options.viewBoxHeight ?? 440;
  const count = clampSquareCount(options.count);
  const ratio = options.ratio ?? 0.46;
  const cx = options.cx ?? viewBoxWidth / 2;
  const slabHeight = options.slabHeight ?? (count >= 5 ? 8 : 10);
  const cornerRadiusRatio = options.cornerRadiusRatio ?? 0.16;

  if (count === 1) {
    const rx = options.topSize ?? 110;
    const ry = Number((rx * ratio).toFixed(2));
    const cy = Number((viewBoxHeight / 2 - slabHeight / 2).toFixed(2));
    const cornerRadius = Number((rx * cornerRadiusRatio).toFixed(2));
    const dx = cornerRadius;
    const dy = Number((cornerRadius * ratio).toFixed(2));

    const paths = buildSquarePaths({
      cx,
      cy,
      rx,
      ry,
      dx,
      dy,
      slabHeight,
    });

    const slabCenterY = Number((cy + slabHeight / 2).toFixed(2));

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
          slabHeight,
          cornerRadius,
          slabCenterY,
          ...paths,
        },
      ],
    };
  }

  const topSize =
    options.topSize ?? (count <= 2 ? 110 : Math.max(75, 100 - (count - 3) * 7));
  const bottomSize = options.bottomSize ?? 185;

  const radii: { rx: number; ry: number }[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const rx = Number((topSize + t * (bottomSize - topSize)).toFixed(2));
    const ry = Number((rx * ratio).toFixed(2));
    radii.push({ rx, ry });
  }

  const { startCy, stepYList } = computePyramidStacking({
    count,
    viewBoxHeight,
    slabHeight,
    radii,
  });

  const layers: ISquareLayerGeometry[] = [];
  let currentCy = startCy;

  for (let i = 0; i < count; i++) {
    const rx = radii[i]?.rx ?? topSize;
    const ry = radii[i]?.ry ?? topSize * ratio;
    const cy = Number(currentCy.toFixed(2));
    const cornerRadius = Number((rx * cornerRadiusRatio).toFixed(2));
    const dx = cornerRadius;
    const dy = Number((cornerRadius * ratio).toFixed(2));

    const paths = buildSquarePaths({
      cx,
      cy,
      rx,
      ry,
      dx,
      dy,
      slabHeight,
    });

    const slabCenterY = Number((cy + slabHeight / 2).toFixed(2));

    layers.push({
      index: i,
      cx,
      cy,
      rx,
      ry,
      slabHeight,
      cornerRadius,
      slabCenterY,
      ...paths,
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
