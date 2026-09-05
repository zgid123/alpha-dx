<script setup lang="ts">
import { computed } from 'vue';

import type { TQuadHubIcon } from '../../utils/quadHub';

defineOptions({
  name: 'QuadHubIcon',
});

export interface IQuadHubIconProps {
  readonly size?: number;
  readonly color?: string;
  readonly icon?: TQuadHubIcon;
}

const props = withDefaults(defineProps<IQuadHubIconProps>(), {
  size: 34,
  icon: undefined,
  color: '#ffffff',
});

const isStringIcon = computed((): boolean => {
  return typeof props.icon === 'string';
});

const isComponentIcon = computed((): boolean => {
  return typeof props.icon === 'object' && props.icon !== null;
});
</script>

<template>
  <div
    v-if="props.icon !== false"
    class="alpha-quad-hub-icon flex items-center justify-center pointer-events-none select-none"
    :style="{
      color: props.color,
      width: `${props.size}px`,
      height: `${props.size}px`,
      opacity: 0.82,
    }"
  >
    <slot>
      <component
        :is="props.icon"
        v-if="isComponentIcon"
        class="w-full h-full"
        :style="{ color: props.color }"
      />
      <!-- UnoCSS / Iconify class name (e.g. i-lucide-user) -->
      <span
        v-else-if="isStringIcon && (props.icon as string).includes('-')"
        :class="props.icon"
        class="inline-block"
        :style="{
          color: props.color,
          width: `${props.size}px`,
          height: `${props.size}px`,
          fontSize: `${props.size}px`,
        }"
      />
      <!-- 01 User Silhouette (matching design) -->
      <svg
        v-else-if="props.icon === 'user'"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-full h-full"
      >
        <circle cx="12" cy="7" r="4.2" />
        <path d="M4 19.8c0-4.4 3.6-7.8 8-7.8s8 3.4 8 7.8v0.2H4v-0.2z" />
      </svg>
      <!-- 02 Academic / Mortarboard (matching design) -->
      <svg
        v-else-if="props.icon === 'academic' || props.icon === 'grad'"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-full h-full"
      >
        <path d="M12 4L1.5 9.5 12 15l10-5.5L12 4z" />
        <path d="M6 13v4c0 2.2 2.7 4 6 4s6-1.8 6-4v-4l-6 3.2-6-3.2z" />
        <path d="M21.5 10.2v5.3h1v-5.8l-1 0.5z" />
      </svg>
      <!-- 03 Briefcase (matching design) -->
      <svg
        v-else-if="props.icon === 'briefcase' || props.icon === 'portfolio'"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-full h-full"
      >
        <path
          d="M9 5h6a1.5 1.5 0 00-1.5-1.5h-3A1.5 1.5 0 009 5zM4 7a2 2 0 00-2 2v2.5c1.2.7 2.8 1.1 4.5 1.3V11.5h11V13c1.7-.2 3.3-.6 4.5-1.3V9a2 2 0 00-2-2H4zm18 7.3c-1.3.8-3.4 1.3-5.5 1.5V17h-9v-1.2c-2.1-.2-4.2-.7-5.5-1.5V18a2 2 0 002 2h16a2 2 0 002-2v-3.7z"
        />
      </svg>
      <!-- 04 Target / Bullseye with Dart (matching design) -->
      <svg
        v-else-if="props.icon === 'target' || props.icon === 'bullseye'"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-full h-full"
      >
        <circle cx="10" cy="14" r="7.5" stroke-width="1.8" />
        <circle cx="10" cy="14" r="4.2" stroke-width="1.8" />
        <circle cx="10" cy="14" r="1.5" fill="currentColor" stroke="none" />
        <path d="M15 9l6-6" stroke-width="2" />
        <path d="M18 3h3v3" stroke-width="2" stroke-linejoin="miter" />
        <path d="M15 6l3 3" stroke-width="1.6" />
      </svg>
    </slot>
  </div>
</template>
