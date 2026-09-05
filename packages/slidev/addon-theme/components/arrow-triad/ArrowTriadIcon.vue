<script setup lang="ts">
import { computed } from 'vue';

defineOptions({
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
  color: '#334155',
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
</script>

<template>
  <div
    v-if="hasIcon"
    class="alpha-arrow-triad-icon flex items-center justify-center pointer-events-none select-none"
    :style="{
      color: props.color,
      width: `${props.size}px`,
      height: `${props.size}px`,
    }"
  >
    <slot>
      <component
        :is="props.icon"
        v-if="isComponentIcon"
        class="w-full h-full"
        :style="{ color: props.color }"
      />
      <!-- UnoCSS / Iconify class name (e.g. i-carbon-shield-check or carbon:shield-check) -->
      <span
        v-else-if="isStringIcon && resolvedIconClass"
        :class="resolvedIconClass"
        class="inline-block"
        :style="{
          color: props.color,
          width: `${props.size}px`,
          height: `${props.size}px`,
          fontSize: `${props.size}px`,
        }"
      />
      <span
        v-else-if="isStringIcon"
        class="inline-block font-semibold"
        :style="{
          color: props.color,
          fontSize: `${props.size * 0.75}px`,
        }"
      >
        {{ props.icon }}
      </span>
    </slot>
  </div>
</template>
