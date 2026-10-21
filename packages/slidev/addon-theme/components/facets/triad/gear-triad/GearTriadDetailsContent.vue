<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'GearTriadDetailsContent',
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-gear-triad-details-content mb-6 text-sm font-sans leading-relaxed text-(--alpha-gear-triad-details-content)',
);
</script>

<template>
  <p v-bind="forwardedAttrs()" :class="className()">
    <slot />
  </p>
</template>
