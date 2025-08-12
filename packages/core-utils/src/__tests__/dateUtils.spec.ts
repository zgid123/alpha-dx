import { formatDate, parseDate } from '../dateUtils';

describe('dateUtils', () => {
  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  describe('#parseDate', () => {
    suite('when value is null', () => {
      it('returns current date', () => {
        expect(parseDate(null)).toEqual(new Date());
      });
    });

    suite('when value is undefined', () => {
      it('returns current date', () => {
        expect(parseDate(undefined)).toEqual(new Date());
      });
    });

    suite('when value is empty string', () => {
      it('returns current date', () => {
        expect(parseDate('')).toEqual(new Date());
      });
    });

    suite('when value is not empty string', () => {
      it('returns parsed date', () => {
        expect(parseDate('2020-01-01')).toEqual(new Date('2020-01-01'));
      });
    });

    suite('when value is invalid date string', () => {
      it('returns NaN date', () => {
        expect(parseDate('test')).toEqual(new Date(NaN));
      });
    });

    suite('when value is date', () => {
      it('returns the date', () => {
        expect(new Date()).toEqual(new Date());
      });
    });
  });

  describe('#formatDate', () => {
    suite('when value is undefined', () => {
      it('returns empty string', () => {
        expect(formatDate(undefined)).toEqual('');
      });
    });

    suite('when value is null', () => {
      it('returns empty string', () => {
        expect(formatDate(null)).toEqual('');
      });
    });

    suite('when value is nullish and defaultValue is provided', () => {
      it('returns provided defaultValue', () => {
        expect(
          formatDate(null, {
            defaultValue: 'test',
          }),
        ).toEqual('test');
      });
    });

    suite('when value is empty string', () => {
      it('returns empty string', () => {
        expect(formatDate('')).toEqual('');
      });
    });

    suite('when value is date', () => {
      it('returns formatted date as "dd MMM yyyy"', () => {
        expect(formatDate(new Date('2020-01-01'))).toEqual('01 Jan 2020');
      });
    });

    suite('when value is date and format is provided', () => {
      it('returns formatted date as provided format', () => {
        expect(
          formatDate(new Date('2020-01-01'), {
            format: 'yyyy-MM-dd',
          }),
        ).toEqual('2020-01-01');
      });
    });

    suite('when value is not empty string', () => {
      it('returns formatted date as "dd MMM yyyy"', () => {
        expect(formatDate('2020-01-01')).toEqual('01 Jan 2020');
      });
    });

    suite('when value is invalid date string', () => {
      it('returns NaN date', () => {
        expect(() => {
          formatDate('test');
        }).toThrowError();
      });
    });

    suite('when format is invalid', () => {
      it('throws error', () => {
        expect(() => {
          formatDate(new Date('2020-01-01'), {
            format: 'j',
          });
        }).toThrowError();
      });
    });
  });
});
