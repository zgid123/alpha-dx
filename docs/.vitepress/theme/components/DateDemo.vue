<script setup lang="ts">
import DateComponent from '@alphacifer/slidev-addon-theme/components/core/Date.vue';
import { ref } from 'vue';

import SlidevMockup from './SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);

const date = ref('2026-08-12');
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <DateComponent :date="date" />

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="date-input" class="slidev-mockup__label">Date:</label>
        <input
          id="date-input"
          v-model="date"
          type="date"
          class="slidev-mockup__input"
        />
      </div>
    </template>
  </SlidevMockup>
</template>
