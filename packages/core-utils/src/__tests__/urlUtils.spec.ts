import { buildUrl } from '../urlUtils';

describe('urlUtils', () => {
  describe('#buildUrl', () => {
    describe('when baseUurl has "/" at the end', () => {
      const baseUrl = 'https://google.com/';

      suite('when path has "/" at the end', () => {
        it('trims the "/" at the end of path', () => {
          expect(buildUrl(baseUrl, 'test/')).toBe('https://google.com/test');
        });
      });

      suite('when path has "/" at the beginning', () => {
        it('trims the "/" at the beginning of path', () => {
          expect(buildUrl(baseUrl, '/test')).toBe('https://google.com/test');
        });
      });
    });

    describe('when baseUurl has "/" at the beginning', () => {
      const baseUrl = '/https://google.com';

      suite('when path has "/" at the end', () => {
        it('trims the "/" at the beginning of baseUrl and at the end of path', () => {
          expect(buildUrl(baseUrl, 'test/')).toBe('https://google.com/test');
        });
      });

      suite('when path has "/" at the beginning', () => {
        it('trims the "/" at the beginning of baseUrl and at the beginning of path', () => {
          expect(buildUrl(baseUrl, '/test')).toBe('https://google.com/test');
        });
      });
    });
  });
});
