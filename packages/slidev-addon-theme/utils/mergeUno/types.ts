export type TUnoClassValue =
  | string
  | number
  | false
  | null
  | undefined
  | readonly TUnoClassValue[]
  | IUnoClassDictionary;

export interface IUnoClassDictionary {
  readonly [className: string]: unknown;
}

export interface IUnoConflictResolverParams {
  readonly utility: string;
}

export type TUnoConflictResolver = (
  params: IUnoConflictResolverParams,
) => readonly string[] | null | undefined;

export type TUnoClassMerger = (...values: TUnoClassValue[]) => string;

export type TUtilityConflictKeys = readonly string[] | null;

export interface IUnoClassMergerOptions {
  readonly resolveConflictKeys?: TUnoConflictResolver;
}

export interface IClassEntry {
  readonly important: boolean;
  readonly keys: readonly string[];
  readonly scope: string;
  readonly token: string;
}

export interface IClassifyUtilityParams {
  readonly utility: string;
}
