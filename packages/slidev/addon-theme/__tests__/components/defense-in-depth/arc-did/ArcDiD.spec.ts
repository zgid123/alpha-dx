import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it, suite } from 'vitest';
import { compileTemplate, parse } from 'vue/compiler-sfc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('defense-in-depth ArcDiD compound components', () => {
  describe('ArcDiD.vue', () => {
    const componentPath = path.resolve(
      __dirname,
      '../../../../components/defense-in-depth/arc-did/ArcDiD.vue',
    );
    const content = fs.readFileSync(componentPath, 'utf8');
    const { descriptor } = parse(content);

    describe('#props', () => {
      suite('when inspecting component props contract', () => {
        it('declares props in IArcDiDProps with appropriate defaults', () => {
          const script = descriptor.scriptSetup?.content ?? '';

          expect(script).toContain('readonly order?: TArcDiDOrder;');
          expect(script).toContain('readonly count?: number;');
          expect(script).toContain('readonly activeIndex?: number;');
          expect(script).toContain('readonly activePart?: string | number;');
          expect(script).toContain('readonly color?: string;');
          expect(script).toContain(
            'readonly colors?: readonly string[] | string[];',
          );
          expect(script).toContain(
            'readonly layers?: readonly IArcDiDLayerItem[];',
          );
          expect(script).toContain('readonly width?: number | string;');
          expect(script).toContain('readonly autoScale?: boolean;');
          expect(script).toContain('readonly animation?: boolean;');
          expect(script).toContain('readonly interactive?: boolean;');
          expect(script).toContain('readonly showDecorativeArcs?: boolean;');

          expect(script).toMatch(/order:\s*'outer-to-inner'/);
          expect(script).toMatch(/width:\s*720/);
          expect(script).toMatch(/activeIndex:\s*-1/);
          expect(script).toMatch(/activePart:\s*undefined/);
          expect(script).toMatch(/autoScale:\s*true/);
          expect(script).toMatch(/interactive:\s*true/);
          expect(script).toMatch(/showDecorativeArcs:\s*false/);
        });

        it('declares emits for update:activeIndex, update:activePart, select, part-click, and click', () => {
          const script = descriptor.scriptSetup?.content ?? '';

          expect(script).toContain(
            "(e: 'update:activeIndex', index: number): void",
          );
          expect(script).toContain(
            "(e: 'update:activePart', part: string | number | undefined): void",
          );
          expect(script).toContain("(e: 'select', index: number): void");
          expect(script).toContain(
            "(e: 'part-click', part: IArcDiDPartGeometry): void",
          );
          expect(script).toContain("(e: 'click', event: MouseEvent): void");
        });
      });
    });

    describe('#template', () => {
      suite('when compiling and evaluating template structure', () => {
        it('compiles the template without errors', () => {
          const result = compileTemplate({
            source: descriptor.template?.content ?? '',
            id: 'arc-did-spec',
            filename: 'ArcDiD.vue',
          });

          expect(result.errors).toEqual([]);
        });

        it('renders SVG concentric arc bands and layer overlays', () => {
          const template = descriptor.template?.content ?? '';

          expect(template).toContain('alpha-arc-did__svg');
          expect(template).toContain('alpha-arc-did__layers');
          expect(template).toContain('alpha-arc-did__band');
          expect(template).toContain('alpha-arc-did__active-sectors');
          expect(template).toContain('alpha-arc-did__stage-overlay');
        });

        it('binds data-count, data-active-index, and data-order attributes', () => {
          const template = descriptor.template?.content ?? '';

          expect(template).toContain(':data-count="resolvedCount"');
          expect(template).toContain(
            ':data-active-index="internalActiveIndex"',
          );
          expect(template).toContain(':data-order="props.order"');
        });
      });
    });

    describe('#styles', () => {
      suite('when inspecting component animation rules', () => {
        it('declares keyframe entrance animation for arc bands', () => {
          const style = descriptor.styles[0]?.content ?? '';

          expect(style).toContain('@keyframes arc-did-band-in');
          expect(style).toContain('animation: arc-did-band-in 600ms');
        });
      });
    });
  });

  describe('ArcDiDLayer.vue', () => {
    const componentPath = path.resolve(
      __dirname,
      '../../../../components/defense-in-depth/arc-did/ArcDiDLayer.vue',
    );
    const content = fs.readFileSync(componentPath, 'utf8');
    const { descriptor } = parse(content);

    describe('#props', () => {
      suite('when inspecting layer props contract', () => {
        it('declares title, color, textColor, index, and active props', () => {
          const script = descriptor.scriptSetup?.content ?? '';

          expect(script).toContain('readonly title?: string;');
          expect(script).toContain('readonly color?: string;');
          expect(script).toContain('readonly textColor?: string;');
          expect(script).toContain('readonly index?: number;');
          expect(script).toContain('readonly active?: boolean;');
        });
      });
    });

    describe('#template', () => {
      suite('when compiling layer template', () => {
        it('compiles without errors', () => {
          const result = compileTemplate({
            source: descriptor.template?.content ?? '',
            id: 'arc-did-layer-spec',
            filename: 'ArcDiDLayer.vue',
          });

          expect(result.errors).toEqual([]);
        });

        it('contains alpha-arc-did__layer container and fallback parts', () => {
          const template = descriptor.template?.content ?? '';

          expect(template).toContain('alpha-arc-did__layer');
          expect(template).toContain('<ArcDiDLayerTitle');
          expect(template).toContain('<ArcDiDLayerParts');
          expect(template).toContain('<slot />');
        });
      });
    });
  });

  describe('ArcDiDLayerTitle.vue', () => {
    const componentPath = path.resolve(
      __dirname,
      '../../../../components/defense-in-depth/arc-did/ArcDiDLayerTitle.vue',
    );
    const content = fs.readFileSync(componentPath, 'utf8');
    const { descriptor } = parse(content);

    describe('#props & #template', () => {
      suite('when inspecting layer title component', () => {
        it('declares title and color props', () => {
          const script = descriptor.scriptSetup?.content ?? '';

          expect(script).toContain('readonly title?: string;');
          expect(script).toContain('readonly color?: string;');
        });

        it('compiles without errors and renders title label', () => {
          const result = compileTemplate({
            source: descriptor.template?.content ?? '',
            id: 'arc-did-layer-title-spec',
            filename: 'ArcDiDLayerTitle.vue',
          });

          expect(result.errors).toEqual([]);
          expect(descriptor.template?.content).toContain(
            'alpha-arc-did__layer-title',
          );
        });
      });
    });
  });

  describe('ArcDiDLayerParts.vue', () => {
    const componentPath = path.resolve(
      __dirname,
      '../../../../components/defense-in-depth/arc-did/ArcDiDLayerParts.vue',
    );
    const content = fs.readFileSync(componentPath, 'utf8');
    const { descriptor } = parse(content);

    describe('#template', () => {
      suite('when compiling layer parts container', () => {
        it('compiles without errors and renders slot', () => {
          const result = compileTemplate({
            source: descriptor.template?.content ?? '',
            id: 'arc-did-layer-parts-spec',
            filename: 'ArcDiDLayerParts.vue',
          });

          expect(result.errors).toEqual([]);
          expect(descriptor.template?.content).toContain(
            'alpha-arc-did__layer-parts',
          );
          expect(descriptor.template?.content).toContain('<slot />');
        });
      });
    });
  });

  describe('ArcDiDLayerSector.vue', () => {
    const componentPath = path.resolve(
      __dirname,
      '../../../../components/defense-in-depth/arc-did/ArcDiDLayerSector.vue',
    );
    const content = fs.readFileSync(componentPath, 'utf8');
    const { descriptor } = parse(content);

    describe('#props', () => {
      suite('when inspecting layer sector props contract', () => {
        it('declares split, angle, span, color, index, rotate, and skew props with default split: true', () => {
          const script = descriptor.scriptSetup?.content ?? '';

          expect(script).toContain('readonly split?: boolean;');
          expect(script).toContain('readonly angle?: number;');
          expect(script).toContain('readonly span?: number;');
          expect(script).toContain('readonly color?: string;');
          expect(script).toContain('readonly index?: number;');
          expect(script).toContain(
            "readonly rotate?: boolean | number | 'tangent' | 'auto';",
          );
          expect(script).toContain(
            'readonly skew?: boolean | number | string;',
          );
          expect(script).toMatch(/split:\s*true/);
        });
      });
    });

    describe('#template', () => {
      suite('when compiling layer sector template', () => {
        it('compiles without errors and renders slot with data attributes', () => {
          const result = compileTemplate({
            source: descriptor.template?.content ?? '',
            id: 'arc-did-layer-sector-spec',
            filename: 'ArcDiDLayerSector.vue',
          });

          expect(result.errors).toEqual([]);
          const template = descriptor.template?.content ?? '';
          expect(template).toContain('alpha-arc-did__layer-sector');
          expect(template).toContain(':data-sector-index="resolvedIndex"');
          expect(template).toContain(':data-split="props.split"');
          expect(template).toContain('<slot />');
        });
      });
    });
  });

  describe('ArcDiDLayerPart.vue', () => {
    const componentPath = path.resolve(
      __dirname,
      '../../../../components/defense-in-depth/arc-did/ArcDiDLayerPart.vue',
    );
    const content = fs.readFileSync(componentPath, 'utf8');
    const { descriptor } = parse(content);

    describe('#props', () => {
      suite('when inspecting layer part props contract', () => {
        it('declares label, index, angle, radius, radialOffset, color, icon, position, maxWidth, rotate, skew, and active props', () => {
          const script = descriptor.scriptSetup?.content ?? '';

          expect(script).toContain('readonly label?: string;');
          expect(script).toContain('readonly index?: number;');
          expect(script).toContain('readonly angle?: number;');
          expect(script).toContain('readonly radius?: number;');
          expect(script).toContain('readonly radialOffset?: number;');
          expect(script).toContain('readonly color?: string;');
          expect(script).toContain('readonly icon?: string;');
          expect(script).toContain('readonly position?: TArcDiDPartPosition;');
          expect(script).toContain('readonly maxWidth?: number | string;');
          expect(script).toContain(
            "readonly rotate?: boolean | number | 'tangent' | 'auto';",
          );
          expect(script).toContain(
            'readonly skew?: boolean | number | string;',
          );
          expect(script).toContain('readonly active?: boolean;');
        });
      });
    });

    describe('#template & #styles', () => {
      suite('when compiling layer part template', () => {
        it('compiles without errors and renders dot halo and label', () => {
          const result = compileTemplate({
            source: descriptor.template?.content ?? '',
            id: 'arc-did-layer-part-spec',
            filename: 'ArcDiDLayerPart.vue',
          });

          expect(result.errors).toEqual([]);
          const template = descriptor.template?.content ?? '';
          expect(template).toContain('alpha-arc-did__part');
          expect(template).toContain('alpha-arc-did__part-label');
          expect(template).toContain('font-bold !text-white scale-110');
          expect(template).not.toContain('bg-white/20');
        });

        it('defines pop animation for parts', () => {
          const style = descriptor.styles[0]?.content ?? '';
          expect(style).toContain('@keyframes arc-did-part-pop');
          expect(style).toContain('animation: arc-did-part-pop 450ms');
        });
      });
    });
  });
});
