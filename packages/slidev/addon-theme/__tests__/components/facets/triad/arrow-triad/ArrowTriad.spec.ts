import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('ArrowTriad components', () => {
  const rootComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/arrow-triad/ArrowTriad.vue',
  );
  const calloutComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/arrow-triad/ArrowTriadCallout.vue',
  );
  const headingComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/arrow-triad/ArrowTriadHeading.vue',
  );
  const contentComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/arrow-triad/ArrowTriadContent.vue',
  );
  const iconComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/triad/arrow-triad/ArrowTriadIcon.vue',
  );

  const rootContent = fs.readFileSync(rootComponentPath, 'utf8');
  const calloutContent = fs.readFileSync(calloutComponentPath, 'utf8');
  const headingContent = fs.readFileSync(headingComponentPath, 'utf8');
  const contentContent = fs.readFileSync(contentComponentPath, 'utf8');
  const iconContent = fs.readFileSync(iconComponentPath, 'utf8');

  const { descriptor: rootDescriptor } = parse(rootContent);
  const { descriptor: calloutDescriptor } = parse(calloutContent);
  const { descriptor: headingDescriptor } = parse(headingContent);
  const { descriptor: contentDescriptor } = parse(contentContent);
  const { descriptor: iconDescriptor } = parse(iconContent);

  it('compiles ArrowTriad root template without errors', () => {
    const result = compileTemplate({
      source: rootDescriptor.template?.content ?? '',
      id: 'arrow-triad-root-spec',
      filename: 'ArrowTriad.vue',
    });

    expect(result.errors).toEqual([]);
  });

  describe('ArrowTriadCallout', () => {
    it('compiles ArrowTriadCallout template without errors', () => {
      const result = compileTemplate({
        source: calloutDescriptor.template?.content ?? '',
        id: 'arrow-triad-callout-spec',
        filename: 'ArrowTriadCallout.vue',
      });

      expect(result.errors).toEqual([]);
    });

    it('does not set background or card-shadow classes on callout block by default', () => {
      expect(calloutContent).not.toContain('bg-(--alpha-arrow-triad-card-bg)');
      expect(calloutContent).not.toContain(
        'shadow-(--alpha-arrow-triad-card-shadow)',
      );
      expect(calloutContent).not.toContain('bg-white');
    });

    it('conditionally sets backgroundColor only when activeItem.cardBg is provided', () => {
      const template = calloutDescriptor.template?.content ?? '';
      expect(template).toContain('activeItem.cardBg');
      expect(template).toContain('backgroundColor: activeItem.cardBg');
    });
  });

  describe('ArrowTriadHeading', () => {
    it('compiles template without errors and renders semantic h4 tag', () => {
      const result = compileTemplate({
        source: headingDescriptor.template?.content ?? '',
        id: 'arrow-triad-heading-spec',
        filename: 'ArrowTriadHeading.vue',
      });

      expect(result.errors).toEqual([]);
      const template = headingDescriptor.template?.content ?? '';
      expect(template).toMatch(/<h4\b/);
      expect(template).toContain('</h4>');
      expect(template).not.toContain('<div');
    });

    it('omits m-0, p-0, and font-size classes while retaining semantic classes', () => {
      expect(headingContent).toContain('alpha-arrow-triad-heading');
      expect(headingContent).toContain('mb-2');
      expect(headingContent).not.toContain('m-0');
      expect(headingContent).not.toContain('p-0');
      expect(headingContent).not.toMatch(/text-\[\d+(\.\d+)?rem\]/);
    });

    it('binds title color to callout item color or titleColor by default', () => {
      const template = headingDescriptor.template?.content ?? '';
      expect(template).toContain(':style="{ color: headingColor }"');
      expect(headingDescriptor.scriptSetup?.content).toContain(
        'calloutContext?.item.value.color',
      );
    });
  });

  describe('ArrowTriadContent', () => {
    it('compiles template without errors and renders semantic p tag', () => {
      const result = compileTemplate({
        source: contentDescriptor.template?.content ?? '',
        id: 'arrow-triad-content-spec',
        filename: 'ArrowTriadContent.vue',
      });

      expect(result.errors).toEqual([]);
      const template = contentDescriptor.template?.content ?? '';
      expect(template).toMatch(/<p\b/);
      expect(template).toContain('</p>');
      expect(template).not.toContain('<div');
    });

    it('omits m-0, p-0, and font-size classes while retaining semantic classes', () => {
      expect(contentContent).toContain('alpha-arrow-triad-content');
      expect(contentContent).not.toContain('m-0');
      expect(contentContent).not.toContain('p-0');
      expect(contentContent).not.toMatch(/text-\[\d+(\.\d+)?rem\]/);
    });
  });

  describe('ArrowTriadIcon', () => {
    it('compiles template without errors', () => {
      const result = compileTemplate({
        source: iconDescriptor.template?.content ?? '',
        id: 'arrow-triad-icon-spec',
        filename: 'ArrowTriadIcon.vue',
      });

      expect(result.errors).toEqual([]);
    });
  });
});
