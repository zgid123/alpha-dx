<script setup lang="ts">
import { computed, inject } from 'vue';

import { HEX_TRIAD_CALLOUT_KEY } from '../../../../utils/facets/triad/hexagon-triad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'HexagonTriadHeading',
});

export interface IHexagonTriadHeadingProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IHexagonTriadHeadingProps>(), {
  color: undefined,
});

const calloutContext = inject(HEX_TRIAD_CALLOUT_KEY, undefined);

const headingColor = computed(() => {
  return (
    props.color ??
    calloutContext?.item.value.color ??
    'var(--alpha-hexagon-triad-heading)'
  );
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-hexagon-triad-heading mb-2 font-sans font-bold tracking-tight',
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
