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
  readonly cardBg: string;
  readonly textColor: string;
  readonly titleColor: string;
}

const defaultItem0: IResolvedArrowTriadItem = {
  id: '01',
  color: '#fec201',
  depthColor: '#d59b01',
  title: 'TITLE TEXT HERE',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
  icon: undefined,
  cardBg: '#ffffff',
  textColor: '#64748b',
  titleColor: '#1e293b',
};

const defaultItem1: IResolvedArrowTriadItem = {
  id: '02',
  color: '#71ad49',
  depthColor: '#548235',
  title: 'TITLE TEXT HERE',
  description:
    'Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo cupidatat non proident, sunt',
  icon: undefined,
  cardBg: '#ffffff',
  textColor: '#64748b',
  titleColor: '#1e293b',
};

const defaultItem2: IResolvedArrowTriadItem = {
  id: '03',
  color: '#5b9bd5',
  depthColor: '#41719c',
  title: 'TITLE TEXT HERE',
  description:
    'Magna aliqua ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo',
  icon: undefined,
  cardBg: '#ffffff',
  textColor: '#64748b',
  titleColor: '#1e293b',
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

  return {
    id: item.id ?? fallback.id,
    color: item.color ?? fallback.color,
    depthColor: item.depthColor ?? fallback.depthColor,
    title: item.title ?? fallback.title,
    description: item.description ?? fallback.description,
    icon: item.icon !== undefined ? item.icon : fallback.icon,
    cardBg: item.cardBg ?? fallback.cardBg,
    textColor: item.textColor ?? fallback.textColor,
    titleColor: item.titleColor ?? fallback.titleColor,
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
