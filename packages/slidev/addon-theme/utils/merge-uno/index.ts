import { mergeClassValues } from './mergeClassValues';
import type {
  IUnoClassMergerOptions,
  TUnoClassMerger,
  TUnoClassValue,
} from './types';

export type {
  IUnoClassDictionary,
  IUnoClassMergerOptions,
  IUnoConflictResolverParams,
  TUnoClassMerger,
  TUnoClassValue,
  TUnoConflictResolver,
} from './types';

export function createUnoClassMerger(
  options: IUnoClassMergerOptions = {},
): TUnoClassMerger {
  return (...values: TUnoClassValue[]) => {
    return mergeClassValues({
      values,
      resolveConflictKeys: options.resolveConflictKeys,
    });
  };
}

export function mergeUno(...values: TUnoClassValue[]): string {
  return mergeClassValues({
    values,
  });
}
