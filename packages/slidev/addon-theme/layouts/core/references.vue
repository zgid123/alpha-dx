<script setup lang="ts">
import { handleBackground } from '@slidev/client';
import { computed, type PropType } from 'vue';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

export interface IReferenceItem {
  authors: string;
  year: number | string;
  title: string;
  url?: string;
}

const props = defineProps({
  references: {
    type: Array as PropType<IReferenceItem[]>,
    default: () => {
      return [];
    },
  },
  columns: {
    type: [Number, String],
    default: 2,
  },
  background: {
    type: String,
    default: '',
  },
});

const style = computed(() => {
  return props.background ? handleBackground(props.background) : undefined;
});

const columnClass = computed(() => {
  const cols = Number(props.columns) || 2;

  if (cols === 1) {
    return 'columns-1';
  }

  if (cols === 3) {
    return 'columns-3';
  }

  return 'columns-2';
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-references slidev-layout h-full',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()" :style="style">
    <slot />
    <ul
      v-if="props.references.length"
      class="alpha-references__list list-none p-0 m-0 mt-3"
      :class="[columnClass, 'gap-x-8']"
    >
      <li
        v-for="(ref, index) in props.references"
        :key="`${ref.authors}-${ref.year}-${index}`"
        class="alpha-references__item break-inside-avoid mb-4 text-lg leading-snug"
      >
        <strong class="alpha-references__authors text-foreground-primary block">
          {{ ref.authors }}
          ({{ ref.year }})
        </strong>
        <a
          v-if="ref.url"
          :href="ref.url"
          target="_blank"
          rel="noopener noreferrer"
          class="alpha-references__title text-foreground-accent hover:underline block"
        >
          {{ ref.title }}
        </a>
        <span
          v-else
          class="alpha-references__title text-foreground-secondary block"
        >
          {{ ref.title }}
        </span>
      </li>
    </ul>
  </div>
</template>
