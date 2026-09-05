<script setup lang="ts">
import { computed, inject } from 'vue';

import { HORIZ_CARD_KEY } from '../../utils/horizCard';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'HorizCardContent',
});

export interface IHorizCardContentProps {
  /**
   * Content text color. Overrides context textColor.
   */
  readonly color?: string;
}

const props = withDefaults(defineProps<IHorizCardContentProps>(), {
  color: undefined,
});

const context = inject(HORIZ_CARD_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? context?.textColor.value ?? undefined;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-horiz-card-content font-sans text-xs leading-relaxed text-slate-600 dark:text-slate-300 opacity-90',
);
</script>

<template>
  <p
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="contentColor ? { color: contentColor } : undefined"
  >
    <slot>
      Lorem ipsum dolor sit amet, nibh est. A magna maecenas, quam magna nec
      quis, lorem nunc. Suspendisse viverra sodales mauris, cras pharetra proin
      egestas.
    </slot>
  </p>
</template>
