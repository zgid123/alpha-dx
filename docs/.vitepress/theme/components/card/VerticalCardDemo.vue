<script setup lang="ts">
import VerticalCard from '@alphacifer/slidev-addon-theme/components/card/vertical-card/VerticalCard.vue';
import VerticalCardContent from '@alphacifer/slidev-addon-theme/components/card/vertical-card/VerticalCardContent.vue';
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
const title = ref('Outside Badge');
const description = ref(
  'Vertical card with ribbon badge anchored to the outer left border and optional diagonal stripes.',
);
const color = ref<string | undefined>(undefined);
const variant = ref<'outside' | 'none'>('outside');
const dots = ref(true);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <div class="flex h-full w-full items-center justify-center">
      <div class="w-72 h-[380px]">
        <VerticalCard
          :step="step"
          :color="color"
          :variant="variant"
          :dots="dots"
        >
          <template #title>{{ title }}</template>
          <VerticalCardContent>{{ description }}</VerticalCardContent>
        </VerticalCard>
      </div>
    </div>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="vcard-step" class="slidev-mockup__label">Step:</label>
        <input
          id="vcard-step"
          v-model="step"
          class="slidev-mockup__input"
          style="width: 60px;"
        >
      </div>

      <div class="slidev-mockup__control-group">
        <label for="vcard-color" class="slidev-mockup__label">Color:</label>
        <input
          id="vcard-color"
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
