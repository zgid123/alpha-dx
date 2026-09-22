<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcOrbitContents',
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-orbit-contents absolute inset-0 w-full h-full pointer-events-none',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <slot />
  </div>
</template>
