import fs from 'node:fs';
import path from 'node:path';
import { compileTemplate, parse } from 'vue/compiler-sfc';

describe('VerticalCard component', () => {
  const componentPath = path.resolve(
    __dirname,
    '../../../../components/card/vertical-card/VerticalCard.vue',
  );
  const stylePath = path.resolve(
    __dirname,
    '../../../../components/card/vertical-card/style.css',
  );
  const content = fs.readFileSync(componentPath, 'utf8');
  const styleContent = fs.readFileSync(stylePath, 'utf8');
  const { descriptor } = parse(content);

  describe('#props', () => {
    suite('when inspecting component props contract', () => {
      it('does not declare width and height props, keeping sizing class-driven', () => {
        expect(descriptor.scriptSetup?.content).not.toContain(
          'readonly width?:',
        );
        expect(descriptor.scriptSetup?.content).not.toContain(
          'readonly height?:',
        );
      });

      it('does not declare titleColor, lightColor, or stripeColor props, deriving them automatically', () => {
        expect(descriptor.scriptSetup?.content).not.toContain(
          'readonly titleColor?:',
        );
        expect(descriptor.scriptSetup?.content).not.toContain(
          'readonly lightColor?:',
        );
        expect(descriptor.scriptSetup?.content).not.toContain(
          'readonly stripeColor?:',
        );
      });

      it('declares color, title, textColor, step, and variant props', () => {
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly color?: string;',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly title?: string | VNode;',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly textColor?: string;',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly step?: string | number;',
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly variant?: TVerticalCardBadgeVariant;',
        );
      });

      it('maps title token directly to custom color in style bindings', () => {
        expect(descriptor.template?.content).toContain(
          "'--alpha-vertical-card-title': customColor",
        );
      });
    });
  });

  describe('#template', () => {
    suite('when compiling and evaluating template structure', () => {
      it('compiles the template without syntax or template errors', () => {
        const result = compileTemplate({
          source: descriptor.template?.content ?? '',
          id: 'vertical-card-spec',
          filename: 'VerticalCard.vue',
        });

        expect(result.errors).toEqual([]);
      });

      it('renders vertical card body with base w-full h-full and title token mapping', () => {
        const script = descriptor.scriptSetup?.content ?? '';
        const template = descriptor.template?.content ?? '';

        expect(script).toContain('w-full h-full');
        expect(template).toContain('alpha-vertical-card');
        expect(template).toContain('alpha-vertical-card-title');
        expect(template).toContain('--alpha-vertical-card-title');
      });
    });
  });

  describe('#style', () => {
    suite('when inspecting vertical card style tokens', () => {
      it('defaults --alpha-vertical-card-title to inherit from --alpha-vertical-card-accent', () => {
        expect(styleContent).toMatch(
          /--alpha-vertical-card-title:\s*var\(--alpha-vertical-card-accent\);/,
        );
      });
    });
  });
});
