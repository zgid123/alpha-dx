import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('SquareThanks components and thanks layout', () => {
  const squareThanksPath = path.resolve(
    __dirname,
    '../../../../components/core/thanks/SquareThanks.vue',
  );
  const squareThanksContentPath = path.resolve(
    __dirname,
    '../../../../components/core/thanks/SquareThanksContent.vue',
  );
  const thanksLayoutPath = path.resolve(
    __dirname,
    '../../../../layouts/thanks/thanks.vue',
  );
  const thanksStylePath = path.resolve(
    __dirname,
    '../../../../components/core/thanks/style.css',
  );

  const squareThanksSource = fs.readFileSync(squareThanksPath, 'utf8');
  const squareThanksContentSource = fs.readFileSync(
    squareThanksContentPath,
    'utf8',
  );
  const thanksLayoutSource = fs.readFileSync(thanksLayoutPath, 'utf8');
  const thanksStyleSource = fs.readFileSync(thanksStylePath, 'utf8');

  const { descriptor: squareThanksDescriptor } = parse(squareThanksSource);
  const { descriptor: squareThanksContentDescriptor } = parse(
    squareThanksContentSource,
  );
  const { descriptor: thanksLayoutDescriptor } = parse(thanksLayoutSource);

  describe('SquareThanks', () => {
    it('compiles SquareThanks template without errors', () => {
      const result = compileTemplate({
        source: squareThanksDescriptor.template?.content ?? '',
        id: 'square-thanks-spec',
        filename: 'SquareThanks.vue',
      });

      expect(result.errors).toEqual([]);
    });

    it('declares animation and color props', () => {
      const script = squareThanksDescriptor.scriptSetup?.content ?? '';
      expect(script).toContain('animation: {');
      expect(script).toContain('color: {');
    });

    it('detects explicit SquareThanksContent slot using useSlots and computed', () => {
      const script = squareThanksDescriptor.scriptSetup?.content ?? '';
      expect(script).toContain('useSlots');
      expect(script).toContain('hasExplicitContent');
      expect(script).toContain('SquareThanksContent');
    });

    it('wraps custom slot or fallback message inside SquareThanksContent', () => {
      const template = squareThanksDescriptor.template?.content ?? '';
      expect(template).toContain('<slot v-if="hasExplicitContent" />');
      expect(template).toContain(
        '<SquareThanksContent v-else :animation="animation" :color="color">',
      );
      expect(template).toContain('Thank You<br>for your attention!');
    });
  });

  describe('SquareThanksContent', () => {
    it('compiles SquareThanksContent template without errors', () => {
      const result = compileTemplate({
        source: squareThanksContentDescriptor.template?.content ?? '',
        id: 'square-thanks-content-spec',
        filename: 'SquareThanksContent.vue',
      });

      expect(result.errors).toEqual([]);
    });

    it('renders slot for custom message and titles', () => {
      const template = squareThanksContentDescriptor.template?.content ?? '';
      expect(template).toContain('<slot />');
    });

    it('resets nested heading and paragraph styles to inherit container typography', () => {
      const styles = squareThanksContentDescriptor.styles[0]?.content ?? '';
      expect(styles).toContain('.alpha-square-thanks-content :deep(h1)');
      expect(styles).toContain('font-size: inherit;');
      expect(styles).toContain('margin: 0;');
    });
  });

  describe('thanks layout', () => {
    it('compiles thanks layout template without errors', () => {
      const result = compileTemplate({
        source: thanksLayoutDescriptor.template?.content ?? '',
        id: 'thanks-layout-spec',
        filename: 'thanks.vue',
      });

      expect(result.errors).toEqual([]);
    });

    it('forwards default slot into SquareThanks', () => {
      const template = thanksLayoutDescriptor.template?.content ?? '';
      expect(template).toContain('<SquareThanks>');
      expect(template).toContain('<slot />');
      expect(template).toContain('</SquareThanks>');
    });

    it('includes semantic slidev layout classes', () => {
      expect(thanksLayoutSource).toContain('alpha-thanks slidev-layout thanks');
    });
  });

  describe('thanks style.css', () => {
    it('provides reset styles for headings and text inside alpha-square-thanks-content', () => {
      expect(thanksStyleSource).toContain('.alpha-square-thanks-content h1');
      expect(thanksStyleSource).toContain('font-size: inherit;');
      expect(thanksStyleSource).toContain('color: inherit;');
    });
  });
});
