<script setup lang="ts">
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-thanks-outline-square absolute rounded-2xl border-2 border-color-cyan-500',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  />
</template>
