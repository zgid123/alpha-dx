type TCanonicalRule = [
  RegExp,
  (match: RegExpMatchArray) => Record<string, string>,
];

const rules: TCanonicalRule[] = [
  [
    /^text-(?:\((--[^)]+)\)|(--[^\s)]+))$/,
    ([, parenValue, bareValue]) => {
      const value = parenValue ?? bareValue;

      return {
        color: `var(${value})`,
      };
    },
  ],
  [
    /^bg-(?:\((--[^)]+)\)|(--[^\s)]+))$/,
    ([, parenValue, bareValue]) => {
      const value = parenValue ?? bareValue;

      return {
        'background-color': `var(${value})`,
      };
    },
  ],
  [
    /^border-(?:\((--[^)]+)\)|(--[^\s)]+))$/,
    ([, parenValue, bareValue]) => {
      const value = parenValue ?? bareValue;

      return {
        'border-color': `var(${value})`,
      };
    },
  ],
  [
    /^ring-(?:\((--[^)]+)\)|(--[^\s)]+))$/,
    ([, parenValue, bareValue]) => {
      const value = parenValue ?? bareValue;

      return {
        '--un-ring-color': `var(${value})`,
      };
    },
  ],
  [
    /^wrap-break-word$/,
    () => {
      return {
        'overflow-wrap': 'break-word',
      };
    },
  ],
  [
    /^bg-linear-to-br$/,
    () => {
      return {
        '--un-gradient-shape': 'to bottom right in oklch',
        '--un-gradient': 'var(--un-gradient-shape), var(--un-gradient-stops)',
        'background-image': 'linear-gradient(var(--un-gradient))',
      };
    },
  ],
];

const unoConfig = {
  rules,
  theme: {
    colors: {
      primary: 'var(--alpha-primary, #f8fafc)',
      'foreground-primary': 'var(--alpha-foreground-primary, #0f172a)',
      'foreground-secondary': 'var(--alpha-foreground-secondary, #475569)',
      'foreground-accent': 'var(--alpha-foreground-accent, #0284c7)',
      'stroke-primary': 'var(--alpha-stroke-primary, #cbd5e1)',
    },
    fontSize: {
      base: ['var(--alpha-font-size-base, 1rem)', '1.5rem'],
      sm: ['var(--alpha-font-size-small, 0.875rem)', '1.25rem'],
    },
  },
} as const;

export default unoConfig;
