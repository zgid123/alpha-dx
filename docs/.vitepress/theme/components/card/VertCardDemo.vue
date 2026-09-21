<script setup lang="ts">
import VertCard from '@alphacifer/slidev-addon-theme/components/card/vert-card/VertCard.vue';
import VertCardContent from '@alphacifer/slidev-addon-theme/components/card/vert-card/VertCardContent.vue';
import VertCardTitle from '@alphacifer/slidev-addon-theme/components/card/vert-card/VertCardTitle.vue';
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
const color = ref('#ea583a');
const variant = ref<'outside' | 'none'>('outside');
const dots = ref(true);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <VertCard
      :step="step"
      :color="color"
      :variant="variant"
      :dots="dots"
    >
      <VertCardTitle>{{ title }}</VertCardTitle>
      <VertCardContent>{{ description }}</VertCardContent>
    </VertCard>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="vcard-step" class="slidev-mockup__label">Step:</label>
        <input
          id="vcard-step"
          v-model="step"
          class="slidev-mockup__input"
          style="width: 60px;"
        />
      </div>

      <div class="slidev-mockup__control-group">
        <label for="vcard-color" class="slidev-mockup__label">Color:</label>
        <input
          id="vcard-color"
          v-model="color"
          type="color"
          class="slidev-mockup__input"
          style="width: 45px; padding: 0.1rem;"
        />
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
