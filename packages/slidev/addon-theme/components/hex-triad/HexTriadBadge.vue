<script setup lang="ts">
import { computed, inject, useSlots, watchEffect } from 'vue';

import {
  createRoundedHexagonPath,
  HEX_TRIAD_CALLOUT_KEY,
} from '../../utils/hexTriad';

defineOptions({
  name: 'HexTriadBadge',
});

export interface IHexTriadBadgeProps {
  readonly id?: string | number;
  readonly color?: string;
  readonly lightColor?: string;
}

const props = withDefaults(defineProps<IHexTriadBadgeProps>(), {
  id: undefined,
  color: undefined,
  lightColor: undefined,
});

defineSlots<{
  default?: () => unknown;
}>();

const calloutContext = inject(HEX_TRIAD_CALLOUT_KEY, undefined);
const slots = useSlots();

const miniHexPath = createRoundedHexagonPath(18, 18, 17, 4.5);

const badgeColor = computed(() => {
  return props.color ?? calloutContext?.item.value.color ?? '#e11d48';
});

const badgeLightColor = computed(() => {
  return (
    props.lightColor ??
    calloutContext?.item.value.lightColor ??
    calloutContext?.item.value.color ??
    '#fb7185'
  );
});

const fallbackId = computed(() => {
  return props.id ?? calloutContext?.item.value.id ?? '01';
});

// Extract text from default slot or prop if available
const badgeText = computed<string | number>(() => {
  if (props.id !== undefined) {
    return props.id;
  }

  if (!slots.default) {
    return fallbackId.value;
  }

  const nodes = slots.default();
  const text = nodes
    .map((node) => {
      if (typeof node.children === 'string') {
        return node.children;
      }

      if (typeof node.children === 'number') {
        return String(node.children);
      }

      return '';
    })
    .join('')
    .trim();
  return text || fallbackId.value;
});

watchEffect(() => {
  if (calloutContext?.setBadgeText) {
    calloutContext.setBadgeText(badgeText.value);
  }
});
</script>

<template>
  <svg class="alpha-hex-triad-badge w-10 h-10 drop-shadow flex-shrink-0" viewBox="0 0 36 36">
    <path class="alpha-hex-triad-badge__bg" :d="miniHexPath" :fill="badgeLightColor" :style="{ opacity: 0.45 }" />
    <path
      class="alpha-hex-triad-badge__border"
      :d="miniHexPath"
      fill="none"
      :stroke="badgeLightColor"
      stroke-width="1"
      :style="{ opacity: 0.8 }"
    />
    <circle class="alpha-hex-triad-badge__circle" cx="18" cy="18" r="11" :fill="badgeColor" />
    <text
      class="alpha-hex-triad-badge__text font-black text-[10px] font-sans select-none"
      x="18"
      y="21.5"
      text-anchor="middle"
      fill="#ffffff"
    >
      <tspan>
        <slot>{{ fallbackId }}</slot>
      </tspan>
    </text>
  </svg>
</template>
