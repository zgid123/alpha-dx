<script setup lang="ts">
import { computed, ref } from 'vue';

import SlidevMockup from '../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    variant?: 'core' | 'academic';
  }>(),
  {
    variant: 'core',
  },
);

const isAcademic = computed(() => props.variant === 'academic');
const activeTab = ref<'palette' | 'typography' | 'preview'>('palette');
const copiedItem = ref<string | null>(null);

interface IDesignToken {
  name: string;
  category: 'core' | 'academic';
  unoClass?: string;
  light: string;
  dark: string;
  role: string;
  description: string;
  packageOrigin: string;
}

const coreTokens: IDesignToken[] = [
  {
    name: '--alpha-primary',
    category: 'core',
    unoClass: 'bg-primary',
    light: '#f8fafc',
    dark: '#0f172a',
    role: 'Slide & Canvas Background',
    description: 'Foundation surface for slides, containers, and card bodies.',
    packageOrigin: '@alphacifer/slidev-core-theme',
  },
  {
    name: '--alpha-foreground-primary',
    category: 'core',
    unoClass: 'text-foreground-primary',
    light: '#0f172a',
    dark: '#f1f5f9',
    role: 'Primary Text & Headings',
    description:
      'Main slide titles (h1-h3), high-contrast labels, and primary body copy.',
    packageOrigin: '@alphacifer/slidev-core-theme',
  },
  {
    name: '--alpha-foreground-secondary',
    category: 'core',
    unoClass: 'text-foreground-secondary',
    light: '#475569',
    dark: '#94a3b8',
    role: 'Subtitles & Supporting Text',
    description:
      'Slide subtitles (h4), descriptions, metadata, and timestamps.',
    packageOrigin: '@alphacifer/slidev-core-theme',
  },
  {
    name: '--alpha-foreground-accent',
    category: 'core',
    unoClass: 'text-foreground-accent',
    light: '#0284c7',
    dark: '#38bdf8',
    role: 'Brand & Highlight Accent',
    description:
      'Active indicators, emphasized keywords, badges, and focal graphic paths.',
    packageOrigin: '@alphacifer/slidev-core-theme',
  },
  {
    name: '--alpha-stroke-primary',
    category: 'core',
    unoClass: 'border-stroke-primary',
    light: '#cbd5e1',
    dark: '#475569',
    role: 'Borders & Dividers',
    description:
      'Card boundaries, guide strokes, table matrix lines, and divider arcs.',
    packageOrigin: '@alphacifer/slidev-core-theme',
  },
];

const academicTokens: IDesignToken[] = [
  {
    name: '--alpha-primary',
    category: 'academic',
    unoClass: 'bg-primary',
    light: '#f8fafc',
    dark: '#0f172a',
    role: 'Academic Canvas Background',
    description:
      'Inherited from core-theme for light and dark slide backgrounds.',
    packageOrigin: '@alphacifer/slidev-core-theme',
  },
  {
    name: '--alpha-foreground-primary',
    category: 'academic',
    unoClass: 'text-foreground-primary',
    light: '#0f172a',
    dark: '#f1f5f9',
    role: 'Academic Primary Text',
    description:
      'Formal typography for thesis titles, slide headings, and text.',
    packageOrigin: '@alphacifer/slidev-core-theme',
  },
  {
    name: '--alpha-foreground-secondary',
    category: 'academic',
    unoClass: 'text-foreground-secondary',
    light: '#475569',
    dark: '#94a3b8',
    role: 'Subtitles & Speaker Attribution',
    description: 'Secondary information, date stamps, and author details.',
    packageOrigin: '@alphacifer/slidev-core-theme',
  },
  {
    name: '--alpha-foreground-accent',
    category: 'academic',
    unoClass: 'text-foreground-accent',
    light: '#0284c7',
    dark: '#34d399',
    role: 'Academic Accent (Emerald Dark)',
    description:
      'Restrained academic accent: Sky-600 in light, Emerald-400 in dark mode.',
    packageOrigin: '@alphacifer/slidev-academic-theme',
  },
  {
    name: '--alpha-stroke-primary',
    category: 'academic',
    unoClass: 'border-stroke-primary',
    light: '#cbd5e1',
    dark: '#475569',
    role: 'Academic Stroke & Outlines',
    description: 'Subtle borders and structural dividers.',
    packageOrigin: '@alphacifer/slidev-core-theme',
  },
  {
    name: '--alpha-academic-cover-title',
    category: 'academic',
    light: '#0284c7',
    dark: '#34d399',
    role: 'Cover Slide Hero Title',
    description: 'Color of the primary presentation title on cover slides.',
    packageOrigin: '@alphacifer/slidev-academic-theme',
  },
  {
    name: '--alpha-academic-page-number-text',
    category: 'academic',
    light: '#0f172a',
    dark: '#f1f5f9',
    role: 'Slide Paginator Numbers',
    description:
      'Tabular-nums slide numbering in bottom-right corner of academic slides.',
    packageOrigin: '@alphacifer/slidev-academic-theme',
  },
  {
    name: '--slidev-code-background',
    category: 'academic',
    light: '#f5f5f5',
    dark: '#f5f5f5',
    role: 'Lecture Code Block Background',
    description: 'Maintained light even in dark mode for maximum readability.',
    packageOrigin: '@alphacifer/slidev-academic-theme',
  },
];

const displayedTokens = computed(() => {
  return isAcademic.value ? academicTokens : coreTokens;
});

const typographyItems = [
  {
    level: 'Cover Title',
    tag: 'h1.alpha-cover',
    rem: '3.75rem',
    px: '60px',
    weight: 'Bold (700)',
    variable: '--alpha-font-size-cover',
    sample: 'Alpha Slidev System',
  },
  {
    level: 'Heading 1',
    tag: 'h1',
    rem: '2.25rem',
    px: '36px',
    weight: 'Bold (700)',
    variable: '--alpha-font-size-h1',
    sample: 'Architecture & Primitives',
  },
  {
    level: 'Heading 2',
    tag: 'h2',
    rem: '1.875rem',
    px: '30px',
    weight: 'Bold (700)',
    variable: '--alpha-font-size-h2',
    sample: 'Unified Design Token Pipeline',
  },
  {
    level: 'Heading 3',
    tag: 'h3',
    rem: '1.5rem',
    px: '24px',
    weight: 'Bold (700)',
    variable: '--alpha-font-size-h3',
    sample: 'Interactive Infographic Modules',
  },
  {
    level: 'Heading 4',
    tag: 'h4',
    rem: '1.25rem',
    px: '20px',
    weight: 'Medium (500)',
    variable: '--alpha-font-size-h4',
    sample: 'Section Subtitles & Key Takeaways',
  },
  {
    level: 'Heading 5',
    tag: 'h5',
    rem: '1.125rem',
    px: '18px',
    weight: 'Bold (700)',
    variable: '--alpha-font-size-h5',
    sample: 'Component Card Badges',
  },
  {
    level: 'Heading 6',
    tag: 'h6',
    rem: '1rem',
    px: '16px',
    weight: 'Bold (700)',
    variable: '--alpha-font-size-h6',
    sample: 'Inline Metadata Headers',
  },
  {
    level: 'Base Content',
    tag: 'p / body',
    rem: '1rem',
    px: '16px',
    weight: 'Regular (400)',
    variable: '--alpha-font-size-base',
    sample:
      'Consistent typography scaled for optimal legibility during presentations.',
  },
  {
    level: 'Small / Caption',
    tag: 'small',
    rem: '0.875rem',
    px: '14px',
    weight: 'Regular (400)',
    variable: '--alpha-font-size-small',
    sample: 'Footnotes, page numbering, timestamps, and speaker attributions.',
  },
];

const copyToClipboard = (text: string) => {
  navigator.clipboard?.writeText(text);
  copiedItem.value = text;
  setTimeout(() => {
    if (copiedItem.value === text) {
      copiedItem.value = null;
    }
  }, 1800);
};
</script>

<template>
  <div class="ds-explorer">
    <!-- Navigation Bar -->
    <div class="ds-explorer__nav">
      <div class="ds-explorer__tabs">
        <button
          type="button"
          :class="['ds-explorer__tab-btn', { active: activeTab === 'palette' }]"
          @click="activeTab = 'palette'"
        >
          <span class="i-carbon-color-palette mr-1.5" />
          {{ isAcademic ? 'Academic Color Tokens' : 'Core Color Tokens' }}
        </button>
        <button
          type="button"
          :class="['ds-explorer__tab-btn', { active: activeTab === 'typography' }]"
          @click="activeTab = 'typography'"
        >
          <span class="i-carbon-text-font mr-1.5" />
          Typography Scale
        </button>
        <button
          type="button"
          :class="['ds-explorer__tab-btn', { active: activeTab === 'preview' }]"
          @click="activeTab = 'preview'"
        >
          <span class="i-carbon-presentation-file mr-1.5" />
          Live Slide Preview
        </button>
      </div>
    </div>

    <!-- Tab 1: Color Tokens -->
    <div v-if="activeTab === 'palette'" class="ds-explorer__content">
      <div class="ds-grid">
        <div v-for="token in displayedTokens" :key="token.name" class="ds-card">
          <div class="ds-card__swatches">
            <!-- Light swatch -->
            <div
              class="ds-card__swatch"
              :style="{ backgroundColor: token.light }"
            >
              <span class="ds-card__swatch-label ds-card__swatch-label--light">
                Light: {{ token.light }}
              </span>
            </div>
            <!-- Dark swatch -->
            <div
              class="ds-card__swatch"
              :style="{ backgroundColor: token.dark }"
            >
              <span class="ds-card__swatch-label ds-card__swatch-label--dark">
                Dark: {{ token.dark }}
              </span>
            </div>
          </div>

          <div class="ds-card__body">
            <div class="flex items-center justify-between mb-1">
              <h4 class="ds-card__role">{{ token.role }}</h4>
              <button
                type="button"
                class="ds-copy-btn"
                :title="`Copy ${token.name}`"
                @click="copyToClipboard(token.name)"
              >
                {{ copiedItem === token.name ? 'Copied!' : 'Copy' }}
              </button>
            </div>

            <div class="ds-card__tags">
              <code class="ds-code-token">
                {{ token.name }}
              </code>
              <code v-if="token.unoClass" class="ds-code-class">
                {{ token.unoClass }}
              </code>
            </div>

            <p class="ds-card__desc">{{ token.description }}</p>

            <div class="ds-origin-tag">
              Origin: <span>{{ token.packageOrigin }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Tab 2: Typography Scale -->
    <div v-if="activeTab === 'typography'" class="ds-explorer__content">
      <div class="ds-type-table-wrap">
        <table class="ds-type-table">
          <thead>
            <tr>
              <th>Level / Tag</th>
              <th>Scale (Rem / Px)</th>
              <th>Weight</th>
              <th>Token Name</th>
              <th>Rendered Sample</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in typographyItems" :key="item.level">
              <td class="font-semibold whitespace-nowrap">
                <div>{{ item.level }}</div>
                <code
                  class="text-xs text-blue-600 dark:text-blue-400 font-mono"
                  >{{
                    item.tag
                  }}</code
                >
              </td>
              <td class="whitespace-nowrap font-mono text-xs">
                <span class="font-bold">{{ item.rem }}</span>
                <span class="text-gray-400"> ({{ item.px }})</span>
              </td>
              <td
                class="whitespace-nowrap text-xs text-gray-500 dark:text-gray-400"
              >
                {{ item.weight }}
              </td>
              <td class="whitespace-nowrap">
                <code class="ds-code-token text-xs">
                  {{ item.variable }}
                </code>
              </td>
              <td class="ds-type-sample-cell">
                <span
                  class="ds-type-preview"
                  :style="{
                    fontSize: item.rem,
                    fontWeight: item.weight.startsWith('Bold') ? 'bold' : 'normal',
                    lineHeight: '1.25',
                  }"
                >
                  {{ item.sample }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Tab 3: Live Slide Preview -->
    <div v-if="activeTab === 'preview'" class="ds-explorer__content">
      <SlidevMockup :theme="isAcademic ? 'academic' : 'seriph'">
        <div class="p-8 flex flex-col justify-between h-full">
          <div>
            <div class="flex items-center gap-2 mb-3">
              <span
                class="px-2.5 py-0.5 text-xs font-bold rounded-md bg-opacity-20 border border-stroke-primary"
                :class="isAcademic ? 'bg-emerald-500 text-foreground-accent' : 'bg-blue-500 text-foreground-accent'"
              >
                {{
                  isAcademic ? 'ACADEMIC DESIGN SYSTEM' : 'CORE DESIGN SYSTEM'
                }}
              </span>
              <span class="text-xs text-foreground-secondary">
                {{
                  isAcademic
                    ? 'Academic Theme (@alphacifer/slidev-academic-theme)'
                    : 'Core Theme (@alphacifer/slidev-core-theme)'
                }}
              </span>
            </div>

            <h1 class="text-3xl font-bold text-foreground-primary mb-2">
              {{
                isAcademic ? 'Academic Lecture & Defense' : 'Slidev Core Design System'
              }}
            </h1>

            <h4 class="text-lg font-medium text-foreground-secondary mb-6">
              {{
                isAcademic
                  ? 'Structured typography and high-contrast dark accents'
                  : 'Shared design tokens and typography defaults for Slidev'
              }}
            </h4>

            <div class="grid grid-cols-3 gap-4">
              <div
                class="p-4 rounded-lg border border-stroke-primary bg-primary bg-opacity-50"
              >
                <div
                  class="text-xs font-semibold text-foreground-accent mb-1 uppercase tracking-wider"
                >
                  Canvas
                </div>
                <div class="text-sm font-bold text-foreground-primary">
                  --alpha-primary
                </div>
                <div class="text-xs text-foreground-secondary mt-1">
                  Root canvas tone adapting to light (#f8fafc) and dark
                  (#0f172a).
                </div>
              </div>

              <div
                class="p-4 rounded-lg border border-stroke-primary bg-primary bg-opacity-50"
              >
                <div
                  class="text-xs font-semibold text-foreground-accent mb-1 uppercase tracking-wider"
                >
                  Accent
                </div>
                <div class="text-sm font-bold text-foreground-primary">
                  {{ isAcademic ? 'Emerald (#34d399)' : 'Sky Blue (#38bdf8)' }}
                </div>
                <div class="text-xs text-foreground-secondary mt-1">
                  {{
                    isAcademic
                      ? 'Calm, high-contrast academic dark accent.'
                      : 'Interactive indicators and brand highlights.'
                  }}
                </div>
              </div>

              <div
                class="p-4 rounded-lg border border-stroke-primary bg-primary bg-opacity-50"
              >
                <div
                  class="text-xs font-semibold text-foreground-accent mb-1 uppercase tracking-wider"
                >
                  Dividers
                </div>
                <div class="text-sm font-bold text-foreground-primary">
                  --alpha-stroke-primary
                </div>
                <div class="text-xs text-foreground-secondary mt-1">
                  Crisp borders for cards, tables, and stage outlines.
                </div>
              </div>
            </div>
          </div>

          <div
            class="flex justify-between items-center text-xs text-foreground-secondary pt-4 border-t border-stroke-primary"
          >
            <span>{{
              isAcademic ? 'Ph.D. Defense Presentation' : 'Alpha DX presentation framework'
            }}</span>
            <span>Slide 01 / 07</span>
          </div>
        </div>
      </SlidevMockup>
    </div>
  </div>
</template>

<style scoped>
.ds-explorer {
  margin: 1.5rem 0 2rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 12px;
  overflow: hidden;
  background-color: var(--vp-c-bg-soft);
}

.ds-explorer__nav {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
}

.ds-explorer__tabs {
  display: flex;
  gap: 0.5rem;
}

.ds-explorer__tab-btn {
  display: inline-flex;
  align-items: center;
  padding: 0.4rem 0.85rem;
  font-size: 0.82rem;
  font-weight: 600;
  border-radius: 6px;
  border: 1px solid transparent;
  color: var(--vp-c-text-2);
  background-color: transparent;
  cursor: pointer;
  transition: all 0.2s ease;
}

.ds-explorer__tab-btn:hover {
  color: var(--vp-c-brand-1);
}

.ds-explorer__tab-btn.active {
  color: var(--vp-c-brand-1);
  background-color: var(--vp-c-bg);
  border-color: var(--vp-c-divider);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.ds-explorer__content {
  padding: 1.25rem;
}

.ds-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
}

.ds-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background-color: var(--vp-c-bg);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ds-card__swatches {
  display: flex;
  height: 60px;
  border-bottom: 1px solid var(--vp-c-divider);
}

.ds-card__swatch {
  flex: 1;
  display: flex;
  align-items: flex-end;
  padding: 0.4rem 0.5rem;
}

.ds-card__swatch-label {
  font-size: 0.68rem;
  font-family: monospace;
  font-weight: bold;
  padding: 0.15rem 0.35rem;
  border-radius: 4px;
}

.ds-card__swatch-label--light {
  background: rgba(255, 255, 255, 0.85);
  color: #0f172a;
}

.ds-card__swatch-label--dark {
  background: rgba(15, 23, 42, 0.85);
  color: #f1f5f9;
}

.ds-card__body {
  padding: 0.85rem;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.ds-card__role {
  margin: 0;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vp-c-text-1);
}

.ds-copy-btn {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  cursor: pointer;
}

.ds-copy-btn:hover {
  color: var(--vp-c-brand-1);
  border-color: var(--vp-c-brand-1);
}

.ds-card__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin: 0.4rem 0;
}

.ds-code-token {
  font-size: 0.72rem;
  font-family: monospace;
  color: #0284c7;
  background-color: rgba(2, 132, 199, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  cursor: pointer;
}

.ds-code-class {
  font-size: 0.72rem;
  font-family: monospace;
  color: #10b981;
  background-color: rgba(16, 185, 129, 0.1);
  padding: 0.15rem 0.4rem;
  border-radius: 4px;
  cursor: pointer;
}

.ds-card__desc {
  margin: 0.35rem 0 0;
  font-size: 0.78rem;
  line-height: 1.4;
  color: var(--vp-c-text-2);
}

.ds-origin-tag {
  margin-top: 0.6rem;
  font-size: 0.68rem;
  color: var(--vp-c-text-3);
}

.ds-origin-tag span {
  font-family: monospace;
  color: var(--vp-c-text-2);
}

.ds-type-table-wrap {
  overflow-x: auto;
}

.ds-type-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.82rem;
}

.ds-type-table th {
  text-align: left;
  padding: 0.65rem 0.75rem;
  background-color: var(--vp-c-bg-alt);
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-2);
  font-weight: 600;
}

.ds-type-table td {
  padding: 0.65rem 0.75rem;
  border-bottom: 1px solid var(--vp-c-divider);
  color: var(--vp-c-text-1);
}

.ds-type-sample-cell {
  max-width: 320px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ds-type-preview {
  display: inline-block;
  color: var(--vp-c-text-1);
}
</style>
