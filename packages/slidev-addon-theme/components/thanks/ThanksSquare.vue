<script setup lang="ts">
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'slidev-addon-thanks-square absolute bg-gradient-to-br from-cyan-500 to-blue-500 rounded-3xl',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  />
</template>
