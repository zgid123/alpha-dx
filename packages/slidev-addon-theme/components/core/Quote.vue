<script setup lang="ts">
import { computed } from 'vue';

import { mergeUno } from '../../utils/mergeUno';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: false,
  },
  titleClass: {
    type: String,
    required: false,
  },
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-quote flex flex-col',
);
const titleClasses = computed(() => mergeUno('text-center', props.titleClass));
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <h1 :class="titleClasses">"{{ text }}"</h1>
    <p v-if="author" class="self-end">— {{ author }}</p>
  </div>
</template>
