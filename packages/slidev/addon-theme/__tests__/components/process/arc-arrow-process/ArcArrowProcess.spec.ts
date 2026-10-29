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
  describe('ArcArrowProcess', () => {
    it('guards setCalloutColor against redundant mutations', () => {
      const { source } = readComponent('ArcArrowProcess.vue');

      expect(source).toContain(
        'if (registeredCalloutColors.value[index] === color) {',
      );
      expect(source).toContain(
        'if (registeredCalloutColors.value[index] === undefined) {',
      );
    });
  });

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

    it('binds headingStyle with direct color and heading variable matching callout item color', () => {
      const { template, source } = (() => {
        const { descriptor, source } = readComponent(
          'ArcArrowProcessHeading.vue',
        );

        return {
          template: descriptor.template?.content ?? '',
          source,
        };
      })();

      expect(template).toContain(':style="headingStyle"');
      expect(source).toContain('color: headingColor.value');
      expect(source).toContain(
        "'--alpha-arc-arrow-process-heading': headingColor.value",
      );
    });
  });

  describe('ArcArrowProcessCallout', () => {
    it('elevates the middle trough callout closer to the arrow in the 3-arrow layout', () => {
      const { source } = readComponent('ArcArrowProcessCallout.vue');

      expect(source).toContain('resolvedCount.value === 3');
      expect(source).toContain(
        "return 'left: calc(50% - 130px); bottom: 40px; width: 260px;';",
      );
    });

    it('uses non-recursive watch for callout color registration', () => {
      const { source } = readComponent('ArcArrowProcessCallout.vue');

      expect(source).not.toContain('watchEffect(');
      expect(source).toContain('watch(');
      expect(source).toContain(
        'return [resolvedIndex.value, props.color] as const;',
      );
    });

    it('right-aligns the first and second callouts in the 4-arrow layout', () => {
      const { descriptor, source } = readComponent(
        'ArcArrowProcessCallout.vue',
      );
      const template = descriptor.template?.content ?? '';

      expect(source).toContain('resolvedCount.value === 4');
      expect(source).toContain(
        'resolvedIndex.value === 0 || resolvedIndex.value === 1',
      );
      expect(template).toContain("isRightAligned ? 'text-right' : 'text-left'");
      expect(template).toContain(
        "isRightAligned ? 'items-end' : 'items-start'",
      );
      expect(source).toContain('left: 110px; top: 205px; width: 255px;');
      expect(source).toContain('right: 110px; top: 205px; width: 255px;');
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
      expect(source).toContain('line-clamp-4');
      expect(source).not.toContain('m-0');
      expect(source).not.toContain('text-[1rem]');
    });
  });
});
