export interface IArrowTriadItem {
  readonly id?: string | number;
  readonly color?: string;
  readonly depthColor?: string;
  readonly title?: string;
  readonly description?: string;
  readonly icon?: string | object | false;
  readonly cardBg?: string;
  readonly textColor?: string;
  readonly titleColor?: string;
}

export interface IResolvedArrowTriadItem {
  readonly id: string | number;
  readonly color: string;
  readonly depthColor: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: string | object | false;
  readonly cardBg?: string;
  readonly textColor: string;
  readonly titleColor: string;
}

const defaultItem0: IResolvedArrowTriadItem = {
  id: '01',
  color: 'var(--alpha-arrow-triad-item-1-color)',
  depthColor: 'var(--alpha-arrow-triad-item-1-depth)',
  title: '',
  description: '',
  icon: undefined,
  cardBg: undefined,
  textColor: 'var(--alpha-arrow-triad-content)',
  titleColor: 'var(--alpha-arrow-triad-item-1-color)',
};

const defaultItem1: IResolvedArrowTriadItem = {
  id: '02',
  color: 'var(--alpha-arrow-triad-item-2-color)',
  depthColor: 'var(--alpha-arrow-triad-item-2-depth)',
  title: '',
  description: '',
  icon: undefined,
  cardBg: undefined,
  textColor: 'var(--alpha-arrow-triad-content)',
  titleColor: 'var(--alpha-arrow-triad-item-2-color)',
};

const defaultItem2: IResolvedArrowTriadItem = {
  id: '03',
  color: 'var(--alpha-arrow-triad-item-3-color)',
  depthColor: 'var(--alpha-arrow-triad-item-3-depth)',
  title: '',
  description: '',
  icon: undefined,
  cardBg: undefined,
  textColor: 'var(--alpha-arrow-triad-content)',
  titleColor: 'var(--alpha-arrow-triad-item-3-color)',
};

export const DEFAULT_ARROW_TRIAD_ITEMS: readonly [
  IResolvedArrowTriadItem,
  IResolvedArrowTriadItem,
  IResolvedArrowTriadItem,
] = [defaultItem0, defaultItem1, defaultItem2];

export function getDefaultArrowTriadItem(
  index: number,
): IResolvedArrowTriadItem {
  const safe = Math.abs(index) % 3;

  if (safe === 1) {
    return defaultItem1;
  }

  if (safe === 2) {
    return defaultItem2;
  }

  return defaultItem0;
}

export function resolveSingleArrowTriadItem(
  item: IArrowTriadItem | undefined,
  fallbackIndex = 0,
): IResolvedArrowTriadItem {
  const fallback = getDefaultArrowTriadItem(fallbackIndex);

  if (!item) {
    return fallback;
  }

  const color = item.color ?? fallback.color;

  return {
    id: item.id ?? fallback.id,
    color,
    depthColor: item.depthColor ?? fallback.depthColor,
    title: item.title ?? fallback.title,
    description: item.description ?? fallback.description,
    icon: item.icon !== undefined ? item.icon : fallback.icon,
    cardBg: item.cardBg !== undefined ? item.cardBg : fallback.cardBg,
    textColor: item.textColor ?? fallback.textColor,
    titleColor: item.titleColor ?? color,
  };
}

export function resolveArrowTriadItems(
  items?: readonly IArrowTriadItem[],
): readonly [
  IResolvedArrowTriadItem,
  IResolvedArrowTriadItem,
  IResolvedArrowTriadItem,
] {
  return [
    resolveSingleArrowTriadItem(items?.[0], 0),
    resolveSingleArrowTriadItem(items?.[1], 1),
    resolveSingleArrowTriadItem(items?.[2], 2),
  ];
}
