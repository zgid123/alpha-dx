<script setup lang="ts">
import { computed, inject } from 'vue';

import { GEAR_TRIAD_CALLOUT_KEY } from '../../../../utils/gearTriad';

defineOptions({
  name: 'GearTriadDescription',
});

export interface IGearTriadDescriptionProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IGearTriadDescriptionProps>(), {
  color: undefined,
});

const calloutContext = inject(GEAR_TRIAD_CALLOUT_KEY, undefined);

const descriptionColor = computed(() => {
  return props.color ?? calloutContext?.item.value.textColor ?? '#64748b';
});
</script>

<template>
  <div
    class="alpha-gear-triad-description text-[0.92rem] leading-[1.45] font-normal select-none"
    :style="{
      color: descriptionColor,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
    }"
  >
    <slot>
      {{ calloutContext?.item.value.description }}
    </slot>
  </div>
</template>
