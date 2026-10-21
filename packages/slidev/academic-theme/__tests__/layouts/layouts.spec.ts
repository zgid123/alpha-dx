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
          'color: var(--alpha-foreground-secondary, #475569);',
        );
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
    });
  });
});
