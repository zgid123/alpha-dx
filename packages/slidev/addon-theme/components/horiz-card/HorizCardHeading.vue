<script setup lang="ts">
import { computed, inject } from 'vue';

import { HORIZ_CARD_KEY } from '../../utils/horizCard';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'HorizCardHeading',
});

export interface IHorizCardHeadingProps {
  /**
   * Title text color. Overrides context titleColor.
   */
  readonly color?: string;
}

const props = withDefaults(defineProps<IHorizCardHeadingProps>(), {
  color: undefined,
});

const context = inject(HORIZ_CARD_KEY, undefined);

const headingColor = computed(() => {
  return (
    props.color ??
    context?.titleColor.value ??
    context?.color.value ??
    '#ea583a'
  );
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-horiz-card-heading font-sans font-bold text-xl tracking-tight leading-tight',
);
</script>

<template>
  <h3
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{ color: headingColor }"
  >
    <slot>Lorem Ipsum</slot>
  </h3>
</template>
