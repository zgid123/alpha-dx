export const DEFAULT_COL_COLORS: readonly string[] = [
  'var(--alpha-table-comparison-col-1-background)',
  'var(--alpha-table-comparison-col-2-background)',
  'var(--alpha-table-comparison-col-3-background)',
  'var(--alpha-table-comparison-col-4-background)',
  'var(--alpha-table-comparison-col-5-background)',
];

export const DEFAULT_ROW_HEADER_COLOR = 'var(--alpha-table-comparison-row-bg)';
export const DEFAULT_ROW_HEADER_TEXT_COLOR =
  'var(--alpha-table-comparison-row)';
export const DEFAULT_COL_HEADER_TEXT_COLOR =
  'var(--alpha-table-comparison-col)';
export const DEFAULT_CELL_BG = 'var(--alpha-table-comparison-cell-bg)';
export const DEFAULT_CELL_COLOR = 'var(--alpha-table-comparison-cell)';
export const DEFAULT_BORDER_RADIUS = '8px';
export const DEFAULT_SPACING = '6px';
export const DEFAULT_ROW_HEADER_WIDTH = '160px';

/**
 * Resolves a dimension input (number or string) into a CSS-ready unit string.
 */
export function resolveDimension(
  value: number | string | undefined,
  defaultUnit = 'px',
): string | undefined {
  if (value === undefined || value === null) {
    return undefined;
  }

  if (typeof value === 'number') {
    return `${value}${defaultUnit}`;
  }

  const trimmed = value.trim();

  if (!trimmed) {
    return undefined;
  }

  // If already contains unit or percentage or calc/var, return as is
  if (/^[+-]?\d+(\.\d+)?$/.test(trimmed)) {
    return `${trimmed}${defaultUnit}`;
  }

  return trimmed;
}
