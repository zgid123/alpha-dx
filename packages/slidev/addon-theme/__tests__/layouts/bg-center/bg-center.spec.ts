import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('bg-center layout', () => {
  const layoutPath = path.resolve(
    __dirname,
    '../../../layouts/core/bg-center.vue',
  );
  const layoutSource = fs.readFileSync(layoutPath, 'utf8');
  const { descriptor } = parse(layoutSource);

  it('compiles bg-center layout template without errors', () => {
    const result = compileTemplate({
      source: descriptor.template?.content ?? '',
      id: 'bg-center-layout-spec',
      filename: 'bg-center.vue',
    });

    expect(result.errors).toEqual([]);
  });

  it('declares background, indexed, and dim props with dim defaulting to false', () => {
    const script = descriptor.scriptSetup?.content ?? '';
    expect(script).toContain('background: {');
    expect(script).toContain('indexed: {');
    expect(script).toContain('default: false');
    expect(script).toContain('dim: {');
  });

  it('uses inheritAttrs: false and useMergedUnoAttrs for class forwarding', () => {
    const script = descriptor.scriptSetup?.content ?? '';
    expect(script).toContain('inheritAttrs: false');
    expect(script).toContain('useMergedUnoAttrs');
    expect(script).toContain('alpha-bg-center slidev-layout bg-center');
  });

  it('renders index with full opacity and accent color class', () => {
    const template = descriptor.template?.content ?? '';
    expect(template).toContain('alpha-bg-center__index');
    expect(template).not.toContain('opacity-50');
    expect(template).toContain('text-(--alpha-bg-center-text)');
  });
});
