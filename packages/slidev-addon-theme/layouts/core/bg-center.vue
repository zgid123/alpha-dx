<script setup lang="ts">
import { handleBackground } from '@slidev/client';
import { computed } from 'vue';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const { background } = defineProps({
  background: {
    default: '',
  },
});

const style = computed(() => {
  return handleBackground(background, true);
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-bg-center slidev-layout bg-center h-full grid place-content-center',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="style"
  >
    <slot />
  </div>
</template>
