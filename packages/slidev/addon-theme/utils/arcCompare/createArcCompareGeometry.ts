export interface IArcComparePoint {
  readonly x: number;
  readonly y: number;
}

export interface IArcCompareNodeGeo {
  readonly index: number;
  readonly center: IArcComparePoint;
  readonly radius: number;
}

export interface IArcCompareCalloutBox {
  readonly index: number;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly badgeOffset: number;
  readonly top: number;
  readonly textGap?: number;
  readonly textWidth?: number;
}

export interface IArcCompareSideGeometry {
  readonly hubPath: string;
  readonly hubCenter: IArcComparePoint;
  readonly hubRadius: number;
  readonly arcPath: string;
  readonly topDot: IArcComparePoint;
  readonly bottomDot: IArcComparePoint;
  readonly dotRadius: number;
  readonly nodes: readonly IArcCompareNodeGeo[];
  readonly callouts: readonly IArcCompareCalloutBox[];
}

export interface IArcCompareGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly centerX: number;
  readonly centerY: number;
  readonly vsCenter: IArcComparePoint;
  readonly vsRadius: number;
  readonly pointsCount: number;
  readonly dividerLine: {
    readonly x: number;
    readonly y1: number;
    readonly y2: number;
  };
  readonly left: IArcCompareSideGeometry;
  readonly right: IArcCompareSideGeometry;
}

export interface ICreateArcCompareGeometryOptions {
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
}

export function createArcCompareGeometry(
  options: ICreateArcCompareGeometryOptions = {},
): IArcCompareGeometry {
  const viewBoxWidth = options.viewBoxWidth ?? 1000;
  const viewBoxHeight = options.viewBoxHeight ?? 480;
  const hubRadius = options.hubRadius ?? 135;
  const arcRadius = options.arcRadius ?? 235;
  const arcOffset = options.arcOffset ?? 25;
  const nodeRadius = options.nodeRadius ?? 26;
  const vsRadius = options.vsRadius ?? 26;
  const dotRadius = 3.5;
  const pointsCount = options.pointsCount === 4 ? 4 : 3;

  const defaultArcExtent = pointsCount === 4 ? 66 : 58;
  const arcExtentDeg = options.arcExtentDeg ?? defaultArcExtent;

  const centerX = viewBoxWidth / 2;
  const centerY = viewBoxHeight / 2;
  const leftArcCenterX = -arcOffset;

  // Angular math for left side:
  const extentRad = (arcExtentDeg * Math.PI) / 180;

  // Left arc start (top) and end (bottom)
  const leftStartCos = Math.cos(extentRad);
  const leftStartSin = Math.sin(extentRad);
  const leftTopX = Number(
    (leftArcCenterX + arcRadius * leftStartCos).toFixed(2),
  );
  const leftTopY = Number((centerY - arcRadius * leftStartSin).toFixed(2));
  const leftBottomX = leftTopX;
  const leftBottomY = Number((centerY + arcRadius * leftStartSin).toFixed(2));

  // Left arc path
  const leftArcPath = `M ${leftTopX} ${leftTopY} A ${arcRadius} ${arcRadius} 0 0 1 ${leftBottomX} ${leftBottomY}`;

  // Left hub path (semicircle centered at 0, centerY)
  const leftHubPath = `M 0 ${centerY - hubRadius} A ${hubRadius} ${hubRadius} 0 0 1 0 ${centerY + hubRadius} Z`;

  // Determine node angles for 3 or 4 points
  const nodeAnglesDeg: readonly number[] =
    pointsCount === 4
      ? [50, 16.5, -16.5, -50]
      : [options.nodeAngleDeg ?? 38, 0, -(options.nodeAngleDeg ?? 38)];

  // Left nodes and callouts
  const leftCalloutGap = 26;
  const leftNodes: IArcCompareNodeGeo[] = [];
  const leftCallouts: IArcCompareCalloutBox[] = [];
  const defaultTextGap = 28;
  const textWidth = pointsCount === 4 ? 215 : 205;

  for (let i = 0; i < pointsCount; i++) {
    const angleDeg = nodeAnglesDeg[i] ?? 0;
    const angleRad = (angleDeg * Math.PI) / 180;
    const nodeX = Number(
      (leftArcCenterX + arcRadius * Math.cos(angleRad)).toFixed(2),
    );
    const nodeY = Number((centerY - arcRadius * Math.sin(angleRad)).toFixed(2));

    leftNodes.push({
      index: i,
      center: {
        x: nodeX,
        y: nodeY,
      },
      radius: nodeRadius,
    });

    const badgeOffset = Math.round(nodeX - nodeRadius);
    const top = Math.round(nodeY - nodeRadius);
    // Only adjust position for 01 (index 0) so its text does not overlay the arc curve.
    // 02, 03, and 04 keep their standard natural gap.
    const textGap = i === 0 ? (pointsCount === 4 ? 46 : 36) : defaultTextGap;
    const width = Math.round(nodeRadius * 2 + textGap + textWidth);

    leftCallouts.push({
      index: i,
      x: nodeX + leftCalloutGap,
      y: nodeY - 32,
      width,
      badgeOffset,
      top,
      textGap,
      textWidth,
    });
  }

  // Right side (symmetrical reflection across centerX)
  const rightTopX = Number((viewBoxWidth - leftTopX).toFixed(2));
  const rightTopY = leftTopY;
  const rightBottomX = rightTopX;
  const rightBottomY = leftBottomY;

  const rightArcPath = `M ${rightTopX} ${rightTopY} A ${arcRadius} ${arcRadius} 0 0 0 ${rightBottomX} ${rightBottomY}`;
  const rightHubPath = `M ${viewBoxWidth} ${centerY - hubRadius} A ${hubRadius} ${hubRadius} 0 0 0 ${viewBoxWidth} ${centerY + hubRadius} Z`;

  const rightNodes: IArcCompareNodeGeo[] = [];
  const rightCallouts: IArcCompareCalloutBox[] = [];

  for (let i = 0; i < pointsCount; i++) {
    const leftNode = leftNodes[i];
    const leftCallout = leftCallouts[i];

    if (!leftNode || !leftCallout) {
      continue;
    }

    const rightNodeX = Number((viewBoxWidth - leftNode.center.x).toFixed(2));
    const rightNodeY = leftNode.center.y;

    rightNodes.push({
      index: i,
      center: {
        x: rightNodeX,
        y: rightNodeY,
      },
      radius: nodeRadius,
    });

    rightCallouts.push({
      index: i,
      x: centerX + 20,
      y: rightNodeY - 32,
      width: leftCallout.width,
      badgeOffset: leftCallout.badgeOffset,
      top: leftCallout.top,
      textGap: leftCallout.textGap,
      textWidth: leftCallout.textWidth,
    });
  }

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
      hubCenter: {
        x: 55,
        y: centerY,
      },
      hubRadius,
      arcPath: leftArcPath,
      topDot: {
        x: leftTopX,
        y: leftTopY,
      },
      bottomDot: {
        x: leftBottomX,
        y: leftBottomY,
      },
      dotRadius,
      nodes: leftNodes,
      callouts: leftCallouts,
    },
    right: {
      hubPath: rightHubPath,
      hubCenter: {
        x: viewBoxWidth - 55,
        y: centerY,
      },
      hubRadius,
      arcPath: rightArcPath,
      topDot: {
        x: rightTopX,
        y: rightTopY,
      },
      bottomDot: {
        x: rightBottomX,
        y: rightBottomY,
      },
      dotRadius,
      nodes: rightNodes,
      callouts: rightCallouts,
    },
  };
}
