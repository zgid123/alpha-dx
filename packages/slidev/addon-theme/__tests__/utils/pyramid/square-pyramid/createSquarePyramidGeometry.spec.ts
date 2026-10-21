import { describe, expect, it } from 'vitest';

import {
  clampSquareCount,
  createSquarePyramidGeometry,
  DEFAULT_SQUARE_PYRAMID_COLOR,
  DEFAULT_SQUARE_PYRAMID_STACK_COLORS,
  MAX_SQUARE_COUNT,
  MIN_SQUARE_COUNT,
  resolveSquarePyramidPalette,
} from '../../../../utils/pyramid/square-pyramid';

describe('squarePyramid utilities', () => {
  describe('#clampSquareCount', () => {
    it('returns default 4 when count is undefined or NaN', () => {
      expect(clampSquareCount(undefined)).toBe(4);
      expect(clampSquareCount(Number.NaN)).toBe(4);
    });

    it('clamps count below minimum to 1', () => {
      expect(clampSquareCount(0)).toBe(MIN_SQUARE_COUNT);
      expect(clampSquareCount(-5)).toBe(MIN_SQUARE_COUNT);
    });

    it('clamps count above maximum to 6', () => {
      expect(clampSquareCount(7)).toBe(MAX_SQUARE_COUNT);
      expect(clampSquareCount(100)).toBe(MAX_SQUARE_COUNT);
    });

    it('preserves valid counts from 1 to 6', () => {
      for (let i = 1; i <= 6; i++) {
        expect(clampSquareCount(i)).toBe(i);
      }
    });
  });

  describe('#resolveSquarePyramidPalette', () => {
    it('generates a full palette with default base color', () => {
      const palette = resolveSquarePyramidPalette();
      expect(palette.activeTopEnd).toBe(DEFAULT_SQUARE_PYRAMID_COLOR);
      expect(palette.glow).toBe(DEFAULT_SQUARE_PYRAMID_COLOR);
      expect(palette.activeTopStart).toContain('color-mix(in srgb');
      expect(palette.activeStroke).toContain('color-mix(in srgb');
      expect(palette.defaultTopStart).toBe('var(--alpha-pyramid-highlight)');
    });

    it('adapts palette when custom base color is provided', () => {
      const customColor = '#10b981';
      const palette = resolveSquarePyramidPalette(customColor);
      expect(palette.activeTopEnd).toBe(customColor);
      expect(palette.glow).toBe(customColor);
      expect(palette.activeTopStart).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });

  describe('#DEFAULT_SQUARE_PYRAMID_STACK_COLORS', () => {
    it('defines 6 distinct stack color tokens', () => {
      expect(DEFAULT_SQUARE_PYRAMID_STACK_COLORS).toHaveLength(6);
      for (const token of DEFAULT_SQUARE_PYRAMID_STACK_COLORS) {
        expect(token).toMatch(
          /^var\(--alpha-square-pyramid-stack-[1-6]-color\)$/,
        );
      }

      const uniqueColors = new Set(DEFAULT_SQUARE_PYRAMID_STACK_COLORS);
      expect(uniqueColors.size).toBe(6);
    });
  });

  describe('#createSquarePyramidGeometry', () => {
    it('creates single square slab geometry when count is 1', () => {
      const geo = createSquarePyramidGeometry({ count: 1 });
      expect(geo.count).toBe(1);
      expect(geo.layers).toHaveLength(1);

      const layer = geo.layers[0];
      expect(layer).toBeDefined();
      if (!layer) {
        return;
      }

      expect(layer.index).toBe(0);
      expect(layer.rx).toBe(110);
      expect(layer.cx).toBe(480);
      expect(layer.topFacePath).toContain('M');
      expect(layer.topFacePath).toContain('Q');
      expect(layer.innerFacePath).toContain('M');
      expect(layer.sidePath).toContain('M');
      expect(layer.leftSidePath).toContain('M');
      expect(layer.rightSidePath).toContain('M');
      expect(layer.bottomEdgePath).toContain('M');
    });

    it('creates 4 square layers by default with monotonically increasing sizes', () => {
      const geo = createSquarePyramidGeometry();
      expect(geo.count).toBe(4);
      expect(geo.layers).toHaveLength(4);

      for (let i = 0; i < geo.layers.length - 1; i++) {
        const current = geo.layers[i];
        const next = geo.layers[i + 1];
        expect(current).toBeDefined();
        expect(next).toBeDefined();
        if (current && next) {
          expect(current.rx).toBeLessThan(next.rx);
          expect(current.ry).toBeLessThan(next.ry);
          expect(current.cy).toBeLessThan(next.cy);
        }
      }
    });

    it('supports 2 to 6 square layers correctly', () => {
      for (let n = 2; n <= 6; n++) {
        const geo = createSquarePyramidGeometry({ count: n });
        expect(geo.count).toBe(n);
        expect(geo.layers).toHaveLength(n);

        const firstLayer = geo.layers[0];
        const lastLayer = geo.layers[n - 1];
        expect(firstLayer).toBeDefined();
        expect(lastLayer).toBeDefined();
        if (firstLayer && lastLayer) {
          expect(firstLayer.index).toBe(0);
          expect(lastLayer.index).toBe(n - 1);
          expect(firstLayer.rx).toBeLessThan(lastLayer.rx);
          expect(firstLayer.cy).toBeLessThan(lastLayer.cy);
        }
      }
    });

    it('calculates slabCenterY at exact vertical middle of the slab thickness', () => {
      const geo = createSquarePyramidGeometry({ count: 4 });
      for (const layer of geo.layers) {
        expect(layer.slabCenterY).toBeDefined();
        const expectedCenter = Number(
          (layer.cy + layer.slabHeight / 2).toFixed(2),
        );
        expect(layer.slabCenterY).toBe(expectedCenter);
      }
    });

    it('ensures each layer consistently overlaps the layer below it without gaps', () => {
      for (let n = 2; n <= 6; n++) {
        const geo = createSquarePyramidGeometry({ count: n });
        for (let i = 0; i < geo.layers.length - 1; i++) {
          const current = geo.layers[i];
          const next = geo.layers[i + 1];
          if (current && next) {
            const currentBottom = current.cy + current.slabHeight + current.ry;
            const nextTop = next.cy - next.ry;
            expect(currentBottom).toBeGreaterThan(nextTop);
          }
        }
      }
    });

    it('respects custom viewBox dimensions', () => {
      const geo = createSquarePyramidGeometry({
        count: 3,
        viewBoxWidth: 600,
        viewBoxHeight: 500,
      });

      expect(geo.viewBoxWidth).toBe(600);
      expect(geo.viewBoxHeight).toBe(500);
      expect(geo.layers[0]?.cx).toBe(300);
    });

    it('respects custom topSize and bottomSize options', () => {
      const geo = createSquarePyramidGeometry({
        count: 3,
        topSize: 85,
        bottomSize: 195,
      });

      expect(geo.layers[0]?.rx).toBe(85);
      expect(geo.layers[2]?.rx).toBe(195);
    });

    it('respects custom cx option to center pyramid horizontally', () => {
      const geo = createSquarePyramidGeometry({
        count: 4,
        viewBoxWidth: 960,
        cx: 465,
      });

      expect(geo.layers[0]?.cx).toBe(465);
      expect(geo.layers[3]?.cx).toBe(465);
    });
  });
});
