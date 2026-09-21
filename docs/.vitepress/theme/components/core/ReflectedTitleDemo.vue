<script setup lang="ts">
import ReflectedTitle from '@alphacifer/slidev-addon-theme/components/core/ReflectedTitle.vue';
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

const title = ref("Alpha's Slidev Addon");
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <ReflectedTitle :title="title" />

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="reflected-title-input" class="slidev-mockup__label">Title:</label>
        <input
          id="reflected-title-input"
          v-model="title"
          class="slidev-mockup__input"
          style="min-width: 240px;"
          placeholder="Title text"
        />
      </div>
    </template>
  </SlidevMockup>
</template>
