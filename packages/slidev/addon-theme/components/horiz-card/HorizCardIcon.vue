<script setup lang="ts">
import { computed, inject } from 'vue';

import { HORIZ_CARD_KEY, hexToRgba } from '../../utils/horizCard';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'HorizCardIcon',
});

export interface IHorizCardIconProps {
  /**
   * Optional icon class (e.g. 'i-carbon-search') or component.
   */
  readonly icon?: string | object;
  /**
   * Foreground icon color. Overrides context color.
   */
  readonly color?: string;
  /**
   * Circular background color. Overrides context lightColor.
   */
  readonly lightColor?: string;
  /**
   * Circle size in pixels or CSS string.
   * @default 96
   */
  readonly size?: number | string;
}

const props = withDefaults(defineProps<IHorizCardIconProps>(), {
  size: 96,
  icon: undefined,
  color: undefined,
  lightColor: undefined,
});

const context = inject(HORIZ_CARD_KEY, undefined);

const resolvedColor = computed(() => {
  return props.color ?? context?.color.value ?? '#ea583a';
});

const resolvedLightColor = computed(() => {
  if (props.lightColor) {
    return props.lightColor;
  }

  if (context?.lightColor.value) {
    return context.lightColor.value;
  }

  return hexToRgba({
    hex: resolvedColor.value,
    alpha: 0.16,
  });
});

const resolvedSize = computed(() => {
  if (typeof props.size === 'number') {
    return `${props.size}px`;
  }

  return props.size;
});

const isStringIcon = computed(() => typeof props.icon === 'string');
const isComponentIcon = computed(() => {
  return typeof props.icon === 'object' && props.icon !== null;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-horiz-card-icon rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 select-none',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      width: resolvedSize,
      height: resolvedSize,
      backgroundColor: resolvedLightColor,
      color: resolvedColor,
    }"
  >
    <slot>
      <component
        :is="props.icon"
        v-if="isComponentIcon"
        class="text-4xl"
        :style="{ color: resolvedColor }"
      />
      <div
        v-else-if="isStringIcon"
        :class="props.icon"
        class="text-4xl"
        :style="{ color: resolvedColor }"
      />
      <!-- Default search icon matching the reference card -->
      <svg
        v-else
        class="w-12 h-12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="21" y2="21" stroke-width="3" stroke-linecap="round" />
      </svg>
    </slot>
  </div>
</template>
