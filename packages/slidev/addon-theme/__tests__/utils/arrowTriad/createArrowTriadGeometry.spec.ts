import { createArrowTriadGeometry } from '../../../utils/arrowTriad/createArrowTriadGeometry';

describe('arrowTriad', () => {
  describe('#createArrowTriadGeometry', () => {
    suite('when called', () => {
      it('returns static diagram viewBox 560x662 with 3 arrows and 3 dashed guide arcs', () => {
        const geo = createArrowTriadGeometry();

        expect(geo.viewBoxWidth).toBe(560);
        expect(geo.viewBoxHeight).toBe(662);
        expect(geo.blueArrow).toBeDefined();
        expect(geo.yellowArrow).toBeDefined();
        expect(geo.greenArrow).toBeDefined();
        expect(geo.dashedArcs).toHaveLength(3);
      });
    });

    suite('when validating blue arrow path data', () => {
      it('contains valid polygon outerHeadPoints and neckLine', () => {
        const geo = createArrowTriadGeometry();

        expect(geo.blueArrow.path).toMatch(/^M \d+/);
        expect(geo.blueArrow.outerHeadPoints).toContain(',');
        expect(geo.blueArrow.neckLine).toMatch(/^M \d+/);
      });
    });

    suite('when validating yellow and green arrow paths', () => {
      it('provides complete stem and arrowhead coordinate strings', () => {
        const geo = createArrowTriadGeometry();

        expect(geo.yellowArrow.stemPath).toMatch(/^M \d+/);
        expect(geo.greenArrow.stemPath).toMatch(/^M \d+/);
        expect(geo.yellowArrow.innerHeadPoints).toBeTruthy();
        expect(geo.greenArrow.innerHeadPoints).toBeTruthy();
      });
    });
  });
});
