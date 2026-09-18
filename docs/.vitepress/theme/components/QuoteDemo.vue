<script setup lang="ts">
import Quote from '@alphacifer/slidev-addon-theme/components/core/Quote.vue';
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

const text = ref('Reusable slides should feel native to every deck.');
const author = ref('Alpha');
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <Quote :text="text" :author="author" />

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="quote-text-input" class="slidev-mockup__label">Quote:</label>
        <input
          id="quote-text-input"
          v-model="text"
          class="slidev-mockup__input"
          style="min-width: 260px;"
          placeholder="Enter quote text"
        />
      </div>

      <div class="slidev-mockup__control-group">
        <label for="quote-author-input" class="slidev-mockup__label">Author:</label>
        <input
          id="quote-author-input"
          v-model="author"
          class="slidev-mockup__input"
          placeholder="Author name"
        />
      </div>
    </template>
  </SlidevMockup>
</template>
