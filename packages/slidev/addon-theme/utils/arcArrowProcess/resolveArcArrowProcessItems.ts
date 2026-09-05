export interface IArcArrowProcessItem {
  readonly id?: string | number;
  readonly color?: string;
  readonly gradientEnd?: string;
  readonly title?: string;
  readonly description?: string;
  readonly icon?: string | object | false;
  readonly titleColor?: string;
  readonly textColor?: string;
}

export interface IResolvedArcArrowProcessItem {
  readonly id: string | number;
  readonly color: string;
  readonly gradientEnd: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: string | object | false;
  readonly titleColor: string;
  readonly textColor: string;
}

export const DEFAULT_ARC_ARROW_PROCESS_ITEMS_4: readonly [
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
] = [
  {
    id: '01',
    color: '#a0a5aa',
    gradientEnd: '#8e959f',
    title: 'Heading Here',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.',
    titleColor: '#888d94',
    textColor: '#8e959f',
  },
  {
    id: '02',
    color: '#2c485d',
    gradientEnd: '#334e68',
    title: 'Heading Here',
    description:
      'Sed do eiusmod tempor incididunt ut labore et lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    titleColor: '#2c485d',
    textColor: '#8e959f',
  },
  {
    id: '03',
    color: '#6fa3b5',
    gradientEnd: '#7fb0c0',
    title: 'Heading Here',
    description:
      'Tempor incididunt ut laborelorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod et.',
    titleColor: '#6fa3b5',
    textColor: '#8e959f',
  },
  {
    id: '04',
    color: '#d6284d',
    gradientEnd: '#e63964',
    title: 'Heading Here',
    description:
      'Eiusmod tempor incididunt ut labore lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.',
    titleColor: '#d6284d',
    textColor: '#8e959f',
  },
];

export const DEFAULT_ARC_ARROW_PROCESS_ITEMS_3: readonly [
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
] = [
  {
    id: '01',
    color: '#a0a5aa',
    gradientEnd: '#8e959f',
    title: 'Heading Here',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    titleColor: '#888d94',
    textColor: '#8e959f',
  },
  {
    id: '02',
    color: '#2c485d',
    gradientEnd: '#334e68',
    title: 'Heading Here',
    description:
      'Sed do eiusmod tempor incididunt ut labore et lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    titleColor: '#2c485d',
    textColor: '#8e959f',
  },
  {
    id: '03',
    color: '#d6284d',
    gradientEnd: '#e63964',
    title: 'Heading Here',
    description:
      'Eiusmod tempor incididunt ut labore lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do.',
    titleColor: '#d6284d',
    textColor: '#8e959f',
  },
];

export const DEFAULT_ARC_ARROW_PROCESS_ITEMS_2: readonly [
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
] = [
  {
    id: '01',
    color: '#2c485d',
    gradientEnd: '#334e68',
    title: 'Heading Here',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
    titleColor: '#2c485d',
    textColor: '#8e959f',
  },
  {
    id: '02',
    color: '#6fa3b5',
    gradientEnd: '#7fb0c0',
    title: 'Heading Here',
    description:
      'Sed do eiusmod tempor incididunt ut labore et lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    titleColor: '#6fa3b5',
    textColor: '#8e959f',
  },
];

export function getDefaultArcArrowProcessItem(
  index: number,
  count: number = 4,
): IResolvedArcArrowProcessItem {
  const list =
    count === 2
      ? DEFAULT_ARC_ARROW_PROCESS_ITEMS_2
      : count === 3
        ? DEFAULT_ARC_ARROW_PROCESS_ITEMS_3
        : DEFAULT_ARC_ARROW_PROCESS_ITEMS_4;
  const safe = Math.abs(index) % list.length;
  const item = list[safe];

  if (item) {
    return item;
  }

  return DEFAULT_ARC_ARROW_PROCESS_ITEMS_4[0];
}

export function resolveSingleArcArrowProcessItem(
  item: IArcArrowProcessItem | undefined,
  fallbackIndex = 0,
  count: number = 4,
): IResolvedArcArrowProcessItem {
  const fallback = getDefaultArcArrowProcessItem(fallbackIndex, count);

  if (!item) {
    return fallback;
  }

  return {
    id: item.id ?? fallback.id,
    color: item.color ?? fallback.color,
    gradientEnd: item.gradientEnd ?? fallback.gradientEnd,
    title: item.title ?? fallback.title,
    description: item.description ?? fallback.description,
    icon: item.icon !== undefined ? item.icon : fallback.icon,
    titleColor: item.titleColor ?? item.color ?? fallback.titleColor,
    textColor: item.textColor ?? fallback.textColor,
  };
}

export function resolveArcArrowProcessItems(
  items: readonly IArcArrowProcessItem[] | undefined,
  count: number = 4,
): readonly IResolvedArcArrowProcessItem[] {
  const targetCount = count >= 2 ? count : 4;
  const result: IResolvedArcArrowProcessItem[] = [];

  for (let i = 0; i < targetCount; i++) {
    result.push(resolveSingleArcArrowProcessItem(items?.[i], i, targetCount));
  }

  return result;
}
