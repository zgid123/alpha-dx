export interface ICreateVertCardPathParams {
  readonly width: number;
  readonly height: number;
  readonly borderRadius?: number;
}

/**
 * Generates an SVG path for the main VertCard body.
 * Features rounded corners on all four sides.
 */
export function createVertCardPath({
  width,
  height,
  borderRadius = 24,
}: ICreateVertCardPathParams): string {
  const safeR = Math.max(0, Math.min(borderRadius, width / 2, height / 2));

  return [
    `M ${safeR} 0`,
    `H ${width - safeR}`,
    `A ${safeR} ${safeR} 0 0 1 ${width} ${safeR}`,
    `V ${height - safeR}`,
    `A ${safeR} ${safeR} 0 0 1 ${width - safeR} ${height}`,
    `H ${safeR}`,
    `A ${safeR} ${safeR} 0 0 1 0 ${height - safeR}`,
    `V ${safeR}`,
    `A ${safeR} ${safeR} 0 0 1 ${safeR} 0`,
    'Z',
  ].join(' ');
}

export interface ICreateVertCardBottomBlobPathParams {
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
export function createVertCardBottomBlobPath({
  width,
  height,
  borderRadius = 24,
  blobWidth = Math.round(width * 0.45),
  blobHeight = Math.round(height * 0.24),
}: ICreateVertCardBottomBlobPathParams): string {
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

export interface ICreateVertCardTopRightBlobPathParams {
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
export function createVertCardTopRightBlobPath({
  width,
  height,
  borderRadius = 24,
  blobWidth = Math.round(width * 0.45),
  blobHeight = Math.round(height * 0.24),
}: ICreateVertCardTopRightBlobPathParams): string {
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

export interface ICreateVertCardTopRightOuterStripePathParams {
  readonly width: number;
  readonly outerOffset?: number;
}

/**
 * Generates an SVG path for the top-right diagonal outer accent band.
 */
export function createVertCardTopRightOuterStripePath({
  width,
  outerOffset = 72,
}: ICreateVertCardTopRightOuterStripePathParams): string {
  return [
    `M ${width - outerOffset} 0`,
    `L ${width} ${outerOffset}`,
    `L ${width} 0`,
    'Z',
  ].join(' ');
}

export interface ICreateVertCardTopRightInnerStripePathParams {
  readonly width: number;
  readonly outerOffset?: number;
  readonly stripeWidth?: number;
}

/**
 * Generates an SVG path for the top-right diagonal inner accent band.
 */
export function createVertCardTopRightInnerStripePath({
  width,
  outerOffset = 72,
  stripeWidth = 24,
}: ICreateVertCardTopRightInnerStripePathParams): string {
  const innerOffset = outerOffset + stripeWidth;

  return [
    `M ${width - innerOffset} 0`,
    `L ${width} ${innerOffset}`,
    `L ${width} ${outerOffset}`,
    `L ${width - outerOffset} 0`,
    'Z',
  ].join(' ');
}

export interface ICreateVertCardBadgePathParams {
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
export function createVertCardBadgePath({
  width = 62,
  height = 48,
  leftRadius = 8,
  tipRadius = 6,
  sideWidth = 42,
  cornerRadius = 6,
}: ICreateVertCardBadgePathParams = {}): string {
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

export interface IHexToRgbaParams {
  readonly hex: string;
  readonly alpha?: number;
}

/**
 * Converts a hex color string to an RGBA string with the given alpha transparency.
 */
export function hexToRgba({ hex, alpha = 0.16 }: IHexToRgbaParams): string {
  const trimmed = hex.trim();

  if (
    trimmed.startsWith('var(') ||
    trimmed.startsWith('rgb') ||
    trimmed.startsWith('hsl')
  ) {
    return `color-mix(in srgb, ${trimmed} ${Math.round(alpha * 100)}%, transparent)`;
  }

  let sanitized = trimmed.replace(/^#/, '');

  if (sanitized.length === 3) {
    sanitized = sanitized
      .split('')
      .map((char) => {
        return char + char;
      })
      .join('');
  }

  if (sanitized.length !== 6) {
    return hex;
  }

  const r = Number.parseInt(sanitized.slice(0, 2), 16);
  const g = Number.parseInt(sanitized.slice(2, 4), 16);
  const b = Number.parseInt(sanitized.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return hex;
  }

  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
