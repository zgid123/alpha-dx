export interface IArcCompareItem {
  readonly id?: string | number;
  readonly title?: string;
  readonly description?: string;
  readonly color?: string;
  readonly textColor?: string;
}

export interface IResolvedArcCompareItem {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly color: string;
  readonly textColor?: string;
}

export const DEFAULT_LEFT_COLOR = '#e87a36';

export const DEFAULT_RIGHT_COLOR = '#208b9e';

export const DEFAULT_LOREM_TEXT =
  'Lorem ipsum dolor sit amet, constitutor adipiscing elit. Nam vulputate augue vel ligula.';

export const DEFAULT_LEFT_ITEMS: readonly [
  IResolvedArcCompareItem,
  IResolvedArcCompareItem,
  IResolvedArcCompareItem,
  IResolvedArcCompareItem,
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
  IResolvedArcCompareItem,
  IResolvedArcCompareItem,
  IResolvedArcCompareItem,
  IResolvedArcCompareItem,
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

export function resolveArcCompareSideItems(
  items?: readonly IArcCompareItem[],
  defaultColor = DEFAULT_LEFT_COLOR,
  count = 3,
): readonly IResolvedArcCompareItem[] {
  const result: IResolvedArcCompareItem[] = [];

  for (let i = 0; i < count; i++) {
    const custom = items?.[i];
    const defaultItem =
      defaultColor === DEFAULT_RIGHT_COLOR
        ? DEFAULT_RIGHT_ITEMS[i]
        : DEFAULT_LEFT_ITEMS[i];

    const id =
      custom?.id !== undefined
        ? custom.id
        : (defaultItem?.id ?? String(i + 1).padStart(2, '0'));

    const title = custom?.title ?? defaultItem?.title ?? 'Add Text Here';
    const description =
      custom?.description ?? defaultItem?.description ?? DEFAULT_LOREM_TEXT;
    const color = custom?.color ?? defaultColor;
    const textColor = custom?.textColor ?? defaultItem?.textColor;

    result.push({
      id,
      title,
      description,
      color,
      textColor,
    });
  }

  return result;
}
