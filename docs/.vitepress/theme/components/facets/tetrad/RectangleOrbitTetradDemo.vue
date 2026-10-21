<script setup lang="ts">
import RectangleOrbitTetrad from '@alphacifer/slidev-addon-theme/components/facets/tetrad/rectangle-orbit-tetrad/RectangleOrbitTetrad.vue';
import RectangleOrbitTetradCallout from '@alphacifer/slidev-addon-theme/components/facets/tetrad/rectangle-orbit-tetrad/RectangleOrbitTetradCallout.vue';
import RectangleOrbitTetradCenter from '@alphacifer/slidev-addon-theme/components/facets/tetrad/rectangle-orbit-tetrad/RectangleOrbitTetradCenter.vue';
import RectangleOrbitTetradContent from '@alphacifer/slidev-addon-theme/components/facets/tetrad/rectangle-orbit-tetrad/RectangleOrbitTetradContent.vue';
import RectangleOrbitTetradHeading from '@alphacifer/slidev-addon-theme/components/facets/tetrad/rectangle-orbit-tetrad/RectangleOrbitTetradHeading.vue';
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
    <RectangleOrbitTetrad :animation="animation">
      <template #center>
        <RectangleOrbitTetradCenter :title="title">
          <template #content>{{ subtitle }}</template>
        </RectangleOrbitTetradCenter>
      </template>
      <RectangleOrbitTetradCallout>
        <RectangleOrbitTetradHeading>Strategy</RectangleOrbitTetradHeading>
        <RectangleOrbitTetradContent
          >Formulate goals and roadmap.</RectangleOrbitTetradContent
        >
      </RectangleOrbitTetradCallout>
      <RectangleOrbitTetradCallout>
        <RectangleOrbitTetradHeading>Execution</RectangleOrbitTetradHeading>
        <RectangleOrbitTetradContent
          >Iterate rapidly with tests.</RectangleOrbitTetradContent
        >
      </RectangleOrbitTetradCallout>
      <RectangleOrbitTetradCallout>
        <RectangleOrbitTetradHeading>Security</RectangleOrbitTetradHeading>
        <RectangleOrbitTetradContent
          >Enforce policies and audits.</RectangleOrbitTetradContent
        >
      </RectangleOrbitTetradCallout>
      <RectangleOrbitTetradCallout>
        <RectangleOrbitTetradHeading>Scale</RectangleOrbitTetradHeading>
        <RectangleOrbitTetradContent
          >Optimize edge distribution.</RectangleOrbitTetradContent
        >
      </RectangleOrbitTetradCallout>
    </RectangleOrbitTetrad>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="rot-title" class="slidev-mockup__label">Title:</label>
        <input
          id="rot-title"
          v-model="title"
          class="slidev-mockup__input"
          style="width: 100px;"
        >
      </div>

      <div class="slidev-mockup__control-group">
        <label for="rot-subtitle" class="slidev-mockup__label">Subtitle:</label>
        <input
          id="rot-subtitle"
          v-model="subtitle"
          class="slidev-mockup__input"
          style="width: 110px;"
        >
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
