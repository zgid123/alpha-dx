<script setup lang="ts">
import ArcCompare from '@alphacifer/slidev-addon-theme/components/compare/arc-compare/ArcCompare.vue';
import ArcCompareBadge from '@alphacifer/slidev-addon-theme/components/compare/arc-compare/ArcCompareBadge.vue';
import ArcCompareCallout from '@alphacifer/slidev-addon-theme/components/compare/arc-compare/ArcCompareCallout.vue';
import ArcCompareContent from '@alphacifer/slidev-addon-theme/components/compare/arc-compare/ArcCompareContent.vue';
import ArcCompareContents from '@alphacifer/slidev-addon-theme/components/compare/arc-compare/ArcCompareContents.vue';
import ArcCompareHeading from '@alphacifer/slidev-addon-theme/components/compare/arc-compare/ArcCompareHeading.vue';
import ArcCompareLeft from '@alphacifer/slidev-addon-theme/components/compare/arc-compare/ArcCompareLeft.vue';
import ArcCompareRight from '@alphacifer/slidev-addon-theme/components/compare/arc-compare/ArcCompareRight.vue';
import ArcCompareTitle from '@alphacifer/slidev-addon-theme/components/compare/arc-compare/ArcCompareTitle.vue';
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
    <ArcCompare :count="count" :animation="animation">
        <ArcCompareLeft color="#ea580c">
          <ArcCompareTitle>Traditional<br />Monolith</ArcCompareTitle>
          <ArcCompareContents>
            <ArcCompareCallout>
              <ArcCompareBadge>01</ArcCompareBadge>
              <ArcCompareHeading>Coupled State</ArcCompareHeading>
              <ArcCompareContent>
                Shared database schemas create deployment bottlenecks.
              </ArcCompareContent>
            </ArcCompareCallout>
            <ArcCompareCallout>
              <ArcCompareBadge>02</ArcCompareBadge>
              <ArcCompareHeading>Vertical Scale</ArcCompareHeading>
              <ArcCompareContent>
                Requires upgrading single instances with high cost.
              </ArcCompareContent>
            </ArcCompareCallout>
            <ArcCompareCallout>
              <ArcCompareBadge>03</ArcCompareBadge>
              <ArcCompareHeading>Single Failure</ArcCompareHeading>
              <ArcCompareContent>
                Unchecked crashes can bring down the entire system.
              </ArcCompareContent>
            </ArcCompareCallout>
          </ArcCompareContents>
        </ArcCompareLeft>

        <ArcCompareRight color="#0284c7">
          <ArcCompareTitle>Distributed<br />Microservices</ArcCompareTitle>
          <ArcCompareContents>
            <ArcCompareCallout>
              <ArcCompareBadge>01</ArcCompareBadge>
              <ArcCompareHeading>Bounded Context</ArcCompareHeading>
              <ArcCompareContent>
                Autonomous services communicate over defined events.
              </ArcCompareContent>
            </ArcCompareCallout>
            <ArcCompareCallout>
              <ArcCompareBadge>02</ArcCompareBadge>
              <ArcCompareHeading>Elastic Scale</ArcCompareHeading>
              <ArcCompareContent>
                Horizontal autoscaling responds to dynamic traffic spikes.
              </ArcCompareContent>
            </ArcCompareCallout>
            <ArcCompareCallout>
              <ArcCompareBadge>03</ArcCompareBadge>
              <ArcCompareHeading>Isolated Faults</ArcCompareHeading>
              <ArcCompareContent>
                Failures remain localized without cascading across services.
              </ArcCompareContent>
            </ArcCompareCallout>
          </ArcCompareContents>
        </ArcCompareRight>
      </ArcCompare>

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
