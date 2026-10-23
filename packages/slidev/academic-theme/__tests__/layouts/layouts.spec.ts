import fs from 'node:fs';
import path from 'node:path';

import pkg from '../../package.json';
import unoConfig from '../../uno.config';

describe('academic-theme', () => {
  describe('#themeConfig', () => {
    suite('when inspecting theme configuration', () => {
      it('enforces light colorSchema', () => {
        expect(pkg.slidev.colorSchema).toBe('light');
      });
    });

    suite('when inspecting default slide settings', () => {
      it('specifies 16/9 aspect ratio and 980 canvas width', () => {
        expect(pkg.slidev.defaults.aspectRatio).toBe('16/9');
        expect(pkg.slidev.defaults.canvasWidth).toBe(980);
        expect(pkg.slidev.defaults.transition).toBe('slide-left');
      });
    });

    suite('when inspecting required package files', () => {
      it('publishes layouts and styles', () => {
        expect(pkg.files).toContain('layouts');
        expect(pkg.files).toContain('style.css');
        expect(pkg.files).toContain('uno.config.ts');
        expect(pkg.files).toContain('slide-bottom.vue');
      });

      it('does not require the Addon Theme package', () => {
        expect(pkg.dependencies).not.toHaveProperty(
          '@alphacifer/slidev-addon-theme',
        );
        expect(pkg.dependencies?.['@alphacifer/slidev-core-theme']).toBe(
          'workspace:^',
        );
      });
    });

    suite('when inspecting standalone UnoCSS configuration', () => {
      it('maps shared color utilities to the overridable Alpha variables', () => {
        expect(unoConfig.theme.colors).toEqual({
          primary: 'var(--alpha-primary, #f8fafc)',
          'foreground-primary': 'var(--alpha-foreground-primary, #0f172a)',
          'foreground-secondary': 'var(--alpha-foreground-secondary, #475569)',
          'foreground-accent': 'var(--alpha-foreground-accent, #0284c7)',
          'stroke-primary': 'var(--alpha-stroke-primary, #cbd5e1)',
        });
      });

      it('maps standard text utilities to the body and small text tokens', () => {
        expect(unoConfig.theme.fontSize).toEqual({
          base: ['var(--alpha-font-size-base, 1rem)', '1.5rem'],
          sm: ['var(--alpha-font-size-small, 0.875rem)', '1.25rem'],
        });
      });
    });

    suite('when integrating the core theme', () => {
      it('imports Core CSS and keeps Academic palette overrides local', () => {
        const stylePath = path.resolve(__dirname, '../../style.css');
        const content = fs.readFileSync(stylePath, 'utf8');

        expect(content).toContain(
          "@import '@alphacifer/slidev-core-theme/style.css';",
        );
        expect(content).toContain('--alpha-foreground-accent: #34d399;');
      });

      it('styles cover layout h2 and section h4 subtitles with secondary foreground', () => {
        const stylePath = path.resolve(__dirname, '../../style.css');
        const content = fs.readFileSync(stylePath, 'utf8');

        expect(content).toContain(
          '.slidev-page .slidev-layout.alpha-academic-cover h2:not([class])',
        );
        expect(content).toContain(
          '.slidev-page .slidev-layout.alpha-academic-cover h4:not([class])',
        );
        expect(content).toContain(
          '.slidev-page .slidev-layout.alpha-academic-section h4:not([class])',
        );
        expect(content).toContain(
          'color: var(--alpha-foreground-secondary, inherit);',
        );
      });

      it('enforces cover layout h1 to 3.75rem (60px) with high specificity', () => {
        const stylePath = path.resolve(__dirname, '../../style.css');
        const content = fs.readFileSync(stylePath, 'utf8');

        expect(content).toContain('.slidev-page .slidev-layout.alpha-cover h1');
        expect(content).toContain(
          '.slidev-page .slidev-layout.alpha-academic-cover h1',
        );
        expect(content).toContain(
          'font-size: var(--alpha-font-size-cover, 3.75rem);',
        );
      });

      it('ensures cover subtitles adapt for high contrast on image/dark backgrounds', () => {
        const stylePath = path.resolve(__dirname, '../../style.css');
        const content = fs.readFileSync(stylePath, 'utf8');

        expect(content).toContain(
          ".slidev-page .slidev-layout.alpha-cover[style*='background'] h3:not([class])",
        );
        expect(content).toContain(
          ".slidev-layout.alpha-academic-cover[style*='background']",
        );
        expect(content).toContain('opacity: 0.85;');
      });

      it('arranges cover content with flex gap and resets heading margins to 0', () => {
        const stylePath = path.resolve(__dirname, '../../style.css');
        const content = fs.readFileSync(stylePath, 'utf8');

        expect(content).toContain('display: flex;');
        expect(content).toContain('flex-direction: column;');
        expect(content).toContain(
          'gap: var(--alpha-academic-cover-gap, 0.75rem);',
        );
      });

      it('hides pagination on cover, toc, background center, and thanks slides', () => {
        const stylePath = path.resolve(__dirname, '../../style.css');
        const content = fs.readFileSync(stylePath, 'utf8');

        expect(content).toContain(
          '.slidev-page:has(.alpha-thanks) .alpha-academic-pagy',
        );
      });

      it('styles bg-center index with academic cover accent color', () => {
        const stylePath = path.resolve(__dirname, '../../style.css');
        const content = fs.readFileSync(stylePath, 'utf8');

        expect(content).toContain('.alpha-bg-center .alpha-bg-center__index');
        expect(content).toContain(
          'color: var(--alpha-academic-cover-title, var(--alpha-foreground-accent));',
        );
      });

      it('resets margins and inherits colors for thanks layout headings and paragraphs', () => {
        const stylePath = path.resolve(__dirname, '../../style.css');
        const content = fs.readFileSync(stylePath, 'utf8');

        expect(content).toContain(
          '.slidev-page .slidev-layout.alpha-thanks h1',
        );
        expect(content).toContain('color: inherit;');
      });
    });
  });

  describe('#layouts', () => {
    suite('when inspecting available layout templates', () => {
      it('provides blank layout alongside core academic layouts', () => {
        const layoutsDir = path.resolve(__dirname, '../../layouts');
        const layouts = fs.readdirSync(layoutsDir);

        expect(layouts).toContain('blank.vue');
        expect(layouts).toContain('cover.vue');
        expect(layouts).toContain('default.vue');
        expect(layouts).toContain('section.vue');
        expect(layouts).not.toContain('end.vue');
      });

      it('defines alpha-academic-blank in blank.vue template', () => {
        const blankPath = path.resolve(__dirname, '../../layouts/blank.vue');
        const content = fs.readFileSync(blankPath, 'utf8');

        expect(content).toContain('alpha-academic-blank');
        expect(content).toContain('handleBackground');
      });

      it('defines alpha-cover and alpha-academic-cover in cover.vue template', () => {
        const coverPath = path.resolve(__dirname, '../../layouts/cover.vue');
        const content = fs.readFileSync(coverPath, 'utf8');

        expect(content).toContain(
          'slidev-layout alpha-cover alpha-academic-cover',
        );
        expect(content).toContain(
          'alpha-academic-cover__content flex flex-col items-center gap-3 w-full',
        );
        expect(content).toContain('handleBackground');
      });
    });
  });
});
