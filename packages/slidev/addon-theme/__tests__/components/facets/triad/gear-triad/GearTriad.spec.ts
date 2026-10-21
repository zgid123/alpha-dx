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

        expect(script).not.toContain('readonly items?:');
        expect(script).toContain('readonly animation?: boolean;');
        expect(script).not.toContain('readonly title?:');
        expect(script).not.toContain('readonly subtitle?:');
        expect(script).not.toContain('readonly icons?:');
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

      it('omits built-in header, leaving slide typography to presentation level', () => {
        const template = descriptor.template?.content ?? '';
        expect(template).not.toContain('<header');
        expect(template).not.toContain('alpha-gear-triad__header');
        expect(template).not.toContain('alpha-gear-triad__title');
        expect(descriptor.scriptSetup?.content).not.toContain('title?:');
      });

      it('uses a native button to advance the gear diagram', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toMatch(/<button\s+type="button"/);
        expect(template).toContain('aria-label="Advance gear diagram"');
        expect(template).toContain('@click="handleDiagramClick"');
        expect(template).not.toContain('role="button"');
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

      it('renders only composed callouts supplied through the default slot', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('<slot />');
        expect(template).not.toContain('<GearTriadCallout');
      });
    });
  });

  describe('#click support', () => {
    suite('when inspecting click interactivity', () => {
      it('registers details and determines click support conditionally', () => {
        const script = descriptor.scriptSetup?.content ?? '';

        expect(script).toContain('registeredDetailsCount');
        expect(script).toContain('supportsClicks');
        expect(script).toContain('checkHasDetailsVNodes');
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

  describe('GearTriadHeading', () => {
    const headingComponentPath = path.resolve(
      __dirname,
      '../../../../../components/facets/triad/gear-triad/GearTriadHeading.vue',
    );
    const headingContent = fs.readFileSync(headingComponentPath, 'utf8');
    const { descriptor: headingDescriptor } = parse(headingContent);

    it('compiles template without errors and renders semantic h4 tag', () => {
      const result = compileTemplate({
        source: headingDescriptor.template?.content ?? '',
        id: 'gear-triad-heading-spec',
        filename: 'GearTriadHeading.vue',
      });

      expect(result.errors).toEqual([]);
      const template = headingDescriptor.template?.content ?? '';
      expect(template).toMatch(/<h4\b/);
      expect(template).toContain('</h4>');
      expect(template).not.toContain('<h3');
    });

    it('omits m-0, p-0, and font-size classes while retaining semantic classes', () => {
      expect(headingContent).toContain('alpha-gear-triad-heading');
      expect(headingContent).toContain('mb-1.5');
      expect(headingContent).not.toContain('m-0');
      expect(headingContent).not.toContain('p-0');
      expect(headingContent).not.toMatch(/text-\[\d+(\.\d+)?rem\]/);
    });

    it('binds title color to callout item color by default', () => {
      const template = headingDescriptor.template?.content ?? '';
      expect(template).toContain(':style="{ color: headingColor }"');
      expect(headingDescriptor.scriptSetup?.content).toContain(
        'calloutContext?.item.value.color',
      );
    });
  });

  describe('GearTriadContent', () => {
    const contentComponentPath = path.resolve(
      __dirname,
      '../../../../../components/facets/triad/gear-triad/GearTriadContent.vue',
    );
    const contentContent = fs.readFileSync(contentComponentPath, 'utf8');
    const { descriptor: contentDescriptor } = parse(contentContent);

    it('compiles template without errors and renders semantic p tag', () => {
      const result = compileTemplate({
        source: contentDescriptor.template?.content ?? '',
        id: 'gear-triad-content-spec',
        filename: 'GearTriadContent.vue',
      });

      expect(result.errors).toEqual([]);
      const template = contentDescriptor.template?.content ?? '';
      expect(template).toMatch(/<p\b/);
      expect(template).toContain('</p>');
    });

    it('omits m-0, p-0, and font-size classes while retaining semantic classes', () => {
      expect(contentContent).toContain('alpha-gear-triad-content');
      expect(contentContent).not.toContain('m-0');
      expect(contentContent).not.toContain('p-0');
      expect(contentContent).not.toMatch(/text-\[\d+(\.\d+)?rem\]/);
    });
  });
});
