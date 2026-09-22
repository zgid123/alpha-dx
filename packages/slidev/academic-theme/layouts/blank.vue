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
    class="slidev-layout alpha-academic-blank"
    :style="style"
  >
    <slot />
  </main>
</template>
