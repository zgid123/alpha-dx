<script setup lang="ts">
import { computed, inject } from 'vue';

import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import {
  createVerticalCardBadgePath,
  VERT_CARD_KEY,
} from '../../../utils/card/vertical-card';

defineOptions({
  inheritAttrs: false,
  name: 'VerticalCardBadge',
});

export interface IVerticalCardBadgeProps {
  /**
   * Badge fill color. Overrides context color.
   */
  readonly color?: string;
  /**
   * Badge text or step number. Overrides context step.
   */
  readonly step?: string | number;
}

const props = withDefaults(defineProps<IVerticalCardBadgeProps>(), {
  step: undefined,
  color: undefined,
});

const context = inject(VERT_CARD_KEY, undefined);

const resolvedColor = computed(() => {
  return (
    props.color ??
    context?.color.value ??
    'var(--alpha-vertical-card-badge-bg, var(--alpha-vertical-card-accent))'
  );
});

const resolvedStep = computed(() => {
  return props.step ?? context?.step.value ?? '01';
});

const badgePath = createVerticalCardBadgePath({
  width: 62,
  height: 48,
  tipRadius: 6,
  leftRadius: 8,
  sideWidth: 42,
  cornerRadius: 6,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-vertical-card-badge inline-flex items-center justify-center select-none',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <svg
      aria-hidden="true"
      class="w-15.5 h-12 overflow-visible drop-shadow-sm"
      viewBox="0 0 62 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path :d="badgePath" :fill="resolvedColor" />
      <text
        x="23"
        y="24"
        text-anchor="middle"
        dominant-baseline="central"
        fill="var(--alpha-vertical-card-badge)"
        class="font-sans font-bold text-[20px] tracking-tight"
      >
        <slot>{{ resolvedStep }}</slot>
      </text>
    </svg>
  </div>
</template>
