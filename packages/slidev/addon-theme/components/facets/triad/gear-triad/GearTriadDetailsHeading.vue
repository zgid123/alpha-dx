<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  GEAR_TRIAD_DETAILS_KEY,
  GEAR_TRIAD_ROOT_KEY,
} from '../../../../utils/facets/triad/gear-triad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'GearTriadDetailsHeading',
});

export interface IGearTriadDetailsHeadingProps {
  readonly color?: string;
  readonly option?: number;
}

const props = withDefaults(defineProps<IGearTriadDetailsHeadingProps>(), {
  color: undefined,
  option: undefined,
});

const rootContext = inject(GEAR_TRIAD_ROOT_KEY, undefined);
const detailsContext = inject(GEAR_TRIAD_DETAILS_KEY, undefined);

const headingColor = computed(() => {
  if (props.color) {
    return props.color;
  }

  if (props.option !== undefined && rootContext?.items.value) {
    const item = rootContext.items.value[props.option - 1];
    if (item?.color) {
      return item.color;
    }
  }

  return (
    detailsContext?.activeItem.value.color ??
    'var(--alpha-gear-triad-details-heading)'
  );
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-gear-triad-details-heading mb-2 font-bold font-sans tracking-tight',
);
</script>

<template>
  <h3
    v-if="$slots.default"
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{ color: headingColor }"
  >
    <slot>{{ '' }}</slot>
  </h3>
</template>
