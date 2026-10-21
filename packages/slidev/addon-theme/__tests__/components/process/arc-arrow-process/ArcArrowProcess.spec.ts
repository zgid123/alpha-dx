import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const dirname = path.dirname(fileURLToPath(import.meta.url));

function readComponent(fileName: string) {
  const source = fs.readFileSync(
    path.resolve(
      dirname,
      `../../../../components/process/arc-arrow-process/${fileName}`,
    ),
    'utf8',
  );
  const { descriptor } = parse(source);

  return { descriptor, source };
}

describe('ArcArrowProcess callout typography components', () => {
  describe('ArcArrowProcessHeading', () => {
    it('renders a semantic h4 element with accessible slot content and reset margins', () => {
      const { descriptor, source } = readComponent(
        'ArcArrowProcessHeading.vue',
      );
      const template = descriptor.template?.content ?? '';
      const compiled = compileTemplate({
        source: template,
        id: 'arc-arrow-process-heading-spec',
        filename: 'ArcArrowProcessHeading.vue',
      });

      expect(compiled.errors).toEqual([]);
      expect(template).toMatch(/<h4\b/);
      expect(template).toContain('</h4>');
      expect(template).not.toMatch(/<div\b/);
      expect(source).toContain('alpha-arc-arrow-process-heading');
      expect(source).toContain('mb-1.5');
      expect(source).not.toContain('m-0 mb-1.5');
      expect(source).not.toContain('text-[1.25rem]');
    });
  });

  describe('ArcArrowProcessContent', () => {
    it('renders a semantic p element', () => {
      const { descriptor, source } = readComponent(
        'ArcArrowProcessContent.vue',
      );
      const template = descriptor.template?.content ?? '';
      const compiled = compileTemplate({
        source: template,
        id: 'arc-arrow-process-content-spec',
        filename: 'ArcArrowProcessContent.vue',
      });

      expect(compiled.errors).toEqual([]);
      expect(template).toMatch(/<p\b/);
      expect(template).toContain('</p>');
      expect(template).not.toMatch(/<div\b/);
      expect(source).toContain('alpha-arc-arrow-process-content');
      expect(source).not.toContain('m-0');
      expect(source).not.toContain('text-[1rem]');
    });
  });
});
