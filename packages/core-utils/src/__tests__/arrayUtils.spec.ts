import { wrapArray } from '../arrayUtils';

describe('arrayUtils', () => {
  describe('#wrapArray', () => {
    suite('when data is null', () => {
      it('returns empty array', () => {
        expect(wrapArray(null)).toEqual([]);
      });
    });

    suite('when data is undefined', () => {
      it('returns empty array', () => {
        expect(wrapArray(undefined)).toEqual([]);
      });
    });

    suite('when data is not array', () => {
      it('returns array', () => {
        expect(wrapArray('test')).toEqual(['test']);
      });
    });

    suite('when data is array', () => {
      it('returns array', () => {
        expect(wrapArray(['test'])).toEqual(['test']);
      });
    });
  });
});
