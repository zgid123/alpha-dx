<script setup lang="ts">
import { computed, inject, onMounted, onUnmounted, ref } from 'vue';

import {
  CIRCULAR_PYRAMID_ROOT_KEY,
  CIRCULAR_PYRAMID_STACK_KEY,
} from '../../../utils/pyramid/circular-pyramid';
import { createPyramidConnectorPath } from '../../../utils/pyramid/shared';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  name: 'CircularPyramidStackContent',
  inheritAttrs: false,
});

export interface ICircularPyramidStackContentProps {
  readonly color?: string;
  readonly connectorWidth?: number;
}

const props = withDefaults(defineProps<ICircularPyramidStackContentProps>(), {
  color: undefined,
  connectorWidth: undefined,
});

const rootContext = inject(CIRCULAR_PYRAMID_ROOT_KEY, undefined);
const stackContext = inject(CIRCULAR_PYRAMID_STACK_KEY, undefined);

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

const isAnimated = computed(() => {
  return rootContext?.animation.value ?? false;
});

const stepIndex = computed(() => {
  return stackContext?.index.value ?? 0;
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
    {
      x: 0,
      y: 0,
    },
    {
      x: w,
      y: effectiveDeltaY.value,
    },
  );
});

const stackColor = computed(() => {
  return (
    props.color ??
    stackContext?.color?.value ??
    rootContext?.color.value ??
    'var(--alpha-circular-pyramid-stack-content-accent)'
  );
});

const { className, forwardedAttrs } = useMergedUnoAttrs(() => {
  return [
    'alpha-circular-pyramid-stack-content rounded-xl p-2 px-2.5 text-[10px] leading-snug transition-all duration-300 border select-none box-border shrink-0',
    isActive.value
      ? 'alpha-circular-pyramid-stack-content--active bg-(--alpha-circular-pyramid-stack-content-border-active) text-(--alpha-circular-pyramid-stack-content-active)'
      : 'alpha-circular-pyramid-stack-content--default bg-(--alpha-circular-pyramid-stack-content-border) text-(--alpha-circular-pyramid-stack-content)',
  ];
});
</script>

<template>
  <div
    class="alpha-circular-pyramid-stack-content-wrapper relative w-full flex items-center select-none overflow-visible"
    :style="{
      '--content-delay': `calc(var(--alpha-circular-pyramid-start-delay, 0ms) + ${470 + stepIndex * 320}ms)`,
    }"
  >
    <!-- Scalable Line between Dot and Content Card (always at least 20px) -->
    <div
      ref="connectorRef"
      class="alpha-circular-pyramid-stack-content__connector flex-1 flex items-center min-w-5 pointer-events-none relative overflow-visible h-0"
    >
      <div
        class="alpha-circular-pyramid-stack-content__dot absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-300 pointer-events-auto"
        :class="{
          'alpha-circular-pyramid-stack-content__dot--animated': isAnimated,
        }"
        :style="{
          backgroundColor: stackColor,
          boxShadow: isActive
            ? `0 0 6px ${stackColor}`
            : `0 0 2px color-mix(in srgb, ${stackColor} 50%, transparent)`,
        }"
      />
      <!-- Straight horizontal line when deltaY is 0 -->
      <div
        v-if="!effectiveDeltaY"
        class="alpha-circular-pyramid-stack-content__line absolute left-0 top-0 w-full h-px -translate-y-1/2 pointer-events-none transition-colors duration-300"
        :class="{
          'alpha-circular-pyramid-stack-content__line--animated': isAnimated,
        }"
        :style="{
          backgroundColor: stackColor,
          opacity: isActive ? 1 : 0.65,
        }"
      />
      <!-- Zigzag SVG connector when deltaY !== 0 -->
      <svg
        aria-hidden="true"
        v-else
        class="alpha-circular-pyramid-stack-content__line-svg absolute left-0 pointer-events-none overflow-visible"
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
          class="alpha-circular-pyramid-stack-content__line transition-all duration-300"
          :class="{
            'alpha-circular-pyramid-stack-content__line--svg-animated': isAnimated,
          }"
          :d="connectorPath"
          fill="none"
          :stroke="stackColor"
          stroke-width="1.25"
          stroke-linecap="round"
          stroke-linejoin="round"
          pathLength="1"
          :style="{
            opacity: isActive ? 1 : 0.65,
          }"
        />
      </svg>
    </div>
    <!-- Content Card -->
    <div
      v-bind="forwardedAttrs()"
      :class="
        className({
          'alpha-circular-pyramid-stack-content--animated': isAnimated,
        })
      "
      :style="{
        width: `${contentWidth}px`,
        minWidth: `${contentWidth}px`,
        maxWidth: `${contentWidth}px`,
        boxSizing: 'border-box',
        backgroundColor: isActive
          ? 'var(--alpha-circular-pyramid-stack-content-border-active)'
          : 'var(--alpha-circular-pyramid-stack-content-border)',
        color: isActive
          ? 'var(--alpha-circular-pyramid-stack-content-active)'
          : 'var(--alpha-circular-pyramid-stack-content)',
        borderColor: stackColor,
        boxShadow: isActive
          ? `0 4px 14px color-mix(in srgb, ${stackColor} 15%, transparent)`
          : 'none',
        '--card-transform': deltaY ? `translateY(${deltaY}px)` : 'none',
        transform: deltaY ? `translateY(${deltaY}px)` : undefined,
      }"
    >
      <p
        class="text-[10px] transition-colors duration-300 wrap-break-word line-clamp-3"
      >
        <slot />
      </p>
    </div>
  </div>
</template>

<style scoped>
.alpha-circular-pyramid-stack-content {
  box-sizing: border-box;
}

.alpha-circular-pyramid-stack-content--active {
  backdrop-filter: blur(8px);
}

.alpha-circular-pyramid-stack-content__dot--animated {
  animation: alpha-pyramid-dot-pop 120ms cubic-bezier(0.16, 1, 0.3, 1)
    var(--content-delay) both;
}

@keyframes alpha-pyramid-dot-pop {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

.alpha-circular-pyramid-stack-content__line--animated {
  transform-origin: left center;
  animation: alpha-pyramid-line-draw 500ms cubic-bezier(0.4, 0, 0.2, 1)
    calc(var(--content-delay) + 120ms) both;
}

@keyframes alpha-pyramid-line-draw {
  0% {
    opacity: 0;
    transform: translateY(-50%) scaleX(0);
  }
  2% {
    opacity: 1;
    transform: translateY(-50%) scaleX(0);
  }
  100% {
    opacity: 1;
    transform: translateY(-50%) scaleX(1);
  }
}

.alpha-circular-pyramid-stack-content__line--svg-animated {
  stroke-dasharray: 1;
  animation: alpha-pyramid-svg-line-draw 500ms cubic-bezier(0.4, 0, 0.2, 1)
    calc(var(--content-delay) + 120ms) both;
}

@keyframes alpha-pyramid-svg-line-draw {
  0% {
    opacity: 0;
    stroke-dashoffset: 1;
  }
  2% {
    opacity: 1;
    stroke-dashoffset: 1;
  }
  100% {
    opacity: 1;
    stroke-dashoffset: 0;
  }
}

.alpha-circular-pyramid-stack-content--animated {
  animation: alpha-pyramid-card-in 240ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--content-delay) + 380ms) both;
}

@keyframes alpha-pyramid-card-in {
  0% {
    opacity: 0;
    transform: var(--card-transform, none) translateX(10px);
  }
  100% {
    opacity: 1;
    transform: var(--card-transform, none) translateX(0);
  }
}
</style>
