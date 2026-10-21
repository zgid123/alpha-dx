import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const dirname = path.dirname(fileURLToPath(import.meta.url));

function readComponent(fileName: string) {
  const source = fs.readFileSync(
    path.resolve(
      dirname,
      `../../../../../components/facets/triad/gear-triad/${fileName}`,
    ),
    'utf8',
  );
  const { descriptor } = parse(source);

  return { descriptor, source };
}

describe('GearTriad details components', () => {
  it('composes the detail panel from heading, content, and detail children', () => {
    const { descriptor, source } = readComponent('GearTriadDetails.vue');
    const template = descriptor.template?.content ?? '';
    const compiled = compileTemplate({
      source: template,
      id: 'gear-triad-details-spec',
      filename: 'GearTriadDetails.vue',
    });

    expect(compiled.errors).toEqual([]);
    expect(source).toContain('readonly option?: number;');
    expect(source).not.toContain('readonly title?:');
    expect(source).not.toContain('readonly description?:');
    expect(source).toContain("'GearTriadDetailsHeading'");
    expect(source).toContain("'GearTriadDetailsContent'");
    expect(template).toContain('alpha-gear-triad-details__items');
  });

  it('renders numbered detail rows through their default slot', () => {
    const { descriptor, source } = readComponent('GearTriadDetail.vue');
    const template = descriptor.template?.content ?? '';
    const compiled = compileTemplate({
      source: template,
      id: 'gear-triad-detail-spec',
      filename: 'GearTriadDetail.vue',
    });

    expect(compiled.errors).toEqual([]);
    expect(source).toContain('readonly step?: string | number;');
    expect(source).toContain('readonly option?: number;');
    expect(source).toContain('readonly color?: string;');
    expect(source).toContain('items-center');
    expect(source).not.toContain('items-start');
    expect(template).toContain('alpha-gear-triad-detail');
    expect(template).toContain(':style="{ color: stepColor }"');
    expect(source).not.toContain('text-(--alpha-gear-triad-detail-number)');
    expect(template).toMatch(/<p\b[^>]*alpha-gear-triad-detail__body/);
    expect(source).not.toMatch(/text-\[\d+(\.\d+)?rem\]/);
    expect(template).toContain('<slot />');
  });

  it('renders semantic h3 heading with color inherited from block or prop', () => {
    const { descriptor, source } = readComponent('GearTriadDetailsHeading.vue');
    const template = descriptor.template?.content ?? '';
    const compiled = compileTemplate({
      source: template,
      id: 'gear-triad-details-heading-spec',
      filename: 'GearTriadDetailsHeading.vue',
    });

    expect(compiled.errors).toEqual([]);
    expect(source).toContain('readonly color?: string;');
    expect(template).toMatch(/<h3\b/);
    expect(template).toContain('</h3>');
    expect(template).toContain(':style="{ color: headingColor }"');
    expect(source).not.toContain('text-(--alpha-gear-triad-details-heading)');
    expect(source).not.toContain('text-2xl');
    expect(source).not.toMatch(/text-\[\d+(\.\d+)?rem\]/);
  });

  it('renders semantic p content with text-sm class', () => {
    const { descriptor, source } = readComponent('GearTriadDetailsContent.vue');
    const template = descriptor.template?.content ?? '';
    const compiled = compileTemplate({
      source: template,
      id: 'gear-triad-details-content-spec',
      filename: 'GearTriadDetailsContent.vue',
    });

    expect(compiled.errors).toEqual([]);
    expect(template).toMatch(/<p\b/);
    expect(template).toContain('</p>');
    expect(source).toContain('text-sm');
    expect(source).not.toMatch(/text-\[\d+(\.\d+)?rem\]/);
  });
});
