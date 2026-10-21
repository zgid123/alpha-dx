<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-thanks-square absolute rounded-3xl',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()" />
</template>
