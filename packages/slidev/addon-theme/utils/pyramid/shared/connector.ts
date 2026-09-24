export interface IPyramidConnectorPoint {
  readonly x: number;
  readonly y: number;
}

export function createPyramidConnectorPath(
  start: IPyramidConnectorPoint,
  end: IPyramidConnectorPoint,
): string {
  const startX = Number(start.x.toFixed(2));
  const startY = Number(start.y.toFixed(2));
  const endX = Number(end.x.toFixed(2));
  const endY = Number(end.y.toFixed(2));

  // If startY and endY are virtually aligned, return straight line
  if (Math.abs(startY - endY) < 1) {
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  }

  const width = Math.max(0, endX - startX);
  // Initial horizontal stub leaving the disc dot
  const stubWidth = Math.min(14, width * 0.2);
  const x1 = Number((startX + stubWidth).toFixed(2));

  // Ramp/elbow transition to target card elevation
  const rampWidth = Math.min(28, Math.max(14, (width - stubWidth) * 0.45));
  const x2 = Number((x1 + rampWidth).toFixed(2));

  // Connect: (startX, startY) -> (x1, startY) -> (x2, endY) -> (endX, endY)
  return `M ${startX} ${startY} L ${x1} ${startY} L ${x2} ${endY} L ${endX} ${endY}`;
}

export interface IResolvePyramidCardPositionsParams {
  readonly targetYList: readonly number[];
  readonly heights: readonly number[];
  readonly gap?: number;
  readonly minY?: number;
  readonly maxY?: number;
}

export function resolvePyramidCardPositions(
  params: IResolvePyramidCardPositionsParams,
): number[] {
  const { targetYList, heights, gap = 10, minY = 16, maxY = 464 } = params;
  const count = targetYList.length;
  if (count <= 1) {
    return [...targetYList];
  }

  const yList: number[] = [...targetYList];

  // 1. Forward pass: push down any overlapping cards
  for (let i = 0; i < count - 1; i++) {
    const curY = yList[i] ?? 0;
    const nextY = yList[i + 1] ?? 0;
    const curH = heights[i] ?? 48;
    const nextH = heights[i + 1] ?? 48;
    const minCenterNext = curY + curH / 2 + nextH / 2 + gap;
    if (nextY < minCenterNext) {
      yList[i + 1] = minCenterNext;
    }
  }

  // 2. Center the shift by redistributing excess displacement
  const avgShift =
    yList.reduce((sum, y, i) => sum + (y - (targetYList[i] ?? y)), 0) / count;
  const firstY = yList[0] ?? 0;
  const firstH = heights[0] ?? 48;
  const maxAllowableUpShift = firstY - firstH / 2 - minY;
  const shiftUp = Math.max(0, Math.min(avgShift, maxAllowableUpShift));
  for (let i = 0; i < count; i++) {
    yList[i] = (yList[i] ?? 0) - shiftUp;
  }

  // 3. Backward pass from bottom boundary
  const lastY = yList[count - 1] ?? 0;
  const lastH = heights[count - 1] ?? 48;
  const bottomOverlap = lastY + lastH / 2 - maxY;
  if (bottomOverlap > 0) {
    yList[count - 1] = lastY - bottomOverlap;
    for (let i = count - 2; i >= 0; i--) {
      const curY = yList[i] ?? 0;
      const nextY = yList[i + 1] ?? 0;
      const curH = heights[i] ?? 48;
      const nextH = heights[i + 1] ?? 48;
      const maxCenterPrev = nextY - nextH / 2 - curH / 2 - gap;
      if (curY > maxCenterPrev) {
        yList[i] = maxCenterPrev;
      }
    }
  }

  // 4. Final top boundary safety
  const updatedFirstY = yList[0] ?? 0;
  const topOverlap = minY - (updatedFirstY - firstH / 2);
  if (topOverlap > 0) {
    yList[0] = updatedFirstY + topOverlap;
    for (let i = 0; i < count - 1; i++) {
      const curY = yList[i] ?? 0;
      const nextY = yList[i + 1] ?? 0;
      const curH = heights[i] ?? 48;
      const nextH = heights[i + 1] ?? 48;
      const minCenterNext = curY + curH / 2 + nextH / 2 + gap;
      if (nextY < minCenterNext) {
        yList[i + 1] = minCenterNext;
      }
    }
  }

  return yList.map((y) => Number(y.toFixed(2)));
}
