import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it, suite } from 'vitest';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('CircularPyramid compound components', () => {
  describe('CircularPyramid.vue', () => {
    const componentPath = path.resolve(
      __dirname,
      '../../../../components/pyramid/circular-pyramid/CircularPyramid.vue',
    );
    const content = fs.readFileSync(componentPath, 'utf8');
    const { descriptor } = parse(content);

    describe('#props', () => {
      suite('when inspecting component props contract', () => {
        it('declares props in ICircularPyramidProps with appropriate defaults', () => {
          const script = descriptor.scriptSetup?.content ?? '';

          expect(script).toContain('readonly count?: number;');
          expect(script).toContain('readonly activeIndex?: number;');
          expect(script).toContain('readonly color?: string;');
          expect(script).toContain('readonly width?: number | string;');
          expect(script).toContain('readonly height?: number | string;');
          expect(script).toContain('readonly scale?: number;');
          expect(script).toContain('readonly autoScale?: boolean;');
          expect(script).toContain('readonly interactive?: boolean;');
          expect(script).toContain('readonly animation?: boolean;');

          expect(script).toMatch(/activeIndex:\s*-1/);
          expect(script).toMatch(/color:\s*DEFAULT_CIRCULAR_PYRAMID_COLOR/);
          expect(script).toMatch(/autoScale:\s*true/);
          expect(script).toMatch(/interactive:\s*true/);
          expect(script).toMatch(/animation:\s*true/);
        });

        it('declares emits for update:activeIndex and select', () => {
          const script = descriptor.scriptSetup?.content ?? '';

          expect(script).toContain(
            "(e: 'update:activeIndex', index: number): void;",
          );
          expect(script).toContain("(e: 'select', index: number): void;");
          expect(script).toContain("(e: 'click', event: MouseEvent): void;");
        });
      });
    });

    describe('#template', () => {
      suite('when compiling and evaluating template structure', () => {
        it('compiles the template without errors', () => {
          const result = compileTemplate({
            source: descriptor.template?.content ?? '',
            id: 'circular-pyramid-spec',
            filename: 'CircularPyramid.vue',
          });

          expect(result.errors).toEqual([]);
        });

        it('renders SVG elements with blur filter and drop shadows', () => {
          const template = descriptor.template?.content ?? '';

          expect(template).toContain('alpha-circular-pyramid__svg');
          expect(template).toContain('feGaussianBlur');
          expect(template).toContain('feDropShadow');
          expect(template).toContain('alpha-circular-pyramid__stack');
          expect(template).toContain('alpha-circular-pyramid__layer');
          expect(template).toContain('alpha-circular-pyramid__rim');
          expect(template).toContain('alpha-circular-pyramid__face');
        });

        it('binds active and blur classes conditionally based on active index', () => {
          const template = descriptor.template?.content ?? '';

          expect(template).toContain('alpha-circular-pyramid__layer--active');
          expect(template).toContain('alpha-circular-pyramid__layer--default');
        });
      });
    });
  });

  describe('CircularPyramidStack.vue', () => {
    const stackPath = path.resolve(
      __dirname,
      '../../../../components/pyramid/circular-pyramid/CircularPyramidStack.vue',
    );
    const stackContent = fs.readFileSync(stackPath, 'utf8');
    const { descriptor: stackDesc } = parse(stackContent);

    it('compiles CircularPyramidStack template without errors', () => {
      const result = compileTemplate({
        source: stackDesc.template?.content ?? '',
        id: 'circular-pyramid-stack-spec',
        filename: 'CircularPyramidStack.vue',
      });

      expect(result.errors).toEqual([]);
    });

    it('renders left title and right content containers with 150px and 240px widths', () => {
      const template = stackDesc.template?.content ?? '';
      const script = stackDesc.scriptSetup?.content ?? '';

      expect(template).toContain('alpha-circular-pyramid-stack__left');
      expect(template).toContain('alpha-circular-pyramid-stack__right');
      expect(script).toContain('DOT_POSITION_X');
      expect(script).toContain('const leftWidth = computed(');
      expect(script).toContain(
        'const rightWidth = computed(() => rootContext?.contentWidthPx.value ?? 240);',
      );
    });
  });

  describe('CircularPyramidStackTitle.vue', () => {
    const titlePath = path.resolve(
      __dirname,
      '../../../../components/pyramid/circular-pyramid/CircularPyramidStackTitle.vue',
    );
    const titleContent = fs.readFileSync(titlePath, 'utf8');
    const { descriptor: titleDesc } = parse(titleContent);

    it('compiles CircularPyramidStackTitle template without errors', () => {
      const result = compileTemplate({
        source: titleDesc.template?.content ?? '',
        id: 'circular-pyramid-stack-title-spec',
        filename: 'CircularPyramidStackTitle.vue',
      });

      expect(result.errors).toEqual([]);
    });

    it('renders pill container and connector line structure', () => {
      const template = titleDesc.template?.content ?? '';
      const script = titleDesc.scriptSetup?.content ?? '';

      expect(template).toContain('alpha-circular-pyramid-stack-title__pill');
      expect(template).toContain(
        'alpha-circular-pyramid-stack-title__connector',
      );
      expect(template).toContain('alpha-circular-pyramid-stack-title__line');
      expect(template).toContain('alpha-circular-pyramid-stack-title__dot');
      expect(script).toContain('stackColor');
      expect(template).toContain('borderColor: stackColor');
      expect(template).toContain('backgroundColor: stackColor');
    });
  });

  describe('CircularPyramidStackContent.vue', () => {
    const contentPath = path.resolve(
      __dirname,
      '../../../../components/pyramid/circular-pyramid/CircularPyramidStackContent.vue',
    );
    const descContent = fs.readFileSync(contentPath, 'utf8');
    const { descriptor: contentDesc } = parse(descContent);

    it('compiles CircularPyramidStackContent template without errors', () => {
      const result = compileTemplate({
        source: contentDesc.template?.content ?? '',
        id: 'circular-pyramid-stack-content-spec',
        filename: 'CircularPyramidStackContent.vue',
      });

      expect(result.errors).toEqual([]);
    });

    it('renders styled card container with stackColor border', () => {
      const template = contentDesc.template?.content ?? '';
      const script = contentDesc.scriptSetup?.content ?? '';

      expect(template).toContain('alpha-circular-pyramid-stack-content');
      expect(script).toContain('stackColor');
      expect(template).toContain('borderColor: stackColor');
    });
  });
});
