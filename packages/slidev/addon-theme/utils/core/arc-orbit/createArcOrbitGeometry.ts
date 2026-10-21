export type TArcOrbitPosition = 'left' | 'right';

export interface IArcOrbitPoint {
  readonly x: number;
  readonly y: number;
}

export interface IArcOrbitNodeGeo {
  readonly index: number;
  readonly center: IArcOrbitPoint;
  readonly radius: number;
}

export interface IArcOrbitCalloutBox {
  readonly index: number;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly badgeOffset: number;
  readonly top: number;
  readonly textGap?: number;
  readonly textWidth?: number;
}

export interface IArcOrbitGeometry {
  readonly viewBoxWidth: number;
  readonly viewBoxHeight: number;
  readonly position: TArcOrbitPosition;
  readonly hubCenter: IArcOrbitPoint;
  readonly hubRadius: number;
  readonly hubPath: string;
  readonly arcPath: string;
  readonly topDot: IArcOrbitPoint;
  readonly bottomDot: IArcOrbitPoint;
  readonly dotRadius: number;
  readonly nodes: readonly IArcOrbitNodeGeo[];
  readonly callouts: readonly IArcOrbitCalloutBox[];
  readonly pointsCount: number;
}

export interface ICreateArcOrbitGeometryOptions {
  readonly viewBoxWidth?: number;
  readonly viewBoxHeight?: number;
  readonly position?: TArcOrbitPosition;
  readonly hubRadius?: number;
  readonly edgeOffset?: number;
  readonly arcRadius?: number;
  readonly arcOffset?: number;
  readonly nodeRadius?: number;
  readonly nodeAngleDeg?: number;
  readonly arcExtentDeg?: number;
  readonly pointsCount?: number;
}

export function createArcOrbitGeometry(
  options: ICreateArcOrbitGeometryOptions = {},
): IArcOrbitGeometry {
  const viewBoxWidth = options.viewBoxWidth ?? 500;
  const viewBoxHeight = options.viewBoxHeight ?? 480;
  const position: TArcOrbitPosition = options.position ?? 'left';
  const hubRadius = options.hubRadius ?? 135;
  const edgeOffset = options.edgeOffset !== undefined ? options.edgeOffset : 30;
  const arcRadius = options.arcRadius ?? 235;
  const arcOffset = options.arcOffset ?? 25;
  const nodeRadius = options.nodeRadius ?? 26;
  const dotRadius = 3.5;
  const pointsCount = options.pointsCount === 4 ? 4 : 3;

  const defaultArcExtent = pointsCount === 4 ? 66 : 58;
  const arcExtentDeg = options.arcExtentDeg ?? defaultArcExtent;
  const extentRad = (arcExtentDeg * Math.PI) / 180;

  const centerY = viewBoxHeight / 2;

  // Base left calculations (origin at x = 0)
  const leftArcCenterX = -arcOffset;
  const leftStartCos = Math.cos(extentRad);
  const leftStartSin = Math.sin(extentRad);
  const leftTopX = Number(
    (leftArcCenterX + arcRadius * leftStartCos).toFixed(2),
  );
  const leftTopY = Number((centerY - arcRadius * leftStartSin).toFixed(2));
  const leftBottomX = leftTopX;
  const leftBottomY = Number((centerY + arcRadius * leftStartSin).toFixed(2));

  // Determine node angles for 3 or 4 points
  const nodeAnglesDeg: readonly number[] =
    pointsCount === 4
      ? [50, 16.5, -16.5, -50]
      : [options.nodeAngleDeg ?? 38, 0, -(options.nodeAngleDeg ?? 38)];

  const defaultTextGap = 28;
  const textWidth = pointsCount === 4 ? 215 : 205;

  const leftNodes: IArcOrbitNodeGeo[] = [];
  const leftCallouts: IArcOrbitCalloutBox[] = [];

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
    const textGap = i === 0 ? (pointsCount === 4 ? 46 : 36) : defaultTextGap;
    const width = Math.round(nodeRadius * 2 + textGap + textWidth);

    leftCallouts.push({
      index: i,
      x: nodeX + 26,
      y: nodeY - 32,
      width,
      badgeOffset,
      top,
      textGap,
      textWidth,
    });
  }

  if (position === 'left') {
    const leftArcPath = `M ${leftTopX} ${leftTopY} A ${arcRadius} ${arcRadius} 0 0 1 ${leftBottomX} ${leftBottomY}`;
    const leftHubCenterX = edgeOffset;
    const leftHubPath =
      edgeOffset > 0
        ? `M ${leftHubCenterX} ${centerY - hubRadius} A ${hubRadius} ${hubRadius} 0 0 1 ${leftHubCenterX} ${centerY + hubRadius} A ${hubRadius} ${hubRadius} 0 0 1 ${leftHubCenterX} ${centerY - hubRadius} Z`
        : `M 0 ${centerY - hubRadius} A ${hubRadius} ${hubRadius} 0 0 1 0 ${centerY + hubRadius} Z`;

    return {
      viewBoxWidth,
      viewBoxHeight,
      position: 'left',
      hubCenter: { x: leftHubCenterX, y: centerY },
      hubRadius,
      hubPath: leftHubPath,
      arcPath: leftArcPath,
      topDot: { x: leftTopX, y: leftTopY },
      bottomDot: { x: leftBottomX, y: leftBottomY },
      dotRadius,
      nodes: leftNodes,
      callouts: leftCallouts,
      pointsCount,
    };
  }

  // Right position: mirrored across viewBoxWidth
  const rightTopX = Number((viewBoxWidth - leftTopX).toFixed(2));
  const rightTopY = leftTopY;
  const rightBottomX = rightTopX;
  const rightBottomY = leftBottomY;

  const rightArcPath = `M ${rightTopX} ${rightTopY} A ${arcRadius} ${arcRadius} 0 0 0 ${rightBottomX} ${rightBottomY}`;
  const rightHubCenterX = viewBoxWidth - edgeOffset;
  const rightHubPath =
    edgeOffset > 0
      ? `M ${rightHubCenterX} ${centerY - hubRadius} A ${hubRadius} ${hubRadius} 0 0 1 ${rightHubCenterX} ${centerY + hubRadius} A ${hubRadius} ${hubRadius} 0 0 1 ${rightHubCenterX} ${centerY - hubRadius} Z`
      : `M ${viewBoxWidth} ${centerY - hubRadius} A ${hubRadius} ${hubRadius} 0 0 0 ${viewBoxWidth} ${centerY + hubRadius} Z`;

  const rightNodes: IArcOrbitNodeGeo[] = [];
  const rightCallouts: IArcOrbitCalloutBox[] = [];

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
      x: rightNodeX - leftCallout.width,
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
    position: 'right',
    hubCenter: {
      x: rightHubCenterX,
      y: centerY,
    },
    hubRadius,
    hubPath: rightHubPath,
    arcPath: rightArcPath,
    topDot: { x: rightTopX, y: rightTopY },
    bottomDot: { x: rightBottomX, y: rightBottomY },
    dotRadius,
    nodes: rightNodes,
    callouts: rightCallouts,
    pointsCount,
  };
}
