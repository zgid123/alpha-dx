<script setup lang="ts">
import QnA from '@alphacifer/slidev-addon-theme/components/core/QnA.vue';
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

const renderKey = ref(0);
const startDelay = ref(0);

function replay() {
  renderKey.value++;
}
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <QnA :key="renderKey" :start-delay="startDelay" />

    <template #controls>
      <div class="slidev-mockup__control-group">
        <button
          type="button"
          class="slidev-mockup__btn active"
          @click="replay"
        >
          ↻ Replay Animation
        </button>
      </div>

      <div class="slidev-mockup__control-group">
        <label for="qna-delay-input" class="slidev-mockup__label">Start Delay (ms):</label>
        <input
          id="qna-delay-input"
          v-model.number="startDelay"
          type="number"
          class="slidev-mockup__input"
          style="width: 90px;"
          min="0"
          step="500"
        />
      </div>
    </template>
  </SlidevMockup>
</template>
