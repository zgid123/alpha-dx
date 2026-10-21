export interface ICalculateTocCenterAlignmentOffsetPxParams {
  readonly markerCenterY: number;
  readonly articleCenterY: number;
  readonly scaleY: number;
}

export function calculateTocCenterAlignmentOffsetPx({
  markerCenterY,
  articleCenterY,
  scaleY,
}: ICalculateTocCenterAlignmentOffsetPxParams): number {
  if (scaleY <= 0) {
    return 0;
  }

  return (markerCenterY - articleCenterY) / scaleY;
}
