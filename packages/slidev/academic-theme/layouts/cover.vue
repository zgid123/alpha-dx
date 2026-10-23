<script setup lang="ts">
import { handleBackground } from '@slidev/client';
import { computed } from 'vue';

const { background } = defineProps({
  background: {
    default: '',
  },
});

const style = computed(() => handleBackground(background));
</script>

<template>
  <main
    class="slidev-layout alpha-academic-cover grid place-items-center h-full w-full"
    :style="style"
  >
    <div class="alpha-academic-cover__content w-full">
      <slot />
    </div>
  </main>
</template>
