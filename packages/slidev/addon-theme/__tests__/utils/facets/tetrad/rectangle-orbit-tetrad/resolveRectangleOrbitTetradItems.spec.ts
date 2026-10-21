import {
  DEFAULT_RECT_ORBIT_TETRAD_ITEMS,
  resolveRectangleOrbitTetradItems,
  resolveSingleItem,
} from '../../../../../utils/facets/tetrad/rectangle-orbit-tetrad/resolveRectangleOrbitTetradItems';

describe('resolveRectangleOrbitTetradItems', () => {
  describe('#resolveRectangleOrbitTetradItems', () => {
    suite('when called with default parameters', () => {
      it('returns 4 default tetrad items with matching ids', () => {
        const items = resolveRectangleOrbitTetradItems();

        expect(items).toHaveLength(4);
        expect(items[0]?.id).toBe('01');
        expect(items[0]?.color).toBe(DEFAULT_RECT_ORBIT_TETRAD_ITEMS[0].color);
        expect(items[1]?.id).toBe('02');
        expect(items[1]?.color).toBe(DEFAULT_RECT_ORBIT_TETRAD_ITEMS[1].color);
        expect(items[2]?.id).toBe('03');
        expect(items[2]?.color).toBe(DEFAULT_RECT_ORBIT_TETRAD_ITEMS[2].color);
        expect(items[3]?.id).toBe('04');
        expect(items[3]?.color).toBe(DEFAULT_RECT_ORBIT_TETRAD_ITEMS[3].color);
      });
    });

    suite('when custom color is provided for an item', () => {
      it('recalculates dependent pastel colors using the new base color', () => {
        const items = resolveRectangleOrbitTetradItems({
          items: [{ color: '#0055ff' }],
        });

        expect(items[0]?.color).toBe('#0055ff');
        expect(items[0]?.cardBg).not.toBe(
          DEFAULT_RECT_ORBIT_TETRAD_ITEMS[0].cardBg,
        );
        expect(items[0]?.arcColor).not.toBe(
          DEFAULT_RECT_ORBIT_TETRAD_ITEMS[0].arcColor,
        );
      });
    });

    suite('when custom icon and cardBg are explicitly provided', () => {
      it('preserves the explicit icon and background overrides', () => {
        const items = resolveRectangleOrbitTetradItems({
          items: [
            {
              icon: 'i-lucide-rocket',
              cardBg: '#112233',
            },
          ],
        });

        expect(items[0]?.icon).toBe('i-lucide-rocket');
        expect(items[0]?.cardBg).toBe('#112233');
      });
    });
  });

  describe('#resolveSingleItem', () => {
    suite('when userItem is undefined', () => {
      it('returns item matching default item values', () => {
        const result = resolveSingleItem(DEFAULT_RECT_ORBIT_TETRAD_ITEMS[0]);

        expect(result.id).toBe('01');
        expect(result.color).toBe(DEFAULT_RECT_ORBIT_TETRAD_ITEMS[0].color);
      });
    });
  });
});
