import { createArcOrbitGeometry } from '../arcOrbit';

export interface IArcComparisonPoint {
  readonly x: number;
  readonly y: number;
}

export interface IArcComparisonNodeGeo {
  readonly index: number;
  readonly center: IArcComparisonPoint;
  readonly radius: number;
}

export interface IArcComparisonCalloutBox {
  readonly index: number;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly badgeOffset: number;
  readonly top: number;
  readonly textGap?: number;
  readonly textWidth?: number;
}

export interface IArcComparisonSideGeometry {
  readonly hubPath: string;
  readonly otherHubPath?: string;
  readonly hubCenter: IArcComparisonPoint;
  readonly hubRadius: number;
  readonly arcPath: string;
  readonly topDot: IArcComparisonPoint;
  readonly bottomDot: IArcComparisonPoint;
  readonly dotRadius: number;
  readonly nodes: readonly IArcComparisonNodeGeo[];
  readonly callouts: readonly IArcComparisonCalloutBox[];
}

export interface IArcComparisonGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly centerX: number;
  readonly centerY: number;
  readonly vsCenter: IArcComparisonPoint;
  readonly vsRadius: number;
  readonly pointsCount: number;
  readonly dividerLine: {
    readonly x: number;
    readonly y1: number;
    readonly y2: number;
  };
  readonly left: IArcComparisonSideGeometry;
  readonly right: IArcComparisonSideGeometry;
}

export interface ICreateArcComparisonGeometryOptions {
  readonly viewBoxWidth?: number;
  readonly viewBoxHeight?: number;
  readonly hubRadius?: number;
  readonly arcRadius?: number;
  readonly arcOffset?: number;
  readonly nodeRadius?: number;
  readonly nodeAngleDeg?: number;
  readonly arcExtentDeg?: number;
  readonly vsRadius?: number;
  readonly pointsCount?: number;
  readonly isLayout?: boolean;
}

export function createArcComparisonGeometry(
  options: ICreateArcComparisonGeometryOptions = {},
): IArcComparisonGeometry {
  const viewBoxWidth = options.viewBoxWidth ?? 1000;
  const viewBoxHeight = options.viewBoxHeight ?? 480;
  const hubRadius = options.hubRadius ?? 135;
  const arcRadius = options.arcRadius ?? 235;
  const arcOffset = options.arcOffset ?? 25;
  const nodeRadius = options.nodeRadius ?? 26;
  const vsRadius = options.vsRadius ?? 26;
  const dotRadius = 3.5;
  const pointsCount = options.pointsCount === 4 ? 4 : 3;
  const isLayout = options.isLayout ?? false;

  const centerX = viewBoxWidth / 2;
  const centerY = viewBoxHeight / 2;

  const leftOrbit = createArcOrbitGeometry({
    viewBoxWidth,
    viewBoxHeight,
    position: 'left',
    hubRadius,
    arcRadius,
    arcOffset,
    nodeRadius,
    nodeAngleDeg: options.nodeAngleDeg,
    arcExtentDeg: options.arcExtentDeg,
    pointsCount,
  });

  const rightOrbit = createArcOrbitGeometry({
    viewBoxWidth,
    viewBoxHeight,
    position: 'right',
    hubRadius,
    arcRadius,
    arcOffset,
    nodeRadius,
    nodeAngleDeg: options.nodeAngleDeg,
    arcExtentDeg: options.arcExtentDeg,
    pointsCount,
  });

  const leftHubPath = isLayout
    ? `M ${centerX} ${centerY - hubRadius} A ${hubRadius} ${hubRadius} 0 0 0 ${centerX} ${centerY + hubRadius} Z`
    : leftOrbit.hubPath;

  const leftOtherHubPath = isLayout
    ? `M ${centerX} ${centerY - hubRadius} A ${hubRadius} ${hubRadius} 0 0 1 ${centerX} ${centerY + hubRadius} Z`
    : undefined;

  const rightHubPath = isLayout
    ? `M ${centerX} ${centerY - hubRadius} A ${hubRadius} ${hubRadius} 0 0 1 ${centerX} ${centerY + hubRadius} Z`
    : rightOrbit.hubPath;

  const rightOtherHubPath = isLayout
    ? `M ${centerX} ${centerY - hubRadius} A ${hubRadius} ${hubRadius} 0 0 0 ${centerX} ${centerY + hubRadius} Z`
    : undefined;

  return {
    viewBoxWidth,
    viewBoxHeight,
    centerX,
    centerY,
    vsCenter: {
      x: centerX,
      y: centerY,
    },
    vsRadius,
    pointsCount,
    dividerLine: {
      x: centerX,
      y1: 20,
      y2: viewBoxHeight - 20,
    },
    left: {
      hubPath: leftHubPath,
      otherHubPath: leftOtherHubPath,
      hubCenter: {
        x: isLayout ? centerX - 55 : 55,
        y: centerY,
      },
      hubRadius,
      arcPath: leftOrbit.arcPath,
      topDot: leftOrbit.topDot,
      bottomDot: leftOrbit.bottomDot,
      dotRadius,
      nodes: leftOrbit.nodes,
      callouts: leftOrbit.callouts,
    },
    right: {
      hubPath: rightHubPath,
      otherHubPath: rightOtherHubPath,
      hubCenter: {
        x: isLayout ? centerX + 55 : viewBoxWidth - 55,
        y: centerY,
      },
      hubRadius,
      arcPath: rightOrbit.arcPath,
      topDot: rightOrbit.topDot,
      bottomDot: rightOrbit.bottomDot,
      dotRadius,
      nodes: rightOrbit.nodes,
      callouts: rightOrbit.callouts,
    },
  };
}
