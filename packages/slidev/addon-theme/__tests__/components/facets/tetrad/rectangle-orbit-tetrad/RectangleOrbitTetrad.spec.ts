import fs from 'node:fs';
import path from 'node:path';
import { compileTemplate, parse } from 'vue/compiler-sfc';

describe('RectangleOrbitTetrad component', () => {
  const componentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/tetrad/rectangle-orbit-tetrad/RectangleOrbitTetrad.vue',
  );
  const centerComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/tetrad/rectangle-orbit-tetrad/RectangleOrbitTetradCenter.vue',
  );
  const calloutComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/tetrad/rectangle-orbit-tetrad/RectangleOrbitTetradCallout.vue',
  );
  const headingComponentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/tetrad/rectangle-orbit-tetrad/RectangleOrbitTetradHeading.vue',
  );
  const calloutContentPath = path.resolve(
    __dirname,
    '../../../../../components/facets/tetrad/rectangle-orbit-tetrad/RectangleOrbitTetradContent.vue',
  );
  const content = fs.readFileSync(componentPath, 'utf8');
  const centerContent = fs.readFileSync(centerComponentPath, 'utf8');
  const calloutComponentContent = fs.readFileSync(calloutComponentPath, 'utf8');
  const headingContent = fs.readFileSync(headingComponentPath, 'utf8');
  const calloutContent = fs.readFileSync(calloutContentPath, 'utf8');
  const { descriptor } = parse(content);
  const { descriptor: centerDescriptor } = parse(centerContent);
  const { descriptor: calloutDescriptor } = parse(calloutComponentContent);
  const { descriptor: headingDescriptor } = parse(headingContent);
  const { descriptor: contentDescriptor } = parse(calloutContent);

  it('compiles the template without errors', () => {
    const result = compileTemplate({
      source: descriptor.template?.content ?? '',
      id: 'rectangle-orbit-tetrad-spec',
      filename: 'RectangleOrbitTetrad.vue',
    });

    expect(result.errors).toEqual([]);
  });

  it('applies the resolved scale to the diagram stage', () => {
    const template = descriptor.template?.content ?? '';

    expect(template).toMatch(
      /resolvedScale !== 1 \? `scale\(\$\{resolvedScale\}\)` : undefined/,
    );
  });

  describe('RectangleOrbitTetradCenter', () => {
    it('compiles the center template without errors', () => {
      const result = compileTemplate({
        source: centerDescriptor.template?.content ?? '',
        id: 'rectangle-orbit-tetrad-center-spec',
        filename: 'RectangleOrbitTetradCenter.vue',
      });

      expect(result.errors).toEqual([]);
    });

    it('renders semantic h4 without hardcoded font size and p with text-sm class for content slot', () => {
      const template = centerDescriptor.template?.content ?? '';

      expect(template).toMatch(/<h4\b/);
      expect(template).toContain('</h4>');
      expect(template).not.toContain('text-[23px]');

      expect(template).toMatch(/<p\b/);
      expect(template).toContain('</p>');
      expect(template).toContain('text-sm');
      expect(template).not.toContain('text-[13px]');
    });
  });

  describe('RectangleOrbitTetradCallout', () => {
    it('compiles the callout template without errors and does not declare titleColor prop', () => {
      const result = compileTemplate({
        source: calloutDescriptor.template?.content ?? '',
        id: 'rectangle-orbit-tetrad-callout-spec',
        filename: 'RectangleOrbitTetradCallout.vue',
      });

      expect(result.errors).toEqual([]);
      expect(calloutDescriptor.scriptSetup?.content).not.toContain(
        'titleColor',
      );
      const template = calloutDescriptor.template?.content ?? '';
      expect(template).toContain('backgroundColor: item.color');
    });
  });

  describe('RectangleOrbitTetradHeading', () => {
    it('compiles the heading template without errors, directly sets heading color from callout, omits m-0 and p-0, and disallows color prop', () => {
      const result = compileTemplate({
        source: headingDescriptor.template?.content ?? '',
        id: 'rectangle-orbit-tetrad-heading-spec',
        filename: 'RectangleOrbitTetradHeading.vue',
      });

      expect(result.errors).toEqual([]);
      const template = headingDescriptor.template?.content ?? '';
      expect(template).toMatch(/<h4\b/);
      expect(template).toContain('</h4>');
      expect(template).toContain('color: calloutContext?.item.value.color');
      expect(headingContent).not.toContain('m-0');
      expect(headingContent).not.toContain('p-0');
      expect(headingContent).not.toContain('computed(');
      expect(headingDescriptor.scriptSetup?.content).not.toContain(
        'color?: string',
      );
      expect(headingDescriptor.scriptSetup?.content).not.toContain(
        'defineProps',
      );
    });
  });

  describe('RectangleOrbitTetradContent', () => {
    it('compiles the content template without errors and renders semantic p without m-0 or p-0', () => {
      const result = compileTemplate({
        source: contentDescriptor.template?.content ?? '',
        id: 'rectangle-orbit-tetrad-content-spec',
        filename: 'RectangleOrbitTetradContent.vue',
      });

      expect(result.errors).toEqual([]);
      const template = contentDescriptor.template?.content ?? '';
      expect(template).toMatch(/<p\b/);
      expect(template).toContain('</p>');
      expect(calloutContent).toContain('alpha-rectangle-orbit-tetrad-content');
      expect(calloutContent).not.toContain('m-0');
      expect(calloutContent).not.toContain('p-0');
    });
  });
});
