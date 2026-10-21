import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('HexagonTriad components', () => {
  const rootComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/hexagon-triad/HexagonTriad.vue',
  );
  const headingComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/hexagon-triad/HexagonTriadHeading.vue',
  );
  const contentComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/hexagon-triad/HexagonTriadContent.vue',
  );

  const rootContent = fs.readFileSync(rootComponentPath, 'utf8');
  const headingContent = fs.readFileSync(headingComponentPath, 'utf8');
  const contentContent = fs.readFileSync(contentComponentPath, 'utf8');

  const { descriptor: rootDescriptor } = parse(rootContent);
  const { descriptor: headingDescriptor } = parse(headingContent);
  const { descriptor: contentDescriptor } = parse(contentContent);

  it('compiles HexagonTriad root template without errors', () => {
    const result = compileTemplate({
      source: rootDescriptor.template?.content ?? '',
      id: 'hexagon-triad-root-spec',
      filename: 'HexagonTriad.vue',
    });

    expect(result.errors).toEqual([]);
  });

  it('omits built-in header, leaving slide typography to presentation level', () => {
    const template = rootDescriptor.template?.content ?? '';
    expect(template).not.toContain('<header');
    expect(template).not.toContain('alpha-hexagon-triad__header');
    expect(template).not.toContain('alpha-hexagon-triad__title');
    expect(rootDescriptor.scriptSetup?.content).not.toContain('title?:');
  });

  describe('HexagonTriadHeading', () => {
    it('compiles template without errors and renders semantic h4 tag', () => {
      const result = compileTemplate({
        source: headingDescriptor.template?.content ?? '',
        id: 'hexagon-triad-heading-spec',
        filename: 'HexagonTriadHeading.vue',
      });

      expect(result.errors).toEqual([]);
      const template = headingDescriptor.template?.content ?? '';
      expect(template).toMatch(/<h4\b/);
      expect(template).toContain('</h4>');
      expect(template).not.toContain('<h3');
    });

    it('omits m-0, p-0, and font-size classes while retaining semantic classes', () => {
      expect(headingContent).toContain('alpha-hexagon-triad-heading');
      expect(headingContent).toContain('mb-2');
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

  describe('HexagonTriadContent', () => {
    it('compiles template without errors and renders semantic p tag', () => {
      const result = compileTemplate({
        source: contentDescriptor.template?.content ?? '',
        id: 'hexagon-triad-content-spec',
        filename: 'HexagonTriadContent.vue',
      });

      expect(result.errors).toEqual([]);
      const template = contentDescriptor.template?.content ?? '';
      expect(template).toMatch(/<p\b/);
      expect(template).toContain('</p>');
    });

    it('omits m-0, p-0, and font-size classes while retaining semantic classes', () => {
      expect(contentContent).toContain('alpha-hexagon-triad-content');
      expect(contentContent).not.toContain('m-0');
      expect(contentContent).not.toContain('p-0');
      expect(contentContent).not.toMatch(/text-\[\d+(\.\d+)?rem\]/);
    });
  });
});
