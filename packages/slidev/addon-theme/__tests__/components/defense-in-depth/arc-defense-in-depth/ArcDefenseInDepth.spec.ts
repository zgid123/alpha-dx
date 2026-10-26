import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function readComponent(filename: string) {
  const componentPath = path.resolve(
    __dirname,
    '../../../../components/defense-in-depth/arc-defense-in-depth',
    filename,
  );
  const source = fs.readFileSync(componentPath, 'utf8');
  return parse(source).descriptor;
}

function compile(
  descriptor: ReturnType<typeof readComponent>,
  filename: string,
) {
  return compileTemplate({
    source: descriptor.template?.content ?? '',
    id: filename,
    filename,
  });
}

describe('ArcDefenseInDepth composed components', () => {
  it('uses layer children instead of a content array prop', () => {
    const descriptor = readComponent('ArcDefenseInDepth.vue');
    const script = descriptor.scriptSetup?.content ?? '';
    const template = descriptor.template?.content ?? '';

    expect(script).not.toContain('readonly layers?:');
    expect(template).toContain('<slot />');
    expect(template).not.toContain('ArcDefenseInDepthLayerParts');
    expect(template).toContain('aria-label="Defense in depth diagram"');
    expect(template).toContain('class="alpha-interaction-control"');
    expect(template).not.toContain('role="group"');
    expect(template).not.toContain('role="button"');
    expect(compile(descriptor, 'ArcDefenseInDepth.vue').errors).toEqual([]);
  });

  it('uses a native button for selectable layer parts', () => {
    const part = readComponent('ArcDefenseInDepthLayerPart.vue');
    const template = part.template?.content ?? '';

    expect(template).toMatch(/<button\s+type="button"/);
    expect(template).toContain('@click="handlePartAreaClick"');
    expect(template).not.toContain('role="button"');
    expect(compile(part, 'ArcDefenseInDepthLayerPart.vue').errors).toEqual([]);
  });

  it('composes each layer from a Heading and direct part or sector children', () => {
    const layer = readComponent('ArcDefenseInDepthLayer.vue');
    const heading = readComponent('ArcDefenseInDepthLayerHeading.vue');
    const part = readComponent('ArcDefenseInDepthLayerPart.vue');
    const layerScript = layer.scriptSetup?.content ?? '';

    expect(layerScript).not.toContain('readonly title?:');
    expect(layerScript).toContain('rotate: data.rotate');
    expect(layerScript).toContain('skew: data.skew');
    expect(layer.template?.content).toContain('<slot />');
    expect(heading.scriptSetup?.content).not.toContain('readonly title?:');
    expect(heading.scriptSetup?.content).toContain(
      'var(--alpha-arc-defense-in-depth-layer-heading)',
    );
    expect(heading.template?.content).toContain('<slot />');
    expect(part.template?.content).toContain(
      'var(--alpha-arc-defense-in-depth-part)',
    );
    expect(compile(layer, 'ArcDefenseInDepthLayer.vue').errors).toEqual([]);
    expect(
      compile(heading, 'ArcDefenseInDepthLayerHeading.vue').errors,
    ).toEqual([]);
  });
});
