import type { IClassifyUtilityParams, TUtilityConflictKeys } from './types';

const DISPLAY_VALUES = new Set([
  'block',
  'contents',
  'flow-root',
  'flex',
  'grid',
  'hidden',
  'inline',
  'inline-block',
  'inline-flex',
  'inline-grid',
  'list-item',
  'table',
  'table-caption',
  'table-cell',
  'table-column',
  'table-column-group',
  'table-footer-group',
  'table-header-group',
  'table-row',
  'table-row-group',
]);

const POSITION_VALUES = new Set([
  'absolute',
  'fixed',
  'relative',
  'static',
  'sticky',
]);

const SPACING_SIDES: Readonly<Record<string, readonly string[]>> = {
  '': ['top', 'right', 'bottom', 'left'],
  b: ['bottom'],
  e: ['inline-end'],
  l: ['left'],
  r: ['right'],
  s: ['inline-start'],
  t: ['top'],
  x: ['left', 'right'],
  y: ['top', 'bottom'],
};

function directionKeys(property: string, direction: string): string[] {
  return (SPACING_SIDES[direction] ?? []).map((side) => `${property}-${side}`);
}

export function classifyLayout({
  utility,
}: IClassifyUtilityParams): TUtilityConflictKeys {
  if (DISPLAY_VALUES.has(utility)) {
    return ['display'];
  }

  if (POSITION_VALUES.has(utility)) {
    return ['position'];
  }

  const spacing = utility.match(/^([mp])([trblesxy]?)-/);

  if (spacing) {
    const property = spacing[1] === 'm' ? 'margin' : 'padding';
    return directionKeys(property, spacing[2] || '');
  }

  if (utility.startsWith('inset-x-')) {
    return ['left', 'right'];
  }

  if (utility.startsWith('inset-y-')) {
    return ['top', 'bottom'];
  }

  if (utility.startsWith('inset-')) {
    return ['top', 'right', 'bottom', 'left'];
  }

  if (/^(?:top|right|bottom|left|start|end)-/.test(utility)) {
    return [utility.slice(0, utility.indexOf('-'))];
  }

  if (/^(?:size)-/.test(utility)) {
    return ['width', 'height'];
  }

  if (/^(?:w|min-w|max-w)-/.test(utility)) {
    return [utility.slice(0, utility.indexOf('-'))];
  }

  if (/^(?:h|min-h|max-h)-/.test(utility)) {
    return [utility.slice(0, utility.indexOf('-'))];
  }

  if (utility.startsWith('z-')) {
    return ['z-index'];
  }

  if (utility.startsWith('opacity-')) {
    return ['opacity'];
  }

  if (utility.startsWith('overflow-x-')) {
    return ['overflow-x'];
  }

  if (utility.startsWith('overflow-y-')) {
    return ['overflow-y'];
  }

  if (utility.startsWith('overflow-')) {
    return ['overflow-x', 'overflow-y'];
  }

  if (utility.startsWith('overscroll-x-')) {
    return ['overscroll-x'];
  }

  if (utility.startsWith('overscroll-y-')) {
    return ['overscroll-y'];
  }

  if (utility.startsWith('overscroll-')) {
    return ['overscroll-x', 'overscroll-y'];
  }

  if (/^flex-(?:row|row-reverse|col|col-reverse)$/.test(utility)) {
    return ['flex-direction'];
  }

  if (/^flex-(?:wrap|wrap-reverse|nowrap)$/.test(utility)) {
    return ['flex-wrap'];
  }

  if (/^flex-(?:grow|shrink)(?:-|$)/.test(utility)) {
    return [utility.startsWith('flex-grow') ? 'flex-grow' : 'flex-shrink'];
  }

  if (utility.startsWith('flex-')) {
    return ['flex'];
  }

  if (utility.startsWith('basis-')) {
    return ['flex-basis'];
  }

  if (utility.startsWith('order-')) {
    return ['order'];
  }

  if (utility.startsWith('grid-cols-')) {
    return ['grid-template-columns'];
  }

  if (utility.startsWith('grid-rows-')) {
    return ['grid-template-rows'];
  }

  if (utility.startsWith('col-span-') || utility.startsWith('col-auto')) {
    return ['grid-column'];
  }

  if (utility.startsWith('col-start-')) {
    return ['grid-column-start'];
  }

  if (utility.startsWith('col-end-')) {
    return ['grid-column-end'];
  }

  if (utility.startsWith('row-span-') || utility.startsWith('row-auto')) {
    return ['grid-row'];
  }

  if (utility.startsWith('row-start-')) {
    return ['grid-row-start'];
  }

  if (utility.startsWith('row-end-')) {
    return ['grid-row-end'];
  }

  if (utility.startsWith('grid-flow-')) {
    return ['grid-auto-flow'];
  }

  if (utility.startsWith('auto-cols-')) {
    return ['grid-auto-columns'];
  }

  if (utility.startsWith('auto-rows-')) {
    return ['grid-auto-rows'];
  }

  if (utility.startsWith('gap-x-')) {
    return ['column-gap'];
  }

  if (utility.startsWith('gap-y-')) {
    return ['row-gap'];
  }

  if (utility.startsWith('gap-')) {
    return ['column-gap', 'row-gap'];
  }

  if (utility.startsWith('justify-items-')) {
    return ['justify-items'];
  }

  if (utility.startsWith('justify-self-')) {
    return ['justify-self'];
  }

  if (utility.startsWith('justify-')) {
    return ['justify-content'];
  }

  if (utility.startsWith('items-')) {
    return ['align-items'];
  }

  if (utility.startsWith('content-')) {
    return ['align-content'];
  }

  if (utility.startsWith('self-')) {
    return ['align-self'];
  }

  if (utility.startsWith('place-content-')) {
    return ['place-content'];
  }

  if (utility.startsWith('place-items-')) {
    return ['place-items'];
  }

  if (utility.startsWith('place-self-')) {
    return ['place-self'];
  }

  return null;
}
