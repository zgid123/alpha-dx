export const DEFAULT_COL_COLORS: readonly string[] = [
  '#354f82',
  '#5b8bb3',
  '#00a8a8',
  '#00b884',
  '#00875a',
];

export const DEFAULT_ROW_HEADER_COLOR = '#2e8b9a';
export const DEFAULT_ROW_HEADER_TEXT_COLOR = '#ffffff';
export const DEFAULT_COL_HEADER_TEXT_COLOR = '#ffffff';
export const DEFAULT_CELL_BG = '#d6e5ef';
export const DEFAULT_CELL_COLOR = '#475569';
export const DEFAULT_BORDER_RADIUS = '8px';
export const DEFAULT_SPACING = '6px';
export const DEFAULT_ROW_HEADER_WIDTH = '160px';

export interface IDefaultMockupCol {
  readonly title: string;
  readonly color: string;
}

export interface IDefaultMockupRow {
  readonly title: string;
  readonly cells: readonly string[];
}

export const DEFAULT_MOCKUP_COLS: readonly IDefaultMockupCol[] = [
  { title: 'COLUMN 1', color: '#354f82' },
  { title: 'COLUMN 2', color: '#5b8bb3' },
  { title: 'COLUMN 3', color: '#00a8a8' },
  { title: 'COLUMN 4', color: '#00b884' },
  { title: 'COLUMN 5', color: '#00875a' },
];

export const DEFAULT_MOCKUP_ROWS: readonly IDefaultMockupRow[] = [
  { title: 'ROW 1', cells: ['TEXT', 'TEXT', 'TEXT', 'TEXT', 'TEXT'] },
  { title: 'ROW 2', cells: ['TEXT', 'TEXT', 'TEXT', 'TEXT', 'TEXT'] },
  { title: 'ROW 3', cells: ['TEXT', 'TEXT', 'TEXT', 'TEXT', 'TEXT'] },
  { title: 'ROW 4', cells: ['TEXT', 'TEXT', 'TEXT', 'TEXT', 'TEXT'] },
  { title: 'ROW 5', cells: ['TEXT', 'TEXT', 'TEXT', 'TEXT', 'TEXT'] },
  { title: 'ROW 6', cells: ['TEXT', 'TEXT', 'TEXT', 'TEXT', 'TEXT'] },
];

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
