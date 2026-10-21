import { darkenColor, lightenColor } from '../../colors';
import {
  DEFAULT_DID_COLOR,
  DEFAULT_DID_DOT_COLOR,
  DEFAULT_DID_DOT_GLOW_COLOR,
  DEFAULT_DID_LAYER_COLORS,
  DEFAULT_DID_STROKE_COLOR,
} from './constants';
import type { IDefenseInDepthPalette } from './types';

export function resolveArcDefenseInDepthPalette(
  baseColor: string = DEFAULT_DID_COLOR,
  count = 3,
): IDefenseInDepthPalette {
  if (baseColor === DEFAULT_DID_COLOR && count === 3) {
    return {
      layerColors: DEFAULT_DID_LAYER_COLORS,
      dotColor: DEFAULT_DID_DOT_COLOR,
      dotGlowColor: DEFAULT_DID_DOT_GLOW_COLOR,
      strokeColor: DEFAULT_DID_STROKE_COLOR,
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
    strokeColor: DEFAULT_DID_STROKE_COLOR,
    decorativeStrokeColor: lightenColor({ hex: baseColor, ratio: 0.65 }),
  };
}
