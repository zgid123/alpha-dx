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
        text: 'Slidev',
        link: '/slidev/addon/components/speaker',
        activeMatch: '/slidev/',
      },
    ],
    sidebar: {
      '/slidev/': [
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
              collapsed: false,
              items: [
                {
                  text: 'Speaker',
                  link: '/slidev/addon/components/speaker',
                },
                {
                  text: 'Date',
                  link: '/slidev/addon/components/date',
                },
                {
                  text: 'Quote',
                  link: '/slidev/addon/components/quote',
                },
                {
                  text: 'Reflected Title',
                  link: '/slidev/addon/components/reflected-title',
                },
                {
                  text: 'Q & A',
                  link: '/slidev/addon/components/qna',
                },
                {
                  text: 'Horizontal Card',
                  link: '/slidev/addon/components/horiz-card',
                },
                {
                  text: 'Vertical Card',
                  link: '/slidev/addon/components/vert-card',
                },
                {
                  text: 'Chevron Card',
                  link: '/slidev/addon/components/chevron-card',
                },
                {
                  text: 'Hex Triad',
                  link: '/slidev/addon/components/hex-triad',
                },
                {
                  text: 'Arrow Triad',
                  link: '/slidev/addon/components/arrow-triad',
                },
                {
                  text: 'Quad Hub',
                  link: '/slidev/addon/components/quad-hub',
                },
                {
                  text: 'Arc Compare',
                  link: '/slidev/addon/components/arc-compare',
                },
                {
                  text: 'Arc Arrow Process',
                  link: '/slidev/addon/components/arc-arrow-process',
                },
                {
                  text: 'Comparison Table',
                  link: '/slidev/addon/components/comparison-table',
                },
                {
                  text: 'Transition Heading',
                  link: '/slidev/addon/components/transition-heading',
                },
                {
                  text: 'Thanks',
                  link: '/slidev/addon/components/thanks',
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
              collapsed: false,
              items: [
                {
                  text: 'Speaker',
                  link: '/slidev/academic-theme/components/speaker',
                },
                {
                  text: 'Date',
                  link: '/slidev/academic-theme/components/date',
                },
                {
                  text: 'Quote',
                  link: '/slidev/academic-theme/components/quote',
                },
                {
                  text: 'Reflected Title',
                  link: '/slidev/academic-theme/components/reflected-title',
                },
                {
                  text: 'Q & A',
                  link: '/slidev/academic-theme/components/qna',
                },
                {
                  text: 'Horizontal Card',
                  link: '/slidev/academic-theme/components/horiz-card',
                },
                {
                  text: 'Vertical Card',
                  link: '/slidev/academic-theme/components/vert-card',
                },
                {
                  text: 'Chevron Card',
                  link: '/slidev/academic-theme/components/chevron-card',
                },
                {
                  text: 'Hex Triad',
                  link: '/slidev/academic-theme/components/hex-triad',
                },
                {
                  text: 'Arrow Triad',
                  link: '/slidev/academic-theme/components/arrow-triad',
                },
                {
                  text: 'Quad Hub',
                  link: '/slidev/academic-theme/components/quad-hub',
                },
                {
                  text: 'Arc Compare',
                  link: '/slidev/academic-theme/components/arc-compare',
                },
                {
                  text: 'Arc Arrow Process',
                  link: '/slidev/academic-theme/components/arc-arrow-process',
                },
                {
                  text: 'Comparison Table',
                  link: '/slidev/academic-theme/components/comparison-table',
                },
                {
                  text: 'Transition Heading',
                  link: '/slidev/academic-theme/components/transition-heading',
                },
                {
                  text: 'Thanks',
                  link: '/slidev/academic-theme/components/thanks',
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
