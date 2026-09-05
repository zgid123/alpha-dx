<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARC_ARROW_PROCESS_CALLOUT_KEY } from '../../utils/arcArrowProcess';

defineOptions({
  name: 'ArcArrowProcessHeading',
});

export interface IArcArrowProcessHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArcArrowProcessHeadingProps>(), {
  color: undefined,
});

const calloutContext = inject(ARC_ARROW_PROCESS_CALLOUT_KEY, undefined);

const headingColor = computed(() => {
  return (
    props.color ??
    calloutContext?.item.value.color ??
    calloutContext?.item.value.titleColor ??
    '#1e293b'
  );
});
</script>

<template>
  <div
    class="alpha-arc-arrow-process-heading font-bold text-[1.25rem] leading-tight mb-1.5 select-none"
    :style="{
      color: headingColor,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
    }"
  >
    <slot>
      {{ calloutContext?.item.value.title }}
    </slot>
  </div>
</template>
