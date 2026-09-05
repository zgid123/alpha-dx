<script setup lang="ts">
import { handleBackground, useSlideContext } from '@slidev/client';
import { computed } from 'vue';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const { background, indexed, dim } = defineProps({
  background: {
    default: '',
  },
  indexed: {
    type: Boolean,
    default: false,
  },
  dim: {
    type: Boolean,
    default: true,
  },
});

const style = computed(() => {
  return handleBackground(background, dim);
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-bg-center slidev-layout bg-center h-full grid place-content-center',
);

const { $slidev, $page } = useSlideContext();

const tocIndex = computed(() => {
  const tree = $slidev.nav.tocTree;
  const pos = tree.findIndex((item) => item.no === $page.value);

  if (pos === -1) {
    return null;
  }

  return String(pos + 1).padStart(2, '0');
});
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="style"
  >
    <div
      v-if="indexed && tocIndex !== null"
      class="alpha-bg-center__indexed-content flex flex-col items-center gap-2"
    >
      <span class="alpha-bg-center__index text-5xl font-extrabold leading-none text-white opacity-50 tracking-tighter">{{ tocIndex }}</span>
      <slot />
    </div>
    <slot v-else />
  </div>
</template>
