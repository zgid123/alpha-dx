<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  SQUARE_PYRAMID_ROOT_KEY,
  SQUARE_PYRAMID_STACK_KEY,
} from '../../../utils/pyramid/square-pyramid';

defineOptions({
  name: 'SquarePyramidStackTitle',
});

export interface ISquarePyramidStackTitleProps {
  readonly step?: string | number;
  readonly title?: string;
  readonly color?: string;
  readonly minWidth?: number;
}

const props = withDefaults(defineProps<ISquarePyramidStackTitleProps>(), {
  step: undefined,
  title: undefined,
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
    '#3b82f6'
  );
});
</script>

<template>
  <div
    class="alpha-square-pyramid-stack-title relative w-full flex items-center select-none"
    :class="[
      isActive
        ? 'alpha-square-pyramid-stack-title--active'
        : 'alpha-square-pyramid-stack-title--default',
    ]"
    :style="{
      '--title-delay': `calc(var(--square-pyramid-start-delay, 0ms) + ${460 + stepIndex * 320}ms)`,
    }"
  >
    <!-- Pill Badge Container -->
    <div
      class="alpha-square-pyramid-stack-title__pill flex items-center gap-2 px-2.5 py-1 rounded-full transition-all duration-300 border flex-shrink-0"
      :class="{
        'alpha-square-pyramid-stack-title__pill--animated': isAnimated,
      }"
      :style="{
        minWidth: `${minPillWidth}px`,
        maxWidth: 'calc(100% - 30px)',
        width: 'fit-content',
        boxSizing: 'border-box',
        borderColor: stackColor,
        backgroundColor: isActive
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 255, 255, 0.85)',
        boxShadow: isActive
          ? `0 4px 14px ${stackColor}26`
          : 'none',
      }"
    >
      <!-- Circular Step Indicator -->
      <div
        class="w-5.5 h-5.5 rounded-full flex items-center justify-center text-[10px] font-bold tracking-tight transition-all duration-300 flex-shrink-0"
        :style="{
          backgroundColor: stackColor,
          color: '#ffffff',
        }"
      >
        <slot name="step">{{ resolvedStep }}</slot>
      </div>
      <!-- Title Text -->
      <span
        class="text-xs font-semibold tracking-tight transition-colors duration-300 pr-1 truncate flex-1 leading-tight"
        :style="{
          color: isActive ? '#0f172a' : '#334155',
        }"
      >
        <slot>{{ props.title }}</slot>
      </span>
    </div>
    <!-- Scalable Line between Title and Dot -->
    <div
      class="alpha-square-pyramid-stack-title__connector flex-1 flex items-center min-w-[30px] pointer-events-none"
    >
      <div
        class="alpha-square-pyramid-stack-title__line flex-1 h-[1px] transition-colors duration-300"
        :class="{
          'alpha-square-pyramid-stack-title__line--animated': isAnimated,
        }"
        :style="{
          backgroundColor: stackColor,
          opacity: isActive ? 1 : 0.65,
        }"
      />
      <div
        class="alpha-square-pyramid-stack-title__dot w-1.5 h-1.5 rounded-full flex-shrink-0 -ml-1 transition-all duration-300"
        :class="{
          'alpha-square-pyramid-stack-title__dot--animated': isAnimated,
        }"
        :style="{
          backgroundColor: stackColor,
          boxShadow: isActive
            ? `0 0 6px ${stackColor}`
            : `0 0 2px ${stackColor}80`,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.alpha-square-pyramid-stack-title {
  box-sizing: border-box;
}

.alpha-square-pyramid-stack-title--active .alpha-square-pyramid-stack-title__pill {
  backdrop-filter: blur(8px);
}

.alpha-square-pyramid-stack-title__dot--animated {
  animation: alpha-pyramid-title-dot-pop 120ms cubic-bezier(0.16, 1, 0.3, 1) var(--title-delay) both;
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

.alpha-square-pyramid-stack-title__line--animated {
  transform-origin: right center;
  animation: alpha-pyramid-title-line-draw 500ms cubic-bezier(0.4, 0, 0.2, 1) calc(var(--title-delay) + 120ms) both;
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

.alpha-square-pyramid-stack-title__pill--animated {
  animation: alpha-pyramid-title-pill-in 240ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--title-delay) + 380ms) both;
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
