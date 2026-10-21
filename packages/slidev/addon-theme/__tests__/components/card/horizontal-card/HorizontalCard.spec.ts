import fs from 'node:fs';
import path from 'node:path';
import { compileTemplate, parse } from 'vue/compiler-sfc';

describe('HorizontalCard component', () => {
  const componentPath = path.resolve(
    __dirname,
    '../../../../components/card/horizontal-card/HorizontalCard.vue',
  );
  const stylePath = path.resolve(
    __dirname,
    '../../../../components/card/horizontal-card/style.css',
  );
  const content = fs.readFileSync(componentPath, 'utf8');
  const styleContent = fs.readFileSync(stylePath, 'utf8');
  const { descriptor } = parse(content);

  describe('#props', () => {
    suite('when inspecting component props contract', () => {
      it('does not declare titleColor or lightColor props, deriving them automatically', () => {
        expect(descriptor.scriptSetup?.content).not.toContain(
          'readonly titleColor?:',
        );
        expect(descriptor.scriptSetup?.content).not.toContain(
          'readonly lightColor?:',
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
          'readonly variant?: THorizontalCardBadgeVariant;',
        );
      });

      it('maps title token directly to custom color in style bindings', () => {
        expect(descriptor.template?.content).toContain(
          "'--alpha-horizontal-card-title': customColor",
        );
      });

      it('controls badge visibility via isBadgeVisible with variant and step evaluation', () => {
        expect(descriptor.scriptSetup?.content).toContain('isBadgeVisible');
        expect(descriptor.template?.content).toContain('v-if="isBadgeVisible"');
      });
    });
  });

  describe('#template', () => {
    suite('when compiling and evaluating template structure', () => {
      it('compiles the template without syntax or template errors', () => {
        const result = compileTemplate({
          source: descriptor.template?.content ?? '',
          id: 'horizontal-card-spec',
          filename: 'HorizontalCard.vue',
        });

        expect(result.errors).toEqual([]);
      });

      it('renders horizontal card body and title token mapping', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('alpha-horizontal-card');
        expect(template).toContain('alpha-horizontal-card-title');
        expect(template).toContain('--alpha-horizontal-card-title');
      });
    });
  });

  describe('#style', () => {
    suite('when inspecting horizontal card style tokens', () => {
      it('defaults --alpha-horizontal-card-title to inherit from --alpha-horizontal-card-accent', () => {
        expect(styleContent).toMatch(
          /--alpha-horizontal-card-title:\s*var\(--alpha-horizontal-card-accent\);/,
        );
      });
    });
  });
});
