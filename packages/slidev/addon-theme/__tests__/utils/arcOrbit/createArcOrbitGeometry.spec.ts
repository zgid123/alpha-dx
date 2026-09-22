import { createArcOrbitGeometry } from '../../../utils/arcOrbit/createArcOrbitGeometry';

describe('createArcOrbitGeometry', () => {
  describe('#createArcOrbitGeometry', () => {
    suite('when called with default options', () => {
      it('returns 3 points configuration with default viewBox and left position', () => {
        const geo = createArcOrbitGeometry();

        expect(geo.viewBoxWidth).toBe(500);
        expect(geo.viewBoxHeight).toBe(480);
        expect(geo.position).toBe('left');
        expect(geo.pointsCount).toBe(3);
        expect(geo.nodes).toHaveLength(3);
        expect(geo.callouts).toHaveLength(3);
        expect(geo.hubCenter).toEqual({ x: 30, y: 240 });
      });
    });

    suite('when position is right', () => {
      it('returns mirrored geometry with hub at right edge', () => {
        const leftGeo = createArcOrbitGeometry({ position: 'left' });
        const rightGeo = createArcOrbitGeometry({ position: 'right' });

        expect(rightGeo.position).toBe('right');
        expect(rightGeo.hubCenter).toEqual({ x: 470, y: 240 });

        for (let i = 0; i < 3; i++) {
          const leftNode = leftGeo.nodes[i];
          const rightNode = rightGeo.nodes[i];

          expect(leftNode?.center.x).toBeDefined();
          expect(rightNode?.center.x).toBeDefined();
          expect(
            (leftNode?.center.x ?? 0) + (rightNode?.center.x ?? 0),
          ).toBeCloseTo(500, 1);
          expect(leftNode?.center.y).toBe(rightNode?.center.y);
        }
      });
    });

    suite('when pointsCount is 4', () => {
      it('returns 4 nodes and callouts with correct indexing', () => {
        const geo = createArcOrbitGeometry({ pointsCount: 4 });

        expect(geo.pointsCount).toBe(4);
        expect(geo.nodes).toHaveLength(4);
        expect(geo.callouts).toHaveLength(4);

        for (let i = 0; i < 4; i++) {
          expect(geo.nodes[i]?.index).toBe(i);
          expect(geo.callouts[i]?.index).toBe(i);
        }
      });

      it('allocates wider textGap of 46 for index 0 and standard 28 for others', () => {
        const geo = createArcOrbitGeometry({ pointsCount: 4 });

        expect(geo.callouts[0]?.textGap).toBe(46);
        expect(geo.callouts[1]?.textGap).toBe(28);
        expect(geo.callouts[2]?.textGap).toBe(28);
        expect(geo.callouts[3]?.textGap).toBe(28);
      });
    });

    suite('when generating SVG paths', () => {
      it('produces valid SVG move and arc commands for hubs and arcs with default edgeOffset', () => {
        const leftGeo = createArcOrbitGeometry({ position: 'left' });
        const rightGeo = createArcOrbitGeometry({ position: 'right' });

        expect(leftGeo.hubPath).toMatch(
          /^M\s*30\s+105\s+A\s*135\s+135\s+0\s+0\s+1\s+30\s+375\s+A\s*135\s+135\s+0\s+0\s+1\s+30\s+105\s+Z$/,
        );
        expect(rightGeo.hubPath).toMatch(
          /^M\s*470\s+105\s+A\s*135\s+135\s+0\s+0\s+1\s+470\s+375\s+A\s*135\s+135\s+0\s+0\s+1\s+470\s+105\s+Z$/,
        );
        expect(leftGeo.arcPath).toContain('A 235 235 0 0 1');
        expect(rightGeo.arcPath).toContain('A 235 235 0 0 0');
      });

      it('produces flat semicircle path when edgeOffset is 0', () => {
        const leftGeo = createArcOrbitGeometry({
          position: 'left',
          edgeOffset: 0,
        });
        const rightGeo = createArcOrbitGeometry({
          position: 'right',
          edgeOffset: 0,
        });

        expect(leftGeo.hubCenter).toEqual({ x: 0, y: 240 });
        expect(rightGeo.hubCenter).toEqual({ x: 500, y: 240 });
        expect(leftGeo.hubPath).toMatch(
          /^M\s*0\s+105\s+A\s*135\s+135\s+0\s+0\s+1\s+0\s+375\s+Z$/,
        );
        expect(rightGeo.hubPath).toMatch(
          /^M\s*500\s+105\s+A\s*135\s+135\s+0\s+0\s+0\s+500\s+375\s+Z$/,
        );
      });
    });
  });
});
