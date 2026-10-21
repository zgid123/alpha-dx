<script setup lang="ts">
import { isVNode, type VNode } from 'vue';

import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'RectangleOrbitTetradCenter',
});

export interface IRectangleOrbitTetradCenterProps {
  readonly title?: string | VNode;
  readonly radius?: number;
}

const props = withDefaults(defineProps<IRectangleOrbitTetradCenterProps>(), {
  title: undefined,
  radius: 58,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-rectangle-orbit-tetrad-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-(--alpha-rectangle-orbit-tetrad-center-bg) font-sans flex flex-col items-center justify-center text-center shadow-lg pointer-events-auto select-none',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      width: `${props.radius * 2}px`,
      height: `${props.radius * 2}px`,
      boxShadow: 'var(--alpha-rectangle-orbit-tetrad-center-shadow)',
    }"
  >
    <h4
      v-if="props.title != null || $slots.title"
      class="mb-2 font-extrabold text-(--alpha-rectangle-orbit-tetrad-title) tracking-tight leading-none"
    >
      <slot v-if="$slots.title" name="title" />
      <component :is="props.title" v-else-if="isVNode(props.title)" />
      <template v-else-if="typeof props.title === 'string'">{{
        props.title
      }}</template>
    </h4>
    <p
      v-if="$slots.content"
      class="text-sm font-medium text-(--alpha-rectangle-orbit-tetrad-center-content) tracking-normal leading-normal"
    >
      <slot name="content" />
    </p>
    <slot />
  </div>
</template>
