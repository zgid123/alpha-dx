import type { IClassifyUtilityParams, TUtilityConflictKeys } from './types';

const BORDER_STYLES = new Set([
  'border-dashed',
  'border-dotted',
  'border-double',
  'border-hidden',
  'border-none',
  'border-solid',
]);

const LENGTH_VALUE = /^(?:0|\d|px|full|screen|min|max|fit|auto|\[[-+]?\d)/;

const BORDER_SIDES: Readonly<Record<string, readonly string[]>> = {
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

const ANIMATION_KEYS = [
  'animation-name',
  'animation-duration',
  'animation-delay',
  'animation-timing-function',
  'animation-fill-mode',
  'animation-direction',
  'animation-iteration-count',
  'animation-play-state',
] as const;

function directionKeys(property: string, direction: string): string[] {
  return (BORDER_SIDES[direction] ?? []).map((side) => `${property}-${side}`);
}

function classifyBorder(utility: string): string[] | null {
  if (utility === 'border-collapse' || utility === 'border-separate') {
    return ['border-collapse'];
  }

  if (utility.startsWith('border-spacing-x-')) {
    return ['border-spacing-x'];
  }

  if (utility.startsWith('border-spacing-y-')) {
    return ['border-spacing-y'];
  }

  if (utility.startsWith('border-spacing-')) {
    return ['border-spacing-x', 'border-spacing-y'];
  }

  if (BORDER_STYLES.has(utility)) {
    return ['border-style'];
  }

  const match = utility.match(/^border(?:-([trblesxy]))?(?:-(.+))?$/);

  if (!match) {
    return null;
  }

  const direction = match[1] ?? '';
  const value = match[2] ?? '';
  const kind = !value || LENGTH_VALUE.test(value) ? 'width' : 'color';
  return directionKeys(`border-${kind}`, direction);
}

function classifyBackground(utility: string): string[] {
  if (/^bg-(?:fixed|local|scroll)$/.test(utility)) {
    return ['background-attachment'];
  }

  if (/^bg-(?:clip|origin)-/.test(utility)) {
    return [
      utility.startsWith('bg-clip-') ? 'background-clip' : 'background-origin',
    ];
  }

  if (/^bg-(?:repeat|no-repeat)/.test(utility)) {
    return ['background-repeat'];
  }

  if (/^bg-(?:auto|cover|contain)$/.test(utility)) {
    return ['background-size'];
  }

  if (
    /^bg-(?:bottom|center|left|right|top)(?:-|$)/.test(utility) ||
    utility.startsWith('bg-position-')
  ) {
    return ['background-position'];
  }

  if (/^bg-(?:gradient|image|url)-/.test(utility)) {
    return ['background-image'];
  }

  if (utility.startsWith('bg-opacity-')) {
    return ['background-opacity'];
  }

  return ['background-color'];
}

function classifyAnimation(utility: string): readonly string[] {
  if (utility.startsWith('animate-name-')) {
    return ['animation-name'];
  }

  if (utility.startsWith('animate-duration-')) {
    return ['animation-duration'];
  }

  if (utility.startsWith('animate-delay-')) {
    return ['animation-delay'];
  }

  if (utility === 'animate-ease' || utility.startsWith('animate-ease-')) {
    return ['animation-timing-function'];
  }

  if (/^animate-(?:fill-mode-|fill-|mode-)/.test(utility)) {
    return ['animation-fill-mode'];
  }

  if (utility.startsWith('animate-direction-')) {
    return ['animation-direction'];
  }

  if (/^animate-(?:iteration-count-|iteration-|count-)/.test(utility)) {
    return ['animation-iteration-count'];
  }

  if (/^animate-(?:play-state-|play-|state-)/.test(utility)) {
    return ['animation-play-state'];
  }

  return ANIMATION_KEYS;
}

export function classifyVisual({
  utility,
}: IClassifyUtilityParams): TUtilityConflictKeys {
  if (utility.startsWith('bg-')) {
    return classifyBackground(utility);
  }

  if (utility.startsWith('rounded')) {
    const match = utility.match(/^rounded-?([trbles]{0,2})/)?.[1] ?? '';

    return [`border-radius:${match}`];
  }

  if (utility.startsWith('border')) {
    return classifyBorder(utility) ?? [`token:${utility}`];
  }

  if (utility.startsWith('divide-x-')) {
    return ['divide-x'];
  }

  if (utility.startsWith('divide-y-')) {
    return ['divide-y'];
  }

  if (utility.startsWith('ring-offset-')) {
    return ['ring-offset'];
  }

  if (utility.startsWith('ring-')) {
    return ['ring'];
  }

  if (utility.startsWith('shadow-') || utility === 'shadow') {
    return ['shadow'];
  }

  if (utility.startsWith('translate-x-')) {
    return ['translate-x'];
  }

  if (utility.startsWith('translate-y-')) {
    return ['translate-y'];
  }

  if (utility.startsWith('translate-')) {
    return ['translate-x', 'translate-y'];
  }

  if (utility.startsWith('rotate-')) {
    return ['rotate'];
  }

  if (utility.startsWith('scale-x-')) {
    return ['scale-x'];
  }

  if (utility.startsWith('scale-y-')) {
    return ['scale-y'];
  }

  if (utility.startsWith('scale-')) {
    return ['scale-x', 'scale-y'];
  }

  if (utility.startsWith('skew-x-')) {
    return ['skew-x'];
  }

  if (utility.startsWith('skew-y-')) {
    return ['skew-y'];
  }

  if (utility.startsWith('origin-')) {
    return ['transform-origin'];
  }

  if (utility.startsWith('transform-')) {
    return ['transform'];
  }

  if (utility.startsWith('transition-') || utility === 'transition') {
    return ['transition-property'];
  }

  if (utility.startsWith('duration-')) {
    return ['transition-duration'];
  }

  if (utility.startsWith('delay-')) {
    return ['transition-delay'];
  }

  if (utility.startsWith('ease-')) {
    return ['transition-timing-function'];
  }

  if (utility.startsWith('animate-')) {
    return classifyAnimation(utility);
  }

  return null;
}
