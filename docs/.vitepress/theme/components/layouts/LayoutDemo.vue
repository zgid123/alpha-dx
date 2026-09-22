<script setup lang="ts">
import AcademicBlank from '@alphacifer/slidev-academic-theme/layouts/blank.vue';
import AcademicCover from '@alphacifer/slidev-academic-theme/layouts/cover.vue';
import AcademicDefault from '@alphacifer/slidev-academic-theme/layouts/default.vue';
import AcademicEnd from '@alphacifer/slidev-academic-theme/layouts/end.vue';
import AcademicSection from '@alphacifer/slidev-academic-theme/layouts/section.vue';
import Speaker from '@alphacifer/slidev-addon-theme/components/core/Speaker.vue';
import ArcToc from '@alphacifer/slidev-addon-theme/layouts/core/arc-toc.vue';
import BgCenter from '@alphacifer/slidev-addon-theme/layouts/core/bg-center.vue';
import TableOfContents from '@alphacifer/slidev-addon-theme/layouts/core/table-of-contents.vue';
import ShiftingIntro from '@alphacifer/slidev-addon-theme/layouts/shifting-heading/shifting-intro.vue';
import Thanks from '@alphacifer/slidev-addon-theme/layouts/thanks/thanks.vue';
import { ref } from 'vue';

import academicBg from '../../assets/academic-bg.png';
import SlidevMockup from '../common/SlidevMockup.vue';

export type TLayout =
  | 'blank'
  | 'cover'
  | 'default'
  | 'section'
  | 'end'
  | 'bg-center'
  | 'shifting-intro'
  | 'table-of-contents'
  | 'arc-toc'
  | 'thanks';

const props = withDefaults(
  defineProps<{
    layout?: TLayout;
    theme?: 'seriph' | 'academic';
    initialItems?: number;
  }>(),
  {
    layout: 'default',
    theme: 'seriph',
    initialItems: 5,
  },
);

const canonicalContent = {
  title: 'Modular Presentation Engineering',
  subtitle: 'Building scalable, type-safe slide decks with Slidev',
  author: 'Alpha',
  date: '2026-08-12',
  sections: [
    {
      badge: '01',
      title: 'Architecture & Primitives',
      desc: 'Component-driven design system with composable atomic units',
    },
    {
      badge: '02',
      title: 'Type Safety & Contracts',
      desc: 'Strict TypeScript interfaces with build-time schema validation',
    },
    {
      badge: '03',
      title: 'Dynamic Layouts',
      desc: 'Adaptive layouts with fluid viewport scaling and light/dark modes',
    },
    {
      badge: '04',
      title: 'Verification & CI/CD',
      desc: 'Deterministic Vitest test suites and zero-drift visual regression',
    },
    {
      badge: '05',
      title: 'Modular Design Tokens',
      desc: 'Design tokens engineered for fluid responsiveness across devices',
    },
    {
      badge: '06',
      title: 'Motion & Micro-interactions',
      desc: 'Physics-informed SVG animations and tactile transition effects',
    },
    {
      badge: '07',
      title: 'Documentation & Delivery',
      desc: 'Interactive VitePress catalog synchronized with live package exports',
    },
  ],
};

const canonicalTocTree = canonicalContent.sections.map((sec, idx) => ({
  no: idx + 1,
  title: sec.title,
  path: `#${idx + 1}`,
  children: [],
}));

// Interactive state controls
const selectedCount = ref(props.initialItems);
const isIndexed = ref(true);
const introClicks = ref(0);
const thanksKey = ref(0);

function replayThanks() {
  thanksKey.value++;
}
</script>

<template>
  <SlidevMockup
    :theme="props.theme"
    :no-layout-wrapper="true"
    :clicks="introClicks"
    :page="2"
    :toc-tree="canonicalTocTree"
  >
    <template #default>
      <!-- Arc TOC Layout directly from Addon Theme -->
      <ArcToc
        v-if="props.layout === 'arc-toc'"
        :key="`arc-toc-${selectedCount}`"
        :max-items="selectedCount"
        :indexed="true"
      >
        <h1>Table of Contents</h1>
      </ArcToc>

      <!-- Background Center Layout directly from Addon Theme -->
      <BgCenter
        v-else-if="props.layout === 'bg-center'"
        :background="
          props.theme === 'academic'
            ? academicBg
            : 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80'
        "
        :indexed="isIndexed"
        :dim="props.theme !== 'academic'"
      >
        <div class="alpha-bg-center-preview-content">
          <h1>{{ canonicalContent.title }}</h1>
          <p>{{ canonicalContent.subtitle }}</p>
        </div>
      </BgCenter>

      <!-- Shifting Intro Layout directly from Addon Theme -->
      <ShiftingIntro
        v-else-if="props.layout === 'shifting-intro'"
      >
        <div class="alpha-shifting-intro-title">
          <h1>{{ canonicalContent.title }}</h1>
          <p>{{ canonicalContent.subtitle }}</p>
        </div>
        <div class="alpha-shifting-intro-body">
          <p v-for="s in canonicalContent.sections.slice(0, 4)" :key="s.badge">
            <strong>{{ s.badge }}</strong> · {{ s.title }}
          </p>
        </div>
      </ShiftingIntro>

      <!-- Table of Contents Layout directly from Addon Theme -->
      <TableOfContents
        v-else-if="props.layout === 'table-of-contents'"
        :max-depth="1"
      >
        <h1>Table of Contents</h1>
      </TableOfContents>

      <!-- Thanks Layout directly from Addon Theme -->
      <Thanks
        v-else-if="props.layout === 'thanks'"
        :key="`thanks-${thanksKey}`"
      />

      <!-- Academic Theme Cover Layout directly from Academic Theme -->
      <AcademicCover
        v-else-if="props.layout === 'cover'"
      >
        <h1>{{ canonicalContent.title }}</h1>
        <p>{{ canonicalContent.subtitle }}</p>
        <Speaker
          :author="canonicalContent.author"
          :date="canonicalContent.date"
        />
      </AcademicCover>

      <!-- Academic Theme Section Layout directly from Academic Theme -->
      <AcademicSection
        v-else-if="props.layout === 'section'"
      >
        <h1>{{ canonicalContent.title }}</h1>
        <p>{{ canonicalContent.subtitle }}</p>
      </AcademicSection>

      <!-- Academic Theme End Layout directly from Academic Theme -->
      <AcademicEnd
        v-else-if="props.layout === 'end'"
      >
        <h1>Thank You</h1>
        <p>Q&A and Discussion</p>
      </AcademicEnd>

      <!-- Academic Theme Blank Layout directly from Academic Theme -->
      <AcademicBlank
        v-else-if="props.layout === 'blank'"
      >
        <p><strong>Unconstrained Canvas Slide</strong></p>
        <p>Full layout area without forced heading typography, ideal for diagrams and content-first slides.</p>
        <div class="alpha-canonical-sections">
          <div
            v-for="s in canonicalContent.sections.slice(0, 3)"
            :key="s.badge"
            class="alpha-canonical-item"
          >
            <span class="alpha-canonical-badge">{{ s.badge }}</span>
            <div class="alpha-canonical-text">
              <div class="alpha-canonical-title">{{ s.title }}</div>
              <div class="alpha-canonical-desc">{{ s.desc }}</div>
            </div>
          </div>
        </div>
      </AcademicBlank>

      <!-- Default Layout (Academic Theme or Addon Standard) -->
      <AcademicDefault
        v-else-if="props.theme === 'academic'"
      >
        <h1>{{ canonicalContent.title }}</h1>
        <p>{{ canonicalContent.subtitle }}</p>
        <div class="alpha-canonical-sections">
          <div
            v-for="s in canonicalContent.sections.slice(0, 4)"
            :key="s.badge"
            class="alpha-canonical-item"
          >
            <span class="alpha-canonical-badge">{{ s.badge }}</span>
            <div class="alpha-canonical-text">
              <div class="alpha-canonical-title">{{ s.title }}</div>
              <div class="alpha-canonical-desc">{{ s.desc }}</div>
            </div>
          </div>
        </div>
      </AcademicDefault>

      <div
        v-else
        class="slidev-layout default"
      >
        <h1>{{ canonicalContent.title }}</h1>
        <p>{{ canonicalContent.subtitle }}</p>
        <div class="alpha-canonical-sections">
          <div
            v-for="s in canonicalContent.sections.slice(0, 4)"
            :key="s.badge"
            class="alpha-canonical-item"
          >
            <span class="alpha-canonical-badge">{{ s.badge }}</span>
            <div class="alpha-canonical-text">
              <div class="alpha-canonical-title">{{ s.title }}</div>
              <div class="alpha-canonical-desc">{{ s.desc }}</div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <!-- Contextual Interactive Controls Bar -->
    <template #controls>
      <!-- Arc TOC Sections Count Control -->
      <div v-if="props.layout === 'arc-toc'" class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Sections:</span>
        <button
          v-for="n in [1, 2, 3, 4, 5, 6, 7]"
          :key="n"
          type="button"
          :class="['slidev-mockup__btn', { active: selectedCount === n }]"
          @click="selectedCount = n"
        >
          {{ n }}
        </button>
      </div>

      <!-- Shifting Intro State Control -->
      <div v-if="props.layout === 'shifting-intro'" class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">State:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: introClicks === 0 }]"
          @click="introClicks = 0"
        >
          Center (Click 0)
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: introClicks > 0 }]"
          @click="introClicks = 1"
        >
          Shifted (Click 1)
        </button>
      </div>

      <!-- Background Center Indexed Control -->
      <div v-if="props.layout === 'bg-center'" class="slidev-mockup__control-group">
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: isIndexed }]"
          @click="isIndexed = !isIndexed"
        >
          {{ isIndexed ? 'Indexed: On (02)' : 'Indexed: Off' }}
        </button>
      </div>

      <!-- Thanks Replay Control -->
      <div v-if="props.layout === 'thanks'" class="slidev-mockup__control-group">
        <button
          type="button"
          class="slidev-mockup__btn active"
          @click="replayThanks"
        >
          ↻ Replay
        </button>
      </div>
    </template>
  </SlidevMockup>
</template>

<style scoped>
.alpha-bg-center-preview-content {
  text-align: center;
  color: #ffffff;
}

.alpha-bg-center-preview-content h1 {
  font-size: 2.75rem;
  font-weight: 800;
  letter-spacing: -0.03em;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.alpha-bg-center-preview-content p {
  font-size: 1.25rem;
  color: rgba(255, 255, 255, 0.85);
}

:global(.slidev-theme-academic) .alpha-bg-center-preview-content {
  color: var(--alpha-academic-primary, #0f172a);
}

:global(.slidev-theme-academic) .alpha-bg-center-preview-content h1 {
  color: var(--alpha-academic-primary, #0f172a);
}

:global(.slidev-theme-academic) .alpha-bg-center-preview-content p {
  color: var(--alpha-academic-primary, #0f172a);
  opacity: 0.85;
}

.alpha-shifting-intro-title h1 {
  font-size: 2.6rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
}

.alpha-shifting-intro-title p {
  font-size: 1.2rem;
  color: var(--vp-c-text-2, #64748b);
}

.alpha-shifting-intro-body {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  font-size: 1.15rem;
}

.alpha-canonical-sections {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  margin-top: 2.25rem;
}

.alpha-canonical-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  padding: 1rem 1.25rem;
  background: rgba(15, 23, 42, 0.03);
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 10px;
}

.dark .alpha-canonical-item {
  background: rgba(255, 255, 255, 0.03);
  border-color: rgba(255, 255, 255, 0.08);
}

.alpha-canonical-badge {
  font-family: monospace;
  font-weight: 800;
  font-size: 1.1rem;
  color: #0ea5e9;
  padding: 0.2rem 0.5rem;
  background: rgba(14, 165, 233, 0.1);
  border-radius: 6px;
  line-height: 1;
}

.alpha-canonical-title {
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
}

.alpha-canonical-desc {
  font-size: 0.82rem;
  line-height: 1.35;
  color: var(--vp-c-text-2, #64748b);
}
</style>
