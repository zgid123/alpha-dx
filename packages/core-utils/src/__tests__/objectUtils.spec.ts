/** biome-ignore-all lint/style/useNamingConvention: test only */
import { assign, deepCamelizeKeys, deepSnakeizeKeys } from '../objectUtils';

describe('objectUtils', () => {
  describe('#deepCamelizeKeys', () => {
    suite('when object has 1 level', () => {
      it('converts snake_case to camelCase', () => {
        expect(
          deepCamelizeKeys({
            test_case: 'test',
          }),
        ).toEqual({
          testCase: 'test',
        });
      });
    });

    suite('when object has 2 levels nested', () => {
      it('converts snake_case to camelCase', () => {
        expect(
          deepCamelizeKeys({
            test_case: {
              test_case: 'test',
            },
          }),
        ).toEqual({
          testCase: {
            testCase: 'test',
          },
        });
      });
    });

    suite('when object has 2 levels nested and array of objects', () => {
      it('converts snake_case to camelCase', () => {
        expect(
          deepCamelizeKeys({
            test_case: {
              test_case: ['test'],
              test_case_2: [
                {
                  test_case: 'test',
                },
              ],
            },
          }),
        ).toEqual({
          testCase: {
            testCase: ['test'],
            testCase2: [
              {
                testCase: 'test',
              },
            ],
          },
        });
      });
    });

    suite('when object has date', () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      it('converts snake_case to camelCase', () => {
        expect(
          deepCamelizeKeys({
            test_case: {
              test_case: new Date(),
            },
          }),
        ).toEqual({
          testCase: {
            testCase: new Date(),
          },
        });
      });
    });
  });

  describe('#deepSnakeizeKeys', () => {
    suite('when object has 1 level', () => {
      it('converts camelCase to snake_case', () => {
        expect(
          deepSnakeizeKeys({
            testCase: 'test',
          }),
        ).toEqual({
          test_case: 'test',
        });
      });
    });

    suite('when object has 2 levels nested', () => {
      it('converts camelCase to snake_case', () => {
        expect(
          deepSnakeizeKeys({
            testCase: {
              testCase: 'test',
            },
          }),
        ).toEqual({
          test_case: {
            test_case: 'test',
          },
        });
      });
    });

    suite('when object has 2 levels nested and array of objects', () => {
      it('converts camelCase to snake_case', () => {
        expect(
          deepSnakeizeKeys({
            testCase: {
              testCase: ['test'],
              testCase2: [
                {
                  testCase: 'test',
                },
              ],
            },
          }),
        ).toEqual({
          test_case: {
            test_case: ['test'],
            test_case2: [
              {
                test_case: 'test',
              },
            ],
          },
        });
      });
    });

    suite('when object has date', () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      it('converts camelCase to snake_case', () => {
        expect(
          deepSnakeizeKeys({
            testCase: {
              testCase: new Date(),
            },
          }),
        ).toEqual({
          test_case: {
            test_case: new Date(),
          },
        });
      });
    });
  });

  describe('#assign', () => {
    it('merges object', () => {
      expect(
        assign(
          {
            test: 'test',
            abc: 2,
          },
          {
            test: 'test2',
            xyz: 3,
          },
        ),
      ).toEqual({
        test: 'test2',
        abc: 2,
        xyz: 3,
      });
    });
  });
});
