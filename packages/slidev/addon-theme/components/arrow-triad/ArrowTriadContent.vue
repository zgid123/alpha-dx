<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARROW_TRIAD_CALLOUT_KEY } from '../../utils/arrowTriad';

defineOptions({
  name: 'ArrowTriadContent',
});

export interface IArrowTriadContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArrowTriadContentProps>(), {
  color: undefined,
});

const calloutContext = inject(ARROW_TRIAD_CALLOUT_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? calloutContext?.item.value.textColor ?? '#64748b';
});
</script>

<template>
  <div
    class="alpha-arrow-triad-content text-[1rem] leading-[1.5] text-center font-normal select-none"
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
