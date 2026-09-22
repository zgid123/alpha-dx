import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('GearTriadContents & GearTriadContent components', () => {
  const contentsPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/gear-triad/GearTriadContents.vue',
  );
  const contentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/gear-triad/GearTriadContent.vue',
  );

  const contentsSource = fs.readFileSync(contentsPath, 'utf8');
  const contentSource = fs.readFileSync(contentPath, 'utf8');

  const contentsDescriptor = parse(contentsSource).descriptor;
  const contentDescriptor = parse(contentSource).descriptor;

  describe('GearTriadContents', () => {
    describe('#props', () => {
      suite('when inspecting component props contract', () => {
        it('declares title, description, and option props', () => {
          const script = contentsDescriptor.scriptSetup?.content ?? '';

          expect(script).toContain('readonly title?: string;');
          expect(script).toContain('readonly description?: string;');
          expect(script).toContain('readonly option?: number;');
        });
      });
    });

    describe('#template', () => {
      suite('when compiling template', () => {
        it('compiles without errors and renders title, description, and item slots', () => {
          const result = compileTemplate({
            source: contentsDescriptor.template?.content ?? '',
            id: 'gear-triad-contents-spec',
            filename: 'GearTriadContents.vue',
          });

          expect(result.errors).toEqual([]);

          const template = contentsDescriptor.template?.content ?? '';
          expect(template).toContain('alpha-gear-triad-contents');
          expect(template).toContain('alpha-gear-triad-contents__title');
          expect(template).toContain('alpha-gear-triad-contents__desc');
          expect(template).toContain('alpha-gear-triad-contents__items');
          expect(template).toContain('slot name="title"');
          expect(template).toContain('slot name="description"');
        });
      });
    });
  });

  describe('GearTriadContent', () => {
    describe('#props', () => {
      suite('when inspecting component props contract', () => {
        it('declares step prop', () => {
          const script = contentDescriptor.scriptSetup?.content ?? '';

          expect(script).toContain('readonly step?: string | number;');
          expect(script).toContain('readonly option?: number;');
        });
      });
    });

    describe('#template', () => {
      suite('when compiling template', () => {
        it('compiles without errors and renders step indicator and body slot', () => {
          const result = compileTemplate({
            source: contentDescriptor.template?.content ?? '',
            id: 'gear-triad-content-spec',
            filename: 'GearTriadContent.vue',
          });

          expect(result.errors).toEqual([]);

          const template = contentDescriptor.template?.content ?? '';
          expect(template).toContain('alpha-gear-triad-content');
          expect(template).toContain('alpha-gear-triad-content__step');
          expect(template).toContain('alpha-gear-triad-content__body');
        });
      });
    });
  });
});
