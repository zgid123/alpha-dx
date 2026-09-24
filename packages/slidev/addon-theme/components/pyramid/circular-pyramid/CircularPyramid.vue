<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  onMounted,
  onUnmounted,
  provide,
  ref,
  useSlots,
  type VNode,
  watch,
} from 'vue';

import {
  CIRCULAR_PYRAMID_ROOT_KEY,
  clampCircularCount,
  createCircularPyramidGeometry,
  DEFAULT_CIRCULAR_PYRAMID_COLOR,
  DEFAULT_CIRCULAR_PYRAMID_STACK_COLORS,
  darkenColor,
  lightenColor,
  resolveCircularPyramidPalette,
} from '../../../utils/pyramid/circular-pyramid';
import { resolvePyramidCardPositions } from '../../../utils/pyramid/shared';
import { useDiagramAutoScale } from '../../../utils/useDiagramAutoScale';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import CircularPyramidStack from './CircularPyramidStack.vue';

defineOptions({
  inheritAttrs: false,
  name: 'CircularPyramid',
});

export interface ICircularPyramidProps {
  /**
   * Number of circular layers in the pyramid (1 to 6).
   * Automatically inferred from slotted `<CircularPyramidStack>` components if omitted.
   * Default: 4
   */
  readonly count?: number;
  /**
   * Index of the active circular layer (0 = top, count - 1 = bottom).
   * Default: -1 (none active)
   */
  readonly activeIndex?: number;
  /**
   * Primary fallback theme color for the pyramid.
   * Default: '#3b82f6'
   */
  readonly color?: string;
  /**
   * Optional custom palette for stacks/layers.
   * If omitted, distinct defaults from DEFAULT_CIRCULAR_PYRAMID_STACK_COLORS are used.
   */
  readonly colors?: readonly string[] | string[];
  /**
   * Container width. Supports numeric px or CSS unit strings.
   */
  readonly width?: number | string;
  /**
   * Container height. Supports numeric px or CSS unit strings.
   */
  readonly height?: number | string;
  /**
   * Manual zoom/scale factor.
   */
  readonly scale?: number;
  /**
   * Enable responsive auto-scaling to fit container.
   * Default: true
   */
  readonly autoScale?: boolean;
  /**
   * Maximum allowed auto-scale factor.
   */
  readonly maxScale?: number;
  /**
   * Whether clicking a layer or stack changes the active layer.
   * Default: true
   */
  readonly interactive?: boolean;
  /**
   * Enable entrance and state transition animations.
   * Default: true
   */
  readonly animation?: boolean;
  /**
   * Start delay (ms) for entrance animations.
   */
  readonly startDelay?: number;
  /**
   * Custom viewBox width. Default: 960
   */
  readonly viewBoxWidth?: number;
  /**
   * Custom viewBox height. Default: 440
   */
  readonly viewBoxHeight?: number;
}

const props = withDefaults(defineProps<ICircularPyramidProps>(), {
  count: undefined,
  activeIndex: -1,
  color: DEFAULT_CIRCULAR_PYRAMID_COLOR,
  colors: undefined,
  width: undefined,
  height: undefined,
  scale: undefined,
  autoScale: true,
  maxScale: undefined,
  interactive: true,
  animation: true,
  startDelay: undefined,
  viewBoxWidth: 960,
  viewBoxHeight: 440,
});

const emit = defineEmits<{
  (e: 'update:activeIndex', index: number): void;
  (e: 'select', index: number): void;
  (e: 'click', event: MouseEvent): void;
}>();

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

const internalActiveIndex = ref(props.activeIndex);

watch(
  () => props.activeIndex,
  (newVal) => {
    internalActiveIndex.value = newVal;
  },
);

const currentActiveIndex = computed(() => internalActiveIndex.value);

interface INamedComponent {
  readonly type?: {
    readonly name?: string;
    readonly displayName?: string;
  };
}

function countSlottedStacks(slotNodes: VNode[] | undefined): number {
  if (!slotNodes) return 0;
  let count = 0;
  for (const node of slotNodes) {
    if (typeof node.type === 'object' && node.type !== null) {
      const comp = node.type as INamedComponent['type'];
      if (
        comp?.name === 'CircularPyramidStack' ||
        comp?.displayName === 'CircularPyramidStack'
      ) {
        count++;
        continue;
      }
    }
    if (node.type === Fragment && Array.isArray(node.children)) {
      count += countSlottedStacks(node.children as VNode[]);
    }
  }
  return count;
}

const slottedStackCount = computed(() => {
  const defaultSlotNodes = slots.default?.();
  if (!defaultSlotNodes) return 0;
  let count = 0;
  for (const node of defaultSlotNodes) {
    if (typeof node.type === 'object' && node.type !== null) {
      const comp = node.type as INamedComponent['type'];
      if (
        comp?.name === 'CircularPyramidStack' ||
        comp?.displayName === 'CircularPyramidStack'
      ) {
        count++;
        continue;
      }
    }
    if (node.type === Fragment && Array.isArray(node.children)) {
      count += countSlottedStacks(node.children as VNode[]);
    }
  }
  return count;
});

const registeredStackTokens = ref<symbol[]>([]);
const registeredStackColors = ref<Map<symbol, string | undefined>>(new Map());

function registerStack(
  id?: symbol,
  colorRef?: ComputedRef<string | undefined>,
) {
  const token = id ?? Symbol();
  if (!registeredStackTokens.value.includes(token)) {
    registeredStackTokens.value.push(token);
  }
  let stopWatch: (() => void) | undefined;
  if (colorRef) {
    stopWatch = watch(
      colorRef,
      (newColor) => {
        if (newColor) {
          registeredStackColors.value.set(token, newColor);
        } else {
          registeredStackColors.value.delete(token);
        }
      },
      { immediate: true },
    );
  }
  const index = computed(() => registeredStackTokens.value.indexOf(token));
  return {
    index,
    unregister: () => {
      stopWatch?.();
      registeredStackTokens.value = registeredStackTokens.value.filter(
        (t) => t !== token,
      );
      registeredStackColors.value.delete(token);
    },
  };
}

function getLayerColor(index: number): string {
  if (index >= 0 && index < registeredStackTokens.value.length) {
    const token = registeredStackTokens.value[index];
    if (token) {
      const custom = registeredStackColors.value.get(token);
      if (custom) {
        return custom;
      }
    }
  }

  const customPaletteColor = props.colors?.[index];
  if (customPaletteColor) {
    return customPaletteColor;
  }

  const stackColor =
    DEFAULT_CIRCULAR_PYRAMID_STACK_COLORS[
      Math.abs(index) % DEFAULT_CIRCULAR_PYRAMID_STACK_COLORS.length
    ];

  return stackColor ?? props.color ?? DEFAULT_CIRCULAR_PYRAMID_COLOR;
}

const activeLayerColor = computed<string>(() => {
  if (currentActiveIndex.value >= 0) {
    return getLayerColor(currentActiveIndex.value);
  }

  return props.color;
});

const resolvedCount = computed(() => {
  if (props.count !== undefined) {
    return clampCircularCount(props.count);
  }
  if (slottedStackCount.value > 0) {
    return clampCircularCount(slottedStackCount.value);
  }
  if (registeredStackTokens.value.length > 0) {
    return clampCircularCount(registeredStackTokens.value.length);
  }
  return 4;
});

const geo = computed(() => {
  const vbHeight =
    props.viewBoxHeight !== 440
      ? props.viewBoxHeight
      : resolvedCount.value >= 6
        ? 480
        : resolvedCount.value >= 5
          ? 450
          : 440;

  return createCircularPyramidGeometry({
    count: resolvedCount.value,
    viewBoxWidth: 630,
    viewBoxHeight: vbHeight,
    cx: 315,
    bottomRadius: 180,
    topRadius:
      resolvedCount.value <= 2
        ? 100
        : Math.max(70, 95 - (resolvedCount.value - 3) * 6),
    cylinderHeight: resolvedCount.value >= 5 ? 7 : 8,
    ratio: 0.45,
  });
});

const palette = computed(() => {
  return resolveCircularPyramidPalette(props.color);
});

function setActiveIndex(index: number): void {
  internalActiveIndex.value = index;
  emit('update:activeIndex', index);
  emit('select', index);
}

const TITLE_WIDTH_PX = 150;
const CONTENT_WIDTH_PX = 240;
// Content card extends to the right boundary limit (0px offset from right edge)
const CONTENT_RIGHT_OFFSET_PX = 0;

const titleWidthPx = computed(() => TITLE_WIDTH_PX);
const contentWidthPx = computed(() => CONTENT_WIDTH_PX);
const contentRightOffsetPx = computed(() => CONTENT_RIGHT_OFFSET_PX);

const cardHeights = ref<number[]>([]);
const cardDeltaYList = ref<number[]>([]);

const initialDeltaYList = computed(() => {
  const targetY = geo.value.layers.map((l) => l.slabCenterY ?? l.cy);
  const estimatedHeights = Array(targetY.length).fill(48);
  const resolvedY = resolvePyramidCardPositions({
    targetYList: targetY,
    heights: estimatedHeights,
    gap: 10,
    minY: 16,
    maxY: geo.value.viewBoxHeight - 16,
  });
  return resolvedY.map((y, i) => y - (targetY[i] ?? y));
});

function getCardDeltaY(index: number): number {
  if (cardDeltaYList.value[index] !== undefined) {
    return cardDeltaYList.value[index] ?? 0;
  }
  return initialDeltaYList.value[index] ?? 0;
}

let cardAnimationFrame: number | undefined;

function updateCardPositions(): void {
  if (typeof window === 'undefined' || !rootRef.value) {
    return;
  }
  const cardEls = rootRef.value.querySelectorAll<HTMLElement>(
    '.alpha-circular-pyramid-stack-content',
  );
  if (cardEls.length === 0) {
    return;
  }

  const heights: number[] = [];
  cardEls.forEach((el) => {
    heights.push(el.offsetHeight || 48);
  });
  cardHeights.value = heights;

  const targetY = geo.value.layers.map((l) => l.slabCenterY ?? l.cy);
  const resolvedY = resolvePyramidCardPositions({
    targetYList: targetY,
    heights,
    gap: 10,
    minY: 16,
    maxY: geo.value.viewBoxHeight - 16,
  });

  cardDeltaYList.value = resolvedY.map((y, i) => y - (targetY[i] ?? y));
}

function scheduleCardUpdate(): void {
  if (typeof window === 'undefined') {
    return;
  }
  if (cardAnimationFrame !== undefined) {
    cancelAnimationFrame(cardAnimationFrame);
  }
  cardAnimationFrame = requestAnimationFrame(() => {
    cardAnimationFrame = undefined;
    updateCardPositions();
  });
}

let cardResizeObserver: ResizeObserver | null = null;
let cardMutationObserver: MutationObserver | null = null;

onMounted(() => {
  scheduleCardUpdate();
  if (typeof ResizeObserver !== 'undefined' && rootRef.value) {
    cardResizeObserver = new ResizeObserver(scheduleCardUpdate);
    cardResizeObserver.observe(rootRef.value);
  }
  if (typeof MutationObserver !== 'undefined' && rootRef.value) {
    cardMutationObserver = new MutationObserver(scheduleCardUpdate);
    cardMutationObserver.observe(rootRef.value, {
      childList: true,
      subtree: true,
      characterData: true,
    });
  }
});

onUnmounted(() => {
  if (cardAnimationFrame !== undefined) {
    cancelAnimationFrame(cardAnimationFrame);
  }
  cardResizeObserver?.disconnect();
  cardMutationObserver?.disconnect();
});

provide(CIRCULAR_PYRAMID_ROOT_KEY, {
  count: resolvedCount,
  activeIndex: currentActiveIndex,
  color: computed(() => props.color),
  geo,
  palette,
  animation: isAnimated,
  interactive: computed(() => props.interactive),
  titleWidthPx,
  contentWidthPx,
  contentRightOffsetPx,
  registerStack,
  getLayerColor,
  setActiveIndex,
  getCardDeltaY,
});

// Render from bottom layer up to top layer for natural overlapping perspective
const stackedLayers = computed(() => {
  return [...geo.value.layers].reverse();
});

const lowestLayer = computed(() => {
  const layers = geo.value.layers;
  return layers.length > 0 ? layers[layers.length - 1] : undefined;
});

const uid = Math.random().toString(36).slice(2, 8);
const filterBlurId = `alpha-circular-pyramid-blur-${uid}`;
const filterActiveShadowId = `alpha-circular-pyramid-shadow-${uid}`;
const filterAmbientShadowId = `alpha-circular-pyramid-ambient-${uid}`;

const activeTopGradId = `alpha-circ-grad-act-top-${uid}`;
const activeSideGradId = `alpha-circ-grad-act-side-${uid}`;
const defaultTopGradId = `alpha-circ-grad-def-top-${uid}`;
const defaultSideGradId = `alpha-circ-grad-def-side-${uid}`;

function getInactiveTopGradId(index: number): string {
  return `alpha-circ-grad-inact-top-${uid}-${index}`;
}

function getInactiveSideGradId(index: number): string {
  return `alpha-circ-grad-inact-side-${uid}-${index}`;
}

function getActiveTopGradId(index: number): string {
  return `alpha-circ-grad-act-top-${uid}-${index}`;
}

function getActiveSideGradId(index: number): string {
  return `alpha-circ-grad-act-side-${uid}-${index}`;
}

function getActiveShadowId(index: number): string {
  return `alpha-circ-shadow-${uid}-${index}`;
}

const { resolvedScale, containerHeight } = useDiagramAutoScale({
  rootRef,
  baseWidth: props.viewBoxWidth,
  baseHeight: props.viewBoxHeight,
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

const resolvedWidthStyle = computed(() => {
  if (props.width !== undefined) {
    return typeof props.width === 'number' ? `${props.width}px` : props.width;
  }

  return '100%';
});

const resolvedHeightStyle = computed(() => {
  if (props.height !== undefined) {
    return typeof props.height === 'number'
      ? `${props.height}px`
      : props.height;
  }

  if (resolvedCount.value >= 6) {
    return '480px';
  }
  if (resolvedCount.value >= 5) {
    return '450px';
  }

  return '440px';
});

function handleLayerClick(index: number, _event: MouseEvent): void {
  if (props.interactive) {
    if (internalActiveIndex.value === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  }
}

function handleContainerClick(event: MouseEvent): void {
  emit('click', event);
}

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-circular-pyramid w-full flex items-center justify-center select-none relative',
);
</script>

<template>
  <div
    ref="rootRef"
    v-bind="forwardedAttrs()"
    :class="className()"
    :data-count="resolvedCount"
    :data-active-index="currentActiveIndex"
    :style="{
      width: resolvedWidthStyle,
      height: resolvedHeightStyle,
      '--circular-pyramid-start-delay': `${resolvedStartDelay}ms`,
      '--circular-pyramid-title-width': `${titleWidthPx}px`,
      '--circular-pyramid-content-width': `${contentWidthPx}px`,
    }"
    @click="handleContainerClick"
  >
    <div
      class="alpha-circular-pyramid__stage relative flex items-center justify-center overflow-visible flex-shrink-0"
      :style="{
        width: `${props.viewBoxWidth ?? 960}px`,
        height: `${geo.viewBoxHeight}px`,
        transform: stageTransform,
        transformOrigin: 'center center',
      }"
    >
      <!-- Central Circular Pyramid SVG Graphic (Strictly in middle between 150px and 180px) -->
      <div
        class="alpha-circular-pyramid__middle absolute inset-y-0 flex items-center justify-center pointer-events-none overflow-visible"
        style="left: 150px; right: 180px;"
      >
        <svg
          class="alpha-circular-pyramid__svg w-full h-full overflow-visible pointer-events-none"
          :viewBox="`0 0 ${geo.viewBoxWidth} ${geo.viewBoxHeight}`"
          preserveAspectRatio="xMidYMid meet"
          xmlns="http://www.w3.org/2000/svg"
        >
        <defs>
          <!-- Per-layer Gradients: Inactive Frosted Glass & Active Luminous -->
          <template v-for="layer in geo.layers" :key="layer.index">
            <!-- Inactive Frosted Glass Top Face Gradient (Exact formula matching Image 1 & 2) -->
            <linearGradient
              :id="getInactiveTopGradId(layer.index)"
              x1="90%"
              y1="10%"
              x2="10%"
              y2="90%"
            >
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
              <stop offset="45%" stop-color="#ffffff" stop-opacity="0.7" />
              <stop
                offset="80%"
                :stop-color="lightenColor({ hex: getLayerColor(layer.index), ratio: 0.88 })"
                stop-opacity="0.5"
              />
              <stop
                offset="100%"
                :stop-color="lightenColor({ hex: getLayerColor(layer.index), ratio: 0.78 })"
                stop-opacity="0.35"
              />
            </linearGradient>
            <!-- Inactive Frosted Glass Rim Gradient (Exact formula matching Image 1 & 2) -->
            <linearGradient
              :id="getInactiveSideGradId(layer.index)"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                :stop-color="lightenColor({ hex: getLayerColor(layer.index), ratio: 0.65 })"
                stop-opacity="0.65"
              />
              <stop
                offset="50%"
                :stop-color="lightenColor({ hex: getLayerColor(layer.index), ratio: 0.75 })"
                stop-opacity="0.5"
              />
              <stop
                offset="100%"
                :stop-color="lightenColor({ hex: getLayerColor(layer.index), ratio: 0.88 })"
                stop-opacity="0.75"
              />
            </linearGradient>
            <!-- Active Luminous Top Face Gradient -->
            <linearGradient
              :id="getActiveTopGradId(layer.index)"
              x1="90%"
              y1="10%"
              x2="15%"
              y2="90%"
            >
              <stop
                offset="0%"
                :stop-color="lightenColor({ hex: getLayerColor(layer.index), ratio: 0.92 })"
                stop-opacity="1"
              />
              <stop
                offset="28%"
                :stop-color="lightenColor({ hex: getLayerColor(layer.index), ratio: 0.55 })"
                stop-opacity="1"
              />
              <stop
                offset="65%"
                :stop-color="lightenColor({ hex: getLayerColor(layer.index), ratio: 0.15 })"
                stop-opacity="1"
              />
              <stop
                offset="100%"
                :stop-color="darkenColor({ hex: getLayerColor(layer.index), ratio: 0.18 })"
                stop-opacity="1"
              />
            </linearGradient>
            <!-- Active 3D Rim Gradient -->
            <linearGradient
              :id="getActiveSideGradId(layer.index)"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop
                offset="0%"
                :stop-color="darkenColor({ hex: getLayerColor(layer.index), ratio: 0.25 })"
              />
              <stop
                offset="50%"
                :stop-color="darkenColor({ hex: getLayerColor(layer.index), ratio: 0.08 })"
              />
              <stop
                offset="100%"
                :stop-color="lightenColor({ hex: getLayerColor(layer.index), ratio: 0.45 })"
              />
            </linearGradient>
            <!-- Active Drop Shadow / Glow Filter -->
            <filter
              :id="getActiveShadowId(layer.index)"
              x="-40%"
              y="-40%"
              width="180%"
              height="200%"
            >
              <feDropShadow
                dx="0"
                dy="8"
                stdDeviation="10"
                :flood-color="getLayerColor(layer.index)"
                flood-opacity="0.35"
              />
            </filter>
          </template>
          <!-- Fallback Global Gradients for Test Spec Compatibility -->
          <linearGradient :id="activeTopGradId" x1="90%" y1="10%" x2="15%" y2="90%">
            <stop offset="0%" :stop-color="lightenColor({ hex: activeLayerColor, ratio: 0.92 })" stop-opacity="1" />
            <stop offset="100%" :stop-color="darkenColor({ hex: activeLayerColor, ratio: 0.18 })" stop-opacity="1" />
          </linearGradient>
          <linearGradient :id="activeSideGradId" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" :stop-color="darkenColor({ hex: activeLayerColor, ratio: 0.25 })" />
            <stop offset="100%" :stop-color="lightenColor({ hex: activeLayerColor, ratio: 0.45 })" />
          </linearGradient>
          <linearGradient :id="defaultTopGradId" x1="90%" y1="10%" x2="10%" y2="90%">
            <stop offset="0%" stop-color="#ffffff" stop-opacity="0.9" />
            <stop offset="100%" :stop-color="lightenColor({ hex: props.color, ratio: 0.78 })" stop-opacity="0.35" />
          </linearGradient>
          <linearGradient :id="defaultSideGradId" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" :stop-color="lightenColor({ hex: props.color, ratio: 0.65 })" stop-opacity="0.65" />
            <stop offset="100%" :stop-color="lightenColor({ hex: props.color, ratio: 0.88 })" stop-opacity="0.75" />
          </linearGradient>
          <filter :id="filterActiveShadowId" x="-40%" y="-40%" width="180%" height="200%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" :flood-color="activeLayerColor" flood-opacity="0.35" />
          </filter>
          <!-- Ambient Bottom Surface Shadow -->
          <filter
            :id="filterAmbientShadowId"
            x="-30%"
            y="-30%"
            width="160%"
            height="160%"
          >
            <feGaussianBlur stdDeviation="14" />
          </filter>
        </defs>
        <!-- Ambient Ground Shadow (under the lowest pyramid disc) -->
        <ellipse
          v-if="lowestLayer"
          :cx="geo.viewBoxWidth / 2"
          :cy="lowestLayer.cy + lowestLayer.cylinderHeight + 14"
          :rx="lowestLayer.rx * 0.92"
          :ry="lowestLayer.ry * 0.28"
          fill="#0f172a"
          opacity="0.1"
          :filter="`url(#${filterAmbientShadowId})`"
        />
        <!-- Stacked Floating Circular Discs (Rendered from bottom to top) -->
        <g
          class="alpha-circular-pyramid__stack"
          :class="{ 'alpha-circular-pyramid--animated': isAnimated }"
        >
          <g
            v-for="layer in stackedLayers"
            :key="layer.index"
            class="alpha-circular-pyramid__layer transition-all duration-300 ease-out pointer-events-auto"
            :class="[
              layer.index === currentActiveIndex
                ? 'alpha-circular-pyramid__layer--active'
                : 'alpha-circular-pyramid__layer--default',
              `alpha-circular-pyramid__layer--${layer.index}`,
              { 'cursor-pointer': props.interactive },
            ]"
            :data-layer-index="layer.index"
            :data-is-active="layer.index === currentActiveIndex"
            :filter="
              layer.index === currentActiveIndex
                ? `url(#${getActiveShadowId(layer.index)})`
                : undefined
            "
            @click.stop="handleLayerClick(layer.index, $event)"
          >
            <!-- 1. 3D Cylindrical Rim (Mantle) -->
            <path
              class="alpha-circular-pyramid__rim transition-all duration-300"
              :d="layer.cylinderPath"
              :fill="
                layer.index === currentActiveIndex
                  ? `url(#${getActiveSideGradId(layer.index)})`
                  : `url(#${getInactiveSideGradId(layer.index)})`
              "
            />
            <!-- 2. Disc Top Face Ellipse -->
            <path
              class="alpha-circular-pyramid__face transition-all duration-300"
              :d="layer.topEllipsePath"
              :fill="
                layer.index === currentActiveIndex
                  ? `url(#${getActiveTopGradId(layer.index)})`
                  : `url(#${getInactiveTopGradId(layer.index)})`
              "
              :stroke="
                layer.index === currentActiveIndex
                  ? 'none'
                  : 'rgba(255, 255, 255, 0.5)'
              "
              stroke-width="0.5"
            />
          </g>
        </g>
      </svg>
    </div>
    <!-- Slotted or Default Stack Items -->
      <slot v-if="slots.default" />
      <template v-else>
        <CircularPyramidStack
          v-for="idx in resolvedCount"
          :key="idx - 1"
          :index="idx - 1"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.alpha-circular-pyramid {
  box-sizing: border-box;
}

.alpha-circular-pyramid__layer {
  transform-box: fill-box;
  transform-origin: center;
}

.alpha-circular-pyramid__layer:hover {
  filter: brightness(1.05);
}

.alpha-circular-pyramid--animated .alpha-circular-pyramid__layer--0 {
  animation: alpha-pyramid-layer-enter 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 60ms) both;
}

.alpha-circular-pyramid--animated .alpha-circular-pyramid__layer--1 {
  animation: alpha-pyramid-layer-enter 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 140ms) both;
}

.alpha-circular-pyramid--animated .alpha-circular-pyramid__layer--2 {
  animation: alpha-pyramid-layer-enter 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 220ms) both;
}

.alpha-circular-pyramid--animated .alpha-circular-pyramid__layer--3 {
  animation: alpha-pyramid-layer-enter 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 300ms) both;
}

.alpha-circular-pyramid--animated .alpha-circular-pyramid__layer--4 {
  animation: alpha-pyramid-layer-enter 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 380ms) both;
}

.alpha-circular-pyramid--animated .alpha-circular-pyramid__layer--5 {
  animation: alpha-pyramid-layer-enter 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 460ms) both;
}

@keyframes alpha-pyramid-layer-enter {
  0% {
    opacity: 0;
    transform: translateY(12px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
