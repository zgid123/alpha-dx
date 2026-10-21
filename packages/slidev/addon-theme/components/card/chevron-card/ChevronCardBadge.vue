<script setup lang="ts">
import { computed, inject } from 'vue';

import { CHEVRON_CARD_KEY } from '../../../utils/card/chevron-card';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  name: 'ChevronCardBadge',
  inheritAttrs: false,
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

const customColor = computed(() => {
  return props.color ?? cardContext?.color.value;
});

const resolvedStep = computed(() => {
  return props.step ?? cardContext?.step.value ?? '01';
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-chevron-card-badge relative select-none shrink-0 flex items-center justify-center bg-(--alpha-chevron-card-badge-bg) text-(--alpha-chevron-card-badge-foreground)',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      width: `${props.width}px`,
      height: props.height
        ? typeof props.height === 'number'
          ? `${props.height}px`
          : props.height
        : '100%',
      '--alpha-chevron-card-badge-bg': customColor,
      clipPath: `polygon(0% 0%, calc(100% - ${props.notchDepth}px) 0%, 100% 50%, calc(100% - ${props.notchDepth}px) 100%, 0% 100%, ${props.notchDepth}px 50%)`,
    }"
  >
    <slot name="icon">
      <slot>
        <component
          :is="props.icon"
          v-if="typeof props.icon === 'object'"
          class="w-8 h-8"
        />
        <span
          v-else-if="typeof props.icon === 'string'"
          :class="[props.icon, 'text-3xl inline-block']"
        />
        <span
          v-else
          class="font-extrabold text-[32px] tracking-tight font-sans select-none"
        >
          {{ resolvedStep }}
        </span>
      </slot>
    </slot>
  </div>
</template>
