<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  createHorizCardBadgePath,
  HORIZ_CARD_KEY,
} from '../../utils/horizCard';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'HorizCardBadge',
});

export interface IHorizCardBadgeProps {
  /**
   * Badge fill color. Overrides context color.
   */
  readonly color?: string;
  /**
   * Badge text or step number. Overrides context step.
   */
  readonly step?: string | number;
}

const props = withDefaults(defineProps<IHorizCardBadgeProps>(), {
  step: undefined,
  color: undefined,
});

const context = inject(HORIZ_CARD_KEY, undefined);

const resolvedColor = computed(() => {
  return props.color ?? context?.color.value ?? '#ea583a';
});

const resolvedStep = computed(() => {
  return props.step ?? context?.step.value ?? '01';
});

const badgePath = createHorizCardBadgePath({
  width: 84,
  height: 58,
  tipRadius: 8,
  topRadius: 12,
  sideHeight: 46,
  bottomRadius: 8,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-horiz-card-badge inline-flex items-center justify-center select-none',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <svg
      class="w-[84px] h-[58px] overflow-visible drop-shadow-sm"
      viewBox="0 0 84 58"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path :d="badgePath" :fill="resolvedColor" />
      <text
        x="42"
        y="27"
        text-anchor="middle"
        dominant-baseline="central"
        fill="#ffffff"
        class="font-sans font-bold text-[25px] tracking-tight"
      >
        <slot>{{ resolvedStep }}</slot>
      </text>
    </svg>
  </div>
</template>
