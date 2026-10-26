import {
  createArcArrowProcessGeometry,
  LONGER_MIDDLE_ARC_ARROW_PATH,
} from '../../../../utils/process/arc-arrow-process/createArcArrowProcessGeometry';

describe('arcArrowProcess', () => {
  describe('#createArcArrowProcessGeometry', () => {
    suite('when called with default parameters (count 4)', () => {
      it('returns 4 arrows centered at 780, -130 with viewBox 1560x665', () => {
        const geo = createArcArrowProcessGeometry();

        expect(geo.viewBoxWidth).toBe(1_560);
        expect(geo.viewBoxHeight).toBe(665);
        expect(geo.viewBoxMinY).toBe(-35);
        expect(geo.cx).toBe(780);
        expect(geo.cy).toBe(-130);
        expect(geo.count).toBe(4);
        expect(geo.arrows).toHaveLength(4);
      });

      it('applies default rotation offset balancing the arc symmetry', () => {
        const geo = createArcArrowProcessGeometry(4);

        expect(geo.arrows[0]?.rotation).toBe(61.85);
        expect(geo.arrows[3]?.rotation).toBe(-55.15);
      });
    });

    suite('when count is 3', () => {
      it('assigns the longer middle arc path to the middle arrow', () => {
        const geo = createArcArrowProcessGeometry(3);

        expect(geo.count).toBe(3);
        expect(geo.arrows).toHaveLength(3);
        expect(geo.arrows[1]?.path).toBe(LONGER_MIDDLE_ARC_ARROW_PATH);
      });
    });

    suite('when custom rotationOffset is provided', () => {
      it('offsets arrow rotation angles by the given amount', () => {
        const baseGeo = createArcArrowProcessGeometry(4, 0);
        const offsetGeo = createArcArrowProcessGeometry(4, 15);

        expect(offsetGeo.arrows[0]?.rotation).toBe(
          (baseGeo.arrows[0]?.rotation ?? 0) + 15,
        );
      });
    });
  });
});
