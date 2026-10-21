<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  onBeforeUnmount,
  provide,
  type Ref,
  ref,
  useSlots,
  type VNode,
  watch,
} from 'vue';

import {
  ARC_COMPARISON_ROOT_KEY,
  createArcComparisonGeometry,
} from '../../../utils/comparisons/arc-comparison';
import { useDiagramAutoScale } from '../../../utils/useDiagramAutoScale';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import ArcComparisonLeft from './ArcComparisonLeft.vue';
import ArcComparisonRight from './ArcComparisonRight.vue';

defineOptions({
  name: 'ArcComparison',
  inheritAttrs: false,
});

export type TArcComparisonAs = 'layout';

export interface IArcComparisonProps {
  readonly as?: TArcComparisonAs | null;
  readonly moved?: boolean;
  readonly edgeOffset?: number;
  readonly vsText?: string;
  readonly vsSize?: number;
  readonly vsBorderRotation?: number;
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
  as: undefined,
  moved: undefined,
  edgeOffset: 30,
  vsText: 'Vs',
  vsSize: 14,
  vsBorderRotation: 30,
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

const emit = defineEmits<{
  (e: 'click', event: MouseEvent): void;
  (e: 'update:moved', value: boolean): void;
}>();

const slots = useSlots();
const rootRef = ref<HTMLElement | null>(null);

const shiftingIntro = inject<
  | {
      active: ComputedRef<boolean>;
      clicks?: Ref<number> | ComputedRef<number>;
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
    isLayout: true,
  });
});

let clipInstanceCounter = 0;
const clipId = `alpha-arc-canvas-clip-${++clipInstanceCounter}`;

let vsGradientInstanceCounter = 0;
const vsGradientId = `alpha-arc-vs-gradient-${++vsGradientInstanceCounter}`;

let vsTextGradientInstanceCounter = 0;
const vsTextGradientId = `alpha-arc-vs-text-gradient-${++vsTextGradientInstanceCounter}`;

const internalMoved = ref(false);

const isMoved = computed(() => {
  if (props.moved !== undefined) {
    return props.moved;
  }

  if (shiftingIntro?.clicks && shiftingIntro.clicks.value > 0) {
    return true;
  }

  return internalMoved.value;
});

const bordersRenderKey = ref(0);
const isReturningToFirstStep = ref(false);
let returnTimer: ReturnType<typeof setTimeout> | undefined;

onBeforeUnmount(() => {
  if (returnTimer) {
    clearTimeout(returnTimer);
  }
});

watch(isMoved, (newMoved) => {
  if (returnTimer) {
    clearTimeout(returnTimer);
    returnTimer = undefined;
  }

  if (props.as === 'layout') {
    if (newMoved) {
      isReturningToFirstStep.value = false;
    } else {
      isReturningToFirstStep.value = true;
      returnTimer = setTimeout(() => {
        isReturningToFirstStep.value = false;
        bordersRenderKey.value++;
      }, 650);
    }
  }
});

watch(
  () => props.as,
  (newAs) => {
    if (newAs === 'layout') {
      internalMoved.value = false;
      isReturningToFirstStep.value = false;
    }
  },
);

function handleClick(event: MouseEvent): void {
  if (props.as === 'layout') {
    internalMoved.value = !internalMoved.value;
    emit('update:moved', internalMoved.value);
  }

  emit('click', event);
}

const resolvedEdgeOffset = computed(() => props.edgeOffset ?? 30);

const leftTranslateX = computed(() => {
  const delta = 500 - resolvedEdgeOffset.value;
  return `-${delta}px`;
});

const rightTranslateX = computed(() => {
  const delta = 500 - resolvedEdgeOffset.value;
  return `${delta}px`;
});

const leftHubMoverStyle = computed(() => {
  if (props.as === 'layout' && !isMoved.value) {
    return { transform: 'translateX(0px)' };
  }

  return { transform: `translateX(${leftTranslateX.value})` };
});

const rightHubMoverStyle = computed(() => {
  if (props.as === 'layout' && !isMoved.value) {
    return { transform: 'translateX(0px)' };
  }

  return { transform: `translateX(${rightTranslateX.value})` };
});

const dividerScaleY = computed(() => {
  if (props.as !== 'layout' || isMoved.value) {
    return 1;
  }

  const fullLineLength = geo.value.dividerLine.y2 - geo.value.dividerLine.y1;
  const circleDiameter = 2 * geo.value.left.hubRadius;

  return fullLineLength > 0 ? circleDiameter / fullLineLength : 1;
});

const dividerStyle = computed(() => {
  if (props.as !== 'layout') {
    return undefined;
  }

  return {
    transform: `scaleY(${dividerScaleY.value})`,
    transformOrigin: `${geo.value.dividerLine.x}px ${geo.value.centerY}px`,
  };
});

const resolvedVsBorderRotation = computed(() => props.vsBorderRotation ?? 30);

const resolvedLeftColor = computed(() => {
  for (const node of defaultNodes.value) {
    const type = node.type as Record<string, unknown> | undefined;
    const name = (type?.name ?? type?.__name) as string | undefined;
    if (name === 'ArcComparisonLeft' && typeof node.props?.color === 'string') {
      return node.props.color;
    }
  }

  return 'var(--alpha-arc-comparison-left-accent)';
});

const resolvedRightColor = computed(() => {
  for (const node of defaultNodes.value) {
    const type = node.type as Record<string, unknown> | undefined;
    const name = (type?.name ?? type?.__name) as string | undefined;
    if (
      name === 'ArcComparisonRight' &&
      typeof node.props?.color === 'string'
    ) {
      return node.props.color;
    }
  }

  return 'var(--alpha-arc-comparison-right-accent)';
});

const vsMixedColor = computed(() => {
  return `color-mix(in srgb, ${resolvedLeftColor.value} 50%, ${resolvedRightColor.value} 50%)`;
});

const leftHubLinePath = computed(() => {
  if (props.as !== 'layout') {
    return undefined;
  }

  const { centerX, centerY, vsRadius, left } = geo.value;
  return `M ${centerX} ${centerY - vsRadius} L ${centerX} ${centerY - left.hubRadius}`;
});

const rightHubLinePath = computed(() => {
  if (props.as !== 'layout') {
    return undefined;
  }

  const { centerX, centerY, vsRadius, right } = geo.value;
  return `M ${centerX} ${centerY + vsRadius} L ${centerX} ${centerY + right.hubRadius}`;
});

const leftHubBorderPath = computed(() => {
  if (props.as !== 'layout') {
    return undefined;
  }

  const { centerX, centerY, left } = geo.value;
  return `M ${centerX} ${centerY - left.hubRadius} A ${left.hubRadius} ${left.hubRadius} 0 0 0 ${centerX} ${centerY + left.hubRadius}`;
});

const rightHubBorderPath = computed(() => {
  if (props.as !== 'layout') {
    return undefined;
  }

  const { centerX, centerY, right } = geo.value;
  return `M ${centerX} ${centerY + right.hubRadius} A ${right.hubRadius} ${right.hubRadius} 0 0 0 ${centerX} ${centerY - right.hubRadius}`;
});

const layoutBordersStyle = computed(() => {
  if (props.as !== 'layout') {
    return undefined;
  }

  return {
    transitionDuration: '200ms',
    transitionDelay: '0ms',
  };
});

const vsTextStops = computed(() => {
  const text = props.vsText || 'Vs';
  const len = Math.max(1, text.length);
  const stops: Array<{ offset: string; color: string }> = [];

  for (let i = 0; i < len; i++) {
    const start = (i / len) * 100;
    const mid1 = ((i + 0.35) / len) * 100;
    const center = ((i + 0.5) / len) * 100;
    const mid2 = ((i + 0.65) / len) * 100;
    const end = ((i + 1) / len) * 100;

    stops.push({
      offset: `${start.toFixed(1)}%`,
      color: resolvedLeftColor.value,
    });
    stops.push({
      offset: `${mid1.toFixed(1)}%`,
      color: resolvedLeftColor.value,
    });
    stops.push({ offset: `${center.toFixed(1)}%`, color: vsMixedColor.value });
    stops.push({
      offset: `${mid2.toFixed(1)}%`,
      color: resolvedRightColor.value,
    });
    stops.push({
      offset: `${end.toFixed(1)}%`,
      color: resolvedRightColor.value,
    });
  }

  return stops;
});

provide(ARC_COMPARISON_ROOT_KEY, {
  animation: isAnimated,
  startDelay: resolvedStartDelay,
  pointsCount: resolvedCount,
  geo,
  as: computed(() => props.as),
  isMoved,
  edgeOffset: resolvedEdgeOffset,
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
  'alpha-arc-comparison w-full flex-1 flex flex-col items-center justify-center select-none font-sans relative min-h-0 bg-transparent border-0 p-0 m-0 appearance-none',
);
</script>

<template>
  <button
    type="button"
    ref="rootRef"
    v-bind="forwardedAttrs()"
    :class="[
      className(),
      { 'hide-pagy': props.hidePagy },
      props.as ? `alpha-arc-comparison--as-${props.as}` : undefined,
      { 'alpha-arc-comparison--moved': isMoved },
    ]"
    :data-as="props.as ?? undefined"
    :data-moved="isMoved ? '' : undefined"
    :data-hide-pagy="props.hidePagy ? '' : undefined"
    :style="{
      height: resolvedHeightStyle,
      cursor: props.as === 'layout' ? 'pointer' : undefined,
      '--alpha-arc-comparison-start-delay': `${resolvedStartDelay}ms`,
      '--alpha-arc-orbit-start-delay': `${resolvedStartDelay}ms`,
      '--alpha-arc-orbit-heading': 'var(--alpha-arc-comparison-heading)',
      '--alpha-arc-orbit-content': 'var(--alpha-arc-comparison-content)',
      '--alpha-arc-orbit-badge': 'var(--alpha-arc-comparison-badge)',
    }"
    @click="handleClick"
  >
    <!-- Relative stage container -->
    <div
      class="alpha-arc-comparison__stage relative w-250 h-120 flex items-center justify-center overflow-visible shrink-0"
      :style="{
        transform: stageTransform,
        transformOrigin: 'center center',
      }"
    >
      <!-- Base SVG Layer -->
      <svg
        aria-hidden="true"
        class="alpha-arc-comparison__svg absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        viewBox="0 0 1000 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath :id="clipId">
            <rect x="0" y="0" width="1000" height="480" />
          </clipPath>
          <linearGradient :id="vsGradientId" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" :stop-color="resolvedLeftColor" />
            <stop offset="35%" :stop-color="resolvedLeftColor" />
            <stop offset="50%" :stop-color="vsMixedColor" />
            <stop offset="65%" :stop-color="resolvedRightColor" />
            <stop offset="100%" :stop-color="resolvedRightColor" />
          </linearGradient>
          <linearGradient
            :id="vsTextGradientId"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop
              v-for="(stop, sIdx) in vsTextStops"
              :key="sIdx"
              :offset="stop.offset"
              :stop-color="stop.color"
            />
          </linearGradient>
        </defs>
        <!-- Semicircular Hubs Group with Canvas Clip -->
        <g :clip-path="`url(#${clipId})`">
          <!-- Other Semicircular Hub Backgrounds (rendered underneath current hubs) -->
          <g
            v-if="geo.left.otherHubPath"
            class="alpha-arc-comparison__hub-mover alpha-arc-comparison__hub-mover--left"
            :class="{ 'alpha-arc-comparison__hub-mover--moved': isMoved || props.as !== 'layout' }"
            :style="leftHubMoverStyle"
          >
            <g
              class="alpha-arc-comparison__hub alpha-arc-comparison__hub--other alpha-arc-comparison__hub--other-left alpha-arc-comparison__hub--left"
              :class="{ 'alpha-arc-comparison--animated': isAnimated }"
            >
              <path
                :d="geo.left.otherHubPath"
                fill="var(--alpha-arc-comparison-hub-fill)"
                class="transition-colors duration-300"
              />
            </g>
          </g>
          <g
            v-if="geo.right.otherHubPath"
            class="alpha-arc-comparison__hub-mover alpha-arc-comparison__hub-mover--right"
            :class="{ 'alpha-arc-comparison__hub-mover--moved': isMoved || props.as !== 'layout' }"
            :style="rightHubMoverStyle"
          >
            <g
              class="alpha-arc-comparison__hub alpha-arc-comparison__hub--other alpha-arc-comparison__hub--other-right alpha-arc-comparison__hub--right"
              :class="{ 'alpha-arc-comparison--animated': isAnimated }"
            >
              <path
                :d="geo.right.otherHubPath"
                fill="var(--alpha-arc-comparison-hub-fill)"
                class="transition-colors duration-300"
              />
            </g>
          </g>
          <!-- Left Semicircular Hub Background -->
          <g
            class="alpha-arc-comparison__hub-mover alpha-arc-comparison__hub-mover--left"
            :class="{ 'alpha-arc-comparison__hub-mover--moved': isMoved || props.as !== 'layout' }"
            :style="leftHubMoverStyle"
          >
            <g
              class="alpha-arc-comparison__hub alpha-arc-comparison__hub--left"
              :class="{ 'alpha-arc-comparison--animated': isAnimated }"
            >
              <path
                :d="geo.left.hubPath"
                fill="var(--alpha-arc-comparison-hub-fill)"
                class="transition-colors duration-300"
              />
            </g>
          </g>
          <!-- Right Semicircular Hub Background -->
          <g
            class="alpha-arc-comparison__hub-mover alpha-arc-comparison__hub-mover--right"
            :class="{ 'alpha-arc-comparison__hub-mover--moved': isMoved || props.as !== 'layout' }"
            :style="rightHubMoverStyle"
          >
            <g
              class="alpha-arc-comparison__hub alpha-arc-comparison__hub--right"
              :class="{ 'alpha-arc-comparison--animated': isAnimated }"
            >
              <path
                :d="geo.right.hubPath"
                fill="var(--alpha-arc-comparison-hub-fill)"
                class="transition-colors duration-300"
              />
            </g>
          </g>
        </g>
        <!-- Layout Mode Combined Drawing Paths (Middle Lines + Semicircle Borders) -->
        <g
          v-if="props.as === 'layout'"
          :key="bordersRenderKey"
          class="alpha-arc-comparison__layout-borders transition-opacity ease-out"
          :class="{
            'alpha-arc-comparison--animated': isAnimated,
            'opacity-0 pointer-events-none': isMoved || isReturningToFirstStep,
            'opacity-100': !isMoved && !isReturningToFirstStep,
          }"
          :style="layoutBordersStyle"
        >
          <!-- Middle Lines: Drawn first from the Vs badge outwards -->
          <path
            v-if="leftHubLinePath"
            :d="leftHubLinePath"
            pathLength="100"
            stroke-dasharray="100"
            :stroke-dashoffset="isAnimated ? 100 : 0"
            fill="none"
            :stroke="resolvedLeftColor"
            stroke-width="1.5"
            stroke-linecap="round"
            class="alpha-arc-comparison__hub-line alpha-arc-comparison__hub-line--left"
          />
          <path
            v-if="rightHubLinePath"
            :d="rightHubLinePath"
            pathLength="100"
            stroke-dasharray="100"
            :stroke-dashoffset="isAnimated ? 100 : 0"
            fill="none"
            :stroke="resolvedRightColor"
            stroke-width="1.5"
            stroke-linecap="round"
            class="alpha-arc-comparison__hub-line alpha-arc-comparison__hub-line--right"
          />
          <!-- Semicircular Perimeter Borders: Drawn second around the arcs -->
          <path
            v-if="leftHubBorderPath"
            :d="leftHubBorderPath"
            pathLength="100"
            stroke-dasharray="100"
            :stroke-dashoffset="isAnimated ? 100 : 0"
            fill="none"
            :stroke="resolvedLeftColor"
            stroke-width="1.5"
            stroke-linejoin="round"
            stroke-linecap="round"
            class="alpha-arc-comparison__hub-border alpha-arc-comparison__hub-border--left"
          />
          <path
            v-if="rightHubBorderPath"
            :d="rightHubBorderPath"
            pathLength="100"
            stroke-dasharray="100"
            :stroke-dashoffset="isAnimated ? 100 : 0"
            fill="none"
            :stroke="resolvedRightColor"
            stroke-width="1.5"
            stroke-linejoin="round"
            stroke-linecap="round"
            class="alpha-arc-comparison__hub-border alpha-arc-comparison__hub-border--right"
          />
        </g>
        <!-- Left Arc Guide Line and End Dots -->
        <g
          v-if="props.as !== 'layout' || isMoved"
          class="alpha-arc-comparison__arc alpha-arc-comparison__arc--left transition-opacity duration-500 ease-out"
          :class="{
            'alpha-arc-comparison--animated': isAnimated,
            'opacity-0': props.as === 'layout' && !isMoved,
            'opacity-100': props.as !== 'layout' || isMoved,
          }"
          :style="{
            transitionDelay:
              props.as === 'layout' && isMoved ? '300ms' : '0ms',
          }"
        >
          <path
            :d="geo.left.arcPath"
            fill="none"
            stroke="var(--alpha-arc-comparison-guide-stroke)"
            stroke-width="1.5"
            class="transition-colors duration-300"
          />
          <circle
            :cx="geo.left.topDot.x"
            :cy="geo.left.topDot.y"
            :r="geo.left.dotRadius"
            fill="var(--alpha-arc-comparison-guide-dot)"
          />
          <circle
            :cx="geo.left.bottomDot.x"
            :cy="geo.left.bottomDot.y"
            :r="geo.left.dotRadius"
            fill="var(--alpha-arc-comparison-guide-dot)"
          />
        </g>
        <!-- Right Arc Guide Line and End Dots -->
        <g
          v-if="props.as !== 'layout' || isMoved"
          class="alpha-arc-comparison__arc alpha-arc-comparison__arc--right transition-opacity duration-500 ease-out"
          :class="{
            'alpha-arc-comparison--animated': isAnimated,
            'opacity-0': props.as === 'layout' && !isMoved,
            'opacity-100': props.as !== 'layout' || isMoved,
          }"
          :style="{
            transitionDelay:
              props.as === 'layout' && isMoved ? '300ms' : '0ms',
          }"
        >
          <path
            :d="geo.right.arcPath"
            fill="none"
            stroke="var(--alpha-arc-comparison-guide-stroke)"
            stroke-width="1.5"
            class="transition-colors duration-300"
          />
          <circle
            :cx="geo.right.topDot.x"
            :cy="geo.right.topDot.y"
            :r="geo.right.dotRadius"
            fill="var(--alpha-arc-comparison-guide-dot)"
          />
          <circle
            :cx="geo.right.bottomDot.x"
            :cy="geo.right.bottomDot.y"
            :r="geo.right.dotRadius"
            fill="var(--alpha-arc-comparison-guide-dot)"
          />
        </g>
        <!-- Center Divider Line (Top: Left Color, Bottom: Right Color) -->
        <g
          v-if="props.as !== 'layout' || isMoved"
          class="alpha-arc-comparison__divider transition-colors duration-300"
          :class="{
            'alpha-arc-comparison--animated': isAnimated,
            'alpha-arc-comparison__divider--layout': props.as === 'layout',
            'opacity-0 pointer-events-none': props.as === 'layout' && !isMoved,
            'opacity-100': props.as !== 'layout' || isMoved,
          }"
          :style="dividerStyle"
        >
          <path
            :d="`M ${geo.dividerLine.x} ${geo.centerY - geo.vsRadius} L ${geo.dividerLine.x} ${geo.dividerLine.y1}`"
            pathLength="100"
            stroke-dasharray="100"
            :stroke-dashoffset="isAnimated ? 100 : 0"
            fill="none"
            :stroke="resolvedLeftColor"
            stroke-width="1.5"
            stroke-linecap="round"
            class="alpha-arc-comparison__divider-line alpha-arc-comparison__divider-line--top transition-colors duration-300"
          />
          <path
            :d="`M ${geo.dividerLine.x} ${geo.centerY + geo.vsRadius} L ${geo.dividerLine.x} ${geo.dividerLine.y2}`"
            pathLength="100"
            stroke-dasharray="100"
            :stroke-dashoffset="isAnimated ? 100 : 0"
            fill="none"
            :stroke="resolvedRightColor"
            stroke-width="1.5"
            stroke-linecap="round"
            class="alpha-arc-comparison__divider-line alpha-arc-comparison__divider-line--bottom transition-colors duration-300"
          />
        </g>
        <!-- Center "Vs" Circle Badge -->
        <g class="alpha-arc-comparison__vs">
          <circle
            :cx="geo.vsCenter.x"
            :cy="geo.vsCenter.y"
            :r="geo.vsRadius"
            fill="var(--alpha-arc-comparison-vs-bg)"
            class="transition-colors duration-300"
            style="filter: var(--alpha-arc-comparison-vs-shadow);"
          />
          <!-- Rotated Split Border with Mixed Boundary Gradient -->
          <g
            :transform="`rotate(${resolvedVsBorderRotation}, ${geo.vsCenter.x}, ${geo.vsCenter.y})`"
          >
            <circle
              class="alpha-arc-comparison__vs-border alpha-arc-comparison__vs-border--left alpha-arc-comparison__vs-border--right transition-colors duration-300"
              :cx="geo.vsCenter.x"
              :cy="geo.vsCenter.y"
              :r="geo.vsRadius"
              fill="none"
              :stroke="`url(#${vsGradientId})`"
              stroke-width="2"
            />
          </g>
          <text
            :x="geo.vsCenter.x"
            :y="geo.vsCenter.y"
            text-anchor="middle"
            dominant-baseline="central"
            font-weight="700"
            font-style="italic"
            :font-size="props.vsSize"
            :fill="`url(#${vsTextGradientId})`"
            letter-spacing="-0.01em"
            class="font-sans italic select-none pointer-events-none"
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
  </button>
</template>

<style scoped>
/* Animated Transitions */
.alpha-arc-comparison--animated .alpha-arc-comparison__divider-line--top,
.alpha-arc-comparison--animated .alpha-arc-comparison__divider-line--bottom {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: alpha-arc-draw-line 600ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--alpha-arc-comparison-start-delay, 0ms) + 40ms) both;
}

.alpha-arc-comparison--animated .alpha-arc-comparison__hub-line--left,
.alpha-arc-comparison--animated .alpha-arc-comparison__hub-line--right {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: alpha-arc-draw-line 300ms cubic-bezier(0.2, 0.8, 0.4, 1)
    calc(var(--alpha-arc-comparison-start-delay, 0ms) + 40ms) both;
}

.alpha-arc-comparison--animated .alpha-arc-comparison__hub-border--left,
.alpha-arc-comparison--animated .alpha-arc-comparison__hub-border--right {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: alpha-arc-draw-continuous 550ms cubic-bezier(0.25, 1, 0.5, 1)
    calc(var(--alpha-arc-comparison-start-delay, 0ms) + 260ms) both;
}

.alpha-arc-comparison__divider--layout {
  transform-box: view-box;
  transition:
    transform 700ms cubic-bezier(0.16, 1, 0.3, 1),
    opacity 500ms ease-out;
}

.alpha-arc-comparison--animated.alpha-arc-comparison__hub--left {
  animation: arc-hub-left-in 550ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--alpha-arc-comparison-start-delay, 0ms) + 30ms) both;
}

.alpha-arc-comparison--animated.alpha-arc-comparison__hub--right {
  animation: arc-hub-right-in 550ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--alpha-arc-comparison-start-delay, 0ms) + 30ms) both;
}

.alpha-arc-comparison--animated.alpha-arc-comparison__arc--left,
.alpha-arc-comparison--animated.alpha-arc-comparison__arc--right {
  animation: arc-line-fade 500ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--alpha-arc-comparison-start-delay, 0ms) + 100ms) both;
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

@keyframes alpha-arc-draw-continuous {
  0% {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes alpha-arc-draw-line {
  0% {
    stroke-dashoffset: 100;
    opacity: 0;
  }
  1% {
    opacity: 1;
  }
  100% {
    stroke-dashoffset: 0;
    opacity: 1;
  }
}

@keyframes alpha-arc-draw-arc {
  0% {
    stroke-dashoffset: 100;
  }
  100% {
    stroke-dashoffset: 0;
  }
}

/* Hub mover transitions for layout mode on click */
.alpha-arc-comparison__hub-mover {
  transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
}

.alpha-arc-comparison__hub-mover--left.alpha-arc-comparison__hub-mover--moved {
  transform: translateX(-470px);
}

.alpha-arc-comparison__hub-mover--right.alpha-arc-comparison__hub-mover--moved {
  transform: translateX(470px);
}
</style>
