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
      <div
        class="h-full w-full select-none"
        :class="{ 'cursor-pointer': isFullscreen }"
        @click="isFullscreen ? (isCenter = !isCenter) : undefined"
      >
        <TransitionHeading :center="isCenter">
          <h1 style="margin: 0; font-size: 2.5rem; font-weight: 700;">Transition Heading</h1>
        </TransitionHeading>

        <div
          class="transition-opacity duration-500"
          :style="{
            marginTop: '4rem',
            opacity: isCenter ? 0 : 1,
            pointerEvents: isCenter ? 'none' : 'auto',
          }"
        >
          <p style="font-size: 1.25rem;">
            Heading shifted to top corner. Presentation body content is now revealed!
          </p>
        </div>
      </div>

      <!-- Presentation Mode Floating Transition Controls -->
      <div
        v-if="isFullscreen"
        class="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-50 bg-slate-900/90 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-2xl pointer-events-auto select-none"
        @click.stop
      >
        <span class="text-xs font-semibold text-slate-300">Transition:</span>
        <button
          type="button"
          :class="[
            'px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer',
            isCenter
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
              : 'text-slate-300 hover:text-white hover:bg-white/10',
          ]"
          @click="isCenter = true"
        >
          Center (Click 0)
        </button>
        <button
          type="button"
          :class="[
            'px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer',
            !isCenter
              ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/30'
              : 'text-slate-300 hover:text-white hover:bg-white/10',
          ]"
          @click="isCenter = false"
        >
          Shifted (Revealed)
        </button>
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
