import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('GearTriad component', () => {
  const componentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/gear-triad/GearTriad.vue',
  );
  const content = fs.readFileSync(componentPath, 'utf8');
  const { descriptor } = parse(content);

  describe('#props', () => {
    suite('when inspecting component props contract', () => {
      it('declares props in IGearTriadProps with appropriate defaults', () => {
        const script = descriptor.scriptSetup?.content ?? '';

        expect(script).toContain('readonly items?: readonly IGearTriadItem[];');
        expect(script).toContain('readonly animation?: boolean;');
        expect(script).toContain('readonly title?: string;');
        expect(script).toContain('readonly subtitle?: string;');
        expect(script).toContain(
          'readonly icons?: readonly (TGearTriadIcon | undefined)[];',
        );
        expect(script).toContain('readonly scale?: number;');
        expect(script).toContain('readonly autoScale?: boolean;');
        expect(script).toContain(
          'readonly centerIcon?: string | object | false;',
        );
        expect(script).toContain('readonly step?: number;');
        expect(script).toContain('readonly clicks?: number;');
        expect(script).toContain('readonly moved?: boolean;');
        expect(script).toMatch(/animation:\s*true/);
        expect(script).toMatch(/autoScale:\s*true/);
        expect(script).toMatch(/centerIcon:\s*'gear'/);
      });
    });
  });

  describe('#template', () => {
    suite('when compiling and evaluating template structure', () => {
      it('compiles the template without errors', () => {
        const result = compileTemplate({
          source: descriptor.template?.content ?? '',
          id: 'gear-triad-spec',
          filename: 'GearTriad.vue',
        });

        expect(result.errors).toEqual([]);
      });

      it('renders SVG diagram with base gear, beveled folds, and surface petals', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('alpha-gear-triad__diagram');
        expect(template).toContain('alpha-gear-triad__wheel');
        expect(template).toContain('alpha-gear-triad__assembly');
        expect(template).toContain('alpha-gear-triad__petal');
        expect(template).toContain('geo.petal.facePath');
        expect(template).toContain('GearTriadCenter');
      });

      it('provides fallback rendering of 3 default GearTriadCallouts', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('<GearTriadCallout />');
        expect(template).toContain('$slots.default');
      });
    });
  });

  describe('#click support', () => {
    suite('when inspecting click interactivity', () => {
      it('registers contents and determines click support conditionally', () => {
        const script = descriptor.scriptSetup?.content ?? '';

        expect(script).toContain('registeredContentsCount');
        expect(script).toContain('supportsClicks');
        expect(script).toContain('checkHasContentsVNodes');
        expect(script).toContain('!supportsClicks.value');
      });

      it('conditionally sets cursor-pointer or cursor-default based on supportsClicks', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain(
          "supportsClicks ? 'cursor-pointer' : 'cursor-default'",
        );
      });
    });
  });
});
