import { fileURLToPath, URL } from 'node:url';
import { presetWind3 } from 'unocss';
import UnoCSS from 'unocss/vite';
import { defineConfig } from 'vitepress';

function isolateAcademicThemePlugin() {
  return {
    name: 'isolate-academic-theme',
    enforce: 'pre' as const,
    transform(code: string, id: string): { code: string; map: null } | null {
      if (!id.includes('academic-theme/style.css')) {
        return null;
      }
      const scopedCode = code.replace(
        /([^{}]+)\{([^{}]+)\}/g,
        (
          match: string,
          rawSelectorsStr: string,
          declarations: string,
        ): string => {
          const commentMatch = rawSelectorsStr.match(
            /^(\s*\/\*[\s\S]*?\*\/\s*)+/,
          );
          const leadingComments = commentMatch ? commentMatch[0] : '';
          const selectorsStr = rawSelectorsStr
            .slice(leadingComments.length)
            .trim();
          if (!selectorsStr) return match;

          const selectors = selectorsStr
            .split(',')
            .map((s: string) => s.trim())
            .filter(Boolean);

          const scopedSelectors = selectors.map((sel: string) => {
            const cleanSel = sel.replace(/\/\*[\s\S]*?\*\//g, '').trim();
            if (cleanSel === ':root') {
              return '.slidev-theme-academic';
            }
            if (cleanSel === 'html.dark' || cleanSel === '.dark') {
              return 'html.dark .slidev-theme-academic, .dark .slidev-theme-academic, .slidev-theme-academic.dark';
            }
            if (
              cleanSel.startsWith('html.dark ') ||
              cleanSel.startsWith('.dark ')
            ) {
              const rest = cleanSel.replace(/^(html\.dark|\.dark)\s+/, '');
              if (rest.startsWith('.slidev-page')) {
                const pageRest = rest.replace(/^\.slidev-page/, '');
                return `html.dark .slidev-theme-academic.slidev-page${pageRest}, html.dark .slidev-theme-academic ${rest}, .dark .slidev-theme-academic.slidev-page${pageRest}, .dark .slidev-theme-academic ${rest}`;
              }
              return `html.dark .slidev-theme-academic ${rest}, .dark .slidev-theme-academic ${rest}`;
            }
            if (cleanSel.startsWith('.slidev-page')) {
              const rest = cleanSel.replace(/^\.slidev-page/, '');
              return `.slidev-theme-academic.slidev-page${rest}, .slidev-theme-academic ${cleanSel}`;
            }
            return `.slidev-theme-academic ${cleanSel}`;
          });

          return `${leadingComments}${scopedSelectors.join(',\n')} {${declarations}}`;
        },
      );

      return {
        code: scopedCode,
        map: null,
      };
    },
  };
}

export default defineConfig({
  title: 'Alpha DX',
  description: "All libs for Alpha's Project",
  srcDir: './src',
  base: '/alpha-dx/',
  markdown: {
    languageAlias: {
      vue: 'vue-html',
    },
  },
  vite: {
    plugins: [
      isolateAcademicThemePlugin(),
      UnoCSS({
        presets: [
          presetWind3({
            preflight: false,
          }),
        ],
        content: {
          pipeline: {
            include: [
              /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
              /packages\/slidev\/.*\.vue/,
            ],
          },
        },
      }),
    ],
    resolve: {
      alias: [
        {
          find: '@alphacifer/slidev-addon-theme',
          replacement: fileURLToPath(
            new URL('../../packages/slidev/addon-theme', import.meta.url),
          ),
        },
        {
          find: '@alphacifer/slidev-academic-theme',
          replacement: fileURLToPath(
            new URL('../../packages/slidev/academic-theme', import.meta.url),
          ),
        },
        {
          find: /^@slidev\/client(?:\/.*)?$/,
          replacement: fileURLToPath(
            new URL('./theme/slidev-client-shim.ts', import.meta.url),
          ),
        },
        {
          find: /^@alphacifer\/core-utils\/(.*)$/,
          replacement: fileURLToPath(
            new URL('../../packages/core-utils/src/$1', import.meta.url),
          ),
        },
        {
          find: '@alphacifer/core-utils',
          replacement: fileURLToPath(
            new URL('../../packages/core-utils/src', import.meta.url),
          ),
        },
      ],
    },
  },
  themeConfig: {
    nav: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Packages',
        link: '/packages/',
        activeMatch: '^/packages/',
      },
      {
        text: 'Slidev',
        link: '/slidev/',
        activeMatch: '^/slidev/',
      },
    ],
    sidebar: {
      '/packages/': [
        {
          text: 'Packages',
          items: [
            {
              text: 'Overview',
              link: '/packages/',
            },
          ],
        },
        {
          text: 'Utilities & Auth',
          collapsed: false,
          items: [
            {
              text: 'Core Utils',
              link: '/packages/core-utils',
            },
            {
              text: 'Auth Kit',
              link: '/packages/authkit',
            },
          ],
        },
        {
          text: 'Backend & Data',
          collapsed: false,
          items: [
            {
              text: 'Hono',
              link: '/packages/hono',
            },
            {
              text: 'Drizzle',
              link: '/packages/drizzle',
            },
          ],
        },
        {
          text: 'Frontend & Networking',
          collapsed: false,
          items: [
            {
              text: 'Axios',
              link: '/packages/axios',
            },
            {
              text: 'React',
              link: '/packages/react',
            },
          ],
        },
        {
          text: 'Tooling & Configs',
          collapsed: false,
          items: [
            {
              text: 'TSConfig',
              link: '/packages/tsconfig',
            },
            {
              text: 'Biome',
              link: '/packages/biome',
            },
            {
              text: 'OXC',
              link: '/packages/oxc',
            },
            {
              text: 'ESLint',
              link: '/packages/eslint',
            },
          ],
        },
        {
          text: 'Presentations',
          collapsed: false,
          items: [
            {
              text: 'Slidev Overview',
              link: '/slidev/',
            },
            {
              text: 'Addon Theme',
              link: '/slidev/addon/',
            },
            {
              text: 'Academic Theme',
              link: '/slidev/academic-theme/',
            },
          ],
        },
      ],
      '/slidev/': [
        {
          text: 'Overview',
          link: '/slidev/',
        },
        {
          text: 'Addon',
          collapsed: false,
          items: [
            {
              text: 'Overview',
              link: '/slidev/addon/',
            },
            {
              text: 'Components',
              collapsed: true,
              items: [
                {
                  text: 'Core',
                  items: [
                    {
                      text: 'Speaker',
                      link: '/slidev/addon/components/core/speaker',
                    },
                    {
                      text: 'Date',
                      link: '/slidev/addon/components/core/date',
                    },
                    {
                      text: 'Quote',
                      link: '/slidev/addon/components/core/quote',
                    },
                    {
                      text: 'Reflected Title',
                      link: '/slidev/addon/components/core/reflected-title',
                    },
                    {
                      text: 'Q & A',
                      link: '/slidev/addon/components/core/qna',
                    },
                    {
                      text: 'Transition Heading',
                      link: '/slidev/addon/components/core/transition-heading',
                    },
                    {
                      text: 'Thanks',
                      link: '/slidev/addon/components/core/thanks',
                    },
                    {
                      text: 'Arc Orbit',
                      link: '/slidev/addon/components/core/arc-orbit',
                    },
                  ],
                },
                {
                  text: 'Facets',
                  items: [
                    {
                      text: 'Triad',
                      items: [
                        {
                          text: 'Arrow Triad',
                          link: '/slidev/addon/components/facets/triad/arrow-triad',
                        },
                        {
                          text: 'Gear Triad',
                          link: '/slidev/addon/components/facets/triad/gear-triad',
                        },
                        {
                          text: 'Hex Triad',
                          link: '/slidev/addon/components/facets/triad/hex-triad',
                        },
                      ],
                    },
                    {
                      text: 'Tetrad',
                      items: [
                        {
                          text: 'Rect Orbit Tetrad',
                          link: '/slidev/addon/components/facets/tetrad/rect-orbit-tetrad',
                        },
                      ],
                    },
                  ],
                },
                {
                  text: 'Process',
                  items: [
                    {
                      text: 'Arc Arrow Process',
                      link: '/slidev/addon/components/process/arc-arrow-process',
                    },
                  ],
                },
                {
                  text: 'Comparisons',
                  items: [
                    {
                      text: 'Arc Comparison',
                      link: '/slidev/addon/components/comparisons/arc-comparison',
                    },
                    {
                      text: 'Table Comparison',
                      link: '/slidev/addon/components/comparisons/table-comparison',
                    },
                  ],
                },
                {
                  text: 'Pyramid',
                  items: [
                    {
                      text: 'Circular Pyramid',
                      link: '/slidev/addon/components/pyramid/circular-pyramid',
                    },
                    {
                      text: 'Square Pyramid',
                      link: '/slidev/addon/components/pyramid/square-pyramid',
                    },
                  ],
                },
                {
                  text: 'Cards',
                  items: [
                    {
                      text: 'Horizontal Card',
                      link: '/slidev/addon/components/card/horiz-card',
                    },
                    {
                      text: 'Vertical Card',
                      link: '/slidev/addon/components/card/vert-card',
                    },
                    {
                      text: 'Chevron Card',
                      link: '/slidev/addon/components/card/chevron-card',
                    },
                  ],
                },
              ],
            },
            {
              text: 'Layouts',
              collapsed: true,
              items: [
                {
                  text: 'Arc TOC',
                  link: '/slidev/addon/layouts/arc-toc',
                },
                {
                  text: 'Background Center',
                  link: '/slidev/addon/layouts/bg-center',
                },
                {
                  text: 'Shifting Intro',
                  link: '/slidev/addon/layouts/shifting-intro',
                },
                {
                  text: 'Table of Contents',
                  link: '/slidev/addon/layouts/table-of-contents',
                },
                {
                  text: 'Thanks',
                  link: '/slidev/addon/layouts/thanks',
                },
              ],
            },
          ],
        },
        {
          text: 'Academic Theme',
          collapsed: false,
          items: [
            {
              text: 'Overview',
              link: '/slidev/academic-theme/',
            },
            {
              text: 'Components',
              collapsed: true,
              items: [
                {
                  text: 'Core',
                  items: [
                    {
                      text: 'Speaker',
                      link: '/slidev/academic-theme/components/core/speaker',
                    },
                    {
                      text: 'Date',
                      link: '/slidev/academic-theme/components/core/date',
                    },
                    {
                      text: 'Quote',
                      link: '/slidev/academic-theme/components/core/quote',
                    },
                    {
                      text: 'Reflected Title',
                      link: '/slidev/academic-theme/components/core/reflected-title',
                    },
                    {
                      text: 'Q & A',
                      link: '/slidev/academic-theme/components/core/qna',
                    },
                    {
                      text: 'Transition Heading',
                      link: '/slidev/academic-theme/components/core/transition-heading',
                    },
                    {
                      text: 'Thanks',
                      link: '/slidev/academic-theme/components/core/thanks',
                    },
                    {
                      text: 'Arc Orbit',
                      link: '/slidev/academic-theme/components/core/arc-orbit',
                    },
                  ],
                },
                {
                  text: 'Facets',
                  items: [
                    {
                      text: 'Triad',
                      items: [
                        {
                          text: 'Arrow Triad',
                          link: '/slidev/academic-theme/components/facets/triad/arrow-triad',
                        },
                        {
                          text: 'Gear Triad',
                          link: '/slidev/academic-theme/components/facets/triad/gear-triad',
                        },
                        {
                          text: 'Hex Triad',
                          link: '/slidev/academic-theme/components/facets/triad/hex-triad',
                        },
                      ],
                    },
                    {
                      text: 'Tetrad',
                      items: [
                        {
                          text: 'Rect Orbit Tetrad',
                          link: '/slidev/academic-theme/components/facets/tetrad/rect-orbit-tetrad',
                        },
                      ],
                    },
                  ],
                },
                {
                  text: 'Process',
                  items: [
                    {
                      text: 'Arc Arrow Process',
                      link: '/slidev/academic-theme/components/process/arc-arrow-process',
                    },
                  ],
                },
                {
                  text: 'Comparisons',
                  items: [
                    {
                      text: 'Arc Comparison',
                      link: '/slidev/academic-theme/components/comparisons/arc-comparison',
                    },
                    {
                      text: 'Table Comparison',
                      link: '/slidev/academic-theme/components/comparisons/table-comparison',
                    },
                  ],
                },
                {
                  text: 'Pyramid',
                  items: [
                    {
                      text: 'Circular Pyramid',
                      link: '/slidev/academic-theme/components/pyramid/circular-pyramid',
                    },
                    {
                      text: 'Square Pyramid',
                      link: '/slidev/academic-theme/components/pyramid/square-pyramid',
                    },
                  ],
                },
                {
                  text: 'Cards',
                  items: [
                    {
                      text: 'Horizontal Card',
                      link: '/slidev/academic-theme/components/card/horiz-card',
                    },
                    {
                      text: 'Vertical Card',
                      link: '/slidev/academic-theme/components/card/vert-card',
                    },
                    {
                      text: 'Chevron Card',
                      link: '/slidev/academic-theme/components/card/chevron-card',
                    },
                  ],
                },
              ],
            },
            {
              text: 'Layouts',
              collapsed: true,
              items: [
                {
                  text: 'Cover',
                  link: '/slidev/academic-theme/layouts/cover',
                },
                {
                  text: 'Default',
                  link: '/slidev/academic-theme/layouts/default',
                },
                {
                  text: 'Blank',
                  link: '/slidev/academic-theme/layouts/blank',
                },
                {
                  text: 'Section',
                  link: '/slidev/academic-theme/layouts/section',
                },
                {
                  text: 'End',
                  link: '/slidev/academic-theme/layouts/end',
                },
                {
                  text: 'Arc TOC',
                  link: '/slidev/academic-theme/layouts/arc-toc',
                },
                {
                  text: 'Background Center',
                  link: '/slidev/academic-theme/layouts/bg-center',
                },
                {
                  text: 'Shifting Intro',
                  link: '/slidev/academic-theme/layouts/shifting-intro',
                },
                {
                  text: 'Table of Contents',
                  link: '/slidev/academic-theme/layouts/table-of-contents',
                },
                {
                  text: 'Thanks',
                  link: '/slidev/academic-theme/layouts/thanks',
                },
              ],
            },
          ],
        },
      ],
    },
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/zgid123/alpha-dx',
      },
    ],
  },
});
