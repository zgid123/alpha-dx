import type { IClassifyUtilityParams, TUtilityConflictKeys } from './types';

const SIMPLE_PREFIXES: ReadonlyArray<readonly [string, string]> = [
  ['accent-', 'accent-color'],
  ['appearance-', 'appearance'],
  ['aspect-', 'aspect-ratio'],
  ['backdrop-', 'backdrop-filter'],
  ['blur-', 'filter:blur'],
  ['brightness-', 'filter:brightness'],
  ['caption-', 'caption-side'],
  ['caret-', 'caret-color'],
  ['columns-', 'columns'],
  ['contrast-', 'filter:contrast'],
  ['cursor-', 'cursor'],
  ['decoration-', 'text-decoration'],
  ['drop-shadow-', 'filter:drop-shadow'],
  ['fill-', 'fill'],
  ['grayscale-', 'filter:grayscale'],
  ['hue-rotate-', 'filter:hue-rotate'],
  ['list-', 'list-style'],
  ['object-', 'object-fit-position'],
  ['outline-', 'outline'],
  ['pointer-events-', 'pointer-events'],
  ['resize-', 'resize'],
  ['saturate-', 'filter:saturate'],
  ['select-', 'user-select'],
  ['sepia-', 'filter:sepia'],
  ['stroke-', 'stroke'],
  ['table-', 'table-layout'],
];

export function classifySimple({
  utility,
}: IClassifyUtilityParams): TUtilityConflictKeys {
  for (const [prefix, key] of SIMPLE_PREFIXES) {
    if (utility.startsWith(prefix)) {
      return [key];
    }
  }

  return null;
}
