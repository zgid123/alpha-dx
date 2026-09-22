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

      it('declares count, color, title, items, and edgeOffset props', () => {
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly count?: number;',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly color?: string;',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly title?: string;',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly items?: readonly IArcOrbitItem[];',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly edgeOffset?: number;',
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

      it('renders hub title and contents wrapper', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('alpha-arc-orbit__hub-title');
        expect(template).toContain('alpha-arc-orbit__contents-wrapper');
      });

      it('binds data-position attribute', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain(':data-position="props.position"');
      });
    });
  });
});
