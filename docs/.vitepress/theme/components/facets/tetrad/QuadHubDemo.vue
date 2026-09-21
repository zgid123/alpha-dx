<script setup lang="ts">
import QuadHub from '@alphacifer/slidev-addon-theme/components/facets/quad-hub/QuadHub.vue';
import QuadHubCallout from '@alphacifer/slidev-addon-theme/components/facets/quad-hub/QuadHubCallout.vue';
import QuadHubContent from '@alphacifer/slidev-addon-theme/components/facets/quad-hub/QuadHubContent.vue';
import QuadHubHeading from '@alphacifer/slidev-addon-theme/components/facets/quad-hub/QuadHubHeading.vue';
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

const title = ref('4 Pillars');
const subtitle = ref('Infographics');
const animation = ref(true);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <QuadHub :title="title" :subtitle="subtitle" :animation="animation">
      <QuadHubCallout color="#f29e4b">
        <QuadHubHeading>Strategy</QuadHubHeading>
        <QuadHubContent>Formulate goals and roadmap.</QuadHubContent>
      </QuadHubCallout>
      <QuadHubCallout color="#a4cb81">
        <QuadHubHeading>Execution</QuadHubHeading>
        <QuadHubContent>Iterate rapidly with tests.</QuadHubContent>
      </QuadHubCallout>
      <QuadHubCallout color="#62b6a8">
        <QuadHubHeading>Security</QuadHubHeading>
        <QuadHubContent>Enforce policies and audits.</QuadHubContent>
      </QuadHubCallout>
      <QuadHubCallout color="#e9717a">
        <QuadHubHeading>Scale</QuadHubHeading>
        <QuadHubContent>Optimize edge distribution.</QuadHubContent>
      </QuadHubCallout>
    </QuadHub>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="qhub-title" class="slidev-mockup__label">Title:</label>
        <input
          id="qhub-title"
          v-model="title"
          class="slidev-mockup__input"
          style="width: 100px;"
        />
      </div>

      <div class="slidev-mockup__control-group">
        <label for="qhub-subtitle" class="slidev-mockup__label">Subtitle:</label>
        <input
          id="qhub-subtitle"
          v-model="subtitle"
          class="slidev-mockup__input"
          style="width: 110px;"
        />
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
