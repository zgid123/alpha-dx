<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARROW_TRIAD_CALLOUT_KEY } from '../../../../utils/facets/triad/arrow-triad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
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
  return (
    props.color ??
    calloutContext?.item.value.titleColor ??
    calloutContext?.item.value.color ??
    'var(--alpha-arrow-triad-heading)'
  );
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arrow-triad-heading font-sans font-bold uppercase tracking-wider text-center leading-tight mb-2 select-none',
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
