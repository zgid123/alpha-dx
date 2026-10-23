<script setup lang="ts">
import MetaList from '@alphacifer/slidev-addon-theme/components/core/MetaList.vue';
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

const separator = ref(': ');
const label1 = ref('Course');
const value1 = ref('Data Science & Analytics');
const label2 = ref('Supervisor');
const value2 = ref('Prof. Alan Turing');
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <div class="h-full flex items-center justify-center p-8">
      <MetaList
        :separator="separator"
        :items="[
          { label: label1, value: value1 },
          { label: label2, value: value2 },
        ]"
      />
    </div>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="meta-separator-input" class="slidev-mockup__label"
          >Separator:</label
        >
        <input
          id="meta-separator-input"
          v-model="separator"
          class="slidev-mockup__input"
          placeholder=": "
        >
      </div>

      <div class="slidev-mockup__control-group">
        <label for="meta-label-1" class="slidev-mockup__label"
          >Item 1 Label:</label
        >
        <input id="meta-label-1" v-model="label1" class="slidev-mockup__input">
      </div>

      <div class="slidev-mockup__control-group">
        <label for="meta-value-1" class="slidev-mockup__label"
          >Item 1 Value:</label
        >
        <input id="meta-value-1" v-model="value1" class="slidev-mockup__input">
      </div>

      <div class="slidev-mockup__control-group">
        <label for="meta-label-2" class="slidev-mockup__label"
          >Item 2 Label:</label
        >
        <input id="meta-label-2" v-model="label2" class="slidev-mockup__input">
      </div>

      <div class="slidev-mockup__control-group">
        <label for="meta-value-2" class="slidev-mockup__label"
          >Item 2 Value:</label
        >
        <input id="meta-value-2" v-model="value2" class="slidev-mockup__input">
      </div>
    </template>
  </SlidevMockup>
</template>
