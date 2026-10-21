<script setup lang="ts">
import { computed } from 'vue';

import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArrowTriadIcon',
});

export interface IArrowTriadIconProps {
  readonly size?: number;
  readonly color?: string;
  readonly icon?: string | object | false;
}

const props = withDefaults(defineProps<IArrowTriadIconProps>(), {
  size: 32,
  icon: undefined,
  color: undefined,
});

const isStringIcon = computed((): boolean => {
  return typeof props.icon === 'string';
});

const isComponentIcon = computed((): boolean => {
  return typeof props.icon === 'object' && props.icon !== null;
});

const hasIcon = computed((): boolean => {
  return Boolean(props.icon) && props.icon !== 'false' && props.icon !== '';
});

const resolvedIconClass = computed((): string => {
  if (typeof props.icon !== 'string') {
    return '';
  }

  const str = props.icon.trim();

  if (str.startsWith('i-')) {
    return str;
  }

  if (str.includes(':')) {
    return `i-${str.replace(':', '-')}`;
  }

  if (str.includes('-')) {
    return `i-${str}`;
  }

  return str;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arrow-triad-icon flex items-center justify-center text-(--alpha-arrow-triad-icon) pointer-events-none select-none',
);
</script>

<template>
  <div
    v-if="hasIcon"
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      width: `${props.size}px`,
      height: `${props.size}px`,
      ...(props.color ? { '--alpha-arrow-triad-icon': props.color } : {}),
    }"
  >
    <slot>
      <component
        :is="props.icon"
        v-if="isComponentIcon"
        class="w-full h-full text-current"
      />
      <!-- UnoCSS / Iconify class name (e.g. i-carbon-shield-check or carbon:shield-check) -->
      <span
        v-else-if="isStringIcon && resolvedIconClass"
        :class="resolvedIconClass"
        class="inline-block text-current"
        :style="{
          width: `${props.size}px`,
          height: `${props.size}px`,
          fontSize: `${props.size}px`,
        }"
      />
      <span
        v-else-if="isStringIcon"
        class="inline-block font-semibold text-current"
        :style="{
          fontSize: `${props.size * 0.75}px`,
        }"
      >
        {{ props.icon }}
      </span>
    </slot>
  </div>
</template>
