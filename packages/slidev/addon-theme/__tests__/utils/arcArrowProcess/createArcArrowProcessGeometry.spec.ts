import {
  createArcArrowProcessGeometry,
  LONGER_MIDDLE_ARC_ARROW_PATH,
} from '../../../utils/arcArrowProcess/createArcArrowProcessGeometry';

describe('arcArrowProcess', () => {
  describe('#createArcArrowProcessGeometry', () => {
    suite('when called with default parameters (count 4)', () => {
      it('returns 4 arrows centered at 500, -220 with viewBox 1000x370', () => {
        const geo = createArcArrowProcessGeometry();

        expect(geo.viewBoxWidth).toBe(1000);
        expect(geo.viewBoxHeight).toBe(370);
        expect(geo.viewBoxMinY).toBe(-30);
        expect(geo.cx).toBe(500);
        expect(geo.cy).toBe(-220);
        expect(geo.count).toBe(4);
        expect(geo.arrows).toHaveLength(4);
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
