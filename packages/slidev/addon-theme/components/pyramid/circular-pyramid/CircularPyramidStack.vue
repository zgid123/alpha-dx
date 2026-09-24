<script setup lang="ts">
import {
  computed,
  Fragment,
  inject,
  onUnmounted,
  provide,
  useSlots,
  type VNode,
} from 'vue';

import {
  CIRCULAR_PYRAMID_ROOT_KEY,
  CIRCULAR_PYRAMID_STACK_KEY,
  DEFAULT_CIRCULAR_PYRAMID_COLOR,
  DEFAULT_CIRCULAR_PYRAMID_STACK_COLORS,
} from '../../../utils/pyramid/circular-pyramid';
import CircularPyramidStackContent from './CircularPyramidStackContent.vue';
import CircularPyramidStackTitle from './CircularPyramidStackTitle.vue';

defineOptions({
  name: 'CircularPyramidStack',
});

export interface ICircularPyramidStackProps {
  readonly index?: number;
  readonly step?: string | number;
  readonly title?: string;
  readonly content?: string;
  readonly color?: string;
  readonly active?: boolean;
  readonly connectorWidth?: number;
}

const props = withDefaults(defineProps<ICircularPyramidStackProps>(), {
  index: undefined,
  step: undefined,
  title: undefined,
  content: undefined,
  color: undefined,
  active: undefined,
  connectorWidth: undefined,
});

const slots = useSlots();
const rootContext = inject(CIRCULAR_PYRAMID_ROOT_KEY, undefined);

interface INamedComponent {
  readonly type?: {
    readonly name?: string;
    readonly displayName?: string;
  };
}

function hasComponentName(type: unknown, targetName: string): boolean {
  if (typeof type === 'object' && type !== null) {
    const comp = type as INamedComponent['type'];
    return comp?.name === targetName || comp?.displayName === targetName;
  }
  return false;
}

function flattenVNodes(nodes: VNode[]): VNode[] {
  const result: VNode[] = [];
  for (const node of nodes) {
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flattenVNodes(node.children as VNode[]));
    } else {
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

const slottedTitle = computed(() => {
  return defaultNodes.value.find((node) =>
    hasComponentName(node.type, 'CircularPyramidStackTitle'),
  );
});

const slottedContent = computed(() => {
  return defaultNodes.value.find((node) =>
    hasComponentName(node.type, 'CircularPyramidStackContent'),
  );
});

const stackToken = Symbol();
const effectiveColor = computed(() => {
  return (
    props.color || (slottedTitle.value?.props?.color as string | undefined)
  );
});
const registration = rootContext?.registerStack(stackToken, effectiveColor);

onUnmounted(() => {
  registration?.unregister();
});

const resolvedIndex = computed<number>(() => {
  if (props.index !== undefined) {
    return Number(props.index);
  }
  return registration?.index.value ?? 0;
});

const isActive = computed<boolean>(() => {
  if (props.active !== undefined) {
    return props.active;
  }
  if (!rootContext) {
    return false;
  }
  return rootContext.activeIndex.value === resolvedIndex.value;
});

const resolvedStep = computed(() => {
  if (props.step !== undefined) {
    return props.step;
  }
  return String(resolvedIndex.value + 1).padStart(2, '0');
});

const layerGeometry = computed(() => {
  if (!rootContext) {
    return undefined;
  }
  return rootContext.geo.value.layers[resolvedIndex.value];
});

const posY = computed(() => {
  if (!layerGeometry.value) {
    return 0;
  }
  const geo = layerGeometry.value;
  return (
    geo.slabCenterY ??
    Number((geo.cy + (geo.cylinderHeight ?? 0) / 2).toFixed(2))
  );
});

const discRadiusX = computed(() => {
  if (!layerGeometry.value) {
    return 140;
  }
  return layerGeometry.value.rx;
});

const DOT_POSITION_X = 210;

const leftWidth = computed(() => {
  if (layerGeometry.value) {
    const rx = layerGeometry.value.rx;
    const cx = 465;
    return Math.max(180, Math.round(cx - rx - 40));
  }
  return DOT_POSITION_X;
});

const rightWidth = computed(() => rootContext?.contentWidthPx.value ?? 240);

const rightWingWidth = computed(() => {
  if (layerGeometry.value) {
    const rx = layerGeometry.value.rx;
    const cx = 465;
    const dotRightX = cx + rx + 40;
    const containerW = 960;
    return Math.max(rightWidth.value + 20, Math.round(containerW - dotRightX));
  }
  return rightWidth.value + 40;
});

const rightOffset = computed(
  () => rootContext?.contentRightOffsetPx.value ?? 0,
);

const resolvedColor = computed<string>(() => {
  if (effectiveColor.value) {
    return effectiveColor.value;
  }
  return (
    rootContext?.getLayerColor(resolvedIndex.value) ??
    DEFAULT_CIRCULAR_PYRAMID_STACK_COLORS[
      Math.abs(resolvedIndex.value) %
        DEFAULT_CIRCULAR_PYRAMID_STACK_COLORS.length
    ] ??
    DEFAULT_CIRCULAR_PYRAMID_COLOR
  );
});

const hasActiveStack = computed(() => {
  return (rootContext?.activeIndex.value ?? -1) >= 0;
});

function handleStackClick(): void {
  if (rootContext?.interactive.value) {
    if (rootContext.activeIndex.value === resolvedIndex.value) {
      rootContext.setActiveIndex(-1);
    } else {
      rootContext.setActiveIndex(resolvedIndex.value);
    }
  }
}

const deltaY = computed(() => {
  return rootContext?.getCardDeltaY?.(resolvedIndex.value) ?? 0;
});

const connectorWidth = computed(() => {
  return Math.max(20, rightWingWidth.value - rightWidth.value);
});

provide(CIRCULAR_PYRAMID_STACK_KEY, {
  index: resolvedIndex,
  isActive,
  step: resolvedStep,
  layerGeo: layerGeometry,
  color: resolvedColor,
  deltaY,
  connectorWidth,
  setActive: handleStackClick,
});
</script>

<template>
  <div
    class="alpha-circular-pyramid-stack absolute inset-x-0 pointer-events-none select-none flex items-center justify-between"
    :class="[
      isActive
        ? 'alpha-circular-pyramid-stack--active'
        : 'alpha-circular-pyramid-stack--inactive',
      `alpha-circular-pyramid-stack--${resolvedIndex}`,
    ]"
    :data-index="resolvedIndex"
    :data-active="isActive"
    :style="{
      top: `${posY}px`,
      transform: 'translateY(-50%)',
    }"
  >
    <!-- Left Wing: Title Pill (150px) -->
    <div
      class="alpha-circular-pyramid-stack__left flex-shrink-0 flex items-center justify-start pointer-events-auto cursor-pointer"
      :class="[
        `alpha-circular-pyramid-stack__left--${resolvedIndex}`,
        { 'alpha-circular-pyramid-stack--animated': rootContext?.animation.value },
      ]"
      :style="{
        width: `${leftWidth}px`,
        minWidth: `${leftWidth}px`,
        maxWidth: `${leftWidth}px`,
        opacity: !hasActiveStack || isActive ? 1 : 0.65,
      }"
      @click="handleStackClick"
    >
      <component :is="slottedTitle" v-if="slottedTitle" />
      <CircularPyramidStackTitle
        v-else
        :step="resolvedStep"
        :title="props.title || `Stage ${resolvedStep}`"
        :connector-width="props.connectorWidth"
      />
    </div>
    <!-- Right Wing: Dot + Connector + Content Card (40px from slab) -->
    <div
      class="alpha-circular-pyramid-stack__right flex-shrink-0 flex items-center justify-end pointer-events-auto cursor-pointer"
      :class="[
        `alpha-circular-pyramid-stack__right--${resolvedIndex}`,
        { 'alpha-circular-pyramid-stack--animated': rootContext?.animation.value },
      ]"
      :style="{
        width: `${rightWingWidth}px`,
        minWidth: `${rightWidth}px`,
        maxWidth: `${rightWingWidth}px`,
        marginRight: rightOffset ? `${rightOffset}px` : undefined,
        opacity: !hasActiveStack || isActive ? 1 : 0.65,
      }"
      @click="handleStackClick"
    >
      <component :is="slottedContent" v-if="slottedContent" />
      <CircularPyramidStackContent
        v-else
        :content="props.content || 'Layer details and operational description.'"
      />
    </div>
  </div>
</template>

<style scoped>
.alpha-circular-pyramid-stack {
  height: 0;
  overflow: visible;
}

.alpha-circular-pyramid-stack__left,
.alpha-circular-pyramid-stack__right {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__left--0 {
  animation: alpha-pyramid-left-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 100ms) both;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__left--1 {
  animation: alpha-pyramid-left-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 180ms) both;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__left--2 {
  animation: alpha-pyramid-left-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 260ms) both;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__left--3 {
  animation: alpha-pyramid-left-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 340ms) both;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__left--4 {
  animation: alpha-pyramid-left-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 420ms) both;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__left--5 {
  animation: alpha-pyramid-left-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 500ms) both;
}

@keyframes alpha-pyramid-left-in {
  0% {
    opacity: 0;
    transform: translateX(-12px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__right--0 {
  animation: alpha-pyramid-right-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 120ms) both;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__right--1 {
  animation: alpha-pyramid-right-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 200ms) both;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__right--2 {
  animation: alpha-pyramid-right-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 280ms) both;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__right--3 {
  animation: alpha-pyramid-right-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 360ms) both;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__right--4 {
  animation: alpha-pyramid-right-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 440ms) both;
}

.alpha-circular-pyramid-stack--animated.alpha-circular-pyramid-stack__right--5 {
  animation: alpha-pyramid-right-in 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--circular-pyramid-start-delay, 0ms) + 520ms) both;
}

@keyframes alpha-pyramid-right-in {
  0% {
    opacity: 0;
    transform: translateX(12px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
