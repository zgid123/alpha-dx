import { calculateTocCenterAlignmentOffsetPx } from '../../../../utils/layouts/table-of-contents/calculateTocCenterAlignmentOffset';

describe('calculateTocCenterAlignmentOffsetPx', () => {
  it('scales the difference between marker and article centers', () => {
    expect(
      calculateTocCenterAlignmentOffsetPx({
        markerCenterY: 100,
        articleCenterY: 80,
        scaleY: 2,
      }),
    ).toBe(10);
  });

  it('returns zero when the vertical scale is nonpositive', () => {
    expect(
      calculateTocCenterAlignmentOffsetPx({
        markerCenterY: 100,
        articleCenterY: 80,
        scaleY: 0,
      }),
    ).toBe(0);
  });
});
