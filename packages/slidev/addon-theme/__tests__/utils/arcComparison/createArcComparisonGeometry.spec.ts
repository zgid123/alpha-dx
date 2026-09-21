import { createArcComparisonGeometry } from '../../../utils/arcComparison/createArcComparisonGeometry';

describe('createArcComparisonGeometry', () => {
  describe('#createArcComparisonGeometry', () => {
    suite('when called with default options', () => {
      it('returns 3 points configuration with default viewBox and center', () => {
        const geo = createArcComparisonGeometry();

        expect(geo.viewBoxWidth).toBe(1000);
        expect(geo.viewBoxHeight).toBe(480);
        expect(geo.centerX).toBe(500);
        expect(geo.centerY).toBe(240);
        expect(geo.pointsCount).toBe(3);
        expect(geo.left.nodes).toHaveLength(3);
        expect(geo.right.nodes).toHaveLength(3);
      });
    });

    suite('when calculating default 3 points positions', () => {
      it('generates central node at centerY and outer nodes at symmetrical offsets', () => {
        const geo = createArcComparisonGeometry({ pointsCount: 3 });

        const [topNode, centerNode, bottomNode] = geo.left.nodes;

        expect(centerNode?.center.y).toBe(240);
        expect(topNode?.center.y).toBeLessThan(240);
        expect(bottomNode?.center.y).toBeGreaterThan(240);
        expect(240 - (topNode?.center.y ?? 0)).toBeCloseTo(
          (bottomNode?.center.y ?? 0) - 240,
          1,
        );
      });
    });

    suite('when checking horizontal symmetry for 3 points', () => {
      it('mirrors left and right node X coordinates perfectly around centerX', () => {
        const geo = createArcComparisonGeometry({ pointsCount: 3 });

        for (let i = 0; i < 3; i++) {
          const leftNode = geo.left.nodes[i];
          const rightNode = geo.right.nodes[i];

          expect(leftNode?.center.x).toBeDefined();
          expect(rightNode?.center.x).toBeDefined();
          expect(
            (leftNode?.center.x ?? 0) + (rightNode?.center.x ?? 0),
          ).toBeCloseTo(1000, 1);
          expect(leftNode?.center.y).toBe(rightNode?.center.y);
        }
      });
    });

    suite('when pointsCount is 4', () => {
      it('returns 4 nodes per side with correct indexing', () => {
        const geo = createArcComparisonGeometry({ pointsCount: 4 });

        expect(geo.pointsCount).toBe(4);
        expect(geo.left.nodes).toHaveLength(4);
        expect(geo.right.nodes).toHaveLength(4);
        expect(geo.left.callouts).toHaveLength(4);
        expect(geo.right.callouts).toHaveLength(4);
        expect(geo.left.nodes.map((n) => n.index)).toEqual([0, 1, 2, 3]);
      });
    });

    suite('when checking node distribution for 4 points', () => {
      it('orders nodes monotonically from top to bottom on both sides', () => {
        const geo = createArcComparisonGeometry({ pointsCount: 4 });

        for (let i = 0; i < 3; i++) {
          expect(geo.left.nodes[i]?.center.y).toBeLessThan(
            geo.left.nodes[i + 1]?.center.y ?? 0,
          );
          expect(geo.right.nodes[i]?.center.y).toBeLessThan(
            geo.right.nodes[i + 1]?.center.y ?? 0,
          );
        }
      });
    });

    suite('when evaluating callout text gap for 4 points', () => {
      it('allocates wider textGap of 46 for index 0 and standard 28 for others', () => {
        const geo = createArcComparisonGeometry({ pointsCount: 4 });

        expect(geo.left.callouts[0]?.textGap).toBe(46);
        expect(geo.left.callouts[1]?.textGap).toBe(28);
        expect(geo.left.callouts[2]?.textGap).toBe(28);
        expect(geo.left.callouts[3]?.textGap).toBe(28);
      });
    });

    suite('when evaluating vertical bounds for 4 points callouts', () => {
      it('keeps all callouts within the viewBox height', () => {
        const geo = createArcComparisonGeometry({ pointsCount: 4 });

        for (const callout of geo.left.callouts) {
          expect(callout.top).toBeGreaterThan(0);
          expect(callout.top).toBeLessThan(480);
        }
      });
    });

    suite('when custom dimensions and radii are provided', () => {
      it('respects custom viewBox, hubRadius, and arcRadius', () => {
        const geo = createArcComparisonGeometry({
          viewBoxWidth: 1200,
          viewBoxHeight: 600,
          hubRadius: 160,
          arcRadius: 300,
          arcOffset: 30,
          vsRadius: 32,
        });

        expect(geo.viewBoxWidth).toBe(1200);
        expect(geo.viewBoxHeight).toBe(600);
        expect(geo.centerX).toBe(600);
        expect(geo.centerY).toBe(300);
        expect(geo.vsRadius).toBe(32);
        expect(geo.left.hubRadius).toBe(160);
        expect(geo.dividerLine.x).toBe(600);
        expect(geo.dividerLine.y2).toBe(580);
      });
    });

    suite('when generating SVG path strings', () => {
      it('produces valid SVG move and arc commands for hubs and arcs', () => {
        const geo = createArcComparisonGeometry();

        expect(geo.left.hubPath).toMatch(/^M 0 \d+(\.\d+)? A \d+/);
        expect(geo.right.hubPath).toMatch(/^M 1000 \d+(\.\d+)? A \d+/);
        expect(geo.left.arcPath).toMatch(/^M \d+(\.\d+)? \d+(\.\d+)? A \d+/);
        expect(geo.right.arcPath).toMatch(/^M \d+(\.\d+)? \d+(\.\d+)? A \d+/);
      });
    });
  });
});
