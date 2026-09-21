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
});
