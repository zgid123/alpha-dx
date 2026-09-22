import {
  DEFAULT_GEAR_TRIAD_ITEMS,
  getDefaultGearTriadItem,
  resolveGearTriadItems,
  resolveSingleGearTriadItem,
} from '../../../utils/gearTriad/resolveGearTriadItems';

describe('gearTriad', () => {
  describe('#getDefaultGearTriadItem', () => {
    suite('when called with index 0, 1, 2', () => {
      it('returns corresponding default item', () => {
        const item0 = getDefaultGearTriadItem(0);
        const item1 = getDefaultGearTriadItem(1);
        const item2 = getDefaultGearTriadItem(2);

        expect(item0.title).toBe('Option 1');
        expect(item0.color).toBe('#1fb5b5');
        expect(item0.icon).toBeUndefined();

        expect(item1.title).toBe('Option 2');
        expect(item1.color).toBe('#f38942');
        expect(item1.icon).toBeUndefined();

        expect(item2.title).toBe('Option 3');
        expect(item2.color).toBe('#f05367');
        expect(item2.icon).toBeUndefined();
      });
    });

    suite('when called with index out of bounds or negative', () => {
      it('wraps modulo 3 safely', () => {
        expect(getDefaultGearTriadItem(3)).toEqual(DEFAULT_GEAR_TRIAD_ITEMS[0]);
        expect(getDefaultGearTriadItem(4)).toEqual(DEFAULT_GEAR_TRIAD_ITEMS[1]);
        expect(getDefaultGearTriadItem(-1)).toEqual(
          DEFAULT_GEAR_TRIAD_ITEMS[1],
        );
      });
    });
  });

  describe('#resolveSingleGearTriadItem', () => {
    suite('when item is undefined', () => {
      it('returns fallback item at specified index', () => {
        const res = resolveSingleGearTriadItem(undefined, 1);

        expect(res).toEqual(DEFAULT_GEAR_TRIAD_ITEMS[1]);
      });
    });

    suite('when item contains partial overrides', () => {
      it('merges overrides onto fallback item', () => {
        const res = resolveSingleGearTriadItem(
          {
            title: 'Custom Title',
            color: '#123456',
            icon: 'gear',
          },
          0,
        );

        expect(res.title).toBe('Custom Title');
        expect(res.color).toBe('#123456');
        expect(res.description).toBe(DEFAULT_GEAR_TRIAD_ITEMS[0].description);
        expect(res.icon).toBe('gear');
      });
    });
  });

  describe('#resolveGearTriadItems', () => {
    suite('when items array is undefined', () => {
      it('returns default triad items array with 3 items', () => {
        const res = resolveGearTriadItems(undefined);

        expect(res).toHaveLength(3);
        expect(res[0].title).toBe('Option 1');
        expect(res[1].title).toBe('Option 2');
        expect(res[2].title).toBe('Option 3');
        expect(res[0].icon).toBeUndefined();
        expect(res[1].icon).toBeUndefined();
        expect(res[2].icon).toBeUndefined();
      });
    });

    suite('when custom items are provided', () => {
      it('resolves provided items and fills missing indices with defaults', () => {
        const res = resolveGearTriadItems([
          { title: 'Step 1', icon: 'file' },
          { title: 'Step 2' },
        ]);

        expect(res[0].title).toBe('Step 1');
        expect(res[0].icon).toBe('file');
        expect(res[1].title).toBe('Step 2');
        expect(res[1].icon).toBeUndefined();
        expect(res[2].title).toBe('Option 3');
      });
    });

    suite('when icons array is provided', () => {
      it('merges icons array onto resolved items', () => {
        const res = resolveGearTriadItems(undefined, [
          'document',
          'shield',
          'archive',
        ]);

        expect(res[0].icon).toBe('document');
        expect(res[1].icon).toBe('shield');
        expect(res[2].icon).toBe('archive');
      });
    });
  });
});
