<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  provide,
  ref,
  useSlots,
  type VNode,
} from 'vue';

import {
  ARC_COMPARISON_ROOT_KEY,
  createArcComparisonGeometry,
} from '../../../utils/arcComparison';
import { useDiagramAutoScale } from '../../../utils/useDiagramAutoScale';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import ArcComparisonLeft from './ArcComparisonLeft.vue';
import ArcComparisonRight from './ArcComparisonRight.vue';

defineOptions({
  name: 'ArcComparison',
  inheritAttrs: false,
});

export interface IArcComparisonProps {
  readonly vsText?: string;
  readonly vsSize?: number;
  readonly count?: number;
  readonly hubRadius?: number;
  readonly arcRadius?: number;
  readonly arcOffset?: number;
  readonly animation?: boolean;
  readonly height?: number | string;
  readonly startDelay?: number;
  readonly active?: boolean;
  readonly scale?: number;
  readonly autoScale?: boolean;
  readonly maxScale?: number;
  readonly hidePagy?: boolean;
}

const props = withDefaults(defineProps<IArcComparisonProps>(), {
  vsText: 'Vs',
  vsSize: 14,
  count: undefined,
  hubRadius: undefined,
  arcRadius: undefined,
  arcOffset: undefined,
  animation: true,
  height: undefined,
  startDelay: undefined,
  active: undefined,
  scale: undefined,
  autoScale: true,
  maxScale: undefined,
  hidePagy: undefined,
});

const slots = useSlots();
const rootRef = ref<HTMLElement | null>(null);

const shiftingIntro = inject<
  | {
      active: ComputedRef<boolean>;
      isShifting?: ComputedRef<boolean>;
    }
  | undefined
>('SLIDEV_LAYOUT_SHIFTING_INTRO', undefined);

const isAnimated = computed(() => {
  if (!props.animation) {
    return false;
  }

  if (props.active !== undefined) {
    return props.active;
  }

  if (shiftingIntro) {
    return shiftingIntro.active.value;
  }

  return true;
});

const resolvedStartDelay = computed(() => {
  if (props.startDelay !== undefined) {
    return props.startDelay;
  }

  if (shiftingIntro) {
    return shiftingIntro.isShifting?.value ? 500 : 0;
  }

  return 0;
});

function isSignificantNode(node: VNode): boolean {
  if (typeof node.type === 'symbol') {
    if (typeof node.children === 'string' && !node.children.trim()) {
      return false;
    }
  }

  if (typeof node.children === 'string' && !node.children.trim()) {
    return false;
  }

  return true;
}

function flattenVNodes(nodes: VNode[]): VNode[] {
  const result: VNode[] = [];

  for (const node of nodes) {
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flattenVNodes(node.children as VNode[]));
    } else if (isSignificantNode(node)) {
      result.push(node);
    }
  }

  return result;
}

const defaultNodes = computed(() => {
  if (!slots.default) {
    return [];
  }

  return flattenVNodes(slots.default());
});

const resolvedCount = computed(() => {
  if (props.count === 4 || (props.count as unknown) === '4') {
    return 4;
  }

  for (const node of defaultNodes.value) {
    if (node.props?.count === 4 || (node.props?.count as unknown) === '4') {
      return 4;
    }
  }

  return 3;
});

const geo = computed(() => {
  return createArcComparisonGeometry({
    viewBoxWidth: 1000,
    viewBoxHeight: 480,
    hubRadius: props.hubRadius,
    arcRadius: props.arcRadius,
    arcOffset: props.arcOffset,
    pointsCount: resolvedCount.value,
  });
});

provide(ARC_COMPARISON_ROOT_KEY, {
  animation: isAnimated,
  startDelay: resolvedStartDelay,
  pointsCount: resolvedCount,
  geo,
});

const { resolvedScale, containerHeight } = useDiagramAutoScale({
  rootRef,
  baseWidth: 1000,
  baseHeight: 480,
  scale: () => props.scale,
  autoScale: () => props.autoScale,
  maxScale: () => props.maxScale,
  height: () => props.height,
});

const stageTransform = computed(() => {
  if (resolvedScale.value !== 1) {
    return `scale(${resolvedScale.value})`;
  }

  return undefined;
});

const resolvedHeightStyle = computed(() => {
  if (props.height !== undefined) {
    return typeof props.height === 'number'
      ? `${props.height}px`
      : props.height;
  }

  if (containerHeight.value > 0) {
    return `${containerHeight.value}px`;
  }

  return undefined;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-comparison w-full flex-1 flex flex-col items-center justify-center select-none font-sans relative min-h-0',
);
</script>

<template>
  <div
    ref="rootRef"
    v-bind="forwardedAttrs()"
    :class="[
      className(),
      { 'hide-pagy': props.hidePagy },
    ]"
    :data-hide-pagy="props.hidePagy ? '' : undefined"
    :style="{
      height: resolvedHeightStyle,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
      '--arc-comparison-start-delay': `${resolvedStartDelay}ms`,
    }"
  >
    <!-- Relative stage container -->
    <div
      class="alpha-arc-comparison__stage relative w-[1000px] h-[480px] flex items-center justify-center overflow-visible flex-shrink-0"
      :style="{
        transform: stageTransform,
        transformOrigin: 'center center',
      }"
    >
      <!-- Base SVG Layer -->
      <svg
        class="alpha-arc-comparison__svg absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 1000 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Center Divider Line -->
        <line
          class="alpha-arc-comparison__divider transition-colors duration-300 dark:stroke-slate-700"
          :class="{ 'alpha-arc-comparison--animated': isAnimated }"
          :x1="geo.dividerLine.x"
          :y1="geo.dividerLine.y1"
          :x2="geo.dividerLine.x"
          :y2="geo.dividerLine.y2"
          stroke="#cbd5e1"
          stroke-width="1.5"
        />
        <!-- Left Semicircular Hub Background -->
        <g
          class="alpha-arc-comparison__hub alpha-arc-comparison__hub--left"
          :class="{ 'alpha-arc-comparison--animated': isAnimated }"
        >
          <path
            :d="geo.left.hubPath"
            fill="#f1f3f6"
            class="transition-colors duration-300 dark:fill-slate-800/80"
          />
        </g>
        <!-- Left Arc Guide Line and End Dots -->
        <g
          class="alpha-arc-comparison__arc alpha-arc-comparison__arc--left"
          :class="{ 'alpha-arc-comparison--animated': isAnimated }"
        >
          <path
            :d="geo.left.arcPath"
            fill="none"
            stroke="#cbd5e1"
            stroke-width="1.5"
            class="transition-colors duration-300 dark:stroke-slate-700"
          />
          <circle
            :cx="geo.left.topDot.x"
            :cy="geo.left.topDot.y"
            :r="geo.left.dotRadius"
            fill="#94a3b8"
            class="dark:fill-slate-600"
          />
          <circle
            :cx="geo.left.bottomDot.x"
            :cy="geo.left.bottomDot.y"
            :r="geo.left.dotRadius"
            fill="#94a3b8"
            class="dark:fill-slate-600"
          />
        </g>
        <!-- Right Semicircular Hub Background -->
        <g
          class="alpha-arc-comparison__hub alpha-arc-comparison__hub--right"
          :class="{ 'alpha-arc-comparison--animated': isAnimated }"
        >
          <path
            :d="geo.right.hubPath"
            fill="#f1f3f6"
            class="transition-colors duration-300 dark:fill-slate-800/80"
          />
        </g>
        <!-- Right Arc Guide Line and End Dots -->
        <g
          class="alpha-arc-comparison__arc alpha-arc-comparison__arc--right"
          :class="{ 'alpha-arc-comparison--animated': isAnimated }"
        >
          <path
            :d="geo.right.arcPath"
            fill="none"
            stroke="#cbd5e1"
            stroke-width="1.5"
            class="transition-colors duration-300 dark:stroke-slate-700"
          />
          <circle
            :cx="geo.right.topDot.x"
            :cy="geo.right.topDot.y"
            :r="geo.right.dotRadius"
            fill="#94a3b8"
            class="dark:fill-slate-600"
          />
          <circle
            :cx="geo.right.bottomDot.x"
            :cy="geo.right.bottomDot.y"
            :r="geo.right.dotRadius"
            fill="#94a3b8"
            class="dark:fill-slate-600"
          />
        </g>
        <!-- Center "Vs" Circle Badge -->
        <g
          class="alpha-arc-comparison__vs"
          :class="{ 'alpha-arc-comparison--animated': isAnimated }"
        >
          <circle
            :cx="geo.vsCenter.x"
            :cy="geo.vsCenter.y"
            :r="geo.vsRadius"
            fill="#ffffff"
            stroke="#cbd5e1"
            stroke-width="2"
            class="transition-colors duration-300 dark:fill-slate-100 dark:stroke-slate-300"
            style="filter: drop-shadow(0 2px 6px rgba(0, 0, 0, 0.22));"
          />
          <text
            :x="geo.vsCenter.x"
            :y="geo.vsCenter.y"
            text-anchor="middle"
            dominant-baseline="central"
            font-weight="700"
            :font-size="props.vsSize"
            fill="#0f172a"
            letter-spacing="-0.01em"
            class="dark:fill-slate-900 select-none pointer-events-none"
            style="font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;"
          >
            {{ props.vsText }}
          </text>
        </g>
      </svg>
      <!-- Compound Content Layer -->
      <template v-if="defaultNodes.length > 0">
        <component :is="node" v-for="(node, i) in defaultNodes" :key="i" />
      </template>
      <template v-else>
        <ArcComparisonLeft :count="resolvedCount" />
        <ArcComparisonRight :count="resolvedCount" />
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Animated Transitions */
.alpha-arc-comparison--animated.alpha-arc-comparison__divider {
  animation: arc-divider-in 500ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-comparison-start-delay, 0ms) + 50ms) both;
}

.alpha-arc-comparison--animated.alpha-arc-comparison__hub--left {
  animation: arc-hub-left-in 550ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-comparison-start-delay, 0ms) + 30ms) both;
}

.alpha-arc-comparison--animated.alpha-arc-comparison__hub--right {
  animation: arc-hub-right-in 550ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-comparison-start-delay, 0ms) + 30ms) both;
}

.alpha-arc-comparison--animated.alpha-arc-comparison__arc--left,
.alpha-arc-comparison--animated.alpha-arc-comparison__arc--right {
  animation: arc-line-fade 500ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-comparison-start-delay, 0ms) + 100ms) both;
}

.alpha-arc-comparison--animated.alpha-arc-comparison__vs {
  animation: arc-vs-bounce 550ms cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--arc-comparison-start-delay, 0ms) + 220ms) both;
  transform-origin: 500px 240px;
  transform-box: view-box;
}

@keyframes arc-divider-in {
  0% {
    opacity: 0;
    transform: scaleY(0);
    transform-origin: center;
  }
  100% {
    opacity: 1;
    transform: scaleY(1);
  }
}

@keyframes arc-hub-left-in {
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes arc-hub-right-in {
  0% {
    opacity: 0;
    transform: translateX(40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes arc-line-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes arc-vs-bounce {
  0% {
    opacity: 0;
    transform: scale(0.4);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
