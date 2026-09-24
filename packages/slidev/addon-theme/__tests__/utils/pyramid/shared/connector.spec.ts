import { describe, expect, it } from 'vitest';

import {
  createPyramidConnectorPath,
  resolvePyramidCardPositions,
} from '../../../../utils/pyramid/shared/connector';

describe('pyramid connector utilities', () => {
  describe('#createPyramidConnectorPath', () => {
    it('returns straight horizontal line when startY and endY are aligned', () => {
      const path = createPyramidConnectorPath(
        { x: 0, y: 50 },
        { x: 100, y: 50 },
      );
      expect(path).toBe('M 0 50 L 100 50');
    });

    it('returns zigzag stepped path when startY and endY differ', () => {
      const path = createPyramidConnectorPath(
        { x: 0, y: 100 },
        { x: 100, y: 140 },
      );
      expect(path).toContain('M 0 100');
      expect(path).toContain('140');
      expect(path).toContain('L 100 140');
      // Should have 3 line segments (stub, ramp, card entry)
      const commands = path.split('L');
      expect(commands).toHaveLength(4);
    });

    it('handles negative deltaY (card positioned higher than dot)', () => {
      const path = createPyramidConnectorPath(
        { x: 0, y: 100 },
        { x: 80, y: 70 },
      );
      expect(path).toContain('M 0 100');
      expect(path).toContain('70');
      expect(path).toContain('L 80 70');
    });
  });

  describe('#resolvePyramidCardPositions', () => {
    it('preserves target positions when there is ample space and no collision', () => {
      const targetYList = [100, 200, 300];
      const heights = [40, 40, 40];
      const result = resolvePyramidCardPositions({
        targetYList,
        heights,
        gap: 10,
      });

      expect(result).toEqual(targetYList);
    });

    it('resolves overlapping cards by pushing them apart to maintain the required gap', () => {
      // Cards 0 and 1 overlap: centers are 40px apart, but each is 48px tall
      const targetYList = [100, 140, 240];
      const heights = [48, 48, 48];
      const result = resolvePyramidCardPositions({
        targetYList,
        heights,
        gap: 10,
        minY: 10,
        maxY: 400,
      });

      // Ensure every adjacent card pair has at least gap 10
      for (let i = 0; i < result.length - 1; i++) {
        const curY = result[i] ?? 0;
        const nextY = result[i + 1] ?? 0;
        const curH = heights[i] ?? 48;
        const nextH = heights[i + 1] ?? 48;
        const bottomCurrent = curY + curH / 2;
        const topNext = nextY - nextH / 2;
        expect(topNext - bottomCurrent).toBeGreaterThanOrEqual(9.99);
      }
    });

    it('handles long content in middle card without collisions', () => {
      const targetYList = [70, 110, 160, 220, 290, 365];
      // Card 1 is tall (100px)
      const heights = [48, 100, 48, 48, 48, 48];
      const result = resolvePyramidCardPositions({
        targetYList,
        heights,
        gap: 8,
        minY: 10,
        maxY: 470,
      });

      for (let i = 0; i < result.length - 1; i++) {
        const curY = result[i] ?? 0;
        const nextY = result[i + 1] ?? 0;
        const curH = heights[i] ?? 48;
        const nextH = heights[i + 1] ?? 48;
        const bottomCurrent = curY + curH / 2;
        const topNext = nextY - nextH / 2;
        expect(topNext - bottomCurrent).toBeGreaterThanOrEqual(7.99);
      }
    });

    it('safely handles 0 or 1 item', () => {
      expect(
        resolvePyramidCardPositions({ targetYList: [], heights: [] }),
      ).toEqual([]);
      expect(
        resolvePyramidCardPositions({ targetYList: [120], heights: [50] }),
      ).toEqual([120]);
    });
  });
});
