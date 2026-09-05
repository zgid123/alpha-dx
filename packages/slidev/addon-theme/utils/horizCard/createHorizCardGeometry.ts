export interface ICreateHorizCardPathParams {
  readonly width: number;
  readonly height: number;
  readonly chamferX?: number;
  readonly chamferY?: number;
  readonly borderRadius?: number;
  readonly chamferFillet?: number;
}

export interface ICreateHorizCardAccentPathParams {
  readonly width: number;
  readonly height: number;
  readonly chamferX?: number;
  readonly chamferY?: number;
  readonly accentEndX?: number;
  readonly accentStartY?: number;
  readonly chamferFillet?: number;
  readonly accentOutsetX?: number;
  readonly accentThickness?: number;
  readonly accentTopFillet?: number;
  readonly accentBottomFillet?: number;
}

export interface ICreateHorizCardBadgePathParams {
  readonly width?: number;
  readonly height?: number;
  readonly topRadius?: number;
  readonly tipRadius?: number;
  readonly sideHeight?: number;
  readonly bottomRadius?: number;
}

export interface IHexToRgbaParams {
  readonly hex: string;
  readonly alpha?: number;
}

/**
 * Generates an SVG path for the main HorizCard body.
 * Features rounded top-left, top-right, and bottom-right corners,
 * and a smooth filleted chamfer at the bottom-left corner matching the design.
 */
export function createHorizCardPath({
  width,
  height,
  chamferX = Math.min(60, Math.round(width * 0.17)),
  chamferY = Math.min(76, Math.round(height * 0.29)),
  borderRadius = 24,
  chamferFillet = 22,
}: ICreateHorizCardPathParams): string {
  const safeR = Math.max(
    0,
    Math.min(borderRadius, width / 2, (height - chamferY) / 2),
  );

  const diagLen = Math.hypot(chamferX, chamferY);
  const ux = diagLen > 0 ? chamferX / diagLen : 0;
  const uy = diagLen > 0 ? chamferY / diagLen : 0;

  const p1Y = height - chamferY - chamferFillet;
  const p2X = chamferFillet * ux;
  const p2Y = height - chamferY + chamferFillet * uy;

  const p3X = chamferX - chamferFillet * ux;
  const p3Y = height - chamferFillet * uy;
  const p4X = chamferX + chamferFillet;

  return [
    `M ${safeR} 0`,
    `H ${width - safeR}`,
    `A ${safeR} ${safeR} 0 0 1 ${width} ${safeR}`,
    `V ${height - safeR}`,
    `A ${safeR} ${safeR} 0 0 1 ${width - safeR} ${height}`,
    `H ${p4X.toFixed(2)}`,
    `Q ${chamferX.toFixed(2)} ${height.toFixed(2)} ${p3X.toFixed(2)} ${p3Y.toFixed(2)}`,
    `L ${p2X.toFixed(2)} ${p2Y.toFixed(2)}`,
    `Q 0 ${(height - chamferY).toFixed(2)} 0 ${p1Y.toFixed(2)}`,
    `V ${safeR}`,
    `A ${safeR} ${safeR} 0 0 1 ${safeR} 0`,
    'Z',
  ].join(' ');
}

/**
 * Generates an SVG path for the organic accent shape at the bottom-left of the card.
 * Curves in parallel along with the white card body, featuring 2 distinct rounded curves
 * (a top fillet and a bottom fillet) flanking the diagonal segment, perfectly mirroring
 * the white card's dual filleted transitions.
 */
export function createHorizCardAccentPath({
  width,
  height,
  chamferX = Math.min(60, Math.round(width * 0.17)),
  chamferY = Math.min(76, Math.round(height * 0.29)),
  accentEndX,
  accentStartY = Math.round(height * 0.28),
  chamferFillet = 22,
  accentOutsetX,
  accentThickness = 16,
  accentTopFillet = 22,
  accentBottomFillet = 22,
}: ICreateHorizCardAccentPathParams): string {
  const diagLen = Math.hypot(chamferX, chamferY);
  const ux = diagLen > 0 ? chamferX / diagLen : 0;
  const uy = diagLen > 0 ? chamferY / diagLen : 0;

  const p1Y = height - chamferY - chamferFillet;
  const p2X = chamferFillet * ux;
  const p2Y = height - chamferY + chamferFillet * uy;

  const p3X = chamferX - chamferFillet * ux;
  const p3Y = height - chamferFillet * uy;
  const p4X = chamferX + chamferFillet;

  // Normal vector pointing outward/down-left
  const nx = -uy;
  const ny = ux;

  // Parallel offset thickness
  const o2X = p2X + accentThickness * nx;
  const o2Y = p2Y + accentThickness * ny;
  const o3X = p3X + accentThickness * nx;
  const o3Y = p3Y + accentThickness * ny;

  // 1. Bottom vertex & curve (matching white bottom fillet)
  const tBottom = (height - o3Y) / uy;
  const vBottomX = o3X + tBottom * ux;
  const vBottomY = height;
  const bStartX = vBottomX - accentBottomFillet * ux;
  const bStartY = vBottomY - accentBottomFillet * uy;
  const bEndX = vBottomX + accentBottomFillet;

  // 2. Top vertex & curve (matching white top fillet)
  const outsetX = accentOutsetX ?? accentThickness;
  const vTopX = -outsetX;
  const tTop = (vTopX - o2X) / ux;
  const vTopY = o2Y + tTop * uy;
  const tStartX = vTopX;
  const tStartY = vTopY - accentTopFillet;
  const tEndX = vTopX + accentTopFillet * ux;
  const tEndY = vTopY + accentTopFillet * uy;

  const startY = accentStartY;
  const endX = accentEndX ?? Math.round(p4X + 4);

  return [
    `M 0 ${startY}`,
    `C -8 ${startY}, ${vTopX} ${startY + 20}, ${tStartX.toFixed(2)} ${tStartY.toFixed(2)}`,
    // Curve 1: Top fillet transitioning vertical edge into diagonal
    `Q ${vTopX.toFixed(2)} ${vTopY.toFixed(2)} ${tEndX.toFixed(2)} ${tEndY.toFixed(2)}`,
    // Straight diagonal running parallel to the white card
    `L ${bStartX.toFixed(2)} ${bStartY.toFixed(2)}`,
    // Curve 2: Bottom fillet transitioning diagonal into horizontal edge
    `Q ${vBottomX.toFixed(2)} ${vBottomY.toFixed(2)} ${bEndX.toFixed(2)} ${height}`,
    `H ${endX}`,
    `L ${p4X.toFixed(2)} ${height}`,
    `Q ${chamferX.toFixed(2)} ${height.toFixed(2)} ${p3X.toFixed(2)} ${p3Y.toFixed(2)}`,
    `L ${p2X.toFixed(2)} ${p2Y.toFixed(2)}`,
    `Q 0 ${(height - chamferY).toFixed(2)} 0 ${p1Y.toFixed(2)}`,
    `L 0 ${startY}`,
    'Z',
  ].join(' ');
}

/**
 * Generates an SVG path for the top ribbon step badge.
 * Features 5 distinct rounded curves matching the design:
 * 1. Top-Left rounded corner
 * 2. Top-Right rounded corner
 * 3. Bottom-Right rounded corner
 * 4. Bottom-Center pointed tip curve
 * 5. Bottom-Left rounded corner
 */
export function createHorizCardBadgePath({
  width = 84,
  height = 58,
  topRadius = 12,
  tipRadius = 8,
  sideHeight = 46,
  bottomRadius = 8,
}: ICreateHorizCardBadgePathParams = {}): string {
  const halfW = width / 2;
  const dx = halfW;
  const dy = height - sideHeight;
  const len = Math.hypot(dx, dy);
  const ux = len > 0 ? dx / len : 0;
  const uy = len > 0 ? dy / len : 0;

  return [
    // 1. Top-Left curve
    `M ${topRadius} 0`,
    // Top horizontal edge
    `H ${width - topRadius}`,
    // 2. Top-Right curve
    `A ${topRadius} ${topRadius} 0 0 1 ${width} ${topRadius}`,
    // Right vertical edge
    `V ${sideHeight - bottomRadius}`,
    // 3. Bottom-Right curve
    `Q ${width} ${sideHeight} ${(width - bottomRadius * ux).toFixed(2)} ${(sideHeight + bottomRadius * uy).toFixed(2)}`,
    // Bottom-right diagonal edge
    `L ${(halfW + tipRadius * ux).toFixed(2)} ${(height - tipRadius * uy).toFixed(2)}`,
    // 4. Bottom-Center tip curve
    `Q ${halfW} ${height} ${(halfW - tipRadius * ux).toFixed(2)} ${(height - tipRadius * uy).toFixed(2)}`,
    // Bottom-left diagonal edge
    `L ${(bottomRadius * ux).toFixed(2)} ${(sideHeight + bottomRadius * uy).toFixed(2)}`,
    // 5. Bottom-Left curve
    `Q 0 ${sideHeight} 0 ${sideHeight - bottomRadius}`,
    // Left vertical edge
    `V ${topRadius}`,
    `A ${topRadius} ${topRadius} 0 0 1 ${topRadius} 0`,
    'Z',
  ].join(' ');
}

/**
 * Converts a hex color string to an RGBA string with the given alpha transparency.
 */
export function hexToRgba({ hex, alpha = 0.15 }: IHexToRgbaParams): string {
  let sanitized = hex.trim().replace(/^#/, '');

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
