<script setup lang="ts">
import { computed, inject } from 'vue';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import { VERT_CARD_KEY } from '../../utils/vertCard';

defineOptions({
  inheritAttrs: false,
  name: 'VertCardTitle',
});

export interface IVertCardTitleProps {
  /**
   * Title text color. Overrides context titleColor.
   */
  readonly color?: string;
  /**
   * Whether to render the decorative horizontal line with center dot below the title.
   * Defaults to context hasDivider, or true.
   */
  readonly hasDivider?: boolean;
}

const props = withDefaults(defineProps<IVertCardTitleProps>(), {
  color: undefined,
  hasDivider: undefined,
});

const context = inject(VERT_CARD_KEY, undefined);

const headingColor = computed(() => {
  return (
    props.color ??
    context?.titleColor.value ??
    context?.color.value ??
    '#ea583a'
  );
});

const isDividerVisible = computed(() => {
  if (props.hasDivider !== undefined) {
    return props.hasDivider;
  }

  return context?.hasDivider?.value ?? true;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-vert-card-title font-sans font-bold text-xl tracking-tight leading-tight text-center',
);
</script>

<template>
  <div class="flex flex-col items-center w-full">
    <h3
      v-bind="forwardedAttrs()"
      :class="className()"
      :style="{ color: headingColor }"
    >
      <slot>Lorem Ipsum</slot>
    </h3>
    <div
      v-if="isDividerVisible"
      class="mt-2.5 flex items-center justify-center w-32 relative"
    >
      <div
        class="w-full h-[1.5px]"
        :style="{ backgroundColor: headingColor }"
      />
      <span
        class="absolute w-2 h-2 rounded-full"
        :style="{ backgroundColor: headingColor }"
      />
    </div>
  </div>
</template>
