<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARC_ARROW_PROCESS_CALLOUT_KEY } from '../../utils/arcArrowProcess';

defineOptions({
  name: 'ArcArrowProcessContent',
});

export interface IArcArrowProcessContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArcArrowProcessContentProps>(), {
  color: undefined,
});

const calloutContext = inject(ARC_ARROW_PROCESS_CALLOUT_KEY, undefined);

const contentColor = computed(() => {
  return props.color;
});
</script>

<template>
  <div
    class="alpha-arc-arrow-process-content text-[1rem] leading-[1.45] font-normal select-none"
    :style="{
      color: contentColor,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
    }"
  >
    <slot>
      {{ calloutContext?.item.value.description }}
    </slot>
  </div>
</template>
