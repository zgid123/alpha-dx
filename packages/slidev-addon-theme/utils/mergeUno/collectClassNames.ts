import type { TUnoClassValue } from './types';

interface ICollectClassNamesParams {
  readonly values: readonly TUnoClassValue[];
}

function splitClassNames(value: string): string[] {
  const tokens: string[] = [];
  let current = '';
  let quote = '';
  let escaped = false;
  let squareDepth = 0;
  let roundDepth = 0;
  let curlyDepth = 0;

  for (const character of value) {
    if (escaped) {
      current += character;
      escaped = false;
      continue;
    }

    if (character === '\\') {
      current += character;
      escaped = true;
      continue;
    }

    if (quote) {
      current += character;

      if (character === quote) {
        quote = '';
      }

      continue;
    }

    if (character === '"' || character === "'") {
      current += character;
      quote = character;
      continue;
    }

    if (character === '[') {
      squareDepth += 1;
    } else if (character === ']') {
      squareDepth -= 1;
    } else if (character === '(') {
      roundDepth += 1;
    } else if (character === ')') {
      roundDepth -= 1;
    } else if (character === '{') {
      curlyDepth += 1;
    } else if (character === '}') {
      curlyDepth -= 1;
    }

    if (
      /\s/.test(character) &&
      squareDepth === 0 &&
      roundDepth === 0 &&
      curlyDepth === 0
    ) {
      if (current) {
        tokens.push(current);
      }

      current = '';
    } else {
      current += character;
    }
  }

  if (current) {
    tokens.push(current);
  }

  return tokens;
}

function expandVariantGroup(token: string): string[] {
  let squareDepth = 0;

  for (let index = 0; index < token.length - 1; index += 1) {
    const character = token[index];

    if (character === '[') {
      squareDepth += 1;
    } else if (character === ']') {
      squareDepth -= 1;
    }

    if (
      squareDepth === 0 &&
      character === ':' &&
      token[index + 1] === '(' &&
      token.endsWith(')')
    ) {
      const prefix = token.slice(0, index + 1);
      const contents = token.slice(index + 2, -1);
      return splitClassNames(contents).flatMap((child) =>
        expandVariantGroup(`${prefix}${child}`),
      );
    }
  }

  return [token];
}

function collectClassName(value: TUnoClassValue, result: string[]): void {
  if (!value) {
    return;
  }

  if (typeof value === 'string' || typeof value === 'number') {
    for (const token of splitClassNames(String(value))) {
      result.push(...expandVariantGroup(token));
    }
    return;
  }

  if (Array.isArray(value)) {
    for (const item of value) {
      collectClassName(item, result);
    }
    return;
  }

  for (const [className, enabled] of Object.entries(value)) {
    if (enabled) {
      collectClassName(className, result);
    }
  }
}

export function collectClassNames({
  values,
}: ICollectClassNamesParams): string[] {
  const result: string[] = [];

  for (const value of values) {
    collectClassName(value, result);
  }

  return result;
}
