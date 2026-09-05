import { lightenColor } from './createQuadHubGeometry';

export type TQuadHubIcon = string | object | boolean;

export interface IQuadHubItem {
  readonly id?: string | number;
  /**
   * Optional icon: icon class (e.g. 'i-lucide-user'), component object,
   * built-in name ('user' | 'academic' | 'briefcase' | 'target'), or false to hide.
   */
  readonly icon?: TQuadHubIcon;
  readonly color?: string;
  readonly cardBg?: string;
  readonly arcColor?: string;
  readonly arcRatio?: number;
  readonly textColor?: string;
  readonly titleColor?: string;
  readonly arcBorderColor?: string;
  readonly arcBorderRatio?: number;
}

export interface IResolvedQuadHubItem extends IQuadHubItem {
  readonly id: string | number;
  readonly color: string;
  readonly cardBg: string;
  readonly arcColor: string;
  readonly textColor: string;
  readonly titleColor: string;
  readonly arcBorderColor: string;
}

export const DEFAULT_QUAD_HUB_ITEMS: readonly [
  IResolvedQuadHubItem,
  IResolvedQuadHubItem,
  IResolvedQuadHubItem,
  IResolvedQuadHubItem,
] = [
  // 0: Top-Left (01) - Golden Orange
  {
    id: '01',
    icon: 'user',
    color: '#f29e4b',
    cardBg: lightenColor({
      hex: '#f29e4b',
      ratio: 0.9,
    }),
    arcColor: lightenColor({
      hex: '#f29e4b',
      ratio: 0.55,
    }),
    textColor: '#555555',
    titleColor: '#e6882c',
    arcBorderColor: lightenColor({
      hex: '#f29e4b',
      ratio: 0.8,
    }),
  },
  // 1: Top-Right (02) - Fresh Sage Green
  {
    id: '02',
    icon: 'academic',
    color: '#a4cb81',
    cardBg: lightenColor({
      hex: '#a4cb81',
      ratio: 0.9,
    }),
    arcColor: lightenColor({
      hex: '#a4cb81',
      ratio: 0.55,
    }),
    textColor: '#555555',
    titleColor: '#8bb863',
    arcBorderColor: lightenColor({
      hex: '#a4cb81',
      ratio: 0.8,
    }),
  },
  // 2: Bottom-Right (03) - Seafoam Teal
  {
    id: '03',
    icon: 'briefcase',
    color: '#62b6a8',
    cardBg: lightenColor({
      hex: '#62b6a8',
      ratio: 0.9,
    }),
    arcColor: lightenColor({
      hex: '#62b6a8',
      ratio: 0.55,
    }),
    textColor: '#555555',
    titleColor: '#4ea798',
    arcBorderColor: lightenColor({
      hex: '#62b6a8',
      ratio: 0.8,
    }),
  },
  // 3: Bottom-Left (04) - Coral Rose Pink
  {
    id: '04',
    icon: 'target',
    color: '#e9717a',
    cardBg: lightenColor({
      hex: '#e9717a',
      ratio: 0.9,
    }),
    arcColor: lightenColor({
      hex: '#e9717a',
      ratio: 0.55,
    }),
    textColor: '#555555',
    titleColor: '#e45b65',
    arcBorderColor: lightenColor({
      hex: '#e9717a',
      ratio: 0.8,
    }),
  },
] as const;

export function resolveSingleItem(
  defaultItem: IResolvedQuadHubItem,
  userItem?: IQuadHubItem,
  defaultArcRatio = 0.55,
  defaultArcBorderRatio = 0.8,
): IResolvedQuadHubItem {
  const merged = {
    ...defaultItem,
    ...(userItem ?? {}),
  };

  const baseColor = merged.color ?? defaultItem.color;
  const resolvedArcRatio = merged.arcRatio ?? defaultArcRatio;
  const resolvedArcBorderRatio = merged.arcBorderRatio ?? defaultArcBorderRatio;

  const isColorChanged = userItem?.color !== undefined;

  return {
    ...merged,
    id: merged.id ?? defaultItem.id,
    color: baseColor,
    cardBg:
      userItem?.cardBg ??
      (isColorChanged
        ? lightenColor({
            hex: baseColor,
            ratio: 0.9,
          })
        : defaultItem.cardBg),
    arcColor:
      userItem?.arcColor ??
      (isColorChanged || userItem?.arcRatio !== undefined
        ? lightenColor({
            hex: baseColor,
            ratio: resolvedArcRatio,
          })
        : defaultItem.arcColor),
    textColor: merged.textColor ?? defaultItem.textColor,
    titleColor:
      merged.titleColor ??
      (isColorChanged ? baseColor : defaultItem.titleColor),
    arcBorderColor:
      userItem?.arcBorderColor ??
      (isColorChanged || userItem?.arcBorderRatio !== undefined
        ? lightenColor({
            hex: baseColor,
            ratio: resolvedArcBorderRatio,
          })
        : defaultItem.arcBorderColor),
  };
}

export interface IResolveQuadHubItemsParams {
  readonly items?: readonly IQuadHubItem[];
  readonly arcRatio?: number;
  readonly arcBorderRatio?: number;
}

export function resolveQuadHubItems({
  items = [],
  arcRatio = 0.55,
  arcBorderRatio = 0.8,
}: IResolveQuadHubItemsParams = {}): readonly [
  IResolvedQuadHubItem,
  IResolvedQuadHubItem,
  IResolvedQuadHubItem,
  IResolvedQuadHubItem,
] {
  return [
    resolveSingleItem(
      DEFAULT_QUAD_HUB_ITEMS[0],
      items[0],
      arcRatio,
      arcBorderRatio,
    ),
    resolveSingleItem(
      DEFAULT_QUAD_HUB_ITEMS[1],
      items[1],
      arcRatio,
      arcBorderRatio,
    ),
    resolveSingleItem(
      DEFAULT_QUAD_HUB_ITEMS[2],
      items[2],
      arcRatio,
      arcBorderRatio,
    ),
    resolveSingleItem(
      DEFAULT_QUAD_HUB_ITEMS[3],
      items[3],
      arcRatio,
      arcBorderRatio,
    ),
  ] as const;
}
