<script setup lang="ts">
import HorizontalCard from '@alphacifer/slidev-addon-theme/components/card/horizontal-card/HorizontalCard.vue';
import HorizontalCardContent from '@alphacifer/slidev-addon-theme/components/card/horizontal-card/HorizontalCardContent.vue';
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
const color = ref<string | undefined>(undefined);
const variant = ref<'outside' | 'none'>('outside');
const dots = ref(true);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <div class="flex h-full w-full items-center justify-center">
      <HorizontalCard
        :step="step"
        :title="title"
        :color="color"
        :variant="variant"
        :dots="dots"
      >
        <HorizontalCardContent>{{ description }}</HorizontalCardContent>
      </HorizontalCard>
    </div>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="hcard-step" class="slidev-mockup__label">Step:</label>
        <input
          id="hcard-step"
          v-model="step"
          class="slidev-mockup__input"
          style="width: 60px;"
        >
      </div>

      <div class="slidev-mockup__control-group">
        <label for="hcard-title" class="slidev-mockup__label">Title:</label>
        <input
          id="hcard-title"
          v-model="title"
          class="slidev-mockup__input"
          placeholder="Title"
        >
      </div>

      <div class="slidev-mockup__control-group">
        <label for="hcard-color" class="slidev-mockup__label">Color:</label>
        <input
          id="hcard-color"
          :value="color ?? '#ea583a'"
          type="color"
          class="slidev-mockup__input"
          style="width: 45px; padding: 0.1rem;"
          @input="color = ($event.target as HTMLInputElement).value"
        >
      </div>

      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Variant:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: variant === 'outside' }]"
          @click="variant = 'outside'"
        >
          Outside
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: variant === 'none' }]"
          @click="variant = 'none'"
        >
          None
        </button>
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
