export interface IGearTriadPoint {
  readonly x: number;
  readonly y: number;
}

export interface IGearTriadPetalGeometry {
  readonly facePath: string;
  readonly valleyPath: string;
  readonly leftFoldPath: string;
  readonly rightFoldPath: string;
  readonly iconPosition: IGearTriadPoint;
}

export interface IGearTriadSectorGeometry extends IGearTriadPetalGeometry {}

export interface IGearTriadGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly centerX: number;
  readonly centerY: number;
  readonly hubRadius: number;
  readonly baseGearPath: string;
  readonly valleyPath: string;
  /**
   * One canonical petal geometry (facing South, 270 deg).
   * Reused for all 3 sectors via 0 deg (Pink), 120 deg (Cyan), and 240 deg (Orange).
   */
  readonly petal: IGearTriadPetalGeometry;
  readonly cyanSector: IGearTriadSectorGeometry;
  readonly orangeSector: IGearTriadSectorGeometry;
  readonly pinkSector: IGearTriadSectorGeometry;
}

/**
 * Polar to Cartesian conversion in SVG screen space:
 * - 0 deg = East (3 o'clock)
 * - 90 deg = North (12 o'clock, straight UP)
 * - 180 deg = West (9 o'clock)
 * - 270 deg = South (6 o'clock, straight DOWN)
 */
function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number,
): IGearTriadPoint {
  const radians = (angleInDegrees * Math.PI) / 180;

  return {
    x: Number((cx + radius * Math.cos(radians)).toFixed(2)),
    y: Number((cy - radius * Math.sin(radians)).toFixed(2)),
  };
}

function rotatePoint(
  p: IGearTriadPoint,
  cx: number,
  cy: number,
  degrees: number,
): IGearTriadPoint {
  const rad = (degrees * Math.PI) / 180;
  const dx = p.x - cx;
  const dy = p.y - cy;

  return {
    x: Number((dx * Math.cos(rad) - dy * Math.sin(rad) + cx).toFixed(2)),
    y: Number((dx * Math.sin(rad) + dy * Math.cos(rad) + cy).toFixed(2)),
  };
}

export function createGearTriadGeometry(): IGearTriadGeometry {
  const viewBoxWidth = 540;
  const viewBoxHeight = 480;
  const centerX = 270;
  const centerY = 220;
  const rOut = 180;
  const rNotch = 128;
  const hubRadius = 54;

  // Base 6-tooth gear with rounded valleys (6 teeth at 0, 60, 120, 180, 240, 300 deg)
  const toothCenters = [0, 60, 120, 180, 240, 300];
  let baseGearPath = '';
  for (let i = 0; i < toothCenters.length; i++) {
    const th = toothCenters[i] ?? 0;
    const p1 = polarToCartesian(centerX, centerY, rOut, th - 10);
    const p2 = polarToCartesian(centerX, centerY, rOut, th + 10);
    const p3 = polarToCartesian(centerX, centerY, rNotch, th + 20);
    const p4 = polarToCartesian(centerX, centerY, rNotch, th + 40);
    if (i === 0) {
      baseGearPath += `M ${p1.x} ${p1.y}`;
    } else {
      baseGearPath += ` L ${p1.x} ${p1.y}`;
    }
    baseGearPath += ` L ${p2.x} ${p2.y} L ${p3.x} ${p3.y} A ${rNotch} ${rNotch} 0 0 0 ${p4.x} ${p4.y}`;
  }
  baseGearPath += ' Z';

  // ONE CANONICAL PETAL SHAPE (pointing South / 270 deg):
  // Reused across all 3 sectors via 0 deg (Pink), 120 deg (Cyan), and 240 deg (Orange)
  const p0 = polarToCartesian(centerX, centerY, hubRadius, 230);
  const p1 = polarToCartesian(centerX, centerY, rOut, 230);
  const p2 = polarToCartesian(centerX, centerY, rOut, 250);
  const p3a = polarToCartesian(centerX, centerY, rNotch, 260);
  const p3b = polarToCartesian(centerX, centerY, rNotch, 280);
  const p4 = polarToCartesian(centerX, centerY, rOut, 290);
  const p5 = polarToCartesian(centerX, centerY, rOut, 310);
  const p6 = polarToCartesian(centerX, centerY, hubRadius, 310);

  const petalFacePath = [
    `M ${p0.x} ${p0.y}`,
    `L ${p1.x} ${p1.y}`,
    `L ${p2.x} ${p2.y}`,
    `L ${p3a.x} ${p3a.y}`,
    `A ${rNotch} ${rNotch} 0 0 0 ${p3b.x} ${p3b.y}`,
    `L ${p4.x} ${p4.y}`,
    `L ${p5.x} ${p5.y}`,
    `L ${p6.x} ${p6.y}`,
    `A ${hubRadius} ${hubRadius} 0 0 1 ${p0.x} ${p0.y}`,
    'Z',
  ].join(' ');

  // The unified canonical shape between the colored petals (centered at 210 deg):
  // Reused across all 3 inter-sector positions via 0 deg, 120 deg, and 240 deg rotations.
  const pvFlankPink = polarToCartesian(centerX, centerY, rOut, 230);
  const pvNotchPink = polarToCartesian(centerX, centerY, rNotch, 220);
  const pvNotchCyan = polarToCartesian(centerX, centerY, rNotch, 200);
  const pvFlankCyan = polarToCartesian(centerX, centerY, rOut, 190);
  const pvHubCyan = polarToCartesian(centerX, centerY, hubRadius, 190);
  const pvHubPink = polarToCartesian(centerX, centerY, hubRadius, 230);

  const valleyPath = [
    `M ${pvFlankPink.x} ${pvFlankPink.y}`,
    `L ${pvNotchPink.x} ${pvNotchPink.y}`,
    `A ${rNotch} ${rNotch} 0 0 1 ${pvNotchCyan.x} ${pvNotchCyan.y}`,
    `L ${pvFlankCyan.x} ${pvFlankCyan.y}`,
    `L ${pvHubCyan.x} ${pvHubCyan.y}`,
    `A ${hubRadius} ${hubRadius} 0 0 0 ${pvHubPink.x} ${pvHubPink.y}`,
    'Z',
  ].join(' ');

  // Legacy fold paths maintained for backwards compatibility
  const pValley220 = polarToCartesian(centerX, centerY, rNotch, 220);
  const pValley210 = polarToCartesian(centerX, centerY, rNotch, 210);
  const pHub210 = polarToCartesian(centerX, centerY, hubRadius, 210);

  const leftFoldPath = [
    `M ${p1.x} ${p1.y}`,
    `L ${pValley220.x} ${pValley220.y}`,
    `A ${rNotch} ${rNotch} 0 0 0 ${pValley210.x} ${pValley210.y}`,
    `L ${pHub210.x} ${pHub210.y}`,
    `A ${hubRadius} ${hubRadius} 0 0 1 ${p0.x} ${p0.y}`,
    'Z',
  ].join(' ');

  const pValley320 = polarToCartesian(centerX, centerY, rNotch, 320);
  const pValley330 = polarToCartesian(centerX, centerY, rNotch, 330);
  const pHub330 = polarToCartesian(centerX, centerY, hubRadius, 330);

  const rightFoldPath = [
    `M ${p5.x} ${p5.y}`,
    `L ${pValley320.x} ${pValley320.y}`,
    `A ${rNotch} ${rNotch} 0 0 1 ${pValley330.x} ${pValley330.y}`,
    `L ${pHub330.x} ${pHub330.y}`,
    `A ${hubRadius} ${hubRadius} 0 0 0 ${p6.x} ${p6.y}`,
    'Z',
  ].join(' ');

  const canonicalIconPos = polarToCartesian(centerX, centerY, 105, 270);

  const canonicalPetal: IGearTriadPetalGeometry = {
    facePath: petalFacePath,
    valleyPath,
    leftFoldPath,
    rightFoldPath,
    iconPosition: canonicalIconPos,
  };

  // The 3 sectors reuse the canonical petal rotated by 120 deg intervals:
  // - Pink (Option 3, Bottom): rotation 0 deg
  // - Cyan (Option 1, Top-Left): rotation 120 deg
  // - Orange (Option 2, Top-Right): rotation 240 deg
  const pinkSector: IGearTriadSectorGeometry = {
    ...canonicalPetal,
    iconPosition: canonicalIconPos,
  };

  const cyanSector: IGearTriadSectorGeometry = {
    ...canonicalPetal,
    iconPosition: rotatePoint(canonicalIconPos, centerX, centerY, 120),
  };

  const orangeSector: IGearTriadSectorGeometry = {
    ...canonicalPetal,
    iconPosition: rotatePoint(canonicalIconPos, centerX, centerY, 240),
  };

  return {
    viewBoxWidth,
    viewBoxHeight,
    centerX,
    centerY,
    hubRadius,
    baseGearPath,
    valleyPath,
    petal: canonicalPetal,
    cyanSector,
    orangeSector,
    pinkSector,
  };
}
