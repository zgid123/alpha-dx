<script setup lang="ts">
import { computed, inject } from 'vue';

import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import { VERT_CARD_KEY } from '../../../utils/card/vertical-card';

defineOptions({
  inheritAttrs: false,
  name: 'VerticalCardIcon',
});

export interface IVerticalCardIconProps {
  /**
   * Optional icon class (e.g. 'i-carbon-search') or component.
   */
  readonly icon?: string | object;
  /**
   * Foreground icon color. Overrides context color.
   */
  readonly color?: string;
  /**
   * Circle size in pixels or CSS string.
   * @default 108
   */
  readonly size?: number | string;
}

const props = withDefaults(defineProps<IVerticalCardIconProps>(), {
  size: 108,
  icon: undefined,
  color: undefined,
});

const context = inject(VERT_CARD_KEY, undefined);

const customColor = computed(() => {
  return props.color ?? context?.color.value;
});

const customLightColor = computed(() => {
  if (customColor.value) {
    return `color-mix(in srgb, ${customColor.value} 16%, transparent)`;
  }

  return undefined;
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
  'alpha-vertical-card-icon rounded-full border-2 border-(--alpha-vertical-card-icon) bg-(--alpha-vertical-card-icon-bg) text-(--alpha-vertical-card-icon) flex items-center justify-center shrink-0 transition-transform duration-300 select-none',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      width: resolvedSize,
      height: resolvedSize,
      '--alpha-vertical-card-icon-bg': customLightColor,
      '--alpha-vertical-card-icon': customColor,
    }"
  >
    <slot>
      <component :is="props.icon" v-if="isComponentIcon" class="text-4xl" />
      <div
        v-else-if="isStringIcon && props.icon !== 'default'"
        :class="props.icon"
        class="text-4xl"
      />
      <!-- Default search icon matching the reference card -->
      <svg
        aria-hidden="true"
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
        <line
          x1="16.5"
          y1="16.5"
          x2="21"
          y2="21"
          stroke-width="3.2"
          stroke-linecap="round"
        />
      </svg>
    </slot>
  </div>
</template>
