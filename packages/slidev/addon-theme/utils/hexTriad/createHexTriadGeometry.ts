export interface IHexTriadPoint {
  readonly x: number;
  readonly y: number;
}

export interface IHexTriadCoordinates {
  readonly centerX: number;
  readonly centerY: number;
  readonly hexRadius: number;
  readonly triadRadius: number;
  readonly badgeRadius: number;
  readonly hex1: IHexTriadPoint;
  readonly hex2: IHexTriadPoint;
  readonly hex3: IHexTriadPoint;
  readonly badge1: IHexTriadPoint;
  readonly badge2: IHexTriadPoint;
  readonly badge3: IHexTriadPoint;
}

/**
 * Creates pointy-topped hexagon SVG points with sharp vertices
 */
export function createHexagonPoints(cx: number, cy: number, r: number): string {
  const angles = [-90, -30, 30, 90, 150, 210];

  return angles
    .map((deg) => {
      const rad = (deg * Math.PI) / 180;
      const x = (cx + r * Math.cos(rad)).toFixed(1);
      const y = (cy + r * Math.sin(rad)).toFixed(1);

      return `${x},${y}`;
    })
    .join(' ');
}

/**
 * Creates a pointy-topped hexagon SVG path with smoothly rounded corners
 */
export function createRoundedHexagonPath(
  cx: number,
  cy: number,
  r: number,
  cornerRadius = 16,
): string {
  const angles = [-90, -30, 30, 90, 150, 210];
  const vertices = angles.map((deg) => {
    const rad = (deg * Math.PI) / 180;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad),
    };
  });

  const d = Math.min(cornerRadius, r * 0.3);
  const commands: string[] = [];

  for (let i = 0; i < 6; i += 1) {
    const prev = vertices[(i + 5) % 6];
    const curr = vertices[i];
    const next = vertices[(i + 1) % 6];

    if (!prev || !curr || !next) {
      continue;
    }

    const lenPrev = Math.hypot(prev.x - curr.x, prev.y - curr.y);
    const lenNext = Math.hypot(next.x - curr.x, next.y - curr.y);

    const a = {
      x: curr.x + ((prev.x - curr.x) / lenPrev) * d,
      y: curr.y + ((prev.y - curr.y) / lenPrev) * d,
    };
    const b = {
      x: curr.x + ((next.x - curr.x) / lenNext) * d,
      y: curr.y + ((next.y - curr.y) / lenNext) * d,
    };

    if (i === 0) {
      commands.push(`M ${b.x.toFixed(1)} ${b.y.toFixed(1)}`);
    } else {
      commands.push(
        `L ${a.x.toFixed(1)} ${a.y.toFixed(1)} Q ${curr.x.toFixed(1)} ${curr.y.toFixed(1)} ${b.x.toFixed(1)} ${b.y.toFixed(1)}`,
      );
    }
  }

  const prev0 = vertices[5];
  const curr0 = vertices[0];
  const next0 = vertices[1];

  if (prev0 && curr0 && next0) {
    const len0 = Math.hypot(prev0.x - curr0.x, prev0.y - curr0.y);
    const lenNext0 = Math.hypot(next0.x - curr0.x, next0.y - curr0.y);
    const a0 = {
      x: curr0.x + ((prev0.x - curr0.x) / len0) * d,
      y: curr0.y + ((prev0.y - curr0.y) / len0) * d,
    };
    const b0 = {
      x: curr0.x + ((next0.x - curr0.x) / lenNext0) * d,
      y: curr0.y + ((next0.y - curr0.y) / lenNext0) * d,
    };
    commands.push(
      `L ${a0.x.toFixed(1)} ${a0.y.toFixed(1)} Q ${curr0.x.toFixed(1)} ${curr0.y.toFixed(1)} ${b0.x.toFixed(1)} ${b0.y.toFixed(1)} Z`,
    );
  }

  return commands.join(' ');
}

export function calculateHexTriadCoordinates(
  centerX = 270,
  centerY = 224,
  triadRadius = 66,
  hexRadius = 114,
  badgeRadius = 28,
  horizontalSpread = 28,
): IHexTriadCoordinates {
  const angleRad30 = (30 * Math.PI) / 180;

  const hex2X = Number(
    (centerX + triadRadius * Math.cos(angleRad30) + horizontalSpread).toFixed(
      2,
    ),
  );
  const hex3X = Number(
    (centerX - triadRadius * Math.cos(angleRad30) - horizontalSpread).toFixed(
      2,
    ),
  );
  const bottomY = Number(
    (centerY + triadRadius * Math.sin(angleRad30)).toFixed(2),
  );

  // Exact equilateral height so that all three pairwise overlap areas are equal:
  const spreadDistance = hex2X - hex3X;
  const equilateralHeight = Number(
    (spreadDistance * (Math.sqrt(3) / 2)).toFixed(2),
  );
  const hex1Y = Number((bottomY - equilateralHeight).toFixed(2));

  const circumCenterY = Number(((hex1Y + 2 * bottomY) / 3).toFixed(2));
  // Set circle radius to hexRadius (114) so it crosses the three yellow points
  const circleRadius = hexRadius;

  // Badges centered directly ON the white circle:
  const badge1 = {
    x: centerX,
    y: Number((circumCenterY - circleRadius).toFixed(2)),
  };
  const badge2 = {
    x: Number((centerX + circleRadius * Math.cos(angleRad30)).toFixed(2)),
    y: Number((circumCenterY + circleRadius * Math.sin(angleRad30)).toFixed(2)),
  };
  const badge3 = {
    x: Number((centerX - circleRadius * Math.cos(angleRad30)).toFixed(2)),
    y: Number((circumCenterY + circleRadius * Math.sin(angleRad30)).toFixed(2)),
  };

  return {
    centerX,
    centerY: circumCenterY,
    hexRadius,
    triadRadius: circleRadius,
    badgeRadius,
    hex1: {
      x: centerX,
      y: hex1Y,
    },
    hex2: {
      x: hex2X,
      y: bottomY,
    },
    hex3: {
      x: hex3X,
      y: bottomY,
    },
    badge1,
    badge2,
    badge3,
  };
}
