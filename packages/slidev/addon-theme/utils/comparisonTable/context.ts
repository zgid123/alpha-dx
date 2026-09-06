import type { ComputedRef, InjectionKey } from 'vue';

export interface IComparisonTableContext {
  readonly cellBg: ComputedRef<string>;
  readonly cellColor: ComputedRef<string>;
  readonly rowHeaderColor: ComputedRef<string>;
  readonly rowHeaderTextColor: ComputedRef<string>;
  readonly colHeaderTextColor: ComputedRef<string>;
  readonly borderRadius: ComputedRef<string>;
  readonly rowHeaderWidth: ComputedRef<string | undefined>;
  readonly spacing: ComputedRef<string>;
  readonly dense: ComputedRef<boolean>;
  readonly animation: ComputedRef<boolean>;
}

export interface IComparisonTableColsContext {
  readonly registerCol: () => number;
}

export const COMPARISON_TABLE_KEY: InjectionKey<IComparisonTableContext> =
  Symbol('COMPARISON_TABLE_KEY');

export const COMPARISON_TABLE_COLS_KEY: InjectionKey<IComparisonTableColsContext> =
  Symbol('COMPARISON_TABLE_COLS_KEY');
