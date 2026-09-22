export type TGearTriadIcon =
  | 'document'
  | 'file'
  | 'file-text'
  | 'shield'
  | 'shield-star'
  | 'archive'
  | 'box'
  | 'package'
  | 'gear'
  | 'settings'
  | string
  | object
  | false;

export interface IGearTriadItem {
  readonly id?: string | number;
  readonly color?: string;
  readonly depthColor?: string;
  readonly title?: string;
  readonly description?: string;
  readonly icon?: TGearTriadIcon;
  readonly cardBg?: string;
  readonly textColor?: string;
  readonly titleColor?: string;
}

export interface IResolvedGearTriadItem {
  readonly id: string | number;
  readonly color: string;
  readonly depthColor: string;
  readonly title: string;
  readonly description: string;
  readonly icon?: TGearTriadIcon;
  readonly cardBg?: string;
  readonly textColor: string;
  readonly titleColor: string;
}

const DEFAULT_LOREM =
  'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration.';

const defaultItem0: IResolvedGearTriadItem = {
  id: '01',
  color: '#1fb5b5',
  depthColor: '#126e7a',
  title: 'Option 1',
  description: DEFAULT_LOREM,
  icon: undefined,
  cardBg: undefined,
  textColor: '#64748b',
  titleColor: '#0f172a',
};

const defaultItem1: IResolvedGearTriadItem = {
  id: '02',
  color: '#f38942',
  depthColor: '#aa521d',
  title: 'Option 2',
  description: DEFAULT_LOREM,
  icon: undefined,
  cardBg: undefined,
  textColor: '#64748b',
  titleColor: '#0f172a',
};

const defaultItem2: IResolvedGearTriadItem = {
  id: '03',
  color: '#f05367',
  depthColor: '#a82c3c',
  title: 'Option 3',
  description: DEFAULT_LOREM,
  icon: undefined,
  cardBg: undefined,
  textColor: '#64748b',
  titleColor: '#0f172a',
};

export const DEFAULT_GEAR_TRIAD_ITEMS: readonly [
  IResolvedGearTriadItem,
  IResolvedGearTriadItem,
  IResolvedGearTriadItem,
] = [defaultItem0, defaultItem1, defaultItem2];

export const GEAR_TRIAD_BASE_COLOR = '#11455c';

export function getDefaultGearTriadItem(index: number): IResolvedGearTriadItem {
  const safe = Math.abs(index) % 3;

  if (safe === 1) {
    return defaultItem1;
  }

  if (safe === 2) {
    return defaultItem2;
  }

  return defaultItem0;
}

export function resolveSingleGearTriadItem(
  item: IGearTriadItem | undefined,
  fallbackIndex = 0,
): IResolvedGearTriadItem {
  const fallback = getDefaultGearTriadItem(fallbackIndex);

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
    cardBg: item.cardBg !== undefined ? item.cardBg : fallback.cardBg,
    textColor: item.textColor ?? fallback.textColor,
    titleColor: item.titleColor ?? fallback.titleColor,
  };
}

export function resolveGearTriadItems(
  items?: readonly IGearTriadItem[],
  icons?: readonly (TGearTriadIcon | undefined)[],
): readonly [
  IResolvedGearTriadItem,
  IResolvedGearTriadItem,
  IResolvedGearTriadItem,
] {
  const item0 = items?.[0];
  const item1 = items?.[1];
  const item2 = items?.[2];

  const merged0 = item0
    ? { icon: item0.icon ?? icons?.[0], ...item0 }
    : icons?.[0] !== undefined
      ? { icon: icons[0] }
      : undefined;

  const merged1 = item1
    ? { icon: item1.icon ?? icons?.[1], ...item1 }
    : icons?.[1] !== undefined
      ? { icon: icons[1] }
      : undefined;

  const merged2 = item2
    ? { icon: item2.icon ?? icons?.[2], ...item2 }
    : icons?.[2] !== undefined
      ? { icon: icons[2] }
      : undefined;

  return [
    resolveSingleGearTriadItem(merged0, 0),
    resolveSingleGearTriadItem(merged1, 1),
    resolveSingleGearTriadItem(merged2, 2),
  ];
}
