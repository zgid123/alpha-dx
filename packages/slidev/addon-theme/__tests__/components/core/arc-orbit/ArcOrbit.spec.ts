import fs from 'node:fs';
import path from 'node:path';
import { compileTemplate, parse } from 'vue/compiler-sfc';

describe('ArcOrbit component', () => {
  const componentPath = path.resolve(
    __dirname,
    '../../../../components/core/arc-orbit/ArcOrbit.vue',
  );
  const content = fs.readFileSync(componentPath, 'utf8');
  const { descriptor } = parse(content);

  describe('#props', () => {
    suite('when inspecting component props contract', () => {
      it('declares position prop in IArcOrbitProps with default left', () => {
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly position?: TArcOrbitPosition;',
        );
        expect(descriptor.scriptSetup?.content).toMatch(/position:\s*'left'/);
      });

      it('declares count, color, title, and edgeOffset props without an items API', () => {
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly count?: number;',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly color?: string;',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly title?: string | VNode;',
        );
        expect(descriptor.scriptSetup?.content).not.toContain(
          'readonly items?:',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly edgeOffset?: number;',
        );
      });

      it('maps title and accent tokens to customColor in style bindings', () => {
        expect(descriptor.template?.content).toContain(
          "'--alpha-arc-orbit-accent': customColor",
        );
        expect(descriptor.template?.content).toContain(
          "'--alpha-arc-orbit-title': customColor",
        );
      });
    });
  });

  describe('#template', () => {
    suite('when compiling and evaluating template structure', () => {
      it('compiles the template without syntax or template errors', () => {
        const result = compileTemplate({
          source: descriptor.template?.content ?? '',
          id: 'arc-orbit-spec',
          filename: 'ArcOrbit.vue',
        });

        expect(result.errors).toEqual([]);
      });

      it('renders hub and arc SVG elements', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('alpha-arc-orbit__hub');
        expect(template).toContain('alpha-arc-orbit__arc');
      });

      it('uses a labeled fieldset to group the diagram', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('<fieldset');
        expect(template).toContain('aria-label="Arc orbit diagram"');
        expect(template).not.toContain('role="group"');
      });

      it('renders hub title with text-(--alpha-arc-orbit-title) and the internal child callout wrapper', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('alpha-arc-orbit__hub-title');
        expect(template).toContain('text-(--alpha-arc-orbit-title)');
        expect(template).toContain('alpha-arc-orbit__contents-wrapper');
        expect(template).not.toContain('<ArcOrbitContents');
      });

      it('binds data-position attribute', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain(':data-position="props.position"');
      });
    });
  });

  describe('#style', () => {
    suite('when inspecting arc orbit style tokens', () => {
      it('defaults title and heading tokens to inherit from accent', () => {
        const stylePath = path.resolve(
          __dirname,
          '../../../../components/core/arc-orbit/style.css',
        );
        const styleContent = fs.readFileSync(stylePath, 'utf8');

        expect(styleContent).toMatch(
          /--alpha-arc-orbit-title:\s*var\(--alpha-arc-orbit-accent\);/,
        );
        expect(styleContent).toMatch(
          /--alpha-arc-orbit-heading:\s*var\(--alpha-arc-orbit-accent\);/,
        );
      });
    });
  });
});
