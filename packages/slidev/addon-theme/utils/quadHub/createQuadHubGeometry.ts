export interface IQuadPoint {
  readonly x: number;
  readonly y: number;
}

export interface IQuadBox {
  readonly x: number;
  readonly y: number;
  readonly rx: number;
  readonly width: number;
  readonly height: number;
}

export interface IQuadHubCoordinates {
  readonly centerX: number;
  readonly centerY: number;
  readonly arcPaths: readonly [string, string, string, string];
  readonly arcRadius: number;
  readonly hubRadius: number;
  readonly quadrants: readonly [IQuadBox, IQuadBox, IQuadBox, IQuadBox];
  readonly viewBoxSize: number;
  readonly iconPositions: readonly [
    IQuadPoint,
    IQuadPoint,
    IQuadPoint,
    IQuadPoint,
  ];
  readonly arcBorderWidth: number;
  readonly numberPositions: readonly [
    IQuadPoint,
    IQuadPoint,
    IQuadPoint,
    IQuadPoint,
  ];
}

function createArcPath(
  cx: number,
  cy: number,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number,
): string {
  const startRad = (startAngleDeg * Math.PI) / 180;
  const endRad = (endAngleDeg * Math.PI) / 180;

  const x1 = Number((cx + radius * Math.cos(startRad)).toFixed(2));
  const y1 = Number((cy + radius * Math.sin(startRad)).toFixed(2));
  const x2 = Number((cx + radius * Math.cos(endRad)).toFixed(2));
  const y2 = Number((cy + radius * Math.sin(endRad)).toFixed(2));

  const largeArcFlag = Math.abs(endAngleDeg - startAngleDeg) > 180 ? 1 : 0;

  return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
}

export interface ICalculateQuadHubCoordinatesParams {
  readonly gap?: number;
  readonly width?: number;
  readonly height?: number;
  readonly arcRadius?: number;
  readonly hubRadius?: number;
  readonly arcInsetDeg?: number;
  readonly viewBoxSize?: number;
  readonly cornerRadius?: number;
  readonly iconPaddingX?: number;
  readonly iconPaddingY?: number;
  readonly arcBorderWidth?: number;
}

/**
 * Calculates geometric coordinates for the QuadHub layout.
 * Indices (Clockwise starting Top-Left):
 * 0: Top-Left (01)
 * 1: Top-Right (02)
 * 2: Bottom-Right (03)
 * 3: Bottom-Left (04)
 */
export function calculateQuadHubCoordinates({
  gap = 14,
  width = 136,
  height = 150,
  hubRadius = 58,
  arcRadius = 104,
  arcInsetDeg = 11,
  viewBoxSize = 360,
  cornerRadius = 26,
  iconPaddingX = 30,
  iconPaddingY = 32,
  arcBorderWidth = 5,
}: ICalculateQuadHubCoordinatesParams = {}): IQuadHubCoordinates {
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const halfGap = gap / 2;

  // Quadrants:
  // 0: Top-Left (1)
  const q0: IQuadBox = {
    x: centerX - halfGap - width,
    y: centerY - halfGap - height,
    rx: cornerRadius,
    width,
    height,
  };

  // 1: Top-Right (2)
  const q1: IQuadBox = {
    x: centerX + halfGap,
    y: centerY - halfGap - height,
    rx: cornerRadius,
    width,
    height,
  };

  // 2: Bottom-Right (3)
  const q2: IQuadBox = {
    x: centerX + halfGap,
    y: centerY + halfGap,
    rx: cornerRadius,
    width,
    height,
  };

  // 3: Bottom-Left (4)
  const q3: IQuadBox = {
    x: centerX - halfGap - width,
    y: centerY + halfGap,
    rx: cornerRadius,
    width,
    height,
  };

  // Number positions (centered in the arc ribbon between hubRadius and arcRadius)
  const numberRadius = (hubRadius + arcRadius) / 2;
  const rad = (38 * Math.PI) / 180;
  const offsetX = Number((numberRadius * Math.cos(rad)).toFixed(2));
  const offsetY = Number((numberRadius * Math.sin(rad)).toFixed(2));

  // 0: Top-Left (1)
  const num0: IQuadPoint = {
    x: centerX - offsetX,
    y: centerY - offsetY,
  };
  // 1: Top-Right (2)
  const num1: IQuadPoint = {
    x: centerX + offsetX,
    y: centerY - offsetY,
  };
  // 2: Bottom-Right (3)
  const num2: IQuadPoint = {
    x: centerX + offsetX,
    y: centerY + offsetY,
  };
  // 3: Bottom-Left (4)
  const num3: IQuadPoint = {
    x: centerX - offsetX,
    y: centerY + offsetY,
  };

  // Icon positions (in outer corner of each block)
  // 0: Top-Left (1)
  const icon0: IQuadPoint = {
    x: q0.x + iconPaddingX,
    y: q0.y + iconPaddingY,
  };
  // 1: Top-Right (2)
  const icon1: IQuadPoint = {
    x: q1.x + q1.width - iconPaddingX,
    y: q1.y + iconPaddingY,
  };
  // 2: Bottom-Right (3)
  const icon2: IQuadPoint = {
    x: q2.x + q2.width - iconPaddingX,
    y: q2.y + q2.height - iconPaddingY,
  };
  // 3: Bottom-Left (4)
  const icon3: IQuadPoint = {
    x: q3.x + iconPaddingX,
    y: q3.y + q3.height - iconPaddingY,
  };

  // In SVG, stroke of width W centered on radius R extends [R - W/2, R + W/2].
  // By placing the arc path center at arcRadius + arcBorderWidth / 2, the inner edge
  // of the stroke is exactly arcRadius, touching the pastel circle with zero overlay.
  const arcStrokeRadius = arcRadius + arcBorderWidth / 2;

  // 0: Top-Left (1)
  const p0 = createArcPath(
    centerX,
    centerY,
    arcStrokeRadius,
    -180 + arcInsetDeg,
    -90 - arcInsetDeg,
  );
  // 1: Top-Right (2)
  const p1 = createArcPath(
    centerX,
    centerY,
    arcStrokeRadius,
    -90 + arcInsetDeg,
    0 - arcInsetDeg,
  );
  // 2: Bottom-Right (3)
  const p2 = createArcPath(
    centerX,
    centerY,
    arcStrokeRadius,
    0 + arcInsetDeg,
    90 - arcInsetDeg,
  );
  // 3: Bottom-Left (4)
  const p3 = createArcPath(
    centerX,
    centerY,
    arcStrokeRadius,
    90 + arcInsetDeg,
    180 - arcInsetDeg,
  );

  return {
    centerX,
    centerY,
    arcPaths: [p0, p1, p2, p3],
    arcRadius,
    hubRadius,
    quadrants: [q0, q1, q2, q3],
    viewBoxSize,
    iconPositions: [icon0, icon1, icon2, icon3],
    arcBorderWidth,
    numberPositions: [num0, num1, num2, num3],
  };
}

export interface ILightenColorParams {
  readonly hex: string;
  readonly ratio?: number;
}

/**
 * Automatically lightens a base hex color by mixing it with white.
 * ratio: 0 = original color, 1 = pure white.
 */
export function lightenColor({
  hex,
  ratio = 0.5,
}: ILightenColorParams): string {
  const raw = hex.trim().replace(/^#/, '');
  const sanitized =
    raw.length === 3
      ? raw
          .split('')
          .map((char) => {
            return char + char;
          })
          .join('')
      : raw;

  if (sanitized.length !== 6) {
    return hex;
  }

  const r = Number.parseInt(sanitized.slice(0, 2), 16);
  const g = Number.parseInt(sanitized.slice(2, 4), 16);
  const b = Number.parseInt(sanitized.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return hex;
  }

  const clamp = (val: number): number => {
    return Math.min(255, Math.max(0, Math.round(val)));
  };

  const lr = clamp(r + (255 - r) * ratio);
  const lg = clamp(g + (255 - g) * ratio);
  const lb = clamp(b + (255 - b) * ratio);

  const toHex = (n: number): string => {
    return n.toString(16).padStart(2, '0');
  };

  return `#${toHex(lr)}${toHex(lg)}${toHex(lb)}`;
}

export interface IDarkenColorParams {
  readonly hex: string;
  readonly ratio?: number;
}

/**
 * Automatically darkens a base hex color by mixing it with black.
 * ratio: 0 = original color, 1 = pure black.
 */
export function darkenColor({ hex, ratio = 0.18 }: IDarkenColorParams): string {
  const raw = hex.trim().replace(/^#/, '');
  const sanitized =
    raw.length === 3
      ? raw
          .split('')
          .map((char) => {
            return char + char;
          })
          .join('')
      : raw;

  if (sanitized.length !== 6) {
    return hex;
  }

  const r = Number.parseInt(sanitized.slice(0, 2), 16);
  const g = Number.parseInt(sanitized.slice(2, 4), 16);
  const b = Number.parseInt(sanitized.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return hex;
  }

  const clamp = (val: number): number => {
    return Math.min(255, Math.max(0, Math.round(val)));
  };

  const dr = clamp(r * (1 - ratio));
  const dg = clamp(g * (1 - ratio));
  const db = clamp(b * (1 - ratio));

  const toHex = (n: number): string => {
    return n.toString(16).padStart(2, '0');
  };

  return `#${toHex(dr)}${toHex(dg)}${toHex(db)}`;
}
