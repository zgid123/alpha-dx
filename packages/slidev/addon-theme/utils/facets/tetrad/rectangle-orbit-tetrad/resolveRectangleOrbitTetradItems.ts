import { lightenColor } from '../../../colors';

export type TRectangleOrbitTetradIcon = string | object | boolean;

export interface IRectangleOrbitTetradItem {
  readonly id?: string | number;
  /**
   * Optional icon: icon class (e.g. 'i-lucide-user'), component object,
   * built-in name ('user' | 'academic' | 'briefcase' | 'target'), or false to hide.
   */
  readonly icon?: TRectangleOrbitTetradIcon;
  readonly color?: string;
  readonly cardBg?: string;
  readonly arcColor?: string;
  readonly arcRatio?: number;
  readonly textColor?: string;
  readonly arcBorderColor?: string;
  readonly arcBorderRatio?: number;
}

export interface IResolvedRectangleOrbitTetradItem
  extends IRectangleOrbitTetradItem {
  readonly id: string | number;
  readonly color: string;
  readonly cardBg: string;
  readonly arcColor: string;
  readonly textColor: string;
  readonly arcBorderColor: string;
}

export const DEFAULT_RECT_ORBIT_TETRAD_ITEMS: readonly [
  IResolvedRectangleOrbitTetradItem,
  IResolvedRectangleOrbitTetradItem,
  IResolvedRectangleOrbitTetradItem,
  IResolvedRectangleOrbitTetradItem,
] = [
  // 0: Top-Left (01) - Golden Orange
  {
    id: '01',
    icon: 'user',
    color: 'var(--alpha-rectangle-orbit-tetrad-item-1-color)',
    cardBg: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-1-color)',
      ratio: 0.9,
    }),
    arcColor: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-1-color)',
      ratio: 0.55,
    }),
    textColor: 'var(--alpha-rectangle-orbit-tetrad-content)',
    arcBorderColor: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-1-color)',
      ratio: 0.8,
    }),
  },
  // 1: Top-Right (02) - Fresh Sage Green
  {
    id: '02',
    icon: 'academic',
    color: 'var(--alpha-rectangle-orbit-tetrad-item-2-color)',
    cardBg: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-2-color)',
      ratio: 0.9,
    }),
    arcColor: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-2-color)',
      ratio: 0.55,
    }),
    textColor: 'var(--alpha-rectangle-orbit-tetrad-content)',
    arcBorderColor: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-2-color)',
      ratio: 0.8,
    }),
  },
  // 2: Bottom-Right (03) - Seafoam Teal
  {
    id: '03',
    icon: 'briefcase',
    color: 'var(--alpha-rectangle-orbit-tetrad-item-3-color)',
    cardBg: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-3-color)',
      ratio: 0.9,
    }),
    arcColor: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-3-color)',
      ratio: 0.55,
    }),
    textColor: 'var(--alpha-rectangle-orbit-tetrad-content)',
    arcBorderColor: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-3-color)',
      ratio: 0.8,
    }),
  },
  // 3: Bottom-Left (04) - Coral Rose Pink
  {
    id: '04',
    icon: 'target',
    color: 'var(--alpha-rectangle-orbit-tetrad-item-4-color)',
    cardBg: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-4-color)',
      ratio: 0.9,
    }),
    arcColor: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-4-color)',
      ratio: 0.55,
    }),
    textColor: 'var(--alpha-rectangle-orbit-tetrad-content)',
    arcBorderColor: lightenColor({
      hex: 'var(--alpha-rectangle-orbit-tetrad-item-4-color)',
      ratio: 0.8,
    }),
  },
] as const;

export function resolveSingleItem(
  defaultItem: IResolvedRectangleOrbitTetradItem,
  userItem?: IRectangleOrbitTetradItem,
  defaultArcRatio = 0.55,
  defaultArcBorderRatio = 0.8,
): IResolvedRectangleOrbitTetradItem {
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

export interface IResolveRectangleOrbitTetradItemsParams {
  readonly items?: readonly IRectangleOrbitTetradItem[];
  readonly arcRatio?: number;
  readonly arcBorderRatio?: number;
}

export function resolveRectangleOrbitTetradItems({
  items = [],
  arcRatio = 0.55,
  arcBorderRatio = 0.8,
}: IResolveRectangleOrbitTetradItemsParams = {}): readonly [
  IResolvedRectangleOrbitTetradItem,
  IResolvedRectangleOrbitTetradItem,
  IResolvedRectangleOrbitTetradItem,
  IResolvedRectangleOrbitTetradItem,
] {
  return [
    resolveSingleItem(
      DEFAULT_RECT_ORBIT_TETRAD_ITEMS[0],
      items[0],
      arcRatio,
      arcBorderRatio,
    ),
    resolveSingleItem(
      DEFAULT_RECT_ORBIT_TETRAD_ITEMS[1],
      items[1],
      arcRatio,
      arcBorderRatio,
    ),
    resolveSingleItem(
      DEFAULT_RECT_ORBIT_TETRAD_ITEMS[2],
      items[2],
      arcRatio,
      arcBorderRatio,
    ),
    resolveSingleItem(
      DEFAULT_RECT_ORBIT_TETRAD_ITEMS[3],
      items[3],
      arcRatio,
      arcBorderRatio,
    ),
  ] as const;
}
