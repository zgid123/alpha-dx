import { describe, expect, it } from 'vitest';

import {
  clampPyramidCount,
  computePyramidStacking,
  DEFAULT_PYRAMID_COLOR,
  darkenColor,
  lightenColor,
  MAX_PYRAMID_COUNT,
  MIN_PYRAMID_COUNT,
  PYRAMID_CONTENT_WIDTH_PX,
  PYRAMID_DOT_POSITION_X,
  PYRAMID_TITLE_WIDTH_PX,
  resolvePyramidPalette,
} from '../../../../utils/pyramid/shared';

describe('pyramid shared utilities', () => {
  describe('constants', () => {
    it('declares standard layout and boundary constants', () => {
      expect(DEFAULT_PYRAMID_COLOR).toBe('#3b82f6');
      expect(MIN_PYRAMID_COUNT).toBe(1);
      expect(MAX_PYRAMID_COUNT).toBe(6);
      expect(PYRAMID_TITLE_WIDTH_PX).toBe(150);
      expect(PYRAMID_CONTENT_WIDTH_PX).toBe(240);
      expect(PYRAMID_DOT_POSITION_X).toBe(210);
    });
  });

  describe('#clampPyramidCount', () => {
    it('returns default 4 when count is undefined or NaN', () => {
      expect(clampPyramidCount(undefined)).toBe(4);
      expect(clampPyramidCount(Number.NaN)).toBe(4);
    });

    it('clamps count below minimum to 1', () => {
      expect(clampPyramidCount(0)).toBe(MIN_PYRAMID_COUNT);
      expect(clampPyramidCount(-10)).toBe(MIN_PYRAMID_COUNT);
    });

    it('clamps count above maximum to 6', () => {
      expect(clampPyramidCount(7)).toBe(MAX_PYRAMID_COUNT);
      expect(clampPyramidCount(99)).toBe(MAX_PYRAMID_COUNT);
    });

    it('preserves valid counts from 1 to 6', () => {
      for (let i = 1; i <= 6; i++) {
        expect(clampPyramidCount(i)).toBe(i);
      }
    });
  });

  describe('#lightenColor & #darkenColor', () => {
    it('lightens hex color correctly', () => {
      expect(lightenColor({ hex: '#000000', ratio: 0.5 })).toBe('#808080');
      expect(lightenColor({ hex: '#3b82f6', ratio: 1 })).toBe('#ffffff');
      expect(lightenColor({ hex: '#3b82f6', ratio: 0 })).toBe('#3b82f6');
    });

    it('darkens hex color correctly', () => {
      expect(darkenColor({ hex: '#ffffff', ratio: 0.5 })).toBe('#808080');
      expect(darkenColor({ hex: '#3b82f6', ratio: 1 })).toBe('#000000');
      expect(darkenColor({ hex: '#3b82f6', ratio: 0 })).toBe('#3b82f6');
    });

    it('handles shorthand 3-character hex colors', () => {
      expect(lightenColor({ hex: '#fff', ratio: 0 })).toBe('#ffffff');
      expect(darkenColor({ hex: '#000', ratio: 0 })).toBe('#000000');
    });

    it('returns original input if invalid hex format', () => {
      expect(lightenColor({ hex: 'invalid' })).toBe('invalid');
      expect(darkenColor({ hex: 'invalid' })).toBe('invalid');
    });
  });

  describe('#resolvePyramidPalette', () => {
    it('generates a full palette with default base color', () => {
      const palette = resolvePyramidPalette();
      expect(palette.activeTopEnd).toBe(DEFAULT_PYRAMID_COLOR);
      expect(palette.glow).toBe(DEFAULT_PYRAMID_COLOR);
      expect(palette.activeTopStart).toMatch(/^#[0-9a-f]{6}$/i);
      expect(palette.activeStroke).toMatch(/^#[0-9a-f]{6}$/i);
      expect(palette.defaultTopStart).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('adapts palette when custom base color is provided', () => {
      const customColor = '#10b981';
      const palette = resolvePyramidPalette(customColor);
      expect(palette.activeTopEnd).toBe(customColor);
      expect(palette.glow).toBe(customColor);
    });
  });

  describe('#computePyramidStacking', () => {
    it('computes vertical stacking startCy and step list accurately', () => {
      const radii = [
        { rx: 95, ry: 42.75 },
        { rx: 135, ry: 60.75 },
        { rx: 175, ry: 78.75 },
        { rx: 215, ry: 96.75 },
      ];

      const result = computePyramidStacking({
        count: 4,
        viewBoxHeight: 440,
        slabHeight: 8,
        radii,
      });

      expect(result.startCy).toBeGreaterThan(0);
      expect(result.stepYList).toHaveLength(3);
      expect(result.actualTotalHeight).toBeLessThanOrEqual(440);

      for (const step of result.stepYList) {
        expect(step).toBeGreaterThan(0);
      }
    });
  });
});
