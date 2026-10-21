<script setup lang="ts">
import { computed, inject } from 'vue';

import { RECT_ORBIT_TETRAD_CALLOUT_KEY } from '../../../../utils/facets/tetrad/rectangle-orbit-tetrad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'RectangleOrbitTetradContent',
});

export interface IRectangleOrbitTetradContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IRectangleOrbitTetradContentProps>(), {
  color: undefined,
});

const calloutContext = inject(RECT_ORBIT_TETRAD_CALLOUT_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? calloutContext?.item.value.textColor ?? undefined;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-rectangle-orbit-tetrad-content font-sans leading-[1.38] font-normal tracking-tight text-(--alpha-rectangle-orbit-tetrad-content) select-none',
);
</script>

<template>
  <p
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="
      contentColor &&
      !contentColor.includes('--alpha-rectangle-orbit-tetrad-content')
        ? { '--alpha-rectangle-orbit-tetrad-content': contentColor }
        : undefined
    "
  >
    <slot />
  </p>
</template>
