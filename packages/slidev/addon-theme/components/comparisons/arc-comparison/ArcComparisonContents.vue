<script setup lang="ts">
import ArcOrbitContents from '../../core/arc-orbit/ArcOrbitContents.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonContents',
});
</script>

<template>
  <ArcOrbitContents
    v-bind="$attrs"
    class="alpha-arc-comparison-contents"
  >
    <slot />
  </ArcOrbitContents>
</template>
