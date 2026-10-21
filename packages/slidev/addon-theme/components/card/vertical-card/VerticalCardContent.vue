<script setup lang="ts">
import { computed, inject } from 'vue';

import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import { VERT_CARD_KEY } from '../../../utils/card/vertical-card';

defineOptions({
  inheritAttrs: false,
  name: 'VerticalCardContent',
});

export interface IVerticalCardContentProps {
  /**
   * Content text color. Overrides context textColor.
   */
  readonly color?: string;
}

const props = withDefaults(defineProps<IVerticalCardContentProps>(), {
  color: undefined,
});

const context = inject(VERT_CARD_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? context?.textColor.value ?? undefined;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-vertical-card-content mt-3 px-2 font-sans leading-relaxed text-(--alpha-vertical-card-content) opacity-90 text-center',
);
</script>

<template>
  <p
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="
      contentColor && !contentColor.includes('--alpha-vertical-card-content')
        ? { '--alpha-vertical-card-content': contentColor }
        : undefined
    "
  >
    <slot />
  </p>
</template>
