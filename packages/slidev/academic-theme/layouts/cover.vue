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
    class="slidev-layout alpha-academic-cover"
    :style="style"
  >
    <div class="alpha-academic-cover__content">
      <slot />
    </div>
  </main>
</template>
