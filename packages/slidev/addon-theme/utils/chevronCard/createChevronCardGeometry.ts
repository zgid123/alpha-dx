export interface ICreateChevronPathParams {
  readonly width: number;
  readonly height: number;
  readonly notchDepth?: number;
}

/**
 * Generates an SVG path for the chevron badge.
 * Features an indented notched tail on the left and a protruding arrow tip on the right.
 */
export function createChevronPath({
  width,
  height,
  notchDepth = 26,
}: ICreateChevronPathParams): string {
  const safeNotch = Math.max(0, Math.min(notchDepth, width / 2));
  const halfH = height / 2;

  return `M 0 0 L ${width - safeNotch} 0 L ${width} ${halfH} L ${width - safeNotch} ${height} L 0 ${height} L ${safeNotch} ${halfH} Z`;
}

export interface ICreateChevronCardBodyPathParams {
  readonly width: number;
  readonly height: number;
  readonly notchDepth?: number;
  readonly borderRadius?: number;
}

/**
 * Generates an SVG path for the card body container.
 * Left edge matches the chevron notch so slide background shows through;
 * right edge features smooth rounded corners.
 */
export function createChevronCardBodyPath({
  width,
  height,
  notchDepth = 26,
  borderRadius = 18,
}: ICreateChevronCardBodyPathParams): string {
  const safeNotch = Math.max(0, Math.min(notchDepth, width / 2));
  const safeR = Math.max(
    0,
    Math.min(borderRadius, (width - safeNotch) / 2, height / 2),
  );
  const halfH = height / 2;

  return `M 0 0 L ${width - safeR} 0 A ${safeR} ${safeR} 0 0 1 ${width} ${safeR} L ${width} ${height - safeR} A ${safeR} ${safeR} 0 0 1 ${width - safeR} ${height} L 0 ${height} L ${safeNotch} ${halfH} Z`;
}
