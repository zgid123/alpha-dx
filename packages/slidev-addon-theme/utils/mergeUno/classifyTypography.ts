import type { IClassifyUtilityParams, TUtilityConflictKeys } from './types';

const TEXT_ALIGNMENTS = new Set([
  'text-center',
  'text-end',
  'text-justify',
  'text-left',
  'text-right',
  'text-start',
]);

const FONT_SIZES = /^(?:xs|sm|base|lg|xl|\d+xl)$/;

function classifyText(utility: string): string[] {
  if (TEXT_ALIGNMENTS.has(utility)) {
    return ['text-align'];
  }

  if (/^text-(?:ellipsis|clip)$/.test(utility)) {
    return ['text-overflow'];
  }

  if (/^text-(?:wrap|nowrap|balance|pretty)$/.test(utility)) {
    return ['text-wrap'];
  }

  if (/^text-opacity-/.test(utility)) {
    return ['text-opacity'];
  }

  const value = utility.slice(5);

  if (FONT_SIZES.test(value)) {
    return ['font-size', 'line-height'];
  }

  if (/^\[(?:[-+]?\d|length:|size:)/.test(value)) {
    return ['font-size', 'line-height'];
  }

  return ['text-color'];
}

export function classifyTypography({
  utility,
}: IClassifyUtilityParams): TUtilityConflictKeys {
  if (utility.startsWith('font-')) {
    if (/^font-(?:sans|serif|mono|\[)/.test(utility)) {
      return ['font-family'];
    }

    return ['font-weight'];
  }

  if (utility.startsWith('text-')) {
    return classifyText(utility);
  }

  if (utility.startsWith('leading-')) {
    return ['line-height'];
  }

  if (utility.startsWith('tracking-')) {
    return ['letter-spacing'];
  }

  if (/^(?:italic|not-italic)$/.test(utility)) {
    return ['font-style'];
  }

  if (/^(?:uppercase|lowercase|capitalize|normal-case)$/.test(utility)) {
    return ['text-transform'];
  }

  if (utility.startsWith('indent-')) {
    return ['text-indent'];
  }

  if (utility.startsWith('align-')) {
    return ['vertical-align'];
  }

  if (utility.startsWith('whitespace-')) {
    return ['white-space'];
  }

  if (utility.startsWith('break-')) {
    return ['word-break'];
  }

  if (utility.startsWith('hyphens-')) {
    return ['hyphens'];
  }

  return null;
}
