<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue';

import { createPyramidConnectorPath } from '../../../utils/pyramid/shared';
import {
  SQUARE_PYRAMID_ROOT_KEY,
  SQUARE_PYRAMID_STACK_KEY,
} from '../../../utils/pyramid/square-pyramid';

defineOptions({
  name: 'SquarePyramidStackContent',
});

export interface ISquarePyramidStackContentProps {
  readonly content?: string;
  readonly color?: string;
  readonly connectorWidth?: number;
}

const props = withDefaults(defineProps<ISquarePyramidStackContentProps>(), {
  content: undefined,
  color: undefined,
  connectorWidth: undefined,
});

const rootContext = inject(SQUARE_PYRAMID_ROOT_KEY, undefined);
const stackContext = inject(SQUARE_PYRAMID_STACK_KEY, undefined);

const connectorRef = ref<HTMLElement | null>(null);
const measuredConnectorWidth = ref<number>(0);

let resizeObserver: ResizeObserver | null = null;

function updateWidth(): void {
  if (connectorRef.value && connectorRef.value.clientWidth > 0) {
    measuredConnectorWidth.value = connectorRef.value.clientWidth;
  }
}

onMounted(() => {
  updateWidth();
  if (typeof ResizeObserver !== 'undefined' && connectorRef.value) {
    resizeObserver = new ResizeObserver(updateWidth);
    resizeObserver.observe(connectorRef.value);
  }
});

onUnmounted(() => {
  resizeObserver?.disconnect();
});

const isActive = computed(() => {
  return stackContext?.isActive.value ?? false;
});

const contentWidth = computed(() => rootContext?.contentWidthPx.value ?? 240);

const deltaY = computed(() => {
  if (stackContext?.deltaY?.value !== undefined) {
    return stackContext.deltaY.value;
  }
  const idx = stackContext?.index.value ?? 0;
  return rootContext?.getCardDeltaY?.(idx) ?? 0;
});

const effectiveDeltaY = computed(() => deltaY.value ?? 0);

const connectorWidth = computed(() => {
  if (props.connectorWidth !== undefined) {
    return props.connectorWidth;
  }
  if (stackContext?.connectorWidth?.value !== undefined) {
    return stackContext.connectorWidth.value;
  }
  return measuredConnectorWidth.value || 40;
});

const svgMargin = 4;
const svgHeight = computed(() => {
  return Math.max(8, Math.abs(effectiveDeltaY.value) + svgMargin * 2);
});

const svgMinY = computed(() => {
  return Math.min(0, effectiveDeltaY.value) - svgMargin;
});

const svgTop = computed(() => {
  return Math.min(0, effectiveDeltaY.value) - svgMargin;
});

const connectorPath = computed(() => {
  const w = connectorWidth.value;
  return createPyramidConnectorPath(
    { x: 0, y: 0 },
    { x: w, y: effectiveDeltaY.value },
  );
});

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
  <div class="alpha-square-pyramid-stack-content-wrapper relative w-full flex items-center select-none overflow-visible">
    <!-- Scalable Line between Dot and Content Card (always at least 20px) -->
    <div
      ref="connectorRef"
      class="alpha-square-pyramid-stack-content__connector flex-1 flex items-center min-w-[20px] pointer-events-none relative overflow-visible h-0"
    >
      <div
        class="alpha-square-pyramid-stack-content__dot absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300 pointer-events-auto"
        :style="{
          backgroundColor: stackColor,
          boxShadow: isActive
            ? `0 0 6px ${stackColor}`
            : `0 0 2px ${stackColor}80`,
        }"
      />
      <!-- Straight horizontal line when deltaY is 0 -->
      <div
        v-if="!effectiveDeltaY"
        class="alpha-square-pyramid-stack-content__line absolute left-0 top-0 w-full h-[1px] -translate-y-1/2 pointer-events-none transition-colors duration-300"
        :style="{
          backgroundColor: stackColor,
          opacity: isActive ? 1 : 0.65,
        }"
      />
      <!-- Zigzag SVG connector when deltaY !== 0 -->
      <svg
        v-else
        class="alpha-square-pyramid-stack-content__line-svg absolute left-0 pointer-events-none overflow-visible"
        :width="connectorWidth"
        :height="svgHeight"
        :viewBox="`0 ${svgMinY} ${connectorWidth} ${svgHeight}`"
        :style="{
          top: `${svgTop}px`,
          width: `${connectorWidth}px`,
          height: `${svgHeight}px`,
        }"
      >
        <path
          class="alpha-square-pyramid-stack-content__line transition-all duration-300"
          :d="connectorPath"
          fill="none"
          :stroke="stackColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
          :style="{
            opacity: isActive ? 1 : 0.65,
          }"
        />
      </svg>
    </div>
    <!-- Content Card -->
    <div
      class="alpha-square-pyramid-stack-content rounded-xl p-2 px-2.5 transition-all duration-300 border select-none box-border flex-shrink-0"
      :class="[
        isActive
          ? 'alpha-square-pyramid-stack-content--active'
          : 'alpha-square-pyramid-stack-content--default',
      ]"
      :style="{
        width: `${contentWidth}px`,
        minWidth: `${contentWidth}px`,
        maxWidth: `${contentWidth}px`,
        boxSizing: 'border-box',
        borderColor: stackColor,
        backgroundColor: isActive
          ? 'rgba(255, 255, 255, 0.95)'
          : 'rgba(255, 255, 255, 0.85)',
        boxShadow: isActive
          ? `0 4px 14px ${stackColor}26`
          : 'none',
        transform: deltaY ? `translateY(${deltaY}px)` : undefined,
      }"
    >
      <div
        class="text-[10px] leading-snug transition-colors duration-300 break-words line-clamp-3"
        :style="{
          color: isActive ? '#0f172a' : '#475569',
        }"
      >
        <slot>{{ props.content }}</slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alpha-square-pyramid-stack-content {
  box-sizing: border-box;
}

.alpha-square-pyramid-stack-content--active {
  backdrop-filter: blur(8px);
}
</style>
