<script setup lang="ts">
import ArcOrbit from '@alphacifer/slidev-addon-theme/components/core/arc-orbit/ArcOrbit.vue';
import ArcOrbitBadge from '@alphacifer/slidev-addon-theme/components/core/arc-orbit/ArcOrbitBadge.vue';
import ArcOrbitCallout from '@alphacifer/slidev-addon-theme/components/core/arc-orbit/ArcOrbitCallout.vue';
import ArcOrbitContent from '@alphacifer/slidev-addon-theme/components/core/arc-orbit/ArcOrbitContent.vue';
import ArcOrbitContents from '@alphacifer/slidev-addon-theme/components/core/arc-orbit/ArcOrbitContents.vue';
import ArcOrbitHeading from '@alphacifer/slidev-addon-theme/components/core/arc-orbit/ArcOrbitHeading.vue';
import ArcOrbitTitle from '@alphacifer/slidev-addon-theme/components/core/arc-orbit/ArcOrbitTitle.vue';
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

const position = ref<'left' | 'right'>('right');
const count = ref<number>(3);
const animation = ref(true);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <ArcOrbit
      :position="position"
      :count="count"
      :animation="animation"
      color="#ea580c"
    >
      <ArcOrbitTitle>Implementing<br />a New CRM System</ArcOrbitTitle>
      <ArcOrbitContents>
        <ArcOrbitCallout :index="0">
          <ArcOrbitBadge>01</ArcOrbitBadge>
          <ArcOrbitHeading>Customer Service:</ArcOrbitHeading>
          <ArcOrbitContent>
            Streamline resolution and client messaging.
          </ArcOrbitContent>
        </ArcOrbitCallout>
        <ArcOrbitCallout :index="1">
          <ArcOrbitBadge>02</ArcOrbitBadge>
          <ArcOrbitHeading>Sales Efficiency:</ArcOrbitHeading>
          <ArcOrbitContent>
            Automate tasks and track pipeline leads.
          </ArcOrbitContent>
        </ArcOrbitCallout>
        <ArcOrbitCallout :index="2">
          <ArcOrbitBadge>03</ArcOrbitBadge>
          <ArcOrbitHeading>Data Analysis:</ArcOrbitHeading>
          <ArcOrbitContent>
            Gain customer insights through unified data.
          </ArcOrbitContent>
        </ArcOrbitCallout>
        <ArcOrbitCallout v-if="count === 4" :index="3">
          <ArcOrbitBadge>04</ArcOrbitBadge>
          <ArcOrbitHeading>Scalability:</ArcOrbitHeading>
          <ArcOrbitContent>
            Modular cloud sync for team growth.
          </ArcOrbitContent>
        </ArcOrbitCallout>
      </ArcOrbitContents>
    </ArcOrbit>
    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Position:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: position === 'left' }]"
          @click="position = 'left'"
        >
          Left
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: position === 'right' }]"
          @click="position = 'right'"
        >
          Right
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
          @click="animation = !animation"
        >
          {{ animation ? 'Enabled' : 'Disabled' }}
        </button>
      </div>
    </template>
  </SlidevMockup>
</template>
