<script setup lang="ts">
import { computed, useSlots } from 'vue';

import type { TGearTriadIcon } from '../../../../utils/gearTriad';

defineOptions({
  name: 'GearTriadIcon',
});

export interface IGearTriadIconProps {
  readonly size?: number;
  readonly color?: string;
  readonly strokeWidth?: number;
  readonly icon?: TGearTriadIcon;
}

const props = withDefaults(defineProps<IGearTriadIconProps>(), {
  size: 32,
  color: '#0f172a',
  strokeWidth: 2,
  icon: undefined,
});

const slots = useSlots();

const shouldRender = computed((): boolean => {
  if (props.icon === false) {
    return false;
  }
  return Boolean(props.icon || slots.default);
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
    v-if="shouldRender"
    class="alpha-gear-triad-icon flex items-center justify-center pointer-events-none select-none"
    :style="{
      color: props.color,
      width: `${props.size}px`,
      height: `${props.size}px`,
    }"
  >
    <slot>
      <!-- Custom Vue Component -->
      <component
        :is="props.icon"
        v-if="isComponentIcon"
        class="w-full h-full"
        :style="{ color: props.color }"
      />

      <!-- UnoCSS / Iconify class name (e.g. i-lucide-file-text) -->
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

      <!-- 01 Document with folded corner and lines (Option 1) -->
      <svg
        v-else-if="
          props.icon === 'document' ||
          props.icon === 'file' ||
          props.icon === 'file-text'
        "
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        :stroke-width="props.strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-full h-full"
      >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <line x1="10" y1="9" x2="8" y2="9" />
      </svg>

      <!-- 02 Shield with star (Option 2) -->
      <svg
        v-else-if="props.icon === 'shield' || props.icon === 'shield-star'"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        :stroke-width="props.strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-full h-full"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polygon
          points="12 8 13.3 11 16.5 11.3 14 13.5 14.8 16.7 12 15 9.2 16.7 10 13.5 7.5 11.3 10.7 11"
          stroke-width="1.5"
        />
      </svg>

      <!-- 03 Archive box with files poking out (Option 3) -->
      <svg
        v-else-if="
          props.icon === 'archive' ||
          props.icon === 'box' ||
          props.icon === 'package'
        "
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        :stroke-width="props.strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-full h-full"
      >
        <!-- Box body -->
        <path d="M4 11v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <!-- Lid rim -->
        <rect x="2" y="7" width="20" height="4" rx="1" />
        <!-- Center handle slot -->
        <line x1="10" y1="15" x2="14" y2="15" />
        <!-- Folders / papers peeking out top -->
        <path d="M7 7V4a1 1 0 0 1 1-1h4l2 2h3a1 1 0 0 1 1 1v1" stroke-width="1.5" />
      </svg>

      <!-- 04 Center Gear with 6 teeth and 3-spoke inner steering (Center Hub) -->
      <svg
        v-else-if="props.icon === 'gear' || props.icon === 'settings' || props.icon === 'cog'"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        :stroke-width="props.strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-full h-full"
      >
        <circle cx="12" cy="12" r="3" />
        <path
          d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"
        />
      </svg>
    </slot>
  </div>
</template>
