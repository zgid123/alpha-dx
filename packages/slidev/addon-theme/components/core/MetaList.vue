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
    default: () => [],
  },
  separator: {
    type: String,
    required: false,
    default: ': ',
  },
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-meta-list flex flex-col gap-2 text-left text-xl',
);
</script>

<template>
  <dl v-bind="forwardedAttrs()" :class="className()">
    <slot>
      <div
        v-for="(item, index) in props.items"
        :key="`${item.label}-${index}`"
        class="alpha-meta-list__item"
      >
        <dt class="alpha-meta-list__label inline font-medium">
          {{ item.label }}{{ props.separator }}
        </dt>
        <dd class="alpha-meta-list__value inline m-0">
          {{ item.value }}
        </dd>
      </div>
    </slot>
  </dl>
</template>
