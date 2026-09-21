<script setup lang="ts">
import ArcComparison from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparison.vue';
import ArcComparisonBadge from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonBadge.vue';
import ArcComparisonCallout from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonCallout.vue';
import ArcComparisonContent from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonContent.vue';
import ArcComparisonContents from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonContents.vue';
import ArcComparisonHeading from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonHeading.vue';
import ArcComparisonLeft from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonLeft.vue';
import ArcComparisonRight from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonRight.vue';
import ArcComparisonTitle from '@alphacifer/slidev-addon-theme/components/comparisons/arc-comparison/ArcComparisonTitle.vue';
import { ref } from 'vue';

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
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <!-- Academic Theme Comparison -->
    <ArcComparison v-if="props.theme === 'academic'" :count="count" :animation="animation">
      <ArcComparisonLeft :count="count" color="#ea580c">
        <ArcComparisonTitle>Baseline<br />Approach</ArcComparisonTitle>
        <ArcComparisonContents>
          <ArcComparisonCallout :index="0">
            <ArcComparisonBadge>01</ArcComparisonBadge>
            <ArcComparisonHeading>High Latency</ArcComparisonHeading>
            <ArcComparisonContent>
              Sequential processing incurs substantial inference latency.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout :index="1">
            <ArcComparisonBadge>02</ArcComparisonBadge>
            <ArcComparisonHeading>Memory Footprint</ArcComparisonHeading>
            <ArcComparisonContent>
              Requires extensive GPU VRAM allocations for batching.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout :index="2">
            <ArcComparisonBadge>03</ArcComparisonBadge>
            <ArcComparisonHeading>Brittle Convergence</ArcComparisonHeading>
            <ArcComparisonContent>
              Susceptible to gradient vanishing in deep layers.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout v-if="count === 4" :index="3">
            <ArcComparisonBadge>04</ArcComparisonBadge>
            <ArcComparisonHeading>High Complexity</ArcComparisonHeading>
            <ArcComparisonContent>
              Quadratic computational cost scales poorly with length.
            </ArcComparisonContent>
          </ArcComparisonCallout>
        </ArcComparisonContents>
      </ArcComparisonLeft>

      <ArcComparisonRight :count="count" color="#0284c7">
        <ArcComparisonTitle>Proposed<br />Architecture</ArcComparisonTitle>
        <ArcComparisonContents>
          <ArcComparisonCallout :index="0">
            <ArcComparisonBadge>01</ArcComparisonBadge>
            <ArcComparisonHeading>Sub-linear Time</ArcComparisonHeading>
            <ArcComparisonContent>
              Parallelized attention achieves significant speedups.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout :index="1">
            <ArcComparisonBadge>02</ArcComparisonBadge>
            <ArcComparisonHeading>Compact Footprint</ArcComparisonHeading>
            <ArcComparisonContent>
              Quantized weights reduce memory overhead by 4x.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout :index="2">
            <ArcComparisonBadge>03</ArcComparisonBadge>
            <ArcComparisonHeading>Stable Training</ArcComparisonHeading>
            <ArcComparisonContent>
              Residual normalization guarantees robust convergence.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout v-if="count === 4" :index="3">
            <ArcComparisonBadge>04</ArcComparisonBadge>
            <ArcComparisonHeading>Linear Complexity</ArcComparisonHeading>
            <ArcComparisonContent>
              Sparse kernel execution achieves linear time scaling.
            </ArcComparisonContent>
          </ArcComparisonCallout>
        </ArcComparisonContents>
      </ArcComparisonRight>
    </ArcComparison>

    <!-- Standard / Seriph Comparison -->
    <ArcComparison v-else :count="count" :animation="animation">
      <ArcComparisonLeft :count="count" color="#ea580c">
        <ArcComparisonTitle>Traditional<br />Monolith</ArcComparisonTitle>
        <ArcComparisonContents>
          <ArcComparisonCallout :index="0">
            <ArcComparisonBadge>01</ArcComparisonBadge>
            <ArcComparisonHeading>Coupled State</ArcComparisonHeading>
            <ArcComparisonContent>
              Shared database schemas create deployment bottlenecks.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout :index="1">
            <ArcComparisonBadge>02</ArcComparisonBadge>
            <ArcComparisonHeading>Vertical Scale</ArcComparisonHeading>
            <ArcComparisonContent>
              Requires upgrading single instances with high cost.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout :index="2">
            <ArcComparisonBadge>03</ArcComparisonBadge>
            <ArcComparisonHeading>Single Failure</ArcComparisonHeading>
            <ArcComparisonContent>
              Unchecked crashes can bring down the entire system.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout v-if="count === 4" :index="3">
            <ArcComparisonBadge>04</ArcComparisonBadge>
            <ArcComparisonHeading>Slow Releases</ArcComparisonHeading>
            <ArcComparisonContent>
              Monolithic build pipelines delay feature rollouts.
            </ArcComparisonContent>
          </ArcComparisonCallout>
        </ArcComparisonContents>
      </ArcComparisonLeft>

      <ArcComparisonRight :count="count" color="#0284c7">
        <ArcComparisonTitle>Distributed<br />Microservices</ArcComparisonTitle>
        <ArcComparisonContents>
          <ArcComparisonCallout :index="0">
            <ArcComparisonBadge>01</ArcComparisonBadge>
            <ArcComparisonHeading>Bounded Context</ArcComparisonHeading>
            <ArcComparisonContent>
              Autonomous services communicate over defined events.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout :index="1">
            <ArcComparisonBadge>02</ArcComparisonBadge>
            <ArcComparisonHeading>Elastic Scale</ArcComparisonHeading>
            <ArcComparisonContent>
              Horizontal autoscaling responds to dynamic traffic spikes.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout :index="2">
            <ArcComparisonBadge>03</ArcComparisonBadge>
            <ArcComparisonHeading>Isolated Faults</ArcComparisonHeading>
            <ArcComparisonContent>
              Failures remain localized without cascading across services.
            </ArcComparisonContent>
          </ArcComparisonCallout>
          <ArcComparisonCallout v-if="count === 4" :index="3">
            <ArcComparisonBadge>04</ArcComparisonBadge>
            <ArcComparisonHeading>Independent Deploy</ArcComparisonHeading>
            <ArcComparisonContent>
              Teams release features independently with zero downtime.
            </ArcComparisonContent>
          </ArcComparisonCallout>
        </ArcComparisonContents>
      </ArcComparisonRight>
    </ArcComparison>

    <template #controls>
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
