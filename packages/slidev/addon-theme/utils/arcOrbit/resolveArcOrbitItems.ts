export interface IArcOrbitItem {
  readonly id?: string | number;
  readonly title?: string;
  readonly description?: string;
  readonly color?: string;
  readonly textColor?: string;
}

export interface IResolvedArcOrbitItem {
  readonly id: string | number;
  readonly title: string;
  readonly description: string;
  readonly color: string;
  readonly textColor?: string;
}

export const DEFAULT_ARC_ORBIT_COLOR = '#ea580c';

export const DEFAULT_LOREM_TEXT =
  'Lorem ipsum dolor sit amet, constitutor adipiscing elit. Nam vulputate augue vel ligula.';

export const DEFAULT_ARC_ORBIT_ITEMS: readonly [
  IResolvedArcOrbitItem,
  IResolvedArcOrbitItem,
  IResolvedArcOrbitItem,
  IResolvedArcOrbitItem,
] = [
  {
    id: '01',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_ARC_ORBIT_COLOR,
  },
  {
    id: '02',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_ARC_ORBIT_COLOR,
  },
  {
    id: '03',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_ARC_ORBIT_COLOR,
  },
  {
    id: '04',
    title: 'Add Text Here',
    description: DEFAULT_LOREM_TEXT,
    color: DEFAULT_ARC_ORBIT_COLOR,
  },
];

export interface IResolveArcOrbitItemsOptions {
  readonly items?: readonly IArcOrbitItem[];
  readonly defaultColor?: string;
  readonly count?: number;
}

export function resolveArcOrbitItems(
  options: IResolveArcOrbitItemsOptions = {},
): readonly IResolvedArcOrbitItem[] {
  const { items, defaultColor = DEFAULT_ARC_ORBIT_COLOR, count = 3 } = options;

  const result: IResolvedArcOrbitItem[] = [];

  for (let i = 0; i < count; i++) {
    const custom = items?.[i];
    const defaultItem = DEFAULT_ARC_ORBIT_ITEMS[i];

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
