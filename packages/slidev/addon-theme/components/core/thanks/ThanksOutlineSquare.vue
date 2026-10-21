<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-thanks-outline-square absolute rounded-2xl border-2 border-(--alpha-thanks-outline-stroke)',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()" />
</template>
