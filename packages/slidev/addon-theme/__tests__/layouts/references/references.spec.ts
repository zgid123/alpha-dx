import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('references layout', () => {
  const layoutPath = path.resolve(
    __dirname,
    '../../../layouts/core/references.vue',
  );
  const layoutSource = fs.readFileSync(layoutPath, 'utf8');
  const { descriptor } = parse(layoutSource);

  it('compiles references layout template without errors', () => {
    const result = compileTemplate({
      source: descriptor.template?.content ?? '',
      id: 'references-layout-spec',
      filename: 'references.vue',
    });

    expect(result.errors).toEqual([]);
  });

  it('declares references, columns, and background props with expected defaults', () => {
    const script = descriptor.scriptSetup?.content ?? '';
    expect(script).toContain('references: {');
    expect(script).toContain('columns: {');
    expect(script).toContain('default: 2');
    expect(script).toContain('background: {');
    expect(script).toContain('IReferenceItem');
  });

  it('uses inheritAttrs: false and useMergedUnoAttrs for class forwarding', () => {
    const script = descriptor.scriptSetup?.content ?? '';
    expect(script).toContain('inheritAttrs: false');
    expect(script).toContain('useMergedUnoAttrs');
    expect(script).toContain('alpha-references');
  });

  it('renders a slot and semantic reference elements', () => {
    const template = descriptor.template?.content ?? '';
    expect(template).toContain('<slot />');
    expect(template).toContain('alpha-references__list');
    expect(template).toContain('alpha-references__item');
    expect(template).toContain('alpha-references__authors');
    expect(template).toContain('alpha-references__title');
    expect(template).toContain(':href="ref.url"');
  });
});
