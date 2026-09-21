import { resolveDimension } from '../../../utils/tableComparison/constants';

describe('tableComparison', () => {
  describe('#resolveDimension', () => {
    suite('when value is undefined', () => {
      it('returns undefined', () => {
        expect(resolveDimension(undefined)).toBeUndefined();
      });
    });

    suite('when value is null', () => {
      it('returns undefined', () => {
        expect(resolveDimension(null as unknown as undefined)).toBeUndefined();
      });
    });

    suite('when value is empty or whitespace string', () => {
      it('returns undefined', () => {
        expect(resolveDimension('   ')).toBeUndefined();
      });
    });

    suite('when value is a number', () => {
      it('appends default px unit', () => {
        expect(resolveDimension(120)).toBe('120px');
      });
    });

    suite('when value is a numeric string without unit', () => {
      it('appends default px unit', () => {
        expect(resolveDimension('240')).toBe('240px');
      });
    });

    suite('when custom default unit is provided', () => {
      it('appends the custom unit to numeric inputs', () => {
        expect(resolveDimension(2.5, 'rem')).toBe('2.5rem');
        expect(resolveDimension('50', '%')).toBe('50%');
      });
    });

    suite('when value already contains CSS units', () => {
      it('returns the trimmed string as-is', () => {
        expect(resolveDimension('16rem')).toBe('16rem');
        expect(resolveDimension('85%')).toBe('85%');
        expect(resolveDimension('100vh')).toBe('100vh');
      });
    });

    suite('when value contains calc or css variable expression', () => {
      it('preserves the complex CSS expression untouched', () => {
        expect(resolveDimension('calc(100% - 20px)')).toBe('calc(100% - 20px)');
        expect(resolveDimension('var(--custom-width)')).toBe(
          'var(--custom-width)',
        );
      });
    });
  });
});
