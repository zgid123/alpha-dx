export interface IRectOrbitPoint {
  readonly x: number;
  readonly y: number;
}

export interface IRectOrbitBox {
  readonly x: number;
  readonly y: number;
  readonly rx: number;
  readonly width: number;
  readonly height: number;
}

export interface IRectangleOrbitTetradCoordinates {
  readonly centerX: number;
  readonly centerY: number;
  readonly arcPaths: readonly [string, string, string, string];
  readonly arcRadius: number;
  readonly hubRadius: number;
  readonly quadrants: readonly [
    IRectOrbitBox,
    IRectOrbitBox,
    IRectOrbitBox,
    IRectOrbitBox,
  ];
  readonly viewBoxSize: number;
  readonly iconPositions: readonly [
    IRectOrbitPoint,
    IRectOrbitPoint,
    IRectOrbitPoint,
    IRectOrbitPoint,
  ];
  readonly arcBorderWidth: number;
  readonly numberPositions: readonly [
    IRectOrbitPoint,
    IRectOrbitPoint,
    IRectOrbitPoint,
    IRectOrbitPoint,
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

export interface ICalculateRectangleOrbitTetradCoordinatesParams {
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
 * Calculates geometric coordinates for the RectangleOrbitTetrad layout.
 * Indices (Clockwise starting Top-Left):
 * 0: Top-Left (01)
 * 1: Top-Right (02)
 * 2: Bottom-Right (03)
 * 3: Bottom-Left (04)
 */
export function calculateRectangleOrbitTetradCoordinates({
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
}: ICalculateRectangleOrbitTetradCoordinatesParams = {}): IRectangleOrbitTetradCoordinates {
  const centerX = viewBoxSize / 2;
  const centerY = viewBoxSize / 2;
  const halfGap = gap / 2;

  // Quadrants:
  // 0: Top-Left (1)
  const q0: IRectOrbitBox = {
    x: centerX - halfGap - width,
    y: centerY - halfGap - height,
    rx: cornerRadius,
    width,
    height,
  };

  // 1: Top-Right (2)
  const q1: IRectOrbitBox = {
    x: centerX + halfGap,
    y: centerY - halfGap - height,
    rx: cornerRadius,
    width,
    height,
  };

  // 2: Bottom-Right (3)
  const q2: IRectOrbitBox = {
    x: centerX + halfGap,
    y: centerY + halfGap,
    rx: cornerRadius,
    width,
    height,
  };

  // 3: Bottom-Left (4)
  const q3: IRectOrbitBox = {
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
  const num0: IRectOrbitPoint = {
    x: centerX - offsetX,
    y: centerY - offsetY,
  };
  // 1: Top-Right (2)
  const num1: IRectOrbitPoint = {
    x: centerX + offsetX,
    y: centerY - offsetY,
  };
  // 2: Bottom-Right (3)
  const num2: IRectOrbitPoint = {
    x: centerX + offsetX,
    y: centerY + offsetY,
  };
  // 3: Bottom-Left (4)
  const num3: IRectOrbitPoint = {
    x: centerX - offsetX,
    y: centerY + offsetY,
  };

  // Icon positions (in outer corner of each block)
  // 0: Top-Left (1)
  const icon0: IRectOrbitPoint = {
    x: q0.x + iconPaddingX,
    y: q0.y + iconPaddingY,
  };
  // 1: Top-Right (2)
  const icon1: IRectOrbitPoint = {
    x: q1.x + q1.width - iconPaddingX,
    y: q1.y + iconPaddingY,
  };
  // 2: Bottom-Right (3)
  const icon2: IRectOrbitPoint = {
    x: q2.x + q2.width - iconPaddingX,
    y: q2.y + q2.height - iconPaddingY,
  };
  // 3: Bottom-Left (4)
  const icon3: IRectOrbitPoint = {
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
