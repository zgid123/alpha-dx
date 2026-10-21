import {
  calculateTocMarkerPositions,
  MAXIMUM_TOC_ITEM_COUNT,
} from './calculateTocMarkerPositions';
import type { ITocConnectorPoint } from './createTocConnectorPath';

const TOC_ARC_LEFT_PERCENT = 40.4;

export interface ICalculateFullTocArcPointsParams {
  readonly width: number;
  readonly height: number;
}

function formatCoordinate(value: number): number {
  return Number(value.toFixed(2));
}

export function calculateFullTocArcPoints({
  width,
  height,
}: ICalculateFullTocArcPointsParams): readonly ITocConnectorPoint[] {
  return calculateTocMarkerPositions(MAXIMUM_TOC_ITEM_COUNT).map(
    ({ offsetFromMiddlePx, rightShiftPx, topPercent }) => {
      return {
        x:
          width * (TOC_ARC_LEFT_PERCENT / 100) -
          offsetFromMiddlePx +
          rightShiftPx,
        y: height * (topPercent / 100),
      };
    },
  );
}

export function createTocArcPath(
  points: readonly ITocConnectorPoint[],
): string {
  const firstPoint = points[0];

  if (!firstPoint || points.length < 2) {
    return '';
  }

  if (points.length === 2) {
    const lastPoint = points[1];

    return lastPoint
      ? `M ${formatCoordinate(firstPoint.x)} ${formatCoordinate(firstPoint.y)} L ${formatCoordinate(lastPoint.x)} ${formatCoordinate(lastPoint.y)}`
      : '';
  }

  const commands = [
    `M ${formatCoordinate(firstPoint.x)} ${formatCoordinate(firstPoint.y)}`,
  ];

  for (let index = 0; index < points.length - 1; index += 1) {
    const point = points[index];
    const previousPoint = points[index - 1] ?? point;
    const nextPoint = points[index + 1];
    const followingPoint = points[index + 2] ?? nextPoint;

    if (!point || !previousPoint || !nextPoint || !followingPoint) {
      continue;
    }

    const firstControlPoint = {
      x: point.x + (nextPoint.x - previousPoint.x) / 6,
      y: point.y + (nextPoint.y - previousPoint.y) / 6,
    };
    const secondControlPoint = {
      x: nextPoint.x - (followingPoint.x - point.x) / 6,
      y: nextPoint.y - (followingPoint.y - point.y) / 6,
    };
    commands.push(
      `C ${formatCoordinate(firstControlPoint.x)} ${formatCoordinate(firstControlPoint.y)} ${formatCoordinate(secondControlPoint.x)} ${formatCoordinate(secondControlPoint.y)} ${formatCoordinate(nextPoint.x)} ${formatCoordinate(nextPoint.y)}`,
    );
  }

  return commands.join(' ');
}
