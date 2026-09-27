import type {
  IArcDiDDecorativeArc,
  IArcDiDGeometry,
  IArcDiDLayerGeometry,
  IArcDiDLayerItem,
  IArcDiDPartGeometry,
  IArcDiDPartItem,
  IArcDiDPoint,
  IArcDiDSectorGeometry,
  IArcDiDSectorItem,
  ICreateArcDiDOptions,
  TArcDiDOrder,
} from './types';

export function round(val: number, decimals = 2): number {
  const factor = 10 ** decimals;
  return Math.round(val * factor) / factor;
}

export function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleInDegrees: number,
): IArcDiDPoint {
  const angleInRadians = (angleInDegrees * Math.PI) / 180;
  return {
    x: round(cx + radius * Math.cos(angleInRadians)),
    y: round(cy - radius * Math.sin(angleInRadians)),
  };
}

export function describeArc(
  cx: number,
  cy: number,
  radius: number,
  startAngleDeg: number,
  endAngleDeg: number,
): string {
  const start = polarToCartesian(cx, cy, radius, startAngleDeg);
  const end = polarToCartesian(cx, cy, radius, endAngleDeg);
  const angleDiff = Math.abs(endAngleDeg - startAngleDeg);
  const largeArcFlag = angleDiff > 180 ? 1 : 0;
  const sweepFlag = startAngleDeg > endAngleDeg ? 1 : 0;

  return `M ${start.x} ${start.y} A ${round(radius)} ${round(radius)} 0 ${largeArcFlag} ${sweepFlag} ${end.x} ${end.y}`;
}

export function describeArcBand(
  cx: number,
  cy: number,
  rIn: number,
  rOut: number,
  startAngleDeg = 180,
  endAngleDeg = 0,
): string {
  const outerStart = polarToCartesian(cx, cy, rOut, startAngleDeg);
  const outerEnd = polarToCartesian(cx, cy, rOut, endAngleDeg);
  const innerStart = polarToCartesian(cx, cy, rIn, endAngleDeg);
  const innerEnd = polarToCartesian(cx, cy, rIn, startAngleDeg);

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${round(rOut)} ${round(rOut)} 0 0 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerStart.x} ${innerStart.y}`,
    `A ${round(rIn)} ${round(rIn)} 0 0 0 ${innerEnd.x} ${innerEnd.y}`,
    'Z',
  ].join(' ');
}

export interface IArcDiDSectorInfo {
  readonly startAngle: number;
  readonly endAngle: number;
  readonly midAngle: number;
}

export interface IArcDiDTitleAngles {
  readonly halfSpan: number;
  readonly titleLeft: number;
  readonly titleRight: number;
}

export function calculateTitleAngles(titleAngleSpan = 40): IArcDiDTitleAngles {
  const halfSpan = round(titleAngleSpan / 2, 2);
  const titleLeft = round(90 + halfSpan, 1);
  const titleRight = round(90 - halfSpan, 1);
  return { halfSpan, titleLeft, titleRight };
}

function resolveSpansDistribution(
  count: number,
  totalSpan: number,
  inputSpans?: readonly (number | undefined)[],
): number[] {
  if (count <= 0) return [];
  if (
    !inputSpans ||
    inputSpans.length === 0 ||
    inputSpans.every((s) => s === undefined)
  ) {
    return Array.from({ length: count }, () => totalSpan / count);
  }

  let specifiedSum = 0;
  let unspecifiedCount = 0;

  for (let i = 0; i < count; i++) {
    const s = inputSpans[i];
    if (s !== undefined && s > 0) {
      specifiedSum += s;
    } else {
      unspecifiedCount++;
    }
  }

  if (unspecifiedCount > 0) {
    const remaining = Math.max(0, totalSpan - specifiedSum);
    const perUnspecified = remaining / unspecifiedCount;
    return Array.from({ length: count }, (_, i) => {
      const s = inputSpans[i];
      return s !== undefined && s > 0 ? s : perUnspecified;
    });
  }

  // All sectors have explicit spans: keep head sectors exact and absorb remainder into last sector
  if (count > 1) {
    const headSpans = inputSpans.slice(0, count - 1).map((s) => s ?? 0);
    const headSum = headSpans.reduce((a, b) => a + b, 0);
    const lastSpan = Math.max(0, totalSpan - headSum);
    return [...headSpans, round(lastSpan, 2)];
  }

  return [totalSpan];
}

export function calculatePartSectors(
  partCount: number,
  titleAngleSpan = 40,
  sectorSpans?: readonly (number | undefined)[],
): IArcDiDSectorInfo[] {
  if (partCount <= 0) {
    return [];
  }

  const { titleLeft, titleRight } = calculateTitleAngles(titleAngleSpan);

  if (partCount === 1) {
    return [
      {
        startAngle: 180,
        endAngle: titleLeft,
        midAngle: round((180 + titleLeft) / 2, 1),
      },
    ];
  }

  const leftCount = Math.ceil(partCount / 2);
  const rightCount = partCount - leftCount;

  const leftSpansInput = sectorSpans?.slice(0, leftCount);
  const rightSpansInput = sectorSpans?.slice(leftCount);

  const totalLeftSpan = 180 - titleLeft;
  const leftAllocatedSpans = resolveSpansDistribution(
    leftCount,
    totalLeftSpan,
    leftSpansInput,
  );

  const totalRightSpan = titleRight;
  const rightAllocatedSpans = resolveSpansDistribution(
    rightCount,
    totalRightSpan,
    rightSpansInput,
  );

  const sectors: IArcDiDSectorInfo[] = [];

  // Left sectors: 180 down to titleLeft
  let currentLeft = 180;
  for (let i = 0; i < leftCount; i++) {
    const span = leftAllocatedSpans[i] ?? totalLeftSpan / leftCount;
    const start = currentLeft;
    const end = i === leftCount - 1 ? titleLeft : round(currentLeft - span, 1);
    currentLeft = end;
    sectors.push({
      startAngle: round(start, 1),
      endAngle: round(end, 1),
      midAngle: round((start + end) / 2, 1),
    });
  }

  // Right sectors: titleRight down to 0
  let currentRight = titleRight;
  for (let j = 0; j < rightCount; j++) {
    const span = rightAllocatedSpans[j] ?? totalRightSpan / rightCount;
    const start = currentRight;
    const end = j === rightCount - 1 ? 0 : round(currentRight - span, 1);
    currentRight = end;
    sectors.push({
      startAngle: round(start, 1),
      endAngle: round(end, 1),
      midAngle: round((start + end) / 2, 1),
    });
  }

  return sectors;
}

export function calculatePartAngles(
  partCount: number,
  titleAngleSpan = 40,
): number[] {
  return calculatePartSectors(partCount, titleAngleSpan).map((s) => s.midAngle);
}

export function resolveLayerTitleSpan(
  midRadius: number,
  layerTitleAngleSpan?: number,
  globalTitleAngleSpan?: number,
  titleWidth = 115,
): number {
  if (layerTitleAngleSpan !== undefined) {
    return Math.max(10, Math.min(80, layerTitleAngleSpan));
  }
  if (globalTitleAngleSpan !== undefined) {
    return Math.max(10, Math.min(80, globalTitleAngleSpan));
  }
  const computedAngle = (titleWidth / Math.max(1, midRadius)) * (180 / Math.PI);
  return Math.max(18, Math.min(50, round(computedAngle, 1)));
}

export function createDecorativeArcs(
  _cx?: number,
  _cy?: number,
  _outerRadius?: number,
  _innerRadius?: number,
): readonly IArcDiDDecorativeArc[] {
  return [];
}

export function createArcDiDGeometry(
  options: ICreateArcDiDOptions = {},
): IArcDiDGeometry {
  const viewBoxWidth = options.viewBoxWidth ?? 900;
  const viewBoxHeight = options.viewBoxHeight ?? 460;
  const cx = options.cx ?? round(viewBoxWidth / 2);
  const cy = options.cy ?? round(viewBoxHeight - 6);

  const innerRadius = Math.max(30, options.innerRadius ?? 90);
  const outerRadius = Math.max(innerRadius + 40, options.outerRadius ?? 445);

  const rawCount =
    options.count ??
    (options.layers && options.layers.length > 0 ? options.layers.length : 0);
  const count = Math.max(0, Math.min(rawCount, 6));

  const gap = options.gap !== undefined ? Math.max(0, options.gap) : 0;
  const order: TArcDiDOrder = options.order ?? 'outer-to-inner';

  const totalSpan = outerRadius - innerRadius;
  const totalGaps = count > 1 ? (count - 1) * gap : 0;
  const layerThickness =
    count > 0 ? Math.max(10, (totalSpan - totalGaps) / count) : 0;

  const layersData: readonly IArcDiDLayerItem[] = options.layers ?? [];

  const layers: IArcDiDLayerGeometry[] = [];

  if (count > 0) {
    for (let i = 0; i < count; i++) {
      let rIn: number;
      let rOut: number;

      if (order === 'outer-to-inner') {
        // index 0 is outermost
        rOut = outerRadius - i * (layerThickness + gap);
        rIn = rOut - layerThickness;
      } else {
        // index 0 is innermost
        rIn = innerRadius + i * (layerThickness + gap);
        rOut = rIn + layerThickness;
      }

      const midRadius = (rIn + rOut) / 2;
      const path = describeArcBand(cx, cy, rIn, rOut, 180, 0);

      const layerItem = layersData[i];
      let rawSectors: readonly IArcDiDSectorItem[] = [];

      if (layerItem?.sectors && layerItem.sectors.length > 0) {
        rawSectors = layerItem.sectors.map((s) => {
          if (Array.isArray(s)) {
            return { parts: s, split: false };
          }
          return s as IArcDiDSectorItem;
        });
      } else if (layerItem?.parts && layerItem.parts.length > 0) {
        rawSectors = layerItem.parts.map((p) => {
          if (
            typeof p === 'object' &&
            p !== null &&
            'parts' in p &&
            Array.isArray((p as { parts: unknown }).parts)
          ) {
            return p as IArcDiDSectorItem;
          }
          return { parts: [p], split: false };
        });
      }

      const layerTitleSpan = resolveLayerTitleSpan(
        midRadius,
        layerItem?.titleAngleSpan,
        options.titleAngleSpan,
        layerItem?.titleWidth ?? options.titleWidth,
      );
      const { titleLeft, titleRight } = calculateTitleAngles(layerTitleSpan);

      const titlePosition = polarToCartesian(cx, cy, midRadius, 90);
      const titlePath = describeArcBand(
        cx,
        cy,
        rIn,
        rOut,
        titleLeft,
        titleRight,
      );

      const sectorCount = rawSectors.length;
      const rawSectorSpans = rawSectors.map((s) => s?.span);
      const partSectors = calculatePartSectors(
        sectorCount,
        layerTitleSpan,
        rawSectorSpans,
      );

      const sectors: IArcDiDSectorGeometry[] = [];
      const parts: IArcDiDPartGeometry[] = [];

      for (let s = 0; s < sectorCount; s++) {
        const sectorItem = rawSectors[s];
        const sector = partSectors[s];
        let startAngle = sector?.startAngle ?? 180;
        let endAngle = sector?.endAngle ?? 0;
        let midAngle = sector?.midAngle ?? 90;

        if (sectorItem?.angle !== undefined) {
          midAngle = sectorItem.angle;
          const defaultSpan = Math.abs(startAngle - endAngle);
          const span = sectorItem.span ?? defaultSpan;
          startAngle = round(Math.min(180, midAngle + span / 2), 1);
          endAngle = round(Math.max(0, midAngle - span / 2), 1);
        }

        const sectorSpan = Math.abs(startAngle - endAngle);
        const sectorPath = describeArcBand(
          cx,
          cy,
          rIn,
          rOut,
          startAngle,
          endAngle,
        );

        const rawSectorParts = sectorItem?.parts ?? [];
        const numParts = rawSectorParts.length;
        const isSplit = sectorItem?.split !== false && numParts > 1;
        const trackThickness =
          numParts > 0 ? layerThickness / numParts : layerThickness;

        const dividerPaths: string[] = [];
        if (isSplit && numParts > 1) {
          for (let d = 1; d < numParts; d++) {
            const dividerRadius = round(rOut - d * trackThickness, 2);
            dividerPaths.push(
              describeArc(cx, cy, dividerRadius, startAngle, endAngle),
            );
          }
        }

        const sectorParts: IArcDiDPartGeometry[] = [];

        for (let p = 0; p < numParts; p++) {
          const rawPart = rawSectorParts[p];
          const partItem: IArcDiDPartItem =
            typeof rawPart === 'string'
              ? { label: rawPart }
              : (rawPart ?? { label: '' });

          let trackIndex = p;
          if (partItem.position === 'top') {
            trackIndex = 0;
          } else if (partItem.position === 'bottom') {
            trackIndex = Math.max(0, numParts - 1);
          } else if (partItem.position === 'middle') {
            trackIndex = numParts > 2 ? 1 : 0.5;
          } else if (partItem.position === 'center' || numParts === 1) {
            trackIndex = (numParts - 1) / 2;
          }

          const trackOuter = rOut - trackIndex * trackThickness;
          const trackInner = trackOuter - trackThickness;
          const trackMid = (trackOuter + trackInner) / 2;

          let partRadius =
            partItem.position === 'center' || numParts === 1
              ? midRadius
              : trackMid;

          // For bottom tracks in split sectors, adjust default radius slightly inward
          // to compensate for corner expansion of horizontal text across curved boundaries
          if (
            numParts > 1 &&
            trackIndex === numParts - 1 &&
            partItem.position !== 'center'
          ) {
            partRadius = trackMid - 2.5;
          }

          if (partItem.radius !== undefined) {
            partRadius = partItem.radius;
          } else if (partItem.radialOffset !== undefined) {
            partRadius = partRadius + partItem.radialOffset;
          }

          let partAngle = midAngle;
          let pStart = startAngle;
          let pEnd = endAngle;

          if (partItem.angle !== undefined) {
            partAngle = partItem.angle;
            const pSpan = partItem.span ?? sectorSpan;
            pStart = round(Math.min(180, partAngle + pSpan / 2), 1);
            pEnd = round(Math.max(0, partAngle - pSpan / 2), 1);
          } else if (partItem.span !== undefined) {
            pStart = round(Math.min(180, partAngle + partItem.span / 2), 1);
            pEnd = round(Math.max(0, partAngle - partItem.span / 2), 1);
          }

          const point = polarToCartesian(cx, cy, partRadius, partAngle);

          const partPath = isSplit
            ? describeArcBand(
                cx,
                cy,
                Math.max(rIn, trackInner),
                Math.min(rOut, trackOuter),
                pStart,
                pEnd,
              )
            : sectorPath;

          const partArcLength =
            partRadius * (Math.abs(pStart - pEnd) * (Math.PI / 180));
          const effectiveRotate = partItem.rotate ?? sectorItem?.rotate;
          const effectiveSkew = partItem.skew ?? sectorItem?.skew;

          const tangentAngle = round(90 - partAngle, 1);
          let rotationAngle: number | undefined;
          if (typeof effectiveRotate === 'number') {
            rotationAngle = effectiveRotate;
          } else if (
            effectiveRotate === true ||
            effectiveRotate === 'tangent' ||
            effectiveRotate === 'auto'
          ) {
            rotationAngle = tangentAngle;
          } else if (
            effectiveSkew === true ||
            effectiveSkew === 'tangent' ||
            effectiveSkew === 'auto'
          ) {
            rotationAngle = tangentAngle;
          }

          const isOrientedAlongArc = rotationAngle !== undefined;
          const defaultMaxContentWidth =
            numParts > 1 && !isOrientedAlongArc
              ? Math.max(75, Math.min(105, Math.round(partArcLength * 0.75)))
              : Math.max(105, Math.min(180, Math.round(partArcLength * 0.92)));
          const maxContentWidth =
            partItem.maxWidth !== undefined
              ? typeof partItem.maxWidth === 'number'
                ? partItem.maxWidth
                : Number.parseInt(partItem.maxWidth, 10)
              : defaultMaxContentWidth;

          const partGeo: IArcDiDPartGeometry = {
            index: parts.length,
            sectorIndex: s,
            trackIndex,
            position: partItem.position,
            label: partItem.label,
            angle: round(partAngle, 1),
            radius: round(partRadius, 2),
            x: round(point.x, 2),
            y: round(point.y, 2),
            color: partItem.color,
            icon: partItem.icon,
            startAngle: pStart,
            endAngle: pEnd,
            midAngle: round(partAngle, 1),
            path: partPath,
            innerRadius: round(isSplit ? trackInner : rIn, 2),
            outerRadius: round(isSplit ? trackOuter : rOut, 2),
            maxContentWidth,
            rotate: effectiveRotate,
            skew: effectiveSkew,
            rotationAngle,
            active: partItem.active,
          };

          sectorParts.push(partGeo);
          parts.push(partGeo);
        }

        sectors.push({
          index: s,
          startAngle,
          endAngle,
          midAngle,
          span: sectorSpan,
          path: sectorPath,
          split: isSplit,
          dividerPaths,
          color: sectorItem?.color,
          rotate: sectorItem?.rotate,
          skew: sectorItem?.skew,
          parts: sectorParts,
        });
      }

      layers.push({
        index: i,
        innerRadius: round(rIn),
        outerRadius: round(rOut),
        midRadius: round(midRadius),
        thickness: round(layerThickness),
        path,
        titlePosition,
        titlePath,
        titleLeft,
        titleRight,
        sectors,
        parts,
      });
    }
  }

  const decorativeArcs =
    count > 0 ? createDecorativeArcs(cx, cy, outerRadius, innerRadius) : [];
  const innerCutoutPath =
    count > 0
      ? `M ${round(cx - innerRadius)} ${cy} A ${round(innerRadius)} ${round(innerRadius)} 0 0 1 ${round(cx + innerRadius)} ${cy} Z`
      : '';

  return {
    viewBoxWidth,
    viewBoxHeight,
    cx,
    cy,
    innerRadius,
    outerRadius,
    count,
    innerCutoutPath,
    layers,
    decorativeArcs,
  };
}
