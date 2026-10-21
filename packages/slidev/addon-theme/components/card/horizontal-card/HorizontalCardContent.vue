<script setup lang="ts">
import { computed, inject } from 'vue';

import { HORIZ_CARD_KEY } from '../../../utils/card/horizontal-card';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'HorizontalCardContent',
});

export interface IHorizontalCardContentProps {
  /**
   * Content text color. Overrides context textColor.
   */
  readonly color?: string;
}

const props = withDefaults(defineProps<IHorizontalCardContentProps>(), {
  color: undefined,
});

const context = inject(HORIZ_CARD_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? context?.textColor.value ?? undefined;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-horizontal-card-content font-sans text-xs leading-relaxed text-(--alpha-horizontal-card-content) opacity-90',
);
</script>

<template>
  <p
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="
      contentColor && !contentColor.includes('--alpha-horizontal-card-content')
        ? { '--alpha-horizontal-card-content': contentColor }
        : undefined
    "
  >
    <slot />
  </p>
</template>
