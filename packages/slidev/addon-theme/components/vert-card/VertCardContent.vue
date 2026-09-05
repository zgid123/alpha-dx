<script setup lang="ts">
import { computed, inject } from 'vue';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import { VERT_CARD_KEY } from '../../utils/vertCard';

defineOptions({
  inheritAttrs: false,
  name: 'VertCardContent',
});

export interface IVertCardContentProps {
  /**
   * Content text color. Overrides context textColor.
   */
  readonly color?: string;
}

const props = withDefaults(defineProps<IVertCardContentProps>(), {
  color: undefined,
});

const context = inject(VERT_CARD_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? context?.textColor.value ?? undefined;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-vert-card-content mt-3 px-2 font-sans text-base leading-relaxed text-slate-600 dark:text-slate-300 opacity-90 text-center [&_p]:text-base [&_p]:m-0',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="contentColor ? { color: contentColor } : undefined"
  >
    <slot>
      Lorem ipsum dolor sit amet, nibh est. A magna maecenas, quam magna nec
      quis, lorem nunc. Suspendisse viverra sodales mauris, cras pharetra proin.
    </slot>
  </div>
</template>
