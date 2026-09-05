<script setup lang="ts">
import { computed, inject } from 'vue';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import { createVertCardBadgePath, VERT_CARD_KEY } from '../../utils/vertCard';

defineOptions({
  inheritAttrs: false,
  name: 'VertCardBadge',
});

export interface IVertCardBadgeProps {
  /**
   * Badge fill color. Overrides context color.
   */
  readonly color?: string;
  /**
   * Badge text or step number. Overrides context step.
   */
  readonly step?: string | number;
}

const props = withDefaults(defineProps<IVertCardBadgeProps>(), {
  step: undefined,
  color: undefined,
});

const context = inject(VERT_CARD_KEY, undefined);

const resolvedColor = computed(() => {
  return props.color ?? context?.color.value ?? '#ea583a';
});

const resolvedStep = computed(() => {
  return props.step ?? context?.step.value ?? '01';
});

const badgePath = createVertCardBadgePath({
  width: 62,
  height: 48,
  tipRadius: 6,
  leftRadius: 8,
  sideWidth: 42,
  cornerRadius: 6,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-vert-card-badge inline-flex items-center justify-center select-none',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <svg
      class="w-[62px] h-[48px] overflow-visible drop-shadow-sm"
      viewBox="0 0 62 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path :d="badgePath" :fill="resolvedColor" />
      <text
        x="23"
        y="24"
        text-anchor="middle"
        dominant-baseline="central"
        fill="#ffffff"
        class="font-sans font-bold text-[20px] tracking-tight"
      >
        <slot>{{ resolvedStep }}</slot>
      </text>
    </svg>
  </div>
</template>
