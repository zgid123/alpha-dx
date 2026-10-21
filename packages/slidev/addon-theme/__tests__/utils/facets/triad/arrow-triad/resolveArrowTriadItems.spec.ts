import {
  DEFAULT_ARROW_TRIAD_ITEMS,
  getDefaultArrowTriadItem,
  resolveArrowTriadItems,
  resolveSingleArrowTriadItem,
} from '../../../../../utils/facets/triad/arrow-triad/resolveArrowTriadItems';

describe('arrowTriad', () => {
  describe('#getDefaultArrowTriadItem', () => {
    suite('when called with index 0, 1, 2', () => {
      it('returns corresponding default item with undefined cardBg (no background)', () => {
        const item0 = getDefaultArrowTriadItem(0);
        const item1 = getDefaultArrowTriadItem(1);
        const item2 = getDefaultArrowTriadItem(2);

        expect(item0.title).toBe('');
        expect(item0.color).toBe('var(--alpha-arrow-triad-item-1-color)');
        expect(item0.titleColor).toBe('var(--alpha-arrow-triad-item-1-color)');
        expect(item0.cardBg).toBeUndefined();

        expect(item1.title).toBe('');
        expect(item1.color).toBe('var(--alpha-arrow-triad-item-2-color)');
        expect(item1.titleColor).toBe('var(--alpha-arrow-triad-item-2-color)');
        expect(item1.cardBg).toBeUndefined();

        expect(item2.title).toBe('');
        expect(item2.color).toBe('var(--alpha-arrow-triad-item-3-color)');
        expect(item2.titleColor).toBe('var(--alpha-arrow-triad-item-3-color)');
        expect(item2.cardBg).toBeUndefined();
      });
    });

    suite('when called with index out of bounds or negative', () => {
      it('wraps modulo 3 safely', () => {
        expect(getDefaultArrowTriadItem(3)).toEqual(
          DEFAULT_ARROW_TRIAD_ITEMS[0],
        );
        expect(getDefaultArrowTriadItem(4)).toEqual(
          DEFAULT_ARROW_TRIAD_ITEMS[1],
        );
        expect(getDefaultArrowTriadItem(-1)).toEqual(
          DEFAULT_ARROW_TRIAD_ITEMS[1],
        );
      });
    });
  });

  describe('#resolveSingleArrowTriadItem', () => {
    suite('when item is undefined', () => {
      it('returns fallback item at specified index', () => {
        const res = resolveSingleArrowTriadItem(undefined, 1);

        expect(res).toEqual(DEFAULT_ARROW_TRIAD_ITEMS[1]);
        expect(res.cardBg).toBeUndefined();
      });
    });

    suite('when item contains partial overrides', () => {
      it('merges overrides onto fallback item and preserves explicit cardBg when provided', () => {
        const res = resolveSingleArrowTriadItem(
          {
            title: 'Custom Title',
            color: 'var(--alpha-primary-color)',
            cardBg: 'var(--alpha-custom-card-bg)',
          },
          0,
        );

        expect(res.title).toBe('Custom Title');
        expect(res.color).toBe('var(--alpha-primary-color)');
        expect(res.titleColor).toBe('var(--alpha-primary-color)');
        expect(res.cardBg).toBe('var(--alpha-custom-card-bg)');
        expect(res.description).toBe(DEFAULT_ARROW_TRIAD_ITEMS[0].description);
      });

      it('inherits arrow color for titleColor when titleColor is omitted', () => {
        const res = resolveSingleArrowTriadItem(
          {
            color: '#123456',
          },
          0,
        );

        expect(res.color).toBe('#123456');
        expect(res.titleColor).toBe('#123456');
      });

      it('respects explicit titleColor override', () => {
        const res = resolveSingleArrowTriadItem(
          {
            color: '#123456',
            titleColor: '#654321',
          },
          0,
        );

        expect(res.color).toBe('#123456');
        expect(res.titleColor).toBe('#654321');
      });

      it('keeps cardBg undefined when no cardBg is passed', () => {
        const res = resolveSingleArrowTriadItem(
          {
            title: 'No Bg Title',
          },
          0,
        );

        expect(res.cardBg).toBeUndefined();
      });
    });
  });

  describe('#resolveArrowTriadItems', () => {
    suite('when items array is undefined', () => {
      it('returns default triad items array with 3 items without cardBg', () => {
        const res = resolveArrowTriadItems(undefined);

        expect(res).toHaveLength(3);
        expect(res.every((item) => item.cardBg === undefined)).toBe(true);
      });
    });

    suite('when custom items are provided', () => {
      it('resolves provided items and fills missing indices with defaults', () => {
        const res = resolveArrowTriadItems([
          { title: 'Step 1' },
          { title: 'Step 2' },
        ]);

        expect(res[0].title).toBe('Step 1');
        expect(res[1].title).toBe('Step 2');
        expect(res[2].title).toBe('');
      });
    });
  });
});
