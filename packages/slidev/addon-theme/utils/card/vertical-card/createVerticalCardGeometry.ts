export interface ICreateVerticalCardBottomBlobPathParams {
  readonly width: number;
  readonly height: number;
  readonly blobWidth?: number;
  readonly blobHeight?: number;
  readonly borderRadius?: number;
}

/**
 * Generates an SVG path for the organic accent blob/wave at the bottom-left corner.
 * Curves down smoothly from the left edge into the bottom horizontal edge,
 * adhering to the bottom-left rounded corner of the card.
 */
export function createVerticalCardBottomBlobPath({
  width,
  height,
  borderRadius = 24,
  blobWidth = Math.round(width * 0.45),
  blobHeight = Math.round(height * 0.24),
}: ICreateVerticalCardBottomBlobPathParams): string {
  const safeR = Math.max(0, Math.min(borderRadius, width / 2, height / 2));
  const startY = height - blobHeight;
  const endX = blobWidth;

  const cp1X = Math.round(blobWidth * 0.08);
  const cp1Y = Math.round(startY + blobHeight * 0.38);
  const cp2X = Math.round(blobWidth * 0.46);
  const cp2Y = Math.round(height - blobHeight * 0.06);

  return [
    `M 0 ${startY}`,
    `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${endX} ${height}`,
    `H ${safeR}`,
    `A ${safeR} ${safeR} 0 0 1 0 ${height - safeR}`,
    `V ${startY}`,
    'Z',
  ].join(' ');
}

export interface ICreateVerticalCardTopRightBlobPathParams {
  readonly width: number;
  readonly height: number;
  readonly blobWidth?: number;
  readonly blobHeight?: number;
  readonly borderRadius?: number;
}

/**
 * Generates an SVG path for the organic accent blob/wave at the top-right corner.
 * Symmetrical counterpart (180° rotation) to the bottom-left organic blob.
 */
export function createVerticalCardTopRightBlobPath({
  width,
  height,
  borderRadius = 24,
  blobWidth = Math.round(width * 0.45),
  blobHeight = Math.round(height * 0.24),
}: ICreateVerticalCardTopRightBlobPathParams): string {
  const safeR = Math.max(0, Math.min(borderRadius, width / 2, height / 2));
  const startX = width - blobWidth;
  const endY = blobHeight;

  const cp1X = Math.round(width - blobWidth * 0.46);
  const cp1Y = Math.round(blobHeight * 0.06);
  const cp2X = Math.round(width - blobWidth * 0.08);
  const cp2Y = Math.round(blobHeight * 0.62);

  return [
    `M ${startX} 0`,
    `C ${cp1X} ${cp1Y}, ${cp2X} ${cp2Y}, ${width} ${endY}`,
    `V ${safeR}`,
    `A ${safeR} ${safeR} 0 0 0 ${width - safeR} 0`,
    `H ${startX}`,
    'Z',
  ].join(' ');
}

export interface ICreateVerticalCardBadgePathParams {
  readonly width?: number;
  readonly height?: number;
  readonly tipRadius?: number;
  readonly sideWidth?: number;
  readonly leftRadius?: number;
  readonly cornerRadius?: number;
}

/**
 * Generates an SVG path for the left ribbon step badge pointing to the RIGHT.
 * Features rounded corners on the left edge, smooth transition fillets,
 * and a rounded arrow tip pointing into the card.
 */
export function createVerticalCardBadgePath({
  width = 62,
  height = 48,
  leftRadius = 8,
  tipRadius = 6,
  sideWidth = 42,
  cornerRadius = 6,
}: ICreateVerticalCardBadgePathParams = {}): string {
  const halfH = height / 2;
  const dx = width - sideWidth;
  const dy = halfH;
  const len = Math.hypot(dx, dy);
  const ux = len > 0 ? dx / len : 0;
  const uy = len > 0 ? dy / len : 0;

  return [
    `M ${leftRadius} 0`,
    `H ${(sideWidth - cornerRadius).toFixed(2)}`,
    `Q ${sideWidth} 0 ${(sideWidth + cornerRadius * ux).toFixed(2)} ${(cornerRadius * uy).toFixed(2)}`,
    `L ${(width - tipRadius * ux).toFixed(2)} ${(halfH - tipRadius * uy).toFixed(2)}`,
    `Q ${width} ${halfH} ${(width - tipRadius * ux).toFixed(2)} ${(halfH + tipRadius * uy).toFixed(2)}`,
    `L ${(sideWidth + cornerRadius * ux).toFixed(2)} ${(height - cornerRadius * uy).toFixed(2)}`,
    `Q ${sideWidth} ${height} ${(sideWidth - cornerRadius).toFixed(2)} ${height}`,
    `H ${leftRadius}`,
    `A ${leftRadius} ${leftRadius} 0 0 1 0 ${height - leftRadius}`,
    `V ${leftRadius}`,
    `A ${leftRadius} ${leftRadius} 0 0 1 ${leftRadius} 0`,
    'Z',
  ].join(' ');
}
