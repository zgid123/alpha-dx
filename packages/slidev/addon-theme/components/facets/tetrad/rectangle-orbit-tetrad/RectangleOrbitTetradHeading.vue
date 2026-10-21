<script setup lang="ts">
import { inject } from 'vue';

import { RECT_ORBIT_TETRAD_CALLOUT_KEY } from '../../../../utils/facets/tetrad/rectangle-orbit-tetrad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'RectangleOrbitTetradHeading',
});

const calloutContext = inject(RECT_ORBIT_TETRAD_CALLOUT_KEY, undefined);

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-rectangle-orbit-tetrad-heading font-sans font-bold leading-tight tracking-tight select-none',
);
</script>

<template>
  <h4
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{ color: calloutContext?.item.value.color }"
  >
    <slot>{{ '' }}</slot>
  </h4>
</template>
