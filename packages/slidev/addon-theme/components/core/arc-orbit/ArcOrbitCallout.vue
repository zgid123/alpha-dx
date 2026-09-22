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
  ARC_ORBIT_CALLOUT_KEY,
  ARC_ORBIT_ROOT_KEY,
  DEFAULT_ARC_ORBIT_COLOR,
  DEFAULT_ARC_ORBIT_ITEMS,
  type IArcOrbitItem,
  type IResolvedArcOrbitItem,
  type TArcOrbitPosition,
} from '../../../utils/arcOrbit';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import ArcOrbitBadge from './ArcOrbitBadge.vue';
import ArcOrbitContent from './ArcOrbitContent.vue';
import ArcOrbitHeading from './ArcOrbitHeading.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcOrbitCallout',
});

export interface IArcOrbitCalloutProps {
  readonly position?: TArcOrbitPosition;
  readonly index?: number;
  readonly id?: string | number;
  readonly title?: string;
  readonly description?: string;
  readonly color?: string;
  readonly textColor?: string;
  readonly textGap?: number;
}

const props = withDefaults(defineProps<IArcOrbitCalloutProps>(), {
  position: undefined,
  index: undefined,
  id: undefined,
  title: undefined,
  description: undefined,
  color: undefined,
  textColor: undefined,
  textGap: undefined,
});

interface INamedComponent {
  readonly name?: string;
  readonly __name?: string;
}

function hasComponentName(type: unknown, name: string): boolean {
  if (typeof type === 'object' && type !== null) {
    const comp = type as INamedComponent;

    return comp.name === name || comp.__name === name;
  }

  if (typeof type === 'function') {
    return (type as { name?: string }).name === name;
  }

  return false;
}

const rootContext = inject(ARC_ORBIT_ROOT_KEY, undefined);

const resolvedPosition = computed<TArcOrbitPosition>(() => {
  return props.position ?? rootContext?.position.value ?? 'left';
});

const isRight = computed(() => resolvedPosition.value === 'right');

const calloutToken = Symbol();
const dynamicIndex = rootContext?.registerCallout(calloutToken);

onUnmounted(() => {
  rootContext?.unregisterCallout?.(calloutToken);
});

const resolvedIndex = computed<number>(() => {
  if (props.index !== undefined) {
    return Number(props.index);
  }

  if (dynamicIndex !== undefined) {
    const val =
      typeof dynamicIndex === 'number' ? dynamicIndex : dynamicIndex.value;
    if (val >= 0) {
      return val;
    }
  }

  return 0;
});

const activeItem = computed<IResolvedArcOrbitItem>(() => {
  const customItems = rootContext?.items?.value;
  const customItem = customItems?.[resolvedIndex.value];
  const defaultItem =
    DEFAULT_ARC_ORBIT_ITEMS[resolvedIndex.value] ??
    DEFAULT_ARC_ORBIT_ITEMS[DEFAULT_ARC_ORBIT_ITEMS.length - 1] ??
    DEFAULT_ARC_ORBIT_ITEMS[0];

  const defaultColor = rootContext?.color.value ?? DEFAULT_ARC_ORBIT_COLOR;

  const id = props.id ?? customItem?.id ?? defaultItem.id;
  const title = props.title ?? customItem?.title ?? defaultItem.title;
  const description =
    props.description ?? customItem?.description ?? defaultItem.description;
  const color =
    props.color ?? customItem?.color ?? defaultColor ?? defaultItem.color;
  const textColor =
    props.textColor ?? customItem?.textColor ?? defaultItem.textColor;

  return {
    id,
    title,
    description,
    color,
    textColor,
  };
});

const calloutColor = computed(() => {
  return (
    props.color ??
    rootContext?.color.value ??
    activeItem.value.color ??
    DEFAULT_ARC_ORBIT_COLOR
  );
});

provide(ARC_ORBIT_CALLOUT_KEY, {
  item: activeItem,
  position: resolvedPosition.value,
  index: resolvedIndex.value,
  color: calloutColor,
});

const slots = useSlots();

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

function isBadgeNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'ArcOrbitBadge') ||
    hasComponentName(node.type, 'ArcComparisonBadge') ||
    node.type === ArcOrbitBadge
  );
}

function isHeadingNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'ArcOrbitHeading') ||
    hasComponentName(node.type, 'ArcComparisonHeading') ||
    node.type === ArcOrbitHeading
  );
}

function isContentNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'ArcOrbitContent') ||
    hasComponentName(node.type, 'ArcComparisonContent') ||
    node.type === ArcOrbitContent
  );
}

const defaultNodes = computed(() => {
  if (!slots.default) {
    return [];
  }

  return flattenVNodes(slots.default());
});

const badgeNode = computed(() => defaultNodes.value.find(isBadgeNode));
const headingNode = computed(() => defaultNodes.value.find(isHeadingNode));
const contentNode = computed(() => defaultNodes.value.find(isContentNode));
const otherNodes = computed(() => {
  return defaultNodes.value.filter((node) => {
    return !isBadgeNode(node) && !isHeadingNode(node) && !isContentNode(node);
  });
});

const animation = computed(() => rootContext?.animation?.value ?? true);

const positionStyle = computed(() => {
  const right = isRight.value;
  const calloutGeo = rootContext?.geo.value.callouts[resolvedIndex.value];

  if (calloutGeo) {
    if (right) {
      return {
        position: 'absolute' as const,
        right: `${calloutGeo.badgeOffset}px`,
        top: `${calloutGeo.top}px`,
        width: `${calloutGeo.width}px`,
        zIndex: 10,
      };
    }

    return {
      position: 'absolute' as const,
      left: `${calloutGeo.badgeOffset}px`,
      top: `${calloutGeo.top}px`,
      width: `${calloutGeo.width}px`,
      zIndex: 10,
    };
  }

  const idx = Math.min(Math.max(resolvedIndex.value, 0), 2);
  const offset = idx === 1 ? 184 : 134;
  const topY = idx === 0 ? 66 : idx === 1 ? 214 : 362;
  const w = idx === 1 ? 260 : 310;

  if (right) {
    return {
      position: 'absolute' as const,
      right: `${offset}px`,
      top: `${topY}px`,
      width: `${w}px`,
      zIndex: 10,
    };
  }

  return {
    position: 'absolute' as const,
    left: `${offset}px`,
    top: `${topY}px`,
    width: `${w}px`,
    zIndex: 10,
  };
});

const textStyle = computed(() => {
  const calloutGeo = rootContext?.geo.value.callouts[resolvedIndex.value];
  const gap = props.textGap ?? calloutGeo?.textGap ?? 28;
  const width = calloutGeo?.textWidth ?? 215;

  if (isRight.value) {
    return {
      marginRight: `${gap}px`,
      width: `${width}px`,
    };
  }

  return {
    marginLeft: `${gap}px`,
    width: `${width}px`,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-orbit-callout absolute flex items-start select-none z-10 transition-all duration-300 pointer-events-auto',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="[
      className(),
      isRight ? 'justify-end text-right' : 'justify-start text-left',
      `alpha-arc-orbit-callout--${resolvedPosition}-${resolvedIndex}`,
      { 'alpha-arc-orbit-callout--animated': animation },
    ]"
    :style="positionStyle"
  >
    <!-- Left position: [Badge] [Heading + Content] -->
    <template v-if="!isRight">
      <component :is="badgeNode" v-if="badgeNode" />
      <ArcOrbitBadge v-else />
      <div
        class="flex flex-col items-start text-left min-w-0 pt-0.5"
        :style="textStyle"
      >
        <component :is="headingNode" v-if="headingNode" />
        <ArcOrbitHeading v-else />
        <component :is="contentNode" v-if="contentNode" />
        <ArcOrbitContent v-else />
        <component :is="node" v-for="(node, i) in otherNodes" :key="i" />
      </div>
    </template>
    <!-- Right position: [Heading + Content] [Badge] -->
    <template v-else>
      <div
        class="flex flex-col items-end text-right min-w-0 pt-0.5"
        :style="textStyle"
      >
        <component :is="headingNode" v-if="headingNode" />
        <ArcOrbitHeading v-else />
        <component :is="contentNode" v-if="contentNode" />
        <ArcOrbitContent v-else />
        <component :is="node" v-for="(node, i) in otherNodes" :key="i" />
      </div>
      <component :is="badgeNode" v-if="badgeNode" />
      <ArcOrbitBadge v-else />
    </template>
  </div>
</template>

<style scoped>
.alpha-arc-orbit-callout :deep(p),
.alpha-arc-orbit-callout :deep(h1),
.alpha-arc-orbit-callout :deep(h2),
.alpha-arc-orbit-callout :deep(h3),
.alpha-arc-orbit-callout :deep(h4),
.alpha-arc-orbit-callout :deep(h5),
.alpha-arc-orbit-callout :deep(h6) {
  margin: 0;
  padding: 0;
}

.alpha-arc-orbit-callout--animated.alpha-arc-orbit-callout--left-0 {
  animation: arc-orbit-fade-left 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 120ms) both;
}

.alpha-arc-orbit-callout--animated.alpha-arc-orbit-callout--left-1 {
  animation: arc-orbit-fade-left 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 200ms) both;
}

.alpha-arc-orbit-callout--animated.alpha-arc-orbit-callout--left-2 {
  animation: arc-orbit-fade-left 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 280ms) both;
}

.alpha-arc-orbit-callout--animated.alpha-arc-orbit-callout--left-3 {
  animation: arc-orbit-fade-left 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 360ms) both;
}

.alpha-arc-orbit-callout--animated.alpha-arc-orbit-callout--right-0 {
  animation: arc-orbit-fade-right 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 120ms) both;
}

.alpha-arc-orbit-callout--animated.alpha-arc-orbit-callout--right-1 {
  animation: arc-orbit-fade-right 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 200ms) both;
}

.alpha-arc-orbit-callout--animated.alpha-arc-orbit-callout--right-2 {
  animation: arc-orbit-fade-right 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 280ms) both;
}

.alpha-arc-orbit-callout--animated.alpha-arc-orbit-callout--right-3 {
  animation: arc-orbit-fade-right 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 360ms) both;
}

@keyframes arc-orbit-fade-left {
  0% {
    opacity: 0;
    transform: translateX(-14px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes arc-orbit-fade-right {
  0% {
    opacity: 0;
    transform: translateX(14px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
