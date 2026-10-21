import { readFileSync } from 'node:fs';
import unoConfig from '@alphacifer/slidev-core-theme/uno';
import { createGenerator, presetWind3 } from 'unocss';

import pkg from '../../package.json';

describe('core theme', () => {
  it('publishes the stylesheet and UnoCSS entry points', () => {
    expect(pkg.exports).toEqual({
      './style.css': './style.css',
      './uno': {
        types: './lib/uno.d.mts',
        import: './lib/uno.mjs',
      },
    });
    expect(pkg.files).toContain('style.css');
    expect(pkg.files).toContain('lib');
  });

  it('defines the shared light and dark color tokens and typography scale', () => {
    const style = readFileSync(
      new URL('../../style.css', import.meta.url),
      'utf8',
    );

    expect(style).toContain('--alpha-primary: #f8fafc;');
    expect(style).toContain('--alpha-primary: #0f172a;');
    expect(style).toContain('--alpha-foreground-primary: #0f172a;');
    expect(style).toContain('--alpha-foreground-primary: #f1f5f9;');
    expect(style).toContain('--alpha-foreground-secondary: #475569;');
    expect(style).toContain('--alpha-foreground-secondary: #94a3b8;');
    expect(style).toContain('--alpha-foreground-accent: #0284c7;');
    expect(style).toContain('--alpha-foreground-accent: #38bdf8;');
    expect(style).toContain('--alpha-stroke-primary: #cbd5e1;');
    expect(style).toContain('--alpha-stroke-primary: #475569;');
    expect(style).toContain('--alpha-font-size-cover: 3.75rem;');
    expect(style).toContain('--alpha-font-size-h1: 2.5rem;');
    expect(style).toContain('--alpha-font-size-h2: 2rem;');
    expect(style).toContain('--alpha-font-size-h3: 1.625rem;');
    expect(style).toContain('--alpha-font-size-h4: 1.25rem;');
    expect(style).toContain('--alpha-font-size-h5: 1rem;');
    expect(style).toContain('--alpha-font-size-h6: 0.875rem;');
    expect(style).toContain('--alpha-font-size-base: 1rem;');
    expect(style).toContain('--alpha-font-size-small: 0.875rem;');
    expect(style).toContain(
      `.slidev-page .slidev-layout h1,
.slidev-page .slidev-layout h2,
.slidev-page .slidev-layout h3,
.slidev-page .slidev-layout h4,
.slidev-page .slidev-layout h5,
.slidev-page .slidev-layout h6 {
  font-weight: bold;
}`,
    );
  });

  it('maps semantic color and text utilities to shared tokens', () => {
    expect(unoConfig.theme.colors).toEqual({
      primary: 'var(--alpha-primary, #f8fafc)',
      'foreground-primary': 'var(--alpha-foreground-primary, #0f172a)',
      'foreground-secondary': 'var(--alpha-foreground-secondary, #475569)',
      'foreground-accent': 'var(--alpha-foreground-accent, #0284c7)',
      'stroke-primary': 'var(--alpha-stroke-primary, #cbd5e1)',
    });
    expect(unoConfig.theme.fontSize).toEqual({
      base: ['var(--alpha-font-size-base, 1rem)', '1.5rem'],
      sm: ['var(--alpha-font-size-small, 0.875rem)', '1.25rem'],
    });
  });

  it('generates CSS for canonical classes used by the themes', async () => {
    const generator = await createGenerator({
      presets: [presetWind3()],
      rules: unoConfig.rules,
    });
    const result = await generator.generate(
      [
        'text-(--alpha-text,#ffffff)',
        'bg-(--alpha-background,#ffffff)',
        'border-(--alpha-border,#ffffff)',
        'ring-(--alpha-ring,#ffffff)',
        'text-(--alpha-text,#ffffff)!',
        'wrap-break-word',
        'bg-linear-to-br',
      ].join(' '),
      { preflights: false },
    );

    expect(result.matched).toHaveLength(7);
    expect(result.css).toContain('color:var(--alpha-text,#ffffff)');
    expect(result.css).toContain(
      'background-color:var(--alpha-background,#ffffff)',
    );
    expect(result.css).toContain('border-color:var(--alpha-border,#ffffff)');
    expect(result.css).toContain('--un-ring-color:var(--alpha-ring,#ffffff)');
    expect(result.css).toContain('overflow-wrap:break-word');
    expect(result.css).toContain(
      'background-image:linear-gradient(var(--un-gradient))',
    );
    expect(result.css).toContain('!important');
  });
});
