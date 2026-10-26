import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('MetaList component', () => {
  const metaListPath = path.resolve(
    __dirname,
    '../../../../components/core/MetaList.vue',
  );

  const metaListSource = fs.readFileSync(metaListPath, 'utf8');

  const { descriptor } = parse(metaListSource);

  it('compiles MetaList template without errors', () => {
    const result = compileTemplate({
      source: descriptor.template?.content ?? '',
      id: 'meta-list-spec',
      filename: 'MetaList.vue',
    });

    expect(result.errors).toEqual([]);
  });

  it('declares items and separator props with expected defaults', () => {
    const script = descriptor.scriptSetup?.content ?? '';
    expect(script).toContain('items: {');
    expect(script).toContain('separator: {');
    expect(script).toContain("default: ': '");
    expect(script).toContain('IMetaListItem');
  });

  it('uses inheritAttrs: false and useMergedUnoAttrs matching Speaker anchoring and typography', () => {
    const script = descriptor.scriptSetup?.content ?? '';
    expect(script).toContain('inheritAttrs: false');
    expect(script).toContain('useMergedUnoAttrs');
    expect(script).toContain('alpha-meta-list');
    expect(script).toContain('absolute bottom-3.75 left-7.5');
    expect(script).not.toContain('text-xl');
  });

  it('renders paragraph items matching Speaker layout and typography', () => {
    const template = descriptor.template?.content ?? '';
    expect(template).toContain(
      '<div v-bind="forwardedAttrs()" :class="className()">',
    );
    expect(template).toContain('class="alpha-meta-list__item"');
    expect(template).toContain('<span class="alpha-meta-list__label"');
    expect(template).toContain('<span class="alpha-meta-list__value"');
    expect(template).toContain('<slot>');
  });
});
