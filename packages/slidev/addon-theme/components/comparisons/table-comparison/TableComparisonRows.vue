<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'TableComparisonRows',
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-table-comparison-rows',
);
</script>

<template>
  <tbody
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <slot />
  </tbody>
</template>
