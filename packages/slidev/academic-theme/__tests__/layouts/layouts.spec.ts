import fs from 'node:fs';
import path from 'node:path';

import pkg from '../../package.json';

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
        expect(pkg.files).toContain('slide-bottom.vue');
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
        expect(layouts).toContain('end.vue');
        expect(layouts).toContain('section.vue');
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
