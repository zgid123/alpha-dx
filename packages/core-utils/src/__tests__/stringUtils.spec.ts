import {
  camelize,
  combine,
  humanize,
  pascalize,
  snakize,
} from '../stringUtils';

describe('stringUtils', () => {
  describe('#combine', () => {
    suite('when first param is undefined', () => {
      it('returns empty string', () => {
        expect(combine(undefined)).toBe('');
      });
    });

    suite('when first param is string', () => {
      it('returns that string', () => {
        expect(combine('test')).toBe('test');
      });
    });

    suite('when trim option is true', () => {
      it('trims spaces', () => {
        expect(
          combine(
            {
              trim: true,
              joinWith: '-',
            },
            '  ',
          ),
        ).toBe('');
      });
    });

    suite('when passing list strings', () => {
      it('joins all the strings with space', () => {
        expect(combine('lorem', 'test', 'ipsum')).toBe('lorem test ipsum');
      });
    });

    suite('when providing joinWith', () => {
      it('joins all the strings with value of joinWith', () => {
        expect(combine({ joinWith: '-' }, 'lorem', 'test', 'ipsum')).toBe(
          'lorem-test-ipsum',
        );
      });
    });

    suite('when the list strings has undefined', () => {
      it('ignores undefined value', () => {
        expect(combine('lorem', undefined, 'ipsum')).toBe('lorem ipsum');
      });
    });

    suite('when the list strings has empty string', () => {
      it('ignores empty string value', () => {
        expect(combine({ joinWith: '-' }, 'lorem', '', 'ipsum')).toBe(
          'lorem-ipsum',
        );
      });
    });
  });

  describe('#snakize', () => {
    suite('when string starts with upper', () => {
      it('converts camelCase to snake_case', () => {
        expect(snakize('CamelCase')).toBe('camel_case');
      });
    });

    suite('when string starts with lower', () => {
      it('converts camelCase to snake_case', () => {
        expect(snakize('camelCase')).toBe('camel_case');
      });
    });
  });

  describe('#camelize', () => {
    suite('when string starts with upper', () => {
      it('converts snake_case to camelCase', () => {
        expect(camelize('Snake_case')).toBe('snakeCase');
      });
    });

    suite('when string starts with lower', () => {
      it('converts snake_case to camelCase', () => {
        expect(camelize('snake_case')).toBe('snakeCase');
      });
    });

    suite('when string has space', () => {
      it('converts to camelCase', () => {
        expect(camelize('snake case')).toBe('snakeCase');
      });
    });
  });

  describe('#pascalize', () => {
    suite('when string starts with upper', () => {
      it('converts snake_case to PascalCase', () => {
        expect(pascalize('Snake_case')).toBe('SnakeCase');
      });
    });

    suite('when string starts with lower', () => {
      it('converts snake_case to PascalCase', () => {
        expect(pascalize('snake_case')).toBe('SnakeCase');
      });
    });

    suite('when string has space', () => {
      it('converts to PascalCase', () => {
        expect(pascalize('snake case')).toBe('SnakeCase');
      });
    });
  });

  describe('#humanize', () => {
    suite('when string contains _', () => {
      it('replaces _ with space', () => {
        expect(humanize('test_case')).toBe('test case');
      });
    });

    suite('when string is camelCase', () => {
      it('adds space between words and lower the first char except first word', () => {
        expect(humanize('TestCase')).toBe('Test case');
      });
    });

    suite('when value is nullish', () => {
      it('returns empty string', () => {
        expect(humanize(undefined)).toBe('');
      });
    });

    suite('when capitalize is true', () => {
      it('adds space between words and upper the first char', () => {
        expect(
          humanize('TestCase', {
            capitalize: true,
          }),
        ).toBe('Test Case');
      });
    });
  });
});
