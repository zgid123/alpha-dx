import { MAX_PYRAMID_COUNT, MIN_PYRAMID_COUNT } from './constants';
import type {
  IComputePyramidStackingParams,
  IPyramidStackingResult,
} from './types';

export function clampPyramidCount(count?: number): number {
  if (count === undefined || Number.isNaN(count)) {
    return 4;
  }

  return Math.min(
    MAX_PYRAMID_COUNT,
    Math.max(MIN_PYRAMID_COUNT, Math.round(count)),
  );
}

export function computePyramidStacking({
  count,
  viewBoxHeight,
  slabHeight,
  radii,
}: IComputePyramidStackingParams): IPyramidStackingResult {
  let sumAdjacentRy = 0;
  for (let i = 0; i < count - 1; i++) {
    const rCurrent = radii[i]?.ry ?? 0;
    const rNext = radii[i + 1]?.ry ?? 0;
    sumAdjacentRy += rCurrent + rNext;
  }

  const firstRy = radii[0]?.ry ?? 0;
  const lastRy = radii[count - 1]?.ry ?? 0;

  const baseOverlap =
    count <= 2
      ? 0.24
      : count === 3
        ? 0.26
        : count === 4
          ? 0.28
          : count === 5
            ? 0.34
            : 0.38;

  const maxAllowedHeight = viewBoxHeight - 60;
  const naturalHeight =
    firstRy + lastRy + count * slabHeight + (1 - baseOverlap) * sumAdjacentRy;

  const effectiveOverlap =
    naturalHeight > maxAllowedHeight && sumAdjacentRy > 0
      ? 1 -
        (maxAllowedHeight - firstRy - lastRy - count * slabHeight) /
          sumAdjacentRy
      : baseOverlap;

  const stepYList: number[] = [];
  let totalStepY = 0;
  for (let i = 0; i < count - 1; i++) {
    const rCurrent = radii[i]?.ry ?? 0;
    const rNext = radii[i + 1]?.ry ?? 0;
    const step = (rCurrent + rNext) * (1 - effectiveOverlap) + slabHeight;
    stepYList.push(step);
    totalStepY += step;
  }

  const actualTotalHeight = firstRy + totalStepY + slabHeight + lastRy;
  const startCy = Number(
    (viewBoxHeight / 2 - actualTotalHeight / 2 + firstRy).toFixed(2),
  );

  return {
    startCy,
    stepYList,
    actualTotalHeight,
  };
}
