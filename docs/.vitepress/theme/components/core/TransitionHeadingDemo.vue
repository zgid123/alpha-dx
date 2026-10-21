<script setup lang="ts">
import TransitionHeading from '@alphacifer/slidev-addon-theme/components/core/TransitionHeading.vue';
import { onMounted, onUnmounted, ref } from 'vue';

import SlidevMockup from '../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);

const isCenter = ref(true);

function handleKeydown(event: KeyboardEvent) {
  const target = event.target as HTMLElement | null;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
    return;
  }

  if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
    isCenter.value = false;
  } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
    isCenter.value = true;
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown);
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown);
  }
});
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <template #default="{ isFullscreen }">
      <button
        type="button"
        class="absolute inset-0 z-10 h-full w-full appearance-none border-0 bg-transparent p-0"
        :class="{ 'cursor-pointer': isFullscreen }"
        :disabled="!isFullscreen"
        aria-label="Toggle heading position"
        :aria-pressed="!isCenter"
        @click="isCenter = !isCenter"
      />
      <TransitionHeading :center="isCenter" :idle="!isCenter">
        <h1>Transition Heading</h1>
      </TransitionHeading>

      <div
        class="select-none transition-opacity duration-500"
        :style="{
          paddingTop: '4.5rem',
          opacity: isCenter ? 0 : 1,
          pointerEvents: isCenter ? 'none' : 'auto',
        }"
      >
        <p>
          Heading shifted to top corner. Presentation body content is now
          revealed!
        </p>
      </div>
    </template>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">State:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: isCenter }]"
          @click="isCenter = true"
        >
          Center (Click 0)
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: !isCenter }]"
          @click="isCenter = false"
        >
          Shifted (Revealed)
        </button>
      </div>
    </template>
  </SlidevMockup>
</template>
