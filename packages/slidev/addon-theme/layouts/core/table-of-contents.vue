<script setup lang="ts">
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

defineProps({
  maxDepth: {
    type: [Number, String],
    default: 1,
  },
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-table-of-contents slidev-layout default toc-layout',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <slot>
      <h1>Table of Contents</h1>
    </slot>
    <Toc :maxDepth="maxDepth" />
  </div>
</template>
