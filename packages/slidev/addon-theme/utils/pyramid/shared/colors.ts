import { DEFAULT_PYRAMID_COLOR } from './constants';
import type { IColorModifierParams, IPyramidPalette } from './types';

export function lightenColor({
  hex,
  ratio = 0.5,
}: IColorModifierParams): string {
  const raw = hex.trim().replace(/^#/, '');
  const sanitized =
    raw.length === 3
      ? raw
          .split('')
          .map((char) => char + char)
          .join('')
      : raw;

  if (sanitized.length !== 6) {
    return hex;
  }

  const r = Number.parseInt(sanitized.slice(0, 2), 16);
  const g = Number.parseInt(sanitized.slice(2, 4), 16);
  const b = Number.parseInt(sanitized.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return hex;
  }

  const clamp = (val: number): number =>
    Math.min(255, Math.max(0, Math.round(val)));
  const lr = clamp(r + (255 - r) * ratio);
  const lg = clamp(g + (255 - g) * ratio);
  const lb = clamp(b + (255 - b) * ratio);

  const toHex = (n: number): string => n.toString(16).padStart(2, '0');

  return `#${toHex(lr)}${toHex(lg)}${toHex(lb)}`;
}

export function darkenColor({
  hex,
  ratio = 0.5,
}: IColorModifierParams): string {
  const raw = hex.trim().replace(/^#/, '');
  const sanitized =
    raw.length === 3
      ? raw
          .split('')
          .map((char) => char + char)
          .join('')
      : raw;

  if (sanitized.length !== 6) {
    return hex;
  }

  const r = Number.parseInt(sanitized.slice(0, 2), 16);
  const g = Number.parseInt(sanitized.slice(2, 4), 16);
  const b = Number.parseInt(sanitized.slice(4, 6), 16);

  if (Number.isNaN(r) || Number.isNaN(g) || Number.isNaN(b)) {
    return hex;
  }

  const clamp = (val: number): number =>
    Math.min(255, Math.max(0, Math.round(val)));
  const dr = clamp(r * (1 - ratio));
  const dg = clamp(g * (1 - ratio));
  const db = clamp(b * (1 - ratio));

  const toHex = (n: number): string => n.toString(16).padStart(2, '0');

  return `#${toHex(dr)}${toHex(dg)}${toHex(db)}`;
}

export function resolvePyramidPalette(
  baseColor: string = DEFAULT_PYRAMID_COLOR,
): IPyramidPalette {
  return {
    activeTopStart: lightenColor({ hex: baseColor, ratio: 0.82 }),
    activeTopEnd: baseColor,
    activeSideStart: darkenColor({ hex: baseColor, ratio: 0.28 }),
    activeSideEnd: lightenColor({ hex: baseColor, ratio: 0.35 }),
    activeStroke: lightenColor({ hex: baseColor, ratio: 0.7 }),
    defaultTopStart: '#ffffff',
    defaultTopEnd: lightenColor({ hex: baseColor, ratio: 0.88 }),
    defaultSideStart: lightenColor({ hex: baseColor, ratio: 0.72 }),
    defaultSideEnd: lightenColor({ hex: baseColor, ratio: 0.88 }),
    defaultStroke: '#ffffff',
    glow: baseColor,
  };
}
