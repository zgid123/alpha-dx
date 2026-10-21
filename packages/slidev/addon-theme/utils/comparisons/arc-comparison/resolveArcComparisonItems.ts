import { resolveArcOrbitItems } from '../../core/arc-orbit';

export interface IArcComparisonItem {
  readonly id?: string | number;
  readonly title?: string;
  readonly description?: string;
  readonly color?: string;
  readonly textColor?: string;
}

export interface IResolvedArcComparisonItem {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly color: string;
  readonly textColor?: string;
}

export const DEFAULT_LEFT_COLOR = 'var(--alpha-arc-comparison-left-accent)';

export const DEFAULT_RIGHT_COLOR = 'var(--alpha-arc-comparison-right-accent)';

export function resolveArcComparisonSideItems(
  items?: readonly IArcComparisonItem[],
  defaultColor = DEFAULT_LEFT_COLOR,
  count = 3,
): readonly IResolvedArcComparisonItem[] {
  return resolveArcOrbitItems({
    items,
    defaultColor,
    count,
  });
}
