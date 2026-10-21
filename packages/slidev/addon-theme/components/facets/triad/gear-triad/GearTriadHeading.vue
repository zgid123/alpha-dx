<script setup lang="ts">
import { computed, inject } from 'vue';

import { GEAR_TRIAD_CALLOUT_KEY } from '../../../../utils/facets/triad/gear-triad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'GearTriadHeading',
});

export interface IGearTriadHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IGearTriadHeadingProps>(), {
  color: undefined,
});

const calloutContext = inject(GEAR_TRIAD_CALLOUT_KEY, undefined);

const headingColor = computed(() => {
  return (
    props.color ??
    calloutContext?.item.value.color ??
    'var(--alpha-gear-triad-heading)'
  );
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-gear-triad-heading mb-1.5 font-sans font-bold leading-snug tracking-tight select-none',
);
</script>

<template>
  <h4
    v-if="$slots.default"
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{ color: headingColor }"
  >
    <slot>{{ '' }}</slot>
  </h4>
</template>
