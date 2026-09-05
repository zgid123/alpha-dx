<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARROW_TRIAD_CALLOUT_KEY } from '../../utils/arrowTriad';

defineOptions({
  name: 'ArrowTriadHeading',
});

export interface IArrowTriadHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArrowTriadHeadingProps>(), {
  color: undefined,
});

const calloutContext = inject(ARROW_TRIAD_CALLOUT_KEY, undefined);

const headingColor = computed(() => {
  return props.color ?? calloutContext?.item.value.titleColor ?? '#1e293b';
});
</script>

<template>
  <div
    class="alpha-arrow-triad-heading font-bold text-[1.25rem] uppercase tracking-wider text-center leading-tight mb-2 select-none"
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
