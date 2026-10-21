<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  SQUARE_PYRAMID_ROOT_KEY,
  SQUARE_PYRAMID_STACK_KEY,
} from '../../../utils/pyramid/square-pyramid';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  name: 'SquarePyramidStackHeading',
  inheritAttrs: false,
});

export interface ISquarePyramidStackHeadingProps {
  readonly step?: string | number;
  readonly color?: string;
  readonly minWidth?: number;
}

const props = withDefaults(defineProps<ISquarePyramidStackHeadingProps>(), {
  step: undefined,
  color: undefined,
  minWidth: 150,
});

const rootContext = inject(SQUARE_PYRAMID_ROOT_KEY, undefined);
const stackContext = inject(SQUARE_PYRAMID_STACK_KEY, undefined);

const isActive = computed(() => {
  return stackContext?.isActive.value ?? false;
});

const isAnimated = computed(() => {
  return rootContext?.animation.value ?? false;
});

const stepIndex = computed(() => {
  return stackContext?.index.value ?? 0;
});

const resolvedStep = computed(() => {
  if (props.step !== undefined) {
    return props.step;
  }

  if (stackContext?.step.value !== undefined) {
    return stackContext.step.value;
  }

  return '01';
});

const minPillWidth = computed(() => props.minWidth ?? 150);

const stackColor = computed(() => {
  return (
    props.color ??
    stackContext?.color?.value ??
    rootContext?.color.value ??
    'var(--alpha-square-pyramid-stack-heading-accent)'
  );
});

const { className, forwardedAttrs } = useMergedUnoAttrs(() => [
  'alpha-square-pyramid-stack-heading__pill flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold tracking-tight leading-tight transition-all duration-300 border shrink-0',
  isActive.value
    ? 'bg-(--alpha-square-pyramid-stack-heading-border-active) text-(--alpha-square-pyramid-stack-heading-active)'
    : 'bg-(--alpha-square-pyramid-stack-heading-border) text-(--alpha-square-pyramid-stack-heading)',
]);
</script>

<template>
  <div
    class="alpha-square-pyramid-stack-heading relative w-full flex items-center select-none"
    :class="[
      isActive
        ? 'alpha-square-pyramid-stack-heading--active'
        : 'alpha-square-pyramid-stack-heading--default',
    ]"
    :style="{
      '--title-delay': `calc(var(--alpha-square-pyramid-start-delay, 0ms) + ${460 + stepIndex * 320}ms)`,
    }"
  >
    <!-- Pill Badge Container -->
    <div
      v-bind="forwardedAttrs()"
      :class="
        className({
          'alpha-square-pyramid-stack-heading__pill--animated': isAnimated,
        })
      "
      :style="{
        minWidth: `${minPillWidth}px`,
        maxWidth: 'calc(100% - 30px)',
        width: 'fit-content',
        boxSizing: 'border-box',
        borderColor: stackColor,
        boxShadow: isActive
          ? `0 4px 14px color-mix(in srgb, ${stackColor} 15%, transparent)`
          : 'none',
      }"
    >
      <!-- Circular Step Indicator -->
      <div
        class="w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-bold tracking-tight text-(--alpha-square-pyramid-stack-heading-number) transition-all duration-300 shrink-0"
        :style="{
          backgroundColor: stackColor,
        }"
      >
        <slot name="step">{{ resolvedStep }}</slot>
      </div>
      <!-- Title Text -->
      <h4
        class="text-xs font-semibold tracking-tight leading-tight transition-colors duration-300 pr-1 truncate flex-1"
      >
        <slot>{{ '' }}</slot>
      </h4>
    </div>
    <!-- Scalable Line between Title and Dot -->
    <div
      class="alpha-square-pyramid-stack-heading__connector flex-1 flex items-center min-w-7.5 pointer-events-none"
    >
      <div
        class="alpha-square-pyramid-stack-heading__line flex-1 h-px transition-colors duration-300"
        :class="{
          'alpha-square-pyramid-stack-heading__line--animated': isAnimated,
        }"
        :style="{
          backgroundColor: stackColor,
          opacity: isActive ? 1 : 0.65,
        }"
      />
      <div
        class="alpha-square-pyramid-stack-heading__dot w-1.5 h-1.5 rounded-full shrink-0 -ml-1 transition-all duration-300"
        :class="{
          'alpha-square-pyramid-stack-heading__dot--animated': isAnimated,
        }"
        :style="{
          backgroundColor: stackColor,
          boxShadow: isActive
            ? `0 0 6px ${stackColor}`
            : `0 0 2px color-mix(in srgb, ${stackColor} 50%, transparent)`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.alpha-square-pyramid-stack-heading {
  box-sizing: border-box;
}

.alpha-square-pyramid-stack-heading--active
  .alpha-square-pyramid-stack-heading__pill {
  backdrop-filter: blur(8px);
}

.alpha-square-pyramid-stack-heading__dot--animated {
  animation: alpha-pyramid-title-dot-pop 120ms cubic-bezier(0.16, 1, 0.3, 1)
    var(--title-delay) both;
}

@keyframes alpha-pyramid-title-dot-pop {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

.alpha-square-pyramid-stack-heading__line--animated {
  transform-origin: right center;
  animation: alpha-pyramid-title-line-draw 500ms cubic-bezier(0.4, 0, 0.2, 1)
    calc(var(--title-delay) + 120ms) both;
}

@keyframes alpha-pyramid-title-line-draw {
  0% {
    opacity: 0;
    transform: scaleX(0);
  }
  2% {
    opacity: 1;
    transform: scaleX(0);
  }
  100% {
    opacity: 1;
    transform: scaleX(1);
  }
}

.alpha-square-pyramid-stack-heading__pill--animated {
  animation: alpha-pyramid-title-pill-in 240ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--title-delay) + 380ms) both;
}

@keyframes alpha-pyramid-title-pill-in {
  0% {
    opacity: 0;
    transform: translateX(-10px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
