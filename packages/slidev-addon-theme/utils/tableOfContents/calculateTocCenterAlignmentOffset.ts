export function calculateTocCenterAlignmentOffsetPx(
  markerCenterY: number,
  articleCenterY: number,
  scaleY: number,
): number {
  if (scaleY <= 0) {
    return 0;
  }

  return (markerCenterY - articleCenterY) / scaleY;
}
