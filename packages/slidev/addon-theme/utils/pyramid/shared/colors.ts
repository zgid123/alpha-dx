import { darkenColor, lightenColor } from '../../colors';
import { DEFAULT_PYRAMID_COLOR, DEFAULT_PYRAMID_HIGHLIGHT } from './constants';
import type { IPyramidPalette } from './types';

export function resolvePyramidPalette(
  baseColor: string = DEFAULT_PYRAMID_COLOR,
): IPyramidPalette {
  return {
    activeTopStart: lightenColor({
      hex: baseColor,
      ratio: 0.82,
    }),
    activeTopEnd: baseColor,
    activeSideStart: darkenColor({
      hex: baseColor,
      ratio: 0.28,
    }),
    activeSideEnd: lightenColor({
      hex: baseColor,
      ratio: 0.35,
    }),
    activeStroke: lightenColor({
      hex: baseColor,
      ratio: 0.7,
    }),
    defaultTopStart: DEFAULT_PYRAMID_HIGHLIGHT,
    defaultTopEnd: lightenColor({
      hex: baseColor,
      ratio: 0.88,
    }),
    defaultSideStart: lightenColor({
      hex: baseColor,
      ratio: 0.72,
    }),
    defaultSideEnd: lightenColor({
      hex: baseColor,
      ratio: 0.88,
    }),
    defaultStroke: DEFAULT_PYRAMID_HIGHLIGHT,
    glow: baseColor,
  };
}
