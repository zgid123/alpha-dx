<script setup lang="ts">
import type { PropType } from 'vue';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

export interface IMetaListItem {
  label: string;
  value: string;
}

const props = defineProps({
  items: {
    type: Array as PropType<IMetaListItem[]>,
    required: false,
    default: () => {
      return [];
    },
  },
  separator: {
    type: String,
    required: false,
    default: ': ',
  },
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-meta-list flex absolute bottom-3.75 left-7.5 flex-col text-left',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <slot>
      <p
        v-for="(item, index) in props.items"
        :key="`${item.label}-${index}`"
        class="alpha-meta-list__item"
      >
        <span class="alpha-meta-list__label"
          >{{ item.label }}{{ props.separator }}</span
        >
        <span class="alpha-meta-list__value">{{ item.value }}</span>
      </p>
    </slot>
  </div>
</template>
