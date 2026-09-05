<script setup lang="ts">
import { computed, useSlots } from 'vue';

defineOptions({
  name: 'ArcArrowProcessIcon',
});

export interface IArcArrowProcessIconProps {
  readonly size?: number;
  readonly color?: string;
  readonly icon?: string | object | false;
}

const props = withDefaults(defineProps<IArcArrowProcessIconProps>(), {
  size: 36,
  icon: undefined,
  color: '#888d94',
});

const slots = useSlots();

const isStringIcon = computed((): boolean => {
  return typeof props.icon === 'string';
});

const isComponentIcon = computed((): boolean => {
  return typeof props.icon === 'object' && props.icon !== null;
});

const hasIcon = computed((): boolean => {
  if (props.icon === false || props.icon === 'false') {
    return false;
  }

  return Boolean(slots.default) || (Boolean(props.icon) && props.icon !== '');
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

  return str;
});

const isFolder = computed((): boolean => {
  return props.icon === 'folder';
});

const isInbox = computed((): boolean => {
  return props.icon === 'inbox';
});

const isBriefcase = computed((): boolean => {
  return props.icon === 'briefcase';
});
</script>

<template>
  <div
    v-if="hasIcon"
    class="alpha-arc-arrow-process-icon flex items-center justify-center shrink-0 pointer-events-none select-none opacity-85"
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
      <!-- Built-in Folder Outline Icon matching design reference -->
      <svg
        v-else-if="isFolder"
        class="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
      </svg>
      <!-- Built-in Inbox/Tray Outline Icon matching design reference -->
      <svg
        v-else-if="isInbox"
        class="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M12 3v10" />
        <path d="m8 9 4 4 4-4" />
        <path d="M3 14h5.2a2 2 0 0 1 1.6.8l1.2 1.6c.4.6 1 .9 1.8.9h0c.8 0 1.4-.3 1.8-.9l1.2-1.6a2 2 0 0 1 1.6-.8H21v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Z" />
      </svg>
      <!-- Built-in Briefcase Outline Icon matching design reference -->
      <svg
        v-else-if="isBriefcase"
        class="w-full h-full"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <path d="M11 12h2" />
      </svg>
      <!-- UnoCSS / Custom class icon -->
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
      <!-- Text fallback -->
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
