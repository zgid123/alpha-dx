<script setup lang="ts">
import SquareThanks from '@alphacifer/slidev-addon-theme/components/core/thanks/SquareThanks.vue';
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

const animation = ref(true);
const renderKey = ref(0);

function replay() {
  renderKey.value++;
}
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <SquareThanks :key="renderKey" :animation="animation" />

    <template #controls>
      <div class="slidev-mockup__control-group">
        <button type="button" class="slidev-mockup__btn active" @click="replay">
          ↻ Replay
        </button>
      </div>

      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Animation:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: animation }]"
          @click="animation = true"
        >
          Enabled
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: !animation }]"
          @click="animation = false"
        >
          Static
        </button>
      </div>
    </template>
  </SlidevMockup>
</template>
