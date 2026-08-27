import { classifyUtility } from './classifyUtility';
import { collectClassNames } from './collectClassNames';
import { splitVariantScope } from './splitVariantScope';
import type {
  IClassEntry,
  TUnoClassValue,
  TUnoConflictResolver,
} from './types';

interface ICreateEntryParams {
  readonly token: string;
  readonly resolveConflictKeys?: TUnoConflictResolver;
}

interface IMergeClassValuesParams {
  readonly values: readonly TUnoClassValue[];
  readonly resolveConflictKeys?: TUnoConflictResolver;
}

function createEntry({
  token,
  resolveConflictKeys,
}: ICreateEntryParams): IClassEntry {
  const { base: rawBase, scope } = splitVariantScope({
    token,
  });
  const important = rawBase.startsWith('!') || rawBase.endsWith('!');
  const base = rawBase.replace(/^!/, '').replace(/!$/, '');

  return {
    important,
    keys:
      resolveConflictKeys?.({
        utility: base,
      }) ??
      classifyUtility({
        rawUtility: base,
      }),
    scope,
    token,
  };
}

/**
 * Merges common UnoCSS atomic utilities using last-class-wins semantics.
 *
 * Unknown utilities and compound shortcuts are preserved unless they are exact
 * duplicates. UnoCSS permits arbitrary user-defined rules, so deleting an
 * unknown class cannot be proven safe without the active configuration.
 */
export function mergeClassValues({
  values,
  resolveConflictKeys,
}: IMergeClassValuesParams): string {
  const tokens = collectClassNames({
    values,
  });
  const entries: Array<IClassEntry | null> = [];

  for (const token of tokens) {
    const next = createEntry({
      token,
      resolveConflictKeys,
    });

    for (let index = 0; index < entries.length; index += 1) {
      const previous = entries[index];

      if (
        previous &&
        previous.scope === next.scope &&
        previous.important === next.important &&
        previous.keys.every((key) => next.keys.includes(key))
      ) {
        entries[index] = null;
      }
    }

    entries.push(next);
  }

  return entries
    .filter((entry): entry is IClassEntry => entry !== null)
    .map((entry) => entry.token)
    .join(' ');
}
