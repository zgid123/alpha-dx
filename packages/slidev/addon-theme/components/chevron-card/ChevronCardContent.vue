<script setup lang="ts">
import { computed, inject } from 'vue';

import { CHEVRON_CARD_KEY } from '../../utils/chevronCard';

defineOptions({
  name: 'ChevronCardContent',
});

export interface IChevronCardContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IChevronCardContentProps>(), {
  color: undefined,
});

const cardContext = inject(CHEVRON_CARD_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? cardContext?.textColor.value ?? '#6b7280';
});
</script>

<template>
  <div
    class="alpha-chevron-card-content text-[1rem] leading-[1.45] font-normal tracking-tight select-none font-sans"
    :style="{
      color: contentColor,
      margin: 0,
      padding: 0,
      fontSize: '1rem',
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
    }"
  >
    <slot />
  </div>
</template>
