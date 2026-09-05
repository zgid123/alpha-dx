<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
  name: 'HexTriadCenterBadge',
});

export interface IHexTriadCenterBadgeProps {
  readonly x: number;
  readonly y: number;
  readonly text: string | number;
  readonly color: string;
  readonly filter?: string;
  readonly radius: number;
}

const props = withDefaults(defineProps<IHexTriadCenterBadgeProps>(), {
  filter: 'url(#hex-badge-shadow)',
});

const transform = computed(() => {
  return `translate(${props.x}, ${props.y})`;
});
</script>

<template>
  <g class="alpha-hex-triad-center-badge" :transform="transform" :filter="filter">
    <circle class="alpha-hex-triad-center-badge__outer" cx="0" cy="0" :r="radius + 4" fill="#ffffff" />
    <circle class="alpha-hex-triad-center-badge__circle" cx="0" cy="0" :r="radius" :fill="color" />
    <circle
      class="alpha-hex-triad-center-badge__ring"
      cx="0"
      cy="0"
      :r="radius - 4"
      fill="none"
      stroke="#ffffff"
      stroke-width="1.2"
      :style="{ opacity: 0.65 }"
    />
    <text
      class="alpha-hex-triad-center-badge__text font-black text-lg select-none"
      x="0"
      y="6.5"
      text-anchor="middle"
      fill="#ffffff"
      font-family="system-ui, -apple-system, sans-serif"
    >
      {{ text }}
    </text>
  </g>
</template>
