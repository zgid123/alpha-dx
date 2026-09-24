<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  CIRCULAR_PYRAMID_ROOT_KEY,
  CIRCULAR_PYRAMID_STACK_KEY,
} from '../../../utils/pyramid/circular-pyramid';

defineOptions({
  name: 'CircularPyramidStackTitle',
});

export interface ICircularPyramidStackTitleProps {
  readonly step?: string | number;
  readonly title?: string;
  readonly color?: string;
  readonly minWidth?: number;
}

const props = withDefaults(defineProps<ICircularPyramidStackTitleProps>(), {
  step: undefined,
  title: undefined,
  color: undefined,
  minWidth: 150,
});

const rootContext = inject(CIRCULAR_PYRAMID_ROOT_KEY, undefined);
const stackContext = inject(CIRCULAR_PYRAMID_STACK_KEY, undefined);

const isActive = computed(() => {
  return stackContext?.isActive.value ?? false;
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

const palette = computed(() => {
  return rootContext?.palette.value;
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
    class="alpha-circular-pyramid-stack-title relative w-full flex items-center select-none"
    :class="[
      isActive
        ? 'alpha-circular-pyramid-stack-title--active'
        : 'alpha-circular-pyramid-stack-title--default',
    ]"
  >
    <!-- Pill Badge Container (min-width: 150px, max-width: whole spacing left leaving at least 30px before dot) -->
    <div
      class="alpha-circular-pyramid-stack-title__pill flex items-center gap-2 px-2.5 py-1 rounded-full transition-all duration-300 border flex-shrink-0"
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
      <!-- Circular Step Indicator (Badge using stack color) -->
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
    <!-- Scalable Line between Title and Dot (always at least 30px) -->
    <div
      class="alpha-circular-pyramid-stack-title__connector flex-1 flex items-center min-w-[30px] pointer-events-none"
    >
      <div
        class="alpha-circular-pyramid-stack-title__line flex-1 h-[1px] transition-colors duration-300"
        :style="{
          backgroundColor: stackColor,
          opacity: isActive ? 1 : 0.65,
        }"
      />
      <div
        class="alpha-circular-pyramid-stack-title__dot w-1.5 h-1.5 rounded-full flex-shrink-0 -ml-1 transition-all duration-300"
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
.alpha-circular-pyramid-stack-title {
  box-sizing: border-box;
}

.alpha-circular-pyramid-stack-title--active .alpha-circular-pyramid-stack-title__pill {
  backdrop-filter: blur(8px);
}
</style>
