<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  createHorizontalCardBadgePath,
  HORIZ_CARD_KEY,
} from '../../../utils/card/horizontal-card';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'HorizontalCardBadge',
});

export interface IHorizontalCardBadgeProps {
  /**
   * Badge fill color. Overrides context color.
   */
  readonly color?: string;
  /**
   * Badge text or step number. Overrides context step.
   */
  readonly step?: string | number;
}

const props = withDefaults(defineProps<IHorizontalCardBadgeProps>(), {
  step: undefined,
  color: undefined,
});

const context = inject(HORIZ_CARD_KEY, undefined);

const resolvedColor = computed(() => {
  return (
    props.color ??
    context?.color.value ??
    'var(--alpha-horizontal-card-badge-bg, var(--alpha-horizontal-card-accent))'
  );
});

const resolvedStep = computed(() => {
  return props.step ?? context?.step.value ?? '01';
});

const badgePath = createHorizontalCardBadgePath({
  width: 84,
  height: 58,
  tipRadius: 8,
  topRadius: 12,
  sideHeight: 46,
  bottomRadius: 8,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-horizontal-card-badge inline-flex items-center justify-center select-none',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <svg
      aria-hidden="true"
      class="w-21 h-14.5 overflow-visible drop-shadow-sm"
      viewBox="0 0 84 58"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path :d="badgePath" :fill="resolvedColor" />
      <text
        x="42"
        y="27"
        text-anchor="middle"
        dominant-baseline="central"
        fill="var(--alpha-horizontal-card-badge)"
        class="font-sans font-bold text-[25px] tracking-tight"
      >
        <slot>{{ resolvedStep }}</slot>
      </text>
    </svg>
  </div>
</template>
