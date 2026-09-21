<script setup lang="ts">
import HorizCard from '@alphacifer/slidev-addon-theme/components/card/horiz-card/HorizCard.vue';
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

const step = ref('01');
const title = ref('Discovery');
const description = ref(
  'Explore ideas, define product boundaries, and build architecture blueprints.',
);
const color = ref('#ea583a');
const dots = ref(true);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <HorizCard
      :step="step"
      :title="title"
      :description="description"
      :color="color"
      :dots="dots"
    />

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="hcard-step" class="slidev-mockup__label">Step:</label>
        <input
          id="hcard-step"
          v-model="step"
          class="slidev-mockup__input"
          style="width: 60px;"
        />
      </div>

      <div class="slidev-mockup__control-group">
        <label for="hcard-title" class="slidev-mockup__label">Title:</label>
        <input
          id="hcard-title"
          v-model="title"
          class="slidev-mockup__input"
          placeholder="Title"
        />
      </div>

      <div class="slidev-mockup__control-group">
        <label for="hcard-color" class="slidev-mockup__label">Color:</label>
        <input
          id="hcard-color"
          v-model="color"
          type="color"
          class="slidev-mockup__input"
          style="width: 45px; padding: 0.1rem;"
        />
      </div>

      <div class="slidev-mockup__control-group">
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: dots }]"
          @click="dots = !dots"
        >
          {{ dots ? 'Dots: On' : 'Dots: Off' }}
        </button>
      </div>
    </template>
  </SlidevMockup>
</template>
