import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

function readStylesheetTree(url: URL, seen = new Set<string>()): string {
  if (seen.has(url.href)) {
    return '';
  }

  seen.add(url.href);

  const source = readFileSync(url, 'utf8');
  const imports = [...source.matchAll(/@import\s+['"]([^'"]+)['"]/g)]
    .map((match) => match[1])
    .filter((path): path is string => Boolean(path?.startsWith('.')))
    .map((path) => readStylesheetTree(new URL(path, url), seen));

  return [source, ...imports].join('\n');
}

function collectFiles(
  dir: string,
  predicate: (file: string) => boolean,
): string[] {
  const results: string[] = [];

  for (const entry of readdirSync(dir)) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...collectFiles(fullPath, predicate));
    } else if (predicate(fullPath)) {
      results.push(fullPath);
    }
  }

  return results;
}

import pkg from '../../package.json';
import unoConfig from '../../uno.config';
import { mergeUno } from '../../utils/merge-uno';

const addonRootDir = fileURLToPath(new URL('../../', import.meta.url));
const coreStyleUrl = new URL('../../../core-theme/style.css', import.meta.url);

describe('semantic theme colors', () => {
  it('ships every component palette through the public stylesheet', () => {
    const root = new URL('../../', import.meta.url);
    const css = readStylesheetTree(new URL('style.css', root));

    expect(css).toContain("@import './components/core/style.css';");
    expect(css).toContain("@import './arc-orbit/style.css';");
    expect(css).toContain("@import './thanks/style.css';");
    expect(css).toContain('--alpha-square-thanks-content: #2b90b6;');
    expect(css).toContain('--alpha-thanks-square-start: #06b6d4;');
    expect(css).toContain('--alpha-thanks-outline-stroke: #06b6d4;');
    expect(css).toContain('--alpha-qna-color');
    expect(css).toContain(
      '--alpha-qna-color: var(--alpha-foreground-primary, #2b90b6);',
    );
    expect(css).toContain(
      '--alpha-reflected-title-color: var(--alpha-foreground-primary, #a5f3fc);',
    );
  });

  it('ships shared defaults for core layouts through the public stylesheet', () => {
    const root = new URL('../../', import.meta.url);
    const css = readStylesheetTree(new URL('style.css', root));

    expect(css).toContain("@import './layouts/core/style.css';");
    expect(css).toContain('--alpha-arc-toc-curve-stroke: #d7d7d5;');
    expect(css).toContain('--alpha-arc-toc-marker-border: #f8f8f7;');
    expect(css).toContain('--alpha-arc-toc-marker-orange: #ffad21;');
    expect(css).toContain('--alpha-arc-toc-marker-red: #ef4444;');
    expect(css).toContain(
      '--alpha-bg-center-text: var(--alpha-foreground-accent, #fff);',
    );
  });

  it('ships shared component interaction styles through the public stylesheet', () => {
    const root = new URL('../../', import.meta.url);
    const css = readStylesheetTree(new URL('style.css', root));

    expect(css).toContain("@import './components/style.css';");
    expect(css).toContain('.alpha-interaction-control:focus-visible');
  });

  it('provides the entire ArcArrowProcess palette in one file', () => {
    const css = readFileSync(
      new URL(
        '../../components/process/arc-arrow-process/style.css',
        import.meta.url,
      ),
      'utf8',
    );

    expect(css).toContain(
      '--alpha-arc-arrow-process-heading: var(--alpha-foreground-primary, #1e293b);',
    );
    expect(css).toContain('--alpha-arc-arrow-process-icon: #888d94;');
    expect(css).toContain('--alpha-arc-arrow-process-arrow: #6fa3b5;');
    expect(css).toContain(
      '--alpha-arc-arrow-process-arrow-gradient-end: #8cb8c8;',
    );
  });

  it('depends on Core and publishes its theme integration files', () => {
    expect(pkg.files).toContain('style.css');
    expect(pkg.files).toContain('uno.config.ts');
    expect(pkg.dependencies['@alphacifer/slidev-core-theme']).toBe(
      'workspace:^',
    );
  });

  it('imports Core CSS and UnoCSS config through public package exports', () => {
    expect(
      readFileSync(new URL('../../style.css', import.meta.url), 'utf8'),
    ).toContain("@import '@alphacifer/slidev-core-theme/style.css';");
    expect(
      readFileSync(new URL('../../uno.config.ts', import.meta.url), 'utf8'),
    ).toContain("from '@alphacifer/slidev-core-theme/uno'");
  });

  it('maps shared color names to overridable Alpha variables', () => {
    expect(unoConfig.theme.colors).toEqual({
      primary: 'var(--alpha-primary, #f8fafc)',
      'foreground-primary': 'var(--alpha-foreground-primary, #0f172a)',
      'foreground-secondary': 'var(--alpha-foreground-secondary, #475569)',
      'foreground-accent': 'var(--alpha-foreground-accent, #0284c7)',
      'stroke-primary': 'var(--alpha-stroke-primary, #cbd5e1)',
    });
  });

  it('maps standard text utilities to the body and small text tokens', () => {
    expect(unoConfig.theme.fontSize).toEqual({
      base: ['var(--alpha-font-size-base, 1rem)', '1.5rem'],
      sm: ['var(--alpha-font-size-small, 0.875rem)', '1.25rem'],
    });
  });

  it('gives arc components independent color overrides backed by shared tokens', () => {
    const css = [
      '../../components/core/arc-orbit/style.css',
      '../../components/comparisons/arc-comparison/style.css',
    ]
      .map((file) => readFileSync(new URL(file, import.meta.url), 'utf8'))
      .join('\n');

    expect(css).toContain(
      '--alpha-arc-orbit-guide-stroke: var(--alpha-stroke-primary);',
    );
    expect(css).toContain(
      '--alpha-arc-comparison-guide-stroke: var(--alpha-stroke-primary);',
    );
    expect(css).toContain('--alpha-arc-orbit-hub-fill: #1e293bcc;');
    expect(css).toContain('--alpha-arc-comparison-hub-fill: #1e293bcc;');
  });

  it('uses component color variables for card accents and translucent fills', () => {
    const card = readFileSync(
      new URL(
        '../../components/card/horizontal-card/HorizontalCard.vue',
        import.meta.url,
      ),
      'utf8',
    );
    const icon = readFileSync(
      new URL(
        '../../components/card/horizontal-card/HorizontalCardIcon.vue',
        import.meta.url,
      ),
      'utf8',
    );

    expect(card).toContain('--alpha-horizontal-card-accent');
    expect(icon).toContain('--alpha-horizontal-card-icon-bg');
    expect(icon).toMatch(
      /color-mix\(in srgb, \$\{customColor\.value\} 16%, transparent\)/,
    );
  });

  it('keeps table colors independently overridable', () => {
    const column = readFileSync(
      new URL(
        '../../components/comparisons/table-comparison/TableComparisonColumn.vue',
        import.meta.url,
      ),
      'utf8',
    );
    const table = readFileSync(
      new URL(
        '../../components/comparisons/table-comparison/TableComparison.vue',
        import.meta.url,
      ),
      'utf8',
    );
    const tableStyle = readFileSync(
      new URL(
        '../../components/comparisons/table-comparison/style.css',
        import.meta.url,
      ),
      'utf8',
    );

    expect(table).toContain('--alpha-table-comparison-cell-bg');
    expect(table).toContain('--alpha-table-comparison-row-bg');
    expect(tableStyle).toContain('--alpha-table-comparison-col: #ffffff;');
    expect(tableStyle).toContain('--alpha-table-comparison-row: #ffffff;');
    expect(column).toMatch(
      /--alpha-table-comparison-col-\$\{index \+ 1\}-background/,
    );
    expect(table).toContain('<slot />');
    expect(table).not.toContain('DEFAULT_MOCKUP_ROWS');
  });

  it('lets each pyramid override its accent and stack palette', () => {
    for (const [name, component] of [
      ['square', 'SquarePyramid'],
      ['circular', 'CircularPyramid'],
    ] as const) {
      const source = readFileSync(
        new URL(
          `../../components/pyramid/${name}-pyramid/${component}.vue`,
          import.meta.url,
        ),
        'utf8',
      );

      expect(source).toContain(`--alpha-${name}-pyramid-accent`);
      expect(source).toContain(`--alpha-${name}-pyramid-stack-`);
    }
  });

  it('defines every referenced --alpha-* theme token in the stylesheet tree', () => {
    const root = new URL('../../', import.meta.url);
    const fullCss = [
      readStylesheetTree(coreStyleUrl),
      readStylesheetTree(new URL('style.css', root)),
    ].join('\n');

    const definedTokens = new Set(
      [...fullCss.matchAll(/(--alpha-[a-z0-9-]+)\s*:/g)].map((m) => m[1]),
    );

    // Runtime-computed layout/geometry/animation CSS variables set via inline :style on root containers
    const runtimeComputedVariables = new Set([
      '--alpha-arc-comparison-start-delay',
      '--alpha-arc-orbit-start-delay',
      '--alpha-arc-toc-list-gap',
      '--alpha-arc-toc-marker-color',
      '--alpha-arrow-triad-start-delay',
      '--alpha-circular-pyramid-start-delay',
      '--alpha-circular-pyramid-stack-heading-width',
      '--alpha-circular-pyramid-stack-content-width',
      '--alpha-square-pyramid-start-delay',
      '--alpha-square-pyramid-stack-heading-width',
      '--alpha-square-pyramid-stack-content-width',
    ]);

    const sourceFiles = [
      ...collectFiles(join(addonRootDir, 'components'), (f) => {
        return /\.(?:vue|ts|css)$/.test(f);
      }),
      ...collectFiles(join(addonRootDir, 'layouts'), (f) => {
        return /\.(?:vue|ts|css)$/.test(f);
      }),
      ...collectFiles(join(addonRootDir, 'utils'), (f) => /\.ts$/.test(f)),
    ];

    const missingTokens: string[] = [];

    for (const file of sourceFiles) {
      const content = readFileSync(file, 'utf8');
      const matches = content.matchAll(
        /(?:var\(\s*|[-(]\()(--alpha-[a-z0-9-]+)(?![a-z0-9-${])/g,
      );

      for (const match of matches) {
        const token = match[1];
        if (
          token &&
          !definedTokens.has(token) &&
          !runtimeComputedVariables.has(token)
        ) {
          missingTokens.push(`${relative(addonRootDir, file)}: ${token}`);
        }
      }
    }

    expect(missingTokens).toEqual([]);
  });

  it('wraps all token declarations in style.css files inside @layer alpha-theme-tokens', () => {
    const styleFiles = [
      ...collectFiles(join(addonRootDir, 'components'), (f) => {
        return f.endsWith('style.css');
      }),
      ...collectFiles(join(addonRootDir, 'layouts'), (f) => {
        return f.endsWith('style.css');
      }),
    ];

    for (const file of styleFiles) {
      const content = readFileSync(file, 'utf8');
      if (content.includes(':root')) {
        expect(
          content,
          `${relative(addonRootDir, file)} must wrap :root/.dark token defaults in @layer alpha-theme-tokens`,
        ).toContain('@layer alpha-theme-tokens');
      }
    }
  });

  it('contains zero @layer directives in Vue components and layouts', () => {
    const vueFiles = [
      ...collectFiles(join(addonRootDir, 'components'), (f) => {
        return f.endsWith('.vue');
      }),
      ...collectFiles(join(addonRootDir, 'layouts'), (f) => f.endsWith('.vue')),
    ];

    const violations: string[] = [];
    for (const file of vueFiles) {
      const content = readFileSync(file, 'utf8');
      if (content.includes('@layer')) {
        violations.push(relative(addonRootDir, file));
      }
    }

    expect(violations).toEqual([]);
  });

  it('contains no hardcoded hex or rgb/hsl color values in components, layouts, or utils outside style.css', () => {
    const colorConverterFiles = new Set([
      'utils/colors.ts',
      'utils/card/horizontal-card/createHorizontalCardGeometry.ts',
      'utils/card/vertical-card/createVerticalCardGeometry.ts',
    ]);

    const codeFiles = [
      ...collectFiles(join(addonRootDir, 'components'), (f) => {
        return /\.(?:vue|ts)$/.test(f);
      }),
      ...collectFiles(join(addonRootDir, 'layouts'), (f) => {
        return /\.(?:vue|ts)$/.test(f);
      }),
      ...collectFiles(join(addonRootDir, 'utils'), (f) => {
        return (
          f.endsWith('.ts') &&
          !colorConverterFiles.has(relative(addonRootDir, f))
        );
      }),
    ];

    const violations: string[] = [];

    for (const file of codeFiles) {
      // Strip block comments and single-line comments before checking for hardcoded color literals
      const raw = readFileSync(file, 'utf8');
      const stripped = raw
        .replace(/\/\*[\s\S]*?\*\//g, '')
        .replace(/<!--[\s\S]*?-->/g, '')
        .replace(/\/\/.*$/gm, '');

      const hexMatches = stripped.match(/#[0-9a-fA-F]{3,8}\b/g);
      const fnMatches = stripped.match(/\b(?:rgba?|hsla?)\s*\(/g);

      if (hexMatches || fnMatches) {
        violations.push(
          `${relative(addonRootDir, file)}: ${[...(hexMatches ?? []), ...(fnMatches ?? [])].join(', ')}`,
        );
      }
    }

    expect(violations).toEqual([]);
  });

  it('contains zero !important declarations or UnoCSS ! important modifiers in components and layouts', () => {
    const files = [
      ...collectFiles(join(addonRootDir, 'components'), (f) => {
        return /\.(?:vue|css)$/.test(f);
      }),
      ...collectFiles(join(addonRootDir, 'layouts'), (f) => {
        return /\.(?:vue|css)$/.test(f);
      }),
    ];

    const violations: string[] = [];

    for (const file of files) {
      const content = readFileSync(file, 'utf8');
      if (content.includes('!important')) {
        violations.push(`${relative(addonRootDir, file)}: !important`);
      }
    }

    expect(violations).toEqual([]);
  });

  it('applies useMergedUnoAttrs across all single-root Vue components and layouts', () => {
    const vueFiles = [
      ...collectFiles(join(addonRootDir, 'components'), (f) => {
        return f.endsWith('.vue');
      }),
      ...collectFiles(join(addonRootDir, 'layouts'), (f) => f.endsWith('.vue')),
    ];

    // SquareThanks.vue is a multi-root Fragment of 7 motion decorations + slot
    const multiRootExceptions = new Set([
      'components/core/thanks/SquareThanks.vue',
    ]);

    const missingMerge: string[] = [];

    for (const file of vueFiles) {
      const rel = relative(addonRootDir, file);
      if (multiRootExceptions.has(rel)) {
        continue;
      }

      const content = readFileSync(file, 'utf8');
      if (
        !content.includes('useMergedUnoAttrs') ||
        !content.includes('inheritAttrs: false')
      ) {
        missingMerge.push(rel);
      }
    }

    expect(missingMerge).toEqual([]);
  });

  it('classifies bg-linear-* as background-image so background-color utilities do not strip gradient direction', () => {
    expect(
      mergeUno('bg-linear-to-br from-cyan-500 to-blue-500', 'bg-red-500'),
    ).toBe('bg-linear-to-br from-cyan-500 to-blue-500 bg-red-500');
    expect(mergeUno('bg-linear-to-br', 'bg-linear-to-r')).toBe(
      'bg-linear-to-r',
    );
  });
});
