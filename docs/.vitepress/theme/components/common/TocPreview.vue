<script setup lang="ts">
import { computed } from 'vue';

import { useSlideContext } from '../../slidev-client-shim';

withDefaults(
  defineProps<{
    maxDepth?: number | string;
  }>(),
  {
    maxDepth: 1,
  },
);

const { $slidev } = useSlideContext();
const tocTree = computed(() => $slidev?.nav?.tocTree ?? []);
</script>

<template>
  <div class="alpha-toc-container">
    <div v-for="item in tocTree" :key="item.no" class="alpha-toc-entry">
      <span class="alpha-toc-badge">{{ String(item.no).padStart(2, '0') }}</span>
      <span class="alpha-toc-title">{{ item.title }}</span>
    </div>
  </div>
</template>
