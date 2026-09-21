<script setup lang="ts">
import RectOrbitTetrad from '@alphacifer/slidev-addon-theme/components/facets/rect-orbit-tetrad/RectOrbitTetrad.vue';
import RectOrbitTetradCallout from '@alphacifer/slidev-addon-theme/components/facets/rect-orbit-tetrad/RectOrbitTetradCallout.vue';
import RectOrbitTetradContent from '@alphacifer/slidev-addon-theme/components/facets/rect-orbit-tetrad/RectOrbitTetradContent.vue';
import RectOrbitTetradHeading from '@alphacifer/slidev-addon-theme/components/facets/rect-orbit-tetrad/RectOrbitTetradHeading.vue';
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
    <RectOrbitTetrad :title="title" :subtitle="subtitle" :animation="animation">
      <RectOrbitTetradCallout color="#f29e4b">
        <RectOrbitTetradHeading>Strategy</RectOrbitTetradHeading>
        <RectOrbitTetradContent>Formulate goals and roadmap.</RectOrbitTetradContent>
      </RectOrbitTetradCallout>
      <RectOrbitTetradCallout color="#a4cb81">
        <RectOrbitTetradHeading>Execution</RectOrbitTetradHeading>
        <RectOrbitTetradContent>Iterate rapidly with tests.</RectOrbitTetradContent>
      </RectOrbitTetradCallout>
      <RectOrbitTetradCallout color="#62b6a8">
        <RectOrbitTetradHeading>Security</RectOrbitTetradHeading>
        <RectOrbitTetradContent>Enforce policies and audits.</RectOrbitTetradContent>
      </RectOrbitTetradCallout>
      <RectOrbitTetradCallout color="#e9717a">
        <RectOrbitTetradHeading>Scale</RectOrbitTetradHeading>
        <RectOrbitTetradContent>Optimize edge distribution.</RectOrbitTetradContent>
      </RectOrbitTetradCallout>
    </RectOrbitTetrad>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="rot-title" class="slidev-mockup__label">Title:</label>
        <input
          id="rot-title"
          v-model="title"
          class="slidev-mockup__input"
          style="width: 100px;"
        />
      </div>

      <div class="slidev-mockup__control-group">
        <label for="rot-subtitle" class="slidev-mockup__label">Subtitle:</label>
        <input
          id="rot-subtitle"
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
