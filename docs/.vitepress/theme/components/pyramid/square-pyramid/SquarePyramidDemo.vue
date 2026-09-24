<script setup lang="ts">
import SquarePyramid from '@alphacifer/slidev-addon-theme/components/pyramid/square-pyramid/SquarePyramid.vue';
import SquarePyramidStack from '@alphacifer/slidev-addon-theme/components/pyramid/square-pyramid/SquarePyramidStack.vue';
import SquarePyramidStackContent from '@alphacifer/slidev-addon-theme/components/pyramid/square-pyramid/SquarePyramidStackContent.vue';
import SquarePyramidStackTitle from '@alphacifer/slidev-addon-theme/components/pyramid/square-pyramid/SquarePyramidStackTitle.vue';
import { computed, ref } from 'vue';

import SlidevMockup from '../../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    readonly theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);

const layersCount = ref<number>(4);
const activeIndex = ref<number>(-1);
const color = ref<string>('multi');
const animation = ref<boolean>(true);

const allStacks = [
  {
    step: '01',
    title: 'Strategy & Vision',
    content:
      'Define clear architectural principles, user outcomes, and cross-team boundaries.',
  },
  {
    step: '02',
    title: 'Architecture',
    content:
      'Structure modular systems, type safety contracts, and maintainable data flows.',
  },
  {
    step: '03',
    title: 'Implementation',
    content:
      'Construct high-precision parametric SVG components with fluid responsive layouts.',
  },
  {
    step: '04',
    title: 'Verification',
    content:
      'Validate behavior with deterministic unit suites, formatting checks, and live presentation builds.',
  },
  {
    step: '05',
    title: 'Optimization',
    content:
      'Tune render performance, bundle footprint, and visual accessibility across slides.',
  },
  {
    step: '06',
    title: 'Ship & Maintain',
    content:
      'Deploy presentation addons, release changesets, and maintain long-term theme contracts.',
  },
];

const currentStacks = computed(() => {
  return allStacks.slice(0, layersCount.value);
});

const colors = [
  { label: 'Multi', value: 'multi' },
  { label: 'Blue', value: '#3b82f6' },
  { label: 'Indigo', value: '#6366f1' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Amber', value: '#f59e0b' },
];

function setLayersCount(n: number): void {
  layersCount.value = n;
  if (activeIndex.value >= n) {
    activeIndex.value = -1;
  }
}
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <div class="w-full h-full flex items-center justify-center">
      <SquarePyramid
        :key="`${layersCount}-${color}-${animation}`"
        :colors="color === 'multi' ? undefined : Array(layersCount).fill(color)"
        :active-index="activeIndex"
        :animation="animation"
        @update:active-index="activeIndex = $event"
      >
        <SquarePyramidStack
          v-for="(stack, idx) in currentStacks"
          :key="idx"
          :step="stack.step"
        >
          <SquarePyramidStackTitle>
            {{ stack.title }}
          </SquarePyramidStackTitle>
          <SquarePyramidStackContent>
            {{ stack.content }}
          </SquarePyramidStackContent>
        </SquarePyramidStack>
      </SquarePyramid>
    </div>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Layers:</span>
        <button
          v-for="n in [2, 3, 4, 5, 6]"
          :key="n"
          type="button"
          :class="['slidev-mockup__btn', { active: layersCount === n }]"
          @click="setLayersCount(n)"
        >
          {{ n }} Slabs
        </button>
      </div>

      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Active:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: activeIndex === -1 }]"
          @click="activeIndex = -1"
        >
          None
        </button>
        <button
          v-for="idx in layersCount"
          :key="idx - 1"
          type="button"
          :class="['slidev-mockup__btn', { active: activeIndex === idx - 1 }]"
          @click="activeIndex = activeIndex === idx - 1 ? -1 : idx - 1"
        >
          Layer {{ idx }}
        </button>
      </div>

      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Color:</span>
        <button
          v-for="c in colors"
          :key="c.value"
          type="button"
          :class="['slidev-mockup__btn', { active: color === c.value }]"
          @click="color = c.value"
        >
          {{ c.label }}
        </button>
      </div>

      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Animation:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: animation }]"
          @click="animation = true"
        >
          On
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: !animation }]"
          @click="animation = false"
        >
          Off
        </button>
      </div>
    </template>
  </SlidevMockup>
</template>
