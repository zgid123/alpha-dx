import fs from 'node:fs';
import path from 'node:path';
import { compileTemplate, parse } from 'vue/compiler-sfc';

describe('ArcComparison component', () => {
  const componentPath = path.resolve(
    __dirname,
    '../../../../components/comparisons/arc-comparison/ArcComparison.vue',
  );
  const content = fs.readFileSync(componentPath, 'utf8');
  const { descriptor } = parse(content);

  describe('#props', () => {
    suite('when inspecting component props contract', () => {
      it('declares TArcComparisonAs type and as property in IArcComparisonProps', () => {
        expect(descriptor.scriptSetup?.content).toContain(
          "export type TArcComparisonAs = 'layout';",
        );
        expect(descriptor.scriptSetup?.content).toContain(
          'readonly as?: TArcComparisonAs | null;',
        );
      });

      it('defaults as property to undefined in withDefaults', () => {
        expect(descriptor.scriptSetup?.content).toMatch(/as:\s*undefined/);
      });
    });
  });

  describe('#template', () => {
    suite('when evaluating layout mode vs default template structure', () => {
      it('compiles the template without syntax or template errors', () => {
        const result = compileTemplate({
          source: descriptor.template?.content ?? '',
          id: 'arc-comparison-spec',
          filename: 'ArcComparison.vue',
        });

        expect(result.errors).toEqual([]);
      });

      it('uses a native button for the comparison layout interaction', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toMatch(/<button\s+type="button"/);
        expect(template).toContain('@click="handleClick"');
        expect(template).not.toContain('role="button"');
      });

      it('renders central divider line with scale matching circle diameter in layout mode initially and expands when moved', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('alpha-arc-comparison__divider');
        expect(template).toContain(':style="dividerStyle"');
        expect(template).toContain('alpha-arc-comparison__divider-line--top');
        expect(template).toContain(
          'alpha-arc-comparison__divider-line--bottom',
        );
        expect(template).toContain(':stroke="resolvedLeftColor"');
        expect(template).toContain(':stroke="resolvedRightColor"');
      });

      it('renders both semicircular hubs unconditionally with left and right colored borders that hide when moved', () => {
        const template = descriptor.template?.content ?? '';
        const script = descriptor.scriptSetup?.content ?? '';

        expect(template).toContain('alpha-arc-comparison__hub--left');
        expect(template).toContain('alpha-arc-comparison__hub--right');
        expect(template).toContain('alpha-arc-comparison__hub-border--left');
        expect(template).toContain('alpha-arc-comparison__hub-border--right');
        expect(template).toContain('isMoved');
        expect(template).toContain('opacity-0');
        expect(template).toContain(':style="layoutBordersStyle"');
        expect(script).toContain('layoutBordersStyle');
        expect(template).toContain(':key="bordersRenderKey"');
        expect(script).toContain('bordersRenderKey');
        expect(script).toContain('isReturningToFirstStep');
      });

      it('renders other hub paths in layout mode positioned before the current hubs so current hubs overlay them', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('alpha-arc-comparison__hub--other');
        const otherLeftIndex = template.indexOf(
          'alpha-arc-comparison__hub--other-left',
        );
        const currentLeftIndex = template.indexOf(
          '<!-- Left Semicircular Hub Background -->',
        );
        expect(otherLeftIndex).toBeGreaterThan(-1);
        expect(currentLeftIndex).toBeGreaterThan(otherLeftIndex);
      });

      it('renders central versus badge unconditionally with split left and right half borders and rotation transform', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('alpha-arc-comparison__vs');
        expect(template).toContain('alpha-arc-comparison__vs-border--left');
        expect(template).toContain('alpha-arc-comparison__vs-border--right');
        expect(template).toMatch(/rotate\(\s*\$\{\s*resolvedVsBorderRotation/);
      });

      it("guards curved guide arcs to exclude them when as === 'layout' unless isMoved is true", () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toMatch(
          /v-if="props\.as !== 'layout' \|\| isMoved"\s+class="alpha-arc-comparison__arc alpha-arc-comparison__arc--left/,
        );
        expect(template).toMatch(
          /v-if="props\.as !== 'layout' \|\| isMoved"\s+class="alpha-arc-comparison__arc alpha-arc-comparison__arc--right/,
        );
      });

      it('provides as and isMoved in root context and passes isLayout to createArcComparisonGeometry', () => {
        const script = descriptor.scriptSetup?.content ?? '';

        expect(script).toContain('isLayout: true');
        expect(script).toContain('as: computed(() => props.as)');
        expect(script).toContain('isMoved');
      });

      it('renders hub mover wrappers that translate circles to original positions on click in layout mode', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain('alpha-arc-comparison__hub-mover');
        expect(template).toContain('alpha-arc-comparison__hub-mover--left');
        expect(template).toContain('alpha-arc-comparison__hub-mover--right');
      });

      it('renders side containers to display half-circle hub titles', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toMatch(
          /<ArcComparisonLeft[\s\S]*?<ArcComparisonRight/,
        );
      });

      it('binds data-as attribute, data-moved attribute, and click handler for layout mode', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toContain(':data-as="props.as ?? undefined"');
        expect(template).toContain(':data-moved="isMoved ? \'\' : undefined"');
        expect(template).toContain('@click="handleClick"');
        expect(template).toContain('alpha-arc-comparison--as-');
      });
    });

    suite('when inspecting ArcComparisonLeft and ArcComparisonRight layout mode behavior', () => {
      const leftContent = fs.readFileSync(
        path.resolve(
          __dirname,
          '../../../../components/comparisons/arc-comparison/ArcComparisonLeft.vue',
        ),
        'utf8',
      );
      const rightContent = fs.readFileSync(
        path.resolve(
          __dirname,
          '../../../../components/comparisons/arc-comparison/ArcComparisonRight.vue',
        ),
        'utf8',
      );

      it('positions the left and right hub titles in the middle when in center layout mode and spans visible full circle when moved or default', () => {
        expect(leftContent).toMatch(
          /inCenter\s*\?\s*`\$\{centerX\s*-\s*hubR\}px`/,
        );
        expect(leftContent).toMatch(/`\$\{edgeOffset\s*\+\s*hubR\}px`/);
        expect(rightContent).toMatch(/inCenter\s*\?\s*`\$\{centerX\}px`/);
        expect(rightContent).toMatch(
          /`\$\{viewBoxWidth\s*-\s*hubR\s*-\s*edgeOffset\}px`/,
        );
        expect(rightContent).toMatch(/`\$\{edgeOffset\s*\+\s*hubR\}px`/);
      });

      it('guards callout contents to hide them when in layout mode before click and reveal when moved', () => {
        expect(leftContent).toContain(
          "rootContext?.as?.value !== 'layout' || rootContext?.isMoved?.value",
        );
        expect(rightContent).toContain(
          "rootContext?.as?.value !== 'layout' || rootContext?.isMoved?.value",
        );
      });
    });
  });

  describe('#animation', () => {
    suite('when inspecting layout mode draw animations', () => {
      it('declares stroke-dash continuous draw animations for layout borders', () => {
        const styles = descriptor.styles.map((s) => s.content).join('\n');

        expect(styles).toContain('@keyframes alpha-arc-draw-continuous');
        expect(styles).toContain('alpha-arc-draw-continuous');
      });

      it('configures pathLength 100 on hub borders for normalized stroke drawing', () => {
        const template = descriptor.template?.content ?? '';

        expect(template).toMatch(/<path[^>]*pathLength="100"/);
      });
    });
  });
});
