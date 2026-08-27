interface ISplitVariantScopeParams {
  readonly token: string;
}

interface IVariantScope {
  readonly base: string;
  readonly scope: string;
}

export function splitVariantScope({
  token,
}: ISplitVariantScopeParams): IVariantScope {
  let squareDepth = 0;
  let roundDepth = 0;
  let lastSeparator = -1;

  for (let index = 0; index < token.length; index += 1) {
    const character = token[index];

    if (character === '[') {
      squareDepth += 1;
    } else if (character === ']') {
      squareDepth -= 1;
    } else if (character === '(') {
      roundDepth += 1;
    } else if (character === ')') {
      roundDepth -= 1;
    } else if (character === ':' && squareDepth === 0 && roundDepth === 0) {
      lastSeparator = index;
    }
  }

  if (lastSeparator < 0) {
    return {
      base: token,
      scope: '',
    };
  }

  return {
    base: token.slice(lastSeparator + 1),
    scope: token.slice(0, lastSeparator + 1),
  };
}
