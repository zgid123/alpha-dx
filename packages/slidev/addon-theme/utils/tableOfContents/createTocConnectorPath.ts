export interface ITocConnectorPoint {
  readonly x: number;
  readonly y: number;
}

const CONNECTOR_SKEW_WIDTH_PX = 24;
const CONNECTOR_ARTICLE_OVERLAP_PX = 12;

export interface ICalculateTocConnectorEndXParams {
  readonly articleLeftX: number;
}

function formatCoordinate(value: number): number {
  return Number(value.toFixed(2));
}

export function calculateTocConnectorEndX({
  articleLeftX,
}: ICalculateTocConnectorEndXParams): number {
  return articleLeftX + CONNECTOR_ARTICLE_OVERLAP_PX;
}

export function createTocConnectorPath(
  start: ITocConnectorPoint,
  end: ITocConnectorPoint,
  isMiddle: boolean,
): string {
  const startX = formatCoordinate(start.x);
  const startY = formatCoordinate(start.y);
  const endX = formatCoordinate(end.x);
  const endY = formatCoordinate(end.y);

  if (isMiddle) {
    return `M ${startX} ${startY} L ${endX} ${endY}`;
  }

  const availableWidth = Math.max(0, end.x - start.x);
  const elbowX = formatCoordinate(
    start.x + Math.min(CONNECTOR_SKEW_WIDTH_PX, availableWidth / 2),
  );

  return `M ${startX} ${startY} L ${elbowX} ${endY} L ${endX} ${endY}`;
}
