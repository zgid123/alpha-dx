export interface IPoint {
  readonly x: number;
  readonly y: number;
}

export interface IArcArrowProcessArrowPathData {
  readonly id: string;
  readonly path: string;
  readonly rotation: number;
  readonly tip: IPoint;
  readonly notch: IPoint;
  readonly center: IPoint;
  readonly gradientStart: IPoint;
  readonly gradientEnd: IPoint;
}

export interface IArcArrowProcessGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly viewBoxMinY: number;
  readonly cx: number;
  readonly cy: number;
  readonly arrows: readonly IArcArrowProcessArrowPathData[];
  readonly count: number;
}

export const DEFAULT_ARC_ARROW_PATH = [
  'M -64.99 416.33',
  'L -92.91 387',
  'A 398 398 0 0 0 92.91 387',
  'L 82.88 370.9',
  'L 152.5 395.32',
  'L 101.55 448.69',
  'L 103.18 429.79',
  'A 442 442 0 0 1 -103.18 429.79',
  'Z',
].join(' ');

export const LONGER_MIDDLE_ARC_ARROW_PATH = [
  'M -86.69 412.36',
  'L -113.04 381.61',
  'A 398 398 0 0 0 113.04 381.61',
  'L 102.17 366.06',
  'L 172.98 386.8',
  'L 124.89 442.76',
  'L 125.53 423.8',
  'A 442 442 0 0 1 -125.53 423.8',
  'Z',
].join(' ');

export function createArcArrowProcessGeometry(
  count = 4,
  rotationOffset?: number,
): IArcArrowProcessGeometry {
  const viewBoxWidth = 1000;
  const viewBoxHeight = 370;
  const viewBoxMinY = -30;
  const cx = 500;
  const cy = -220;
  const step = 39;
  const defaultOffset = count === 3 ? 5 : 0;
  const offset = rotationOffset ?? defaultOffset;

  const arrows: IArcArrowProcessArrowPathData[] = [];

  for (let i = 0; i < count; i++) {
    let rotation: number;
    let path = DEFAULT_ARC_ARROW_PATH;
    let tipOffset = 0;
    let notchOffset = 0;

    if (count === 3) {
      const actualStep = 42; // step (39) + extra span (3) for equal visual width

      if (i === 0) {
        rotation = Number((actualStep + offset).toFixed(2));
      } else if (i === 1) {
        rotation = Number(offset.toFixed(2));
        path = LONGER_MIDDLE_ARC_ARROW_PATH;
        tipOffset = -3;
        notchOffset = 3;
      } else {
        rotation = Number((-actualStep + offset).toFixed(2));
      }
    } else {
      rotation = Number(
        ((count - 1) * (step / 2) - i * step + offset).toFixed(2),
      );
    }

    const thetaTip = ((68.91 + tipOffset + rotation) * Math.PI) / 180;
    const thetaNotch = ((98.87 + notchOffset + rotation) * Math.PI) / 180;
    const thetaCenter = ((83.89 + rotation) * Math.PI) / 180;

    const tip: IPoint = {
      x: Number((cx + 424 * Math.cos(thetaTip)).toFixed(2)),
      y: Number((cy + 424 * Math.sin(thetaTip)).toFixed(2)),
    };

    const notch: IPoint = {
      x: Number((cx + 421 * Math.cos(thetaNotch)).toFixed(2)),
      y: Number((cy + 421 * Math.sin(thetaNotch)).toFixed(2)),
    };

    const center: IPoint = {
      x: Number((cx + 420 * Math.cos(thetaCenter)).toFixed(2)),
      y: Number((cy + 420 * Math.sin(thetaCenter)).toFixed(2)),
    };

    arrows.push({
      id: `arrow-${count}-${i}`,
      path,
      rotation,
      tip,
      notch,
      center,
      gradientStart: {
        x: notch.x,
        y: notch.y,
      },
      gradientEnd: {
        x: tip.x,
        y: tip.y,
      },
    });
  }

  return {
    viewBoxWidth,
    viewBoxHeight,
    viewBoxMinY,
    cx,
    cy,
    arrows,
    count,
  };
}
