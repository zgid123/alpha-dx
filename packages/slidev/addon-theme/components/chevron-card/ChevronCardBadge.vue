<script setup lang="ts">
import { computed, inject } from 'vue';

import { CHEVRON_CARD_KEY } from '../../utils/chevronCard';

defineOptions({
  name: 'ChevronCardBadge',
});

export interface IChevronCardBadgeProps {
  readonly step?: string | number;
  readonly icon?: string | object;
  readonly color?: string;
  readonly width?: number;
  readonly height?: number | string;
  readonly notchDepth?: number;
}

const props = withDefaults(defineProps<IChevronCardBadgeProps>(), {
  step: undefined,
  icon: undefined,
  color: undefined,
  width: 130,
  height: undefined,
  notchDepth: 26,
});

const cardContext = inject(CHEVRON_CARD_KEY, undefined);

const resolvedColor = computed(() => {
  return props.color ?? cardContext?.color.value ?? '#f59e0b';
});

const resolvedStep = computed(() => {
  return props.step ?? cardContext?.step.value ?? '01';
});
</script>

<template>
  <div
    class="alpha-chevron-card-badge relative select-none flex-shrink-0 flex items-center justify-center text-white"
    :style="{
      width: `${props.width}px`,
      height: props.height
        ? typeof props.height === 'number'
          ? `${props.height}px`
          : props.height
        : '100%',
      backgroundColor: resolvedColor,
      clipPath: `polygon(0% 0%, calc(100% - ${props.notchDepth}px) 0%, 100% 50%, calc(100% - ${props.notchDepth}px) 100%, 0% 100%, ${props.notchDepth}px 50%)`,
    }"
  >
    <slot name="icon">
      <slot>
        <component
          :is="props.icon"
          v-if="typeof props.icon === 'object'"
          class="w-8 h-8 text-white"
        />
        <span
          v-else-if="typeof props.icon === 'string'"
          :class="[props.icon, 'text-3xl text-white inline-block']"
        />
        <span
          v-else
          class="font-extrabold text-[32px] tracking-tight font-sans select-none"
          style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
        >
          {{ resolvedStep }}
        </span>
      </slot>
    </slot>
  </div>
</template>
