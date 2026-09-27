import { describe, expect, it, suite } from 'vitest';

import {
  calculatePartAngles,
  createArcDiDGeometry,
  createDecorativeArcs,
  describeArc,
  describeArcBand,
  polarToCartesian,
  round,
} from '../../../../utils/defenseInDepth/arcDid/createArcDiDGeometry';
import {
  darkenColor,
  lightenColor,
  resolveArcDiDPalette,
} from '../../../../utils/defenseInDepth/shared/colors';
import {
  DEFAULT_DID_COLOR,
  DEFAULT_DID_LAYER_COLORS,
} from '../../../../utils/defenseInDepth/shared/constants';

describe('defenseInDepth/arcDid utilities', () => {
  describe('#round', () => {
    suite('when rounding numbers', () => {
      it('rounds to 2 decimal places by default', () => {
        expect(round(12.3456)).toBe(12.35);
        expect(round(12.341)).toBe(12.34);
      });

      it('respects custom decimal places', () => {
        expect(round(12.3456, 1)).toBe(12.3);
        expect(round(12.3456, 3)).toBe(12.346);
      });
    });
  });

  describe('#polarToCartesian', () => {
    suite('when converting polar coordinates to Cartesian', () => {
      const cx = 450;
      const cy = 400;
      const r = 100;

      it('calculates 90 deg straight up (-y direction)', () => {
        const pt = polarToCartesian(cx, cy, r, 90);
        expect(pt.x).toBe(450);
        expect(pt.y).toBe(300);
      });

      it('calculates 180 deg to the left (-x direction)', () => {
        const pt = polarToCartesian(cx, cy, r, 180);
        expect(pt.x).toBe(350);
        expect(pt.y).toBe(400);
      });

      it('calculates 0 deg to the right (+x direction)', () => {
        const pt = polarToCartesian(cx, cy, r, 0);
        expect(pt.x).toBe(550);
        expect(pt.y).toBe(400);
      });

      it('calculates diagonal angles symmetrically', () => {
        const ptLeft = polarToCartesian(cx, cy, r, 135);
        const ptRight = polarToCartesian(cx, cy, r, 45);

        expect(ptLeft.y).toBeCloseTo(ptRight.y, 1);
        expect(cx - ptLeft.x).toBeCloseTo(ptRight.x - cx, 1);
      });
    });
  });

  describe('#describeArc & #describeArcBand', () => {
    suite('when generating SVG arc paths', () => {
      it('creates an SVG open arc path string', () => {
        const path = describeArc(400, 300, 100, 180, 0);
        expect(path).toContain('M 300 300');
        expect(path).toContain('A 100 100 0');
        expect(path).toContain('500 300');
      });

      it('creates a closed half-annulus band path', () => {
        const path = describeArcBand(450, 440, 100, 200, 180, 0);
        expect(path.startsWith('M')).toBe(true);
        expect(path.endsWith('Z')).toBe(true);
        expect(path).toContain('A 200 200 0 0 1');
        expect(path).toContain('A 100 100 0 0 0');
      });
    });
  });

  describe('#calculatePartAngles', () => {
    suite('when determining part angle distribution along the arc', () => {
      it('returns empty array when part count is 0 or negative', () => {
        expect(calculatePartAngles(0)).toEqual([]);
        expect(calculatePartAngles(-2)).toEqual([]);
      });

      it('returns single angle at 145 deg when count is 1', () => {
        expect(calculatePartAngles(1)).toEqual([145]);
      });

      it('splits 2 parts evenly across left and right', () => {
        const angles = calculatePartAngles(2);
        expect(angles).toHaveLength(2);
        expect(angles[0]).toBe(145);
        expect(angles[1]).toBe(35);
      });

      it('distributes 4 parts (2 left, 2 right) with clear title clearance', () => {
        const angles = calculatePartAngles(4);
        expect(angles).toHaveLength(4);
        // Left items: 162.5 and 127.5
        expect(angles[0]).toBe(162.5);
        expect(angles[1]).toBe(127.5);
        // Right items: 52.5 and 17.5
        expect(angles[2]).toBe(52.5);
        expect(angles[3]).toBe(17.5);

        // Ensure title zone (around 90 deg) is preserved
        expect(angles[1]).toBeGreaterThan(110);
        expect(angles[2]).toBeLessThan(70);
      });

      it('handles odd number of parts like 3 by allocating ceiling to left', () => {
        const angles = calculatePartAngles(3);
        expect(angles).toHaveLength(3);
        expect(angles[0]).toBe(162.5);
        expect(angles[1]).toBe(127.5);
        expect(angles[2]).toBe(35);
      });
    });
  });

  describe('#createDecorativeArcs', () => {
    suite('when generating outer shield decorative arcs', () => {
      it('returns empty array to avoid extraneous decorative arc lines', () => {
        const decor = createDecorativeArcs(450, 440, 390, 110);
        expect(decor).toEqual([]);
      });
    });
  });

  describe('#createArcDiDGeometry', () => {
    suite('when creating full ArcDiD geometry', () => {
      it('returns empty layers and no cutout when neither count nor layers are defined', () => {
        const geo = createArcDiDGeometry();

        expect(geo.count).toBe(0);
        expect(geo.layers).toHaveLength(0);
        expect(geo.innerCutoutPath).toBe('');
      });

      it('creates layers with outer-to-inner ordering when count is specified', () => {
        const geo = createArcDiDGeometry({ count: 3 });

        expect(geo.count).toBe(3);
        expect(geo.layers).toHaveLength(3);

        const [outer, middle, inner] = geo.layers;
        expect(outer).toBeDefined();
        expect(middle).toBeDefined();
        expect(inner).toBeDefined();

        if (outer && middle && inner) {
          expect(outer.outerRadius).toBeGreaterThan(middle.outerRadius);
          expect(middle.outerRadius).toBeGreaterThan(inner.outerRadius);

          // Outermost layer has larger radius than innermost layer
          expect(outer.outerRadius).toBe(geo.outerRadius);
          expect(inner.innerRadius).toBeCloseTo(geo.innerRadius, 0);

          // Title positions are centered at 90 degrees (x = cx)
          expect(outer.titlePosition.x).toBe(geo.cx);
          expect(middle.titlePosition.x).toBe(geo.cx);
          expect(inner.titlePosition.x).toBe(geo.cx);
          expect(outer.titlePosition.y).toBeLessThan(middle.titlePosition.y);
        }
      });

      it('supports inner-to-outer ordering when count is specified', () => {
        const geo = createArcDiDGeometry({ count: 3, order: 'inner-to-outer' });
        const [layer0, layer1, layer2] = geo.layers;
        expect(layer0).toBeDefined();
        expect(layer1).toBeDefined();
        expect(layer2).toBeDefined();

        if (layer0 && layer1 && layer2) {
          expect(layer0.innerRadius).toBe(geo.innerRadius);
          expect(layer0.outerRadius).toBeLessThan(layer1.outerRadius);
          expect(layer1.outerRadius).toBeLessThan(layer2.outerRadius);
        }
      });

      it('populates layers and parts when custom layers are defined', () => {
        const geo = createArcDiDGeometry({
          layers: [
            {
              title: 'Physical\ncontrols',
              parts: [
                'Access control mechanisms',
                'Perimeter security',
                'Monitoring systems',
                'Environmental protections',
              ],
            },
            {
              title: 'Administrative\ncontrols',
              parts: ['Policies & procedures', 'Training & awareness'],
            },
            {
              title: 'Technical\ncontrols',
              parts: ['Host security', 'Network security'],
            },
          ],
        });

        expect(geo.count).toBe(3);
        expect(geo.layers).toHaveLength(3);
        expect(geo.layers[0]?.parts).toHaveLength(4);
        expect(geo.layers[1]?.parts).toHaveLength(2);
        expect(geo.layers[2]?.parts).toHaveLength(2);

        expect(geo.layers[0]?.parts[0]?.label).toBe(
          'Access control mechanisms',
        );
        expect(geo.layers[2]?.parts[1]?.label).toBe('Network security');
        expect(geo.layers[0]?.parts[0]?.path).toContain('A');
        expect(geo.layers[0]?.titlePath).toContain('A');
        expect(geo.innerCutoutPath).toContain('M');
      });

      it('respects custom viewBox, center, radii, and layer count', () => {
        const geo = createArcDiDGeometry({
          viewBoxWidth: 1000,
          viewBoxHeight: 600,
          cx: 500,
          cy: 550,
          innerRadius: 150,
          outerRadius: 450,
          count: 2,
          gap: 10,
        });

        expect(geo.viewBoxWidth).toBe(1000);
        expect(geo.viewBoxHeight).toBe(600);
        expect(geo.cx).toBe(500);
        expect(geo.cy).toBe(550);
        expect(geo.innerRadius).toBe(150);
        expect(geo.outerRadius).toBe(450);
        expect(geo.count).toBe(2);
        expect(geo.layers).toHaveLength(2);
      });

      it('respects custom layer items with manual angles and radial offsets', () => {
        const geo = createArcDiDGeometry({
          layers: [
            {
              title: 'Perimeter',
              parts: [
                {
                  label: 'Gate A',
                  angle: 140,
                  span: 20,
                  radialOffset: 15,
                  color: '#ff0000',
                },
                { label: 'Gate B' },
              ],
            },
          ],
        });

        expect(geo.count).toBe(1);
        const part0 = geo.layers[0]?.parts[0];
        const layer0 = geo.layers[0];
        expect(part0).toBeDefined();
        expect(layer0).toBeDefined();
        if (part0 && layer0) {
          expect(part0.angle).toBe(140);
          expect(part0.startAngle).toBe(150);
          expect(part0.endAngle).toBe(130);
          expect(part0.color).toBe('#ff0000');
          expect(part0.radius).toBe(layer0.midRadius + 15);
        }
      });

      it('calculates independent sector boundaries per layer when part counts differ', () => {
        const geo = createArcDiDGeometry({
          layers: [
            {
              title: 'Outer (10 parts)',
              parts: Array.from({ length: 10 }, (_, i) => `P${i + 1}`),
            },
            {
              title: 'Middle (4 parts)',
              parts: ['M1', 'M2', 'M3', 'M4'],
            },
          ],
        });

        expect(geo.layers).toHaveLength(2);
        const outerParts = geo.layers[0]?.parts ?? [];
        const middleParts = geo.layers[1]?.parts ?? [];

        expect(outerParts).toHaveLength(10);
        expect(middleParts).toHaveLength(4);

        // Outer layer has 10 parts with narrow sectors
        const outerSpan =
          (outerParts[0]?.startAngle ?? 0) - (outerParts[0]?.endAngle ?? 0);
        // Middle layer has 4 parts with wider sectors
        const middleSpan =
          (middleParts[0]?.startAngle ?? 0) - (middleParts[0]?.endAngle ?? 0);

        expect(outerSpan).toBeLessThan(middleSpan);
        // Boundaries do not align across layers
        expect(outerParts[0]?.endAngle).not.toBe(middleParts[0]?.endAngle);
      });

      it('ensures title sector boundaries and adjacent part boundaries are exactly coincident (no double lines)', () => {
        const geo = createArcDiDGeometry({
          layers: [
            {
              title: 'Physical controls',
              parts: ['Access to servers', 'Infrastructure'],
            },
          ],
        });
        const layer = geo.layers[0];
        expect(layer).toBeDefined();
        const leftPart = layer?.parts[0];
        const rightPart = layer?.parts[1];

        expect(layer?.titleLeft).toBeDefined();
        expect(layer?.titleRight).toBeDefined();
        expect(leftPart?.endAngle).toBe(layer?.titleLeft);
        expect(rightPart?.startAngle).toBe(layer?.titleRight);
      });

      it('supports sectors with stacked parts (top and bottom tracks)', () => {
        const geo = createArcDiDGeometry({
          layers: [
            {
              title: 'Technical controls',
              sectors: [
                {
                  parts: ['Authentication'],
                },
                {
                  split: false,
                  parts: [
                    { label: 'Access control', position: 'top' },
                    { label: 'Encryption', position: 'bottom' },
                  ],
                },
              ],
            },
          ],
        });

        const layer = geo.layers[0];
        expect(layer).toBeDefined();
        expect(layer?.sectors).toHaveLength(2);

        // Sector 0 has 1 part
        expect(layer?.sectors[0]?.parts).toHaveLength(1);
        expect(layer?.sectors[0]?.parts[0]?.label).toBe('Authentication');

        // Sector 1 has 2 stacked parts
        const sector1 = layer?.sectors[1];
        expect(sector1).toBeDefined();
        expect(sector1?.parts).toHaveLength(2);
        expect(sector1?.split).toBe(false);

        const topPart = sector1?.parts[0];
        const bottomPart = sector1?.parts[1];

        expect(topPart?.label).toBe('Access control');
        expect(topPart?.position).toBe('top');
        expect(bottomPart?.label).toBe('Encryption');
        expect(bottomPart?.position).toBe('bottom');

        // Top part has larger radius than bottom part
        expect(topPart?.radius).toBeGreaterThan(bottomPart?.radius ?? 0);

        // Both parts share the same angular center and span
        expect(topPart?.angle).toBe(bottomPart?.angle);
        expect(topPart?.startAngle).toBe(bottomPart?.startAngle);
        expect(topPart?.endAngle).toBe(bottomPart?.endAngle);

        // Flatted layer.parts contains all 3 parts
        expect(layer?.parts).toHaveLength(3);
      });

      it('generates concentric divider arc paths when split is true', () => {
        const geo = createArcDiDGeometry({
          layers: [
            {
              title: 'Technical controls',
              sectors: [
                {
                  split: true,
                  parts: [
                    { label: 'DDM', position: 'top' },
                    { label: 'DLP', position: 'middle' },
                    { label: 'Audit', position: 'bottom' },
                  ],
                },
              ],
            },
          ],
        });

        const layer = geo.layers[0];
        expect(layer).toBeDefined();
        const sector = layer?.sectors[0];
        expect(sector).toBeDefined();
        expect(sector?.split).toBe(true);
        expect(sector?.parts).toHaveLength(3);

        // 3 parts produce 2 concentric divider arc paths
        expect(sector?.dividerPaths).toHaveLength(2);
        for (const dPath of sector?.dividerPaths ?? []) {
          expect(dPath.startsWith('M')).toBe(true);
          expect(dPath).toContain('A');
        }

        // Radii decrease monotonically: top > middle > bottom
        const [pTop, pMid, pBot] = sector?.parts ?? [];
        expect(pTop?.radius).toBeGreaterThan(pMid?.radius ?? 0);
        expect(pMid?.radius).toBeGreaterThan(pBot?.radius ?? 0);
      });

      it('defaults split to true when sector has multiple parts and split is omitted', () => {
        const geo = createArcDiDGeometry({
          count: 1,
          layers: [
            {
              sectors: [
                {
                  parts: ['DDM', 'DLP'],
                },
              ],
            },
          ],
        });

        const sector = geo.layers[0]?.sectors[0];
        expect(sector?.split).toBe(true);
        expect(sector?.dividerPaths).toHaveLength(1);
      });

      it('respects explicit split: false', () => {
        const geo = createArcDiDGeometry({
          count: 1,
          layers: [
            {
              sectors: [
                {
                  split: false,
                  parts: ['DDM', 'DLP'],
                },
              ],
            },
          ],
        });

        const sector = geo.layers[0]?.sectors[0];
        expect(sector?.split).toBe(false);
        expect(sector?.dividerPaths).toHaveLength(0);
      });

      it('supports custom sector spans to allocate narrower and wider sectors contiguously', () => {
        const geo = createArcDiDGeometry({
          count: 1,
          layers: [
            {
              sectors: [
                {
                  span: 26,
                  parts: ['Authentication'],
                },
                {
                  span: 42,
                  parts: ['Access control', 'Encryption'],
                },
                {
                  parts: ['DDM', 'DLP'],
                },
                {
                  parts: ['Audit'],
                },
              ],
            },
          ],
        });

        const layer = geo.layers[0];
        expect(layer?.sectors).toHaveLength(4);

        const [s1, s2] = layer?.sectors ?? [];
        expect(s1).toBeDefined();
        expect(s2).toBeDefined();

        // Starts seamlessly at 180 and tiles down to titleLeft
        expect(s1?.startAngle).toBe(180);
        expect(s1?.endAngle).toBe(154);
        expect(s2?.startAngle).toBe(154);
        expect(s2?.endAngle).toBe(layer?.titleLeft);

        // First sector span is smaller than second sector span
        expect(s1?.span).toBe(26);
        expect(s2?.span).toBe(round(154 - (layer?.titleLeft ?? 0), 1));
        expect(s1?.span).toBeLessThan(s2?.span ?? 0);
      });

      it('supports rotate and skew properties on part items', () => {
        const geo = createArcDiDGeometry({
          count: 1,
          layers: [
            {
              parts: [
                { label: 'Normal' },
                { label: 'Rotated', rotate: 'tangent' },
                { label: 'CustomRotated', rotate: -30, skew: 15 },
              ],
            },
          ],
        });

        const layer = geo.layers[0];
        const normalPart = layer?.parts[0];
        const rotatedPart = layer?.parts[1];
        const customPart = layer?.parts[2];

        expect(normalPart?.rotate).toBeUndefined();
        expect(normalPart?.rotationAngle).toBeUndefined();

        expect(rotatedPart?.rotate).toBe('tangent');
        expect(rotatedPart?.rotationAngle).toBeDefined();
        // tangent rotation is 90 - partAngle
        expect(rotatedPart?.rotationAngle).toBe(
          round(90 - (rotatedPart?.angle ?? 0), 1),
        );

        expect(customPart?.rotate).toBe(-30);
        expect(customPart?.rotationAngle).toBe(-30);
        expect(customPart?.skew).toBe(15);
      });

      it('inherits rotate and skew from sector item to child parts', () => {
        const geo = createArcDiDGeometry({
          layers: [
            {
              sectors: [
                {
                  rotate: 'tangent',
                  parts: [
                    { label: 'Part1', position: 'top' },
                    { label: 'Part2', position: 'bottom' },
                  ],
                },
              ],
            },
          ],
        });

        const sector = geo.layers[0]?.sectors[0];
        expect(sector?.rotate).toBe('tangent');
        expect(sector?.parts[0]?.rotate).toBe('tangent');
        expect(sector?.parts[0]?.rotationAngle).toBeDefined();
        expect(sector?.parts[1]?.rotate).toBe('tangent');
        expect(sector?.parts[1]?.rotationAngle).toBeDefined();
      });
    });
  });

  describe('colors and palettes', () => {
    suite('when testing color utility functions', () => {
      it('lightens colors correctly with hex output', () => {
        const light = lightenColor({ hex: '#000000', ratio: 0.5 });
        expect(light).toBe('#808080');

        const shorthand = lightenColor({ hex: '#000', ratio: 0.5 });
        expect(shorthand).toBe('#808080');
      });

      it('darkens colors correctly with hex output', () => {
        const dark = darkenColor({ hex: '#ffffff', ratio: 0.5 });
        expect(dark).toBe('#808080');
      });

      it('returns input as is for invalid hex strings', () => {
        expect(lightenColor({ hex: 'invalid' })).toBe('invalid');
        expect(darkenColor({ hex: 'xyz' })).toBe('xyz');
      });

      it('resolves ArcDiD palette with default cyan tones', () => {
        const palette = resolveArcDiDPalette(DEFAULT_DID_COLOR, 3);
        expect(palette.layerColors).toEqual(DEFAULT_DID_LAYER_COLORS);
        expect(palette.dotColor).toBe('#0284c7');
        expect(palette.strokeColor).toBe('#ffffff');
      });

      it('adapts ArcDiD palette for custom base colors and counts', () => {
        const palette = resolveArcDiDPalette('#10b981', 4);
        expect(palette.layerColors).toHaveLength(4);
        expect(palette.layerColors[0]?.startsWith('#')).toBe(true);
      });
    });
  });
});
