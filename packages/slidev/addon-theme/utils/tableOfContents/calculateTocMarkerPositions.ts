export interface ITocMarkerPosition {
  readonly offsetFromMiddlePx: number;
  readonly rightShiftPx: number;
  readonly topPercent: number;
}

export const MAXIMUM_TOC_ITEM_COUNT = 7;
const TOC_CANVAS_HEIGHT_PX = 552;
const TOC_VERTICAL_PADDING_PX = 40;
const ROOT_FONT_SIZE_PX = 16;
const TOC_ITEM_HEIGHT_REM = 2.3;
const TOC_ITEM_HEIGHT_PX = TOC_ITEM_HEIGHT_REM * ROOT_FONT_SIZE_PX;
const MARKER_TOP_PERCENT =
  ((TOC_VERTICAL_PADDING_PX + TOC_ITEM_HEIGHT_PX / 2) / TOC_CANVAS_HEIGHT_PX) *
  100;
const MARKER_BOTTOM_PERCENT = 100 - MARKER_TOP_PERCENT;
const MARKER_HORIZONTAL_CURVE_PX = 9;
const MARKER_MIDDLE_RIGHT_SHIFT_PX = 24;
const MARKER_VERTICAL_STEP_PERCENT =
  (MARKER_BOTTOM_PERCENT - MARKER_TOP_PERCENT) / (MAXIMUM_TOC_ITEM_COUNT - 1);

export function calculateTocMarkerPositions(
  count: number,
): readonly ITocMarkerPosition[] {
  if (!Number.isInteger(count) || count <= 0) {
    return [];
  }

  const boundedCount = Math.min(count, MAXIMUM_TOC_ITEM_COUNT);
  const middleIndex = (boundedCount - 1) / 2;
  const centerPercent = (MARKER_TOP_PERCENT + MARKER_BOTTOM_PERCENT) / 2;

  return Array.from({ length: boundedCount }, (_, index) => {
    const distanceFromMiddle = Math.abs(index - middleIndex);

    return {
      offsetFromMiddlePx:
        distanceFromMiddle * distanceFromMiddle * MARKER_HORIZONTAL_CURVE_PX,
      rightShiftPx: MARKER_MIDDLE_RIGHT_SHIFT_PX,
      topPercent: Number(
        (
          centerPercent +
          (index - middleIndex) * MARKER_VERTICAL_STEP_PERCENT
        ).toFixed(2),
      ),
    };
  });
}

export interface ICalculateTocItemCountParams {
  readonly maximumCount: number;
  readonly availableCount: number;
}

export function calculateTocItemCount({
  maximumCount,
  availableCount,
}: ICalculateTocItemCountParams): number {
  const normalizedAvailableCount = Math.max(0, Math.trunc(availableCount));
  const normalizedMaximumCount = Number.isFinite(maximumCount)
    ? Math.max(1, Math.min(MAXIMUM_TOC_ITEM_COUNT, Math.trunc(maximumCount)))
    : MAXIMUM_TOC_ITEM_COUNT;

  return Math.min(normalizedAvailableCount, normalizedMaximumCount);
}

export function calculateTocMarkerCenterPercent(count: number): number {
  const positions = calculateTocMarkerPositions(count);
  const firstPosition = positions[0];
  const lastPosition = positions.at(-1);

  if (!firstPosition || !lastPosition) {
    return 50;
  }

  return (firstPosition.topPercent + lastPosition.topPercent) / 2;
}

export function calculateTocMiddleMarkerOffsetPx(count: number): number {
  const positions = calculateTocMarkerPositions(count);
  const middlePosition = positions[Math.floor((positions.length - 1) / 2)];

  if (!middlePosition) {
    return 0;
  }

  return middlePosition.rightShiftPx - middlePosition.offsetFromMiddlePx;
}

export function calculateTocArticleOffsetPx(
  position: ITocMarkerPosition,
): number {
  const connectorWidthPx = Math.max(
    22,
    48 - position.offsetFromMiddlePx * 0.45,
  );

  return (
    position.rightShiftPx -
    position.offsetFromMiddlePx +
    connectorWidthPx -
    MARKER_MIDDLE_RIGHT_SHIFT_PX
  );
}

export function calculateTocListGapRem(count: number): number {
  if (!Number.isInteger(count) || count <= 1) {
    return 0;
  }

  const availableCenterSpanPx =
    TOC_CANVAS_HEIGHT_PX - TOC_VERTICAL_PADDING_PX * 2 - TOC_ITEM_HEIGHT_PX;
  const rowHeightRem =
    availableCenterSpanPx / (MAXIMUM_TOC_ITEM_COUNT - 1) / ROOT_FONT_SIZE_PX;
  const gapRem = rowHeightRem - TOC_ITEM_HEIGHT_REM;

  return Number(gapRem.toFixed(2));
}
