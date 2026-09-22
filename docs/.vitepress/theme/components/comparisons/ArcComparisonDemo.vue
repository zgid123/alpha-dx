<script setup lang="ts">
import ArcComparison from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparison.vue';
import ArcComparisonBadge from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonBadge.vue';
import ArcComparisonContent from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonContent.vue';
import ArcComparisonContents from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonContents.vue';
import ArcComparisonHeading from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonHeading.vue';
import ArcComparisonLeft from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonLeft.vue';
import ArcComparisonOrbit from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonOrbit.vue';
import ArcComparisonRight from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonRight.vue';
import ArcComparisonTitle from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonTitle.vue';
import { ref, watch } from 'vue';

import SlidevMockup from '../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);

const count = ref<number>(3);
const animation = ref(true);
const asMode = ref<'layout' | undefined>(undefined);
const isMoved = ref(false);

watch(asMode, () => {
  isMoved.value = false;
});
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <!-- Academic Theme Comparison -->
    <ArcComparison
      v-if="props.theme === 'academic'"
      v-model:moved="isMoved"
      :as="asMode"
      :count="count"
      :animation="animation"
    >
      <ArcComparisonLeft :count="count" color="#ea580c">
        <ArcComparisonTitle>Baseline<br />Approach</ArcComparisonTitle>
        <ArcComparisonContents>
          <ArcComparisonOrbit :index="0">
            <ArcComparisonBadge>01</ArcComparisonBadge>
            <ArcComparisonHeading>High Latency</ArcComparisonHeading>
            <ArcComparisonContent>
              Sequential processing incurs substantial inference latency.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit :index="1">
            <ArcComparisonBadge>02</ArcComparisonBadge>
            <ArcComparisonHeading>Memory Footprint</ArcComparisonHeading>
            <ArcComparisonContent>
              Requires extensive GPU VRAM allocations for batching.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit :index="2">
            <ArcComparisonBadge>03</ArcComparisonBadge>
            <ArcComparisonHeading>Brittle Convergence</ArcComparisonHeading>
            <ArcComparisonContent>
              Susceptible to gradient vanishing in deep layers.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit v-if="count === 4" :index="3">
            <ArcComparisonBadge>04</ArcComparisonBadge>
            <ArcComparisonHeading>High Complexity</ArcComparisonHeading>
            <ArcComparisonContent>
              Quadratic computational cost scales poorly with length.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
        </ArcComparisonContents>
      </ArcComparisonLeft>
      <ArcComparisonRight :count="count" color="#0284c7">
        <ArcComparisonTitle>Proposed<br />Architecture</ArcComparisonTitle>
        <ArcComparisonContents>
          <ArcComparisonOrbit :index="0">
            <ArcComparisonBadge>01</ArcComparisonBadge>
            <ArcComparisonHeading>Sub-linear Time</ArcComparisonHeading>
            <ArcComparisonContent>
              Parallelized attention achieves significant speedups.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit :index="1">
            <ArcComparisonBadge>02</ArcComparisonBadge>
            <ArcComparisonHeading>Compact Footprint</ArcComparisonHeading>
            <ArcComparisonContent>
              Quantized weights reduce memory overhead by 4x.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit :index="2">
            <ArcComparisonBadge>03</ArcComparisonBadge>
            <ArcComparisonHeading>Stable Training</ArcComparisonHeading>
            <ArcComparisonContent>
              Residual normalization guarantees robust convergence.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit v-if="count === 4" :index="3">
            <ArcComparisonBadge>04</ArcComparisonBadge>
            <ArcComparisonHeading>Linear Complexity</ArcComparisonHeading>
            <ArcComparisonContent>
              Sparse kernel execution achieves linear time scaling.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
        </ArcComparisonContents>
      </ArcComparisonRight>
    </ArcComparison>
    <!-- Standard / Seriph Comparison -->
    <ArcComparison
      v-else
      v-model:moved="isMoved"
      :as="asMode"
      :count="count"
      :animation="animation"
    >
      <ArcComparisonLeft :count="count" color="#ea580c">
        <ArcComparisonTitle>Traditional<br />Monolith</ArcComparisonTitle>
        <ArcComparisonContents>
          <ArcComparisonOrbit :index="0">
            <ArcComparisonBadge>01</ArcComparisonBadge>
            <ArcComparisonHeading>Coupled State</ArcComparisonHeading>
            <ArcComparisonContent>
              Shared database schemas create deployment bottlenecks.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit :index="1">
            <ArcComparisonBadge>02</ArcComparisonBadge>
            <ArcComparisonHeading>Vertical Scale</ArcComparisonHeading>
            <ArcComparisonContent>
              Requires upgrading single instances with high cost.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit :index="2">
            <ArcComparisonBadge>03</ArcComparisonBadge>
            <ArcComparisonHeading>Single Failure</ArcComparisonHeading>
            <ArcComparisonContent>
              Unchecked crashes can bring down the entire system.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit v-if="count === 4" :index="3">
            <ArcComparisonBadge>04</ArcComparisonBadge>
            <ArcComparisonHeading>Slow Releases</ArcComparisonHeading>
            <ArcComparisonContent>
              Monolithic build pipelines delay feature rollouts.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
        </ArcComparisonContents>
      </ArcComparisonLeft>
      <ArcComparisonRight :count="count" color="#0284c7">
        <ArcComparisonTitle>Distributed<br />Microservices</ArcComparisonTitle>
        <ArcComparisonContents>
          <ArcComparisonOrbit :index="0">
            <ArcComparisonBadge>01</ArcComparisonBadge>
            <ArcComparisonHeading>Bounded Context</ArcComparisonHeading>
            <ArcComparisonContent>
              Autonomous services communicate over defined events.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit :index="1">
            <ArcComparisonBadge>02</ArcComparisonBadge>
            <ArcComparisonHeading>Elastic Scale</ArcComparisonHeading>
            <ArcComparisonContent>
              Horizontal autoscaling responds to dynamic traffic spikes.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit :index="2">
            <ArcComparisonBadge>03</ArcComparisonBadge>
            <ArcComparisonHeading>Isolated Faults</ArcComparisonHeading>
            <ArcComparisonContent>
              Failures remain localized without cascading across services.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
          <ArcComparisonOrbit v-if="count === 4" :index="3">
            <ArcComparisonBadge>04</ArcComparisonBadge>
            <ArcComparisonHeading>Independent Deploy</ArcComparisonHeading>
            <ArcComparisonContent>
              Teams release features independently with zero downtime.
            </ArcComparisonContent>
          </ArcComparisonOrbit>
        </ArcComparisonContents>
      </ArcComparisonRight>
    </ArcComparison>
    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">As:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: asMode === undefined }]"
          @click="asMode = undefined"
        >
          Default
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: asMode === 'layout' }]"
          @click="asMode = 'layout'"
        >
          Layout
        </button>
      </div>
      <div v-if="asMode === 'layout'" class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Position:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: !isMoved }]"
          @click="isMoved = false"
        >
          Centered
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: isMoved }]"
          @click="isMoved = true"
        >
          Original
        </button>
      </div>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Points:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: count === 3 }]"
          @click="count = 3"
        >
          3 Points
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: count === 4 }]"
          @click="count = 4"
        >
          4 Points
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
