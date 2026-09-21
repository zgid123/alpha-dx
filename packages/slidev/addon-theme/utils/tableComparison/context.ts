import type { ComputedRef, InjectionKey } from 'vue';

export interface ITableComparisonContext {
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

export interface ITableComparisonColsContext {
  readonly registerCol: () => number;
}

export const TABLE_COMPARISON_KEY: InjectionKey<ITableComparisonContext> =
  Symbol('TABLE_COMPARISON_KEY');

export const TABLE_COMPARISON_COLS_KEY: InjectionKey<ITableComparisonColsContext> =
  Symbol('TABLE_COMPARISON_COLS_KEY');
