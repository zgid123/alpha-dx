<script setup lang="ts">
import { computed, inject } from 'vue';

import { CHEVRON_CARD_KEY } from '../../utils/chevronCard';

defineOptions({
  name: 'ChevronCardHeading',
});

export interface IChevronCardHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IChevronCardHeadingProps>(), {
  color: undefined,
});

const cardContext = inject(CHEVRON_CARD_KEY, undefined);

const headingColor = computed(() => {
  return props.color ?? cardContext?.titleColor.value ?? '#4b5563';
});
</script>

<template>
  <div
    class="alpha-chevron-card-heading font-bold text-[1.25rem] uppercase tracking-wider leading-tight select-none font-sans"
    :style="{
      color: headingColor,
      padding: 0,
      fontSize: '1.25rem',
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
      marginBottom: '0.25rem',
    }"
  >
    <slot />
  </div>
</template>
