<script setup lang="ts">
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ComparisonTableRows',
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-comparison-table-rows',
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
