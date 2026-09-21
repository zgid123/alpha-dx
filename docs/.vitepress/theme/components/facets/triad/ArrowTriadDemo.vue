<script setup lang="ts">
import ArrowTriad from '@alphacifer/slidev-addon-theme/components/facets/arrow-triad/ArrowTriad.vue';
import ArrowTriadCallout from '@alphacifer/slidev-addon-theme/components/facets/arrow-triad/ArrowTriadCallout.vue';
import ArrowTriadContent from '@alphacifer/slidev-addon-theme/components/facets/arrow-triad/ArrowTriadContent.vue';
import ArrowTriadHeading from '@alphacifer/slidev-addon-theme/components/facets/arrow-triad/ArrowTriadHeading.vue';
import type { TArrowTriadLayout } from '@alphacifer/slidev-addon-theme/utils/arrowTriad';
import { ref } from 'vue';

import SlidevMockup from '../../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);

const layout = ref<TArrowTriadLayout>('2-left-1-right');
const animation = ref(true);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <ArrowTriad :layout="layout" :animation="animation">
      <ArrowTriadCallout>
        <ArrowTriadHeading>Architect</ArrowTriadHeading>
        <ArrowTriadContent>
          Design clear domain boundaries, clean abstractions, and modular contracts.
        </ArrowTriadContent>
      </ArrowTriadCallout>
      <ArrowTriadCallout>
        <ArrowTriadHeading>Implement</ArrowTriadHeading>
        <ArrowTriadContent>
          Construct robust type-safe utilities with automated test suites.
        </ArrowTriadContent>
      </ArrowTriadCallout>
      <ArrowTriadCallout>
        <ArrowTriadHeading>Deliver</ArrowTriadHeading>
        <ArrowTriadContent>
          Ship packages, generate presentations, and maintain high standards.
        </ArrowTriadContent>
      </ArrowTriadCallout>
    </ArrowTriad>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Layout:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: layout === '2-left-1-right' }]"
          @click="layout = '2-left-1-right'"
        >
          2 Left · 1 Right
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: layout === '1-left-2-right' }]"
          @click="layout = '1-left-2-right'"
        >
          1 Left · 2 Right
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
