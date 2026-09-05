<script setup lang="ts">
import { useSlideContext } from '@slidev/client';
import { computed } from 'vue';

const { $frontmatter } = useSlideContext();

const isVisible = computed(() => !$frontmatter.hidePagy);
</script>

<template>
  <div
    v-if="isVisible"
    aria-label="Slide pagination"
    class="alpha-academic-pagy"
  >
    <SlideCurrentNo />
    <span aria-hidden="true">/</span>
    <SlidesTotal />
  </div>
</template>
