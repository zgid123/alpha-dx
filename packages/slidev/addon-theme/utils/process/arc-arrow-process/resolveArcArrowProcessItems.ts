export interface IArcArrowProcessItem {
  readonly id?: string | number;
  readonly color?: string;
  readonly gradientEnd?: string;
  readonly title?: string;
  readonly description?: string;
  readonly icon?: string | object | false;
  readonly textColor?: string;
}

export interface IResolvedArcArrowProcessItem {
  readonly id: string | number;
  readonly color: string;
  readonly gradientEnd: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: string | object | false;
  readonly textColor: string;
}

const DEFAULT_ARC_ARROW_PROCESS_ITEMS_4: readonly [
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
] = [
  {
    id: '01',
    color: 'var(--alpha-arc-arrow-process-item-1-color)',
    gradientEnd: 'var(--alpha-arc-arrow-process-item-1-gradient-end)',
    title: '',
    description: '',
    textColor: 'var(--alpha-arc-arrow-process-content)',
  },
  {
    id: '02',
    color: 'var(--alpha-arc-arrow-process-item-2-color)',
    gradientEnd: 'var(--alpha-arc-arrow-process-item-2-gradient-end)',
    title: '',
    description: '',
    textColor: 'var(--alpha-arc-arrow-process-content)',
  },
  {
    id: '03',
    color: 'var(--alpha-arc-arrow-process-item-3-color)',
    gradientEnd: 'var(--alpha-arc-arrow-process-item-3-gradient-end)',
    title: '',
    description: '',
    textColor: 'var(--alpha-arc-arrow-process-content)',
  },
  {
    id: '04',
    color: 'var(--alpha-arc-arrow-process-item-4-color)',
    gradientEnd: 'var(--alpha-arc-arrow-process-item-4-gradient-end)',
    title: '',
    description: '',
    textColor: 'var(--alpha-arc-arrow-process-content)',
  },
];

const DEFAULT_ARC_ARROW_PROCESS_ITEMS_3: readonly [
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
] = [
  {
    id: '01',
    color: 'var(--alpha-arc-arrow-process-item-1-color)',
    gradientEnd: 'var(--alpha-arc-arrow-process-item-1-gradient-end)',
    title: '',
    description: '',
    textColor: 'var(--alpha-arc-arrow-process-content)',
  },
  {
    id: '02',
    color: 'var(--alpha-arc-arrow-process-item-2-color)',
    gradientEnd: 'var(--alpha-arc-arrow-process-item-2-gradient-end)',
    title: '',
    description: '',
    textColor: 'var(--alpha-arc-arrow-process-content)',
  },
  {
    id: '03',
    color: 'var(--alpha-arc-arrow-process-item-4-color)',
    gradientEnd: 'var(--alpha-arc-arrow-process-item-4-gradient-end)',
    title: '',
    description: '',
    textColor: 'var(--alpha-arc-arrow-process-content)',
  },
];

const DEFAULT_ARC_ARROW_PROCESS_ITEMS_2: readonly [
  IResolvedArcArrowProcessItem,
  IResolvedArcArrowProcessItem,
] = [
  {
    id: '01',
    color: 'var(--alpha-arc-arrow-process-item-2-color)',
    gradientEnd: 'var(--alpha-arc-arrow-process-item-2-gradient-end)',
    title: '',
    description: '',
    textColor: 'var(--alpha-arc-arrow-process-content)',
  },
  {
    id: '02',
    color: 'var(--alpha-arc-arrow-process-item-3-color)',
    gradientEnd: 'var(--alpha-arc-arrow-process-item-3-gradient-end)',
    title: '',
    description: '',
    textColor: 'var(--alpha-arc-arrow-process-content)',
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

  const color = item.color ?? fallback.color;

  return {
    id: item.id ?? fallback.id,
    color,
    gradientEnd: item.gradientEnd ?? fallback.gradientEnd,
    title: item.title ?? fallback.title,
    description: item.description ?? fallback.description,
    icon: item.icon !== undefined ? item.icon : fallback.icon,
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
