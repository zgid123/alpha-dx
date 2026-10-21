<script setup lang="ts">
import { computed } from 'vue';

import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'HexagonTriadCenterBadge',
});

export interface IHexagonTriadCenterBadgeProps {
  readonly x: number;
  readonly y: number;
  readonly text: string | number;
  readonly color: string;
  readonly filter?: string;
  readonly radius: number;
}

const props = withDefaults(defineProps<IHexagonTriadCenterBadgeProps>(), {
  filter: 'url(#hex-badge-shadow)',
});

const transform = computed(() => {
  return `translate(${props.x}, ${props.y})`;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-hexagon-triad-center-badge',
);
</script>

<template>
  <g
    v-bind="forwardedAttrs()"
    :class="className()"
    :transform="transform"
    :filter="filter"
  >
    <circle
      class="alpha-hexagon-triad-center-badge__outer"
      cx="0"
      cy="0"
      :r="radius + 4"
      fill="var(--alpha-hexagon-triad-center-badge-fill)"
    />
    <circle
      class="alpha-hexagon-triad-center-badge__circle"
      cx="0"
      cy="0"
      :r="radius"
      :fill="color"
    />
    <circle
      class="alpha-hexagon-triad-center-badge__ring"
      cx="0"
      cy="0"
      :r="radius - 4"
      fill="none"
      stroke="var(--alpha-hexagon-triad-center-badge-stroke)"
      stroke-width="1.2"
      :style="{ opacity: 0.65 }"
    />
    <text
      class="alpha-hexagon-triad-center-badge__text font-sans font-black text-lg select-none"
      x="0"
      y="6.5"
      text-anchor="middle"
      fill="var(--alpha-hexagon-triad-center-badge-fill)"
    >
      {{ text }}
    </text>
  </g>
</template>
