import {
  resolveArcOrbitItems,
  DEFAULT_LOREM_TEXT as SHARED_LOREM_TEXT,
} from '../arcOrbit';

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

export const DEFAULT_LEFT_COLOR = '#e87a36';

export const DEFAULT_RIGHT_COLOR = '#208b9e';

export const DEFAULT_LOREM_TEXT = SHARED_LOREM_TEXT;

export const DEFAULT_LEFT_ITEMS: readonly [
  IResolvedArcComparisonItem,
  IResolvedArcComparisonItem,
  IResolvedArcComparisonItem,
  IResolvedArcComparisonItem,
] = [
  {
    id: '01',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_LEFT_COLOR,
  },
  {
    id: '02',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_LEFT_COLOR,
  },
  {
    id: '03',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_LEFT_COLOR,
  },
  {
    id: '04',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_LEFT_COLOR,
  },
];

export const DEFAULT_RIGHT_ITEMS: readonly [
  IResolvedArcComparisonItem,
  IResolvedArcComparisonItem,
  IResolvedArcComparisonItem,
  IResolvedArcComparisonItem,
] = [
  {
    id: '01',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_RIGHT_COLOR,
  },
  {
    id: '02',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_RIGHT_COLOR,
  },
  {
    id: '03',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_RIGHT_COLOR,
  },
  {
    id: '04',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_RIGHT_COLOR,
  },
];

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
