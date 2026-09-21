import {
  DEFAULT_LEFT_COLOR,
  DEFAULT_RIGHT_COLOR,
  resolveArcComparisonSideItems,
} from '../../../utils/arcComparison/resolveArcComparisonItems';

describe('resolveArcComparisonItems', () => {
  describe('#resolveArcComparisonSideItems', () => {
    suite('when called without custom items for left side', () => {
      it('returns 3 default left items with sequential IDs and left color', () => {
        const items = resolveArcComparisonSideItems();

        expect(items).toHaveLength(3);
        expect(items[0]?.id).toBe('01');
        expect(items[1]?.id).toBe('02');
        expect(items[2]?.id).toBe('03');
        expect(items[0]?.color).toBe(DEFAULT_LEFT_COLOR);
      });
    });

    suite('when called without custom items for right side', () => {
      it('returns items with default right color', () => {
        const items = resolveArcComparisonSideItems(
          undefined,
          DEFAULT_RIGHT_COLOR,
          3,
        );

        expect(items).toHaveLength(3);
        expect(items[0]?.color).toBe(DEFAULT_RIGHT_COLOR);
      });
    });

    suite('when count is specified as 4', () => {
      it('returns 4 items including 04', () => {
        const items = resolveArcComparisonSideItems(
          undefined,
          DEFAULT_LEFT_COLOR,
          4,
        );

        expect(items).toHaveLength(4);
        expect(items[3]?.id).toBe('04');
        expect(items[3]?.color).toBe(DEFAULT_LEFT_COLOR);
      });
    });

    suite('when partial custom items are provided', () => {
      it('merges custom title and color while keeping default description', () => {
        const custom = [
          {
            title: 'Custom Monolith',
            color: '#ff0000',
          },
        ];

        const items = resolveArcComparisonSideItems(
          custom,
          DEFAULT_LEFT_COLOR,
          3,
        );

        expect(items[0]?.title).toBe('Custom Monolith');
        expect(items[0]?.color).toBe('#ff0000');
        expect(items[0]?.id).toBe('01');
        expect(items[0]?.description).toBeTruthy();
      });
    });

    suite('when custom items provide custom id and textColor', () => {
      it('retains the explicit id and textColor', () => {
        const custom = [
          {
            id: 'A1',
            textColor: '#334155',
          },
        ];

        const items = resolveArcComparisonSideItems(
          custom,
          DEFAULT_LEFT_COLOR,
          1,
        );

        expect(items[0]?.id).toBe('A1');
        expect(items[0]?.textColor).toBe('#334155');
      });
    });
  });
});
