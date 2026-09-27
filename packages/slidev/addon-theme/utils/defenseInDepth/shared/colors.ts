import {
  DEFAULT_DID_COLOR,
  DEFAULT_DID_DOT_COLOR,
  DEFAULT_DID_DOT_GLOW_COLOR,
  DEFAULT_DID_LAYER_COLORS,
} from './constants';
import type { IColorModifierParams, IDefenseInDepthPalette } from './types';

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

export function resolveArcDiDPalette(
  baseColor: string = DEFAULT_DID_COLOR,
  count = 3,
): IDefenseInDepthPalette {
  if (baseColor === DEFAULT_DID_COLOR && count === 3) {
    return {
      layerColors: DEFAULT_DID_LAYER_COLORS,
      dotColor: DEFAULT_DID_DOT_COLOR,
      dotGlowColor: DEFAULT_DID_DOT_GLOW_COLOR,
      strokeColor: '#ffffff',
      decorativeStrokeColor: lightenColor({ hex: baseColor, ratio: 0.65 }),
    };
  }

  const layerColors: string[] = [];
  const safeCount = Math.max(1, count);

  for (let i = 0; i < safeCount; i++) {
    // 0 = outermost (lightest, ratio ~0.35), count - 1 = innermost (deepest, ratio ~0.25 darken)
    if (safeCount === 1) {
      layerColors.push(baseColor);
    } else {
      const t = i / (safeCount - 1);
      if (t < 0.5) {
        const lightenRatio = 0.35 * (1 - t * 2);
        layerColors.push(lightenColor({ hex: baseColor, ratio: lightenRatio }));
      } else {
        const darkenRatio = 0.25 * ((t - 0.5) * 2);
        layerColors.push(darkenColor({ hex: baseColor, ratio: darkenRatio }));
      }
    }
  }

  return {
    layerColors,
    dotColor: darkenColor({ hex: baseColor, ratio: 0.2 }),
    dotGlowColor: lightenColor({ hex: baseColor, ratio: 0.7 }),
    strokeColor: '#ffffff',
    decorativeStrokeColor: lightenColor({ hex: baseColor, ratio: 0.65 }),
  };
}
