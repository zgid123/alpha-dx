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

  it('uses inheritAttrs: false and useMergedUnoAttrs with default typography', () => {
    const script = descriptor.scriptSetup?.content ?? '';
    expect(script).toContain('inheritAttrs: false');
    expect(script).toContain('useMergedUnoAttrs');
    expect(script).toContain('alpha-meta-list');
    expect(script).toContain('text-xl');
  });

  it('renders a description list with semantic dt and dd elements', () => {
    const template = descriptor.template?.content ?? '';
    expect(template).toContain(
      '<dl v-bind="forwardedAttrs()" :class="className()">',
    );
    expect(template).toContain('<dt class="alpha-meta-list__label');
    expect(template).toContain('<dd class="alpha-meta-list__value');
    expect(template).toContain('<slot>');
  });
});
