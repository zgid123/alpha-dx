<script setup lang="ts">
import ChevronCard from '@alphacifer/slidev-addon-theme/components/card/chevron-card/ChevronCard.vue';
import ChevronCardContent from '@alphacifer/slidev-addon-theme/components/card/chevron-card/ChevronCardContent.vue';
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
const heading = ref('Discovery & Research');
const content = ref(
  'Analyze user requirements, assess architecture dependencies, and define execution milestones.',
);
const color = ref<string | undefined>(undefined);
const notchDepth = ref(26);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <div class="flex h-full w-full items-center justify-center">
      <ChevronCard :step="step" :color="color" :notch-depth="notchDepth">
        <template #title>{{ heading }}</template>
        <ChevronCardContent>{{ content }}</ChevronCardContent>
      </ChevronCard>
    </div>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="ccard-step" class="slidev-mockup__label">Step:</label>
        <input
          id="ccard-step"
          v-model="step"
          class="slidev-mockup__input"
          style="width: 60px;"
        >
      </div>

      <div class="slidev-mockup__control-group">
        <label for="ccard-color" class="slidev-mockup__label">Color:</label>
        <input
          id="ccard-color"
          :value="color ?? '#f59e0b'"
          type="color"
          class="slidev-mockup__input"
          style="width: 45px; padding: 0.1rem;"
          @input="color = ($event.target as HTMLInputElement).value"
        >
      </div>

      <div class="slidev-mockup__control-group">
        <label for="ccard-notch" class="slidev-mockup__label"
          >Notch Depth:</label
        >
        <input
          id="ccard-notch"
          v-model.number="notchDepth"
          type="number"
          min="10"
          max="50"
          class="slidev-mockup__input"
          style="width: 70px;"
        >
      </div>
    </template>
  </SlidevMockup>
</template>
