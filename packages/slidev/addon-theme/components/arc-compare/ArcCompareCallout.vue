<script setup lang="ts">
import { computed, Fragment, inject, provide, useSlots, type VNode } from 'vue';

import {
  ARC_COMPARE_CALLOUT_KEY,
  ARC_COMPARE_ROOT_KEY,
  ARC_COMPARE_SIDE_KEY,
  DEFAULT_LEFT_ITEMS,
  DEFAULT_RIGHT_ITEMS,
  type IArcCompareItem,
  type IResolvedArcCompareItem,
} from '../../utils/arcCompare';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import ArcCompareBadge from './ArcCompareBadge.vue';
import ArcCompareContent from './ArcCompareContent.vue';
import ArcCompareHeading from './ArcCompareHeading.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcCompareCallout',
});

export interface IArcCompareCalloutProps {
  readonly side?: 'left' | 'right';
  readonly index?: number;
  readonly id?: string | number;
  readonly title?: string;
  readonly description?: string;
  readonly color?: string;
  readonly textColor?: string;
  readonly textGap?: number;
}

const props = withDefaults(defineProps<IArcCompareCalloutProps>(), {
  side: undefined,
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

const rootContext = inject(ARC_COMPARE_ROOT_KEY, undefined);
const sideContext = inject(ARC_COMPARE_SIDE_KEY, undefined);

const resolvedSide = computed<'left' | 'right'>(() => {
  return props.side ?? sideContext?.side ?? 'left';
});

const autoIndex = sideContext?.registerCallout();

const resolvedIndex = computed<number>(() => {
  return props.index ?? autoIndex ?? 0;
});

const activeItem = computed<IResolvedArcCompareItem>(() => {
  const isRight = resolvedSide.value === 'right';
  const defaultList = isRight ? DEFAULT_RIGHT_ITEMS : DEFAULT_LEFT_ITEMS;
  const fallback =
    defaultList[resolvedIndex.value] ??
    defaultList[defaultList.length - 1] ??
    defaultList[0];

  const override: IArcCompareItem = {
    id: props.id,
    title: props.title,
    description: props.description,
    color: props.color ?? sideContext?.color.value,
    textColor: props.textColor,
  };

  return {
    id: override.id ?? fallback.id,
    title: override.title ?? fallback.title,
    description: override.description ?? fallback.description,
    color: override.color ?? fallback.color,
    textColor: override.textColor ?? fallback.textColor,
  };
});

const sideColor = computed(() => {
  return props.color ?? sideContext?.color.value ?? activeItem.value.color;
});

provide(ARC_COMPARE_CALLOUT_KEY, {
  item: activeItem,
  side: resolvedSide.value,
  index: resolvedIndex.value,
  color: sideColor,
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
    hasComponentName(node.type, 'ArcCompareBadge') ||
    node.type === ArcCompareBadge
  );
}

function isHeadingNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'ArcCompareHeading') ||
    node.type === ArcCompareHeading
  );
}

function isContentNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'ArcCompareContent') ||
    node.type === ArcCompareContent
  );
}

const defaultNodes = computed(() => {
  if (!slots.default) {
    return [];
  }

  return flattenVNodes(slots.default());
});

const badgeNode = computed(() => {
  return defaultNodes.value.find(isBadgeNode);
});

const headingNode = computed(() => {
  return defaultNodes.value.find(isHeadingNode);
});

const contentNode = computed(() => {
  return defaultNodes.value.find(isContentNode);
});

const otherNodes = computed(() => {
  return defaultNodes.value.filter((node) => {
    return !isBadgeNode(node) && !isHeadingNode(node) && !isContentNode(node);
  });
});

const animation = computed(() => {
  return rootContext?.animation?.value ?? true;
});

const isRight = computed(() => {
  return resolvedSide.value === 'right';
});

// Dynamic coordinate positioning aligned with parametric SVG geometry
const positionStyle = computed(() => {
  const right = isRight.value;
  const sideGeo = right
    ? rootContext?.geo.value.right
    : rootContext?.geo.value.left;

  const calloutGeo = sideGeo?.callouts[resolvedIndex.value];

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
  const sideGeo = isRight.value
    ? rootContext?.geo.value.right
    : rootContext?.geo.value.left;
  const calloutGeo = sideGeo?.callouts[resolvedIndex.value];
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
  'alpha-arc-compare-callout absolute flex items-start select-none z-10 transition-all duration-300 pointer-events-auto',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="[
      className(),
      isRight ? 'justify-end text-right' : 'justify-start text-left',
      `alpha-arc-compare-callout--${resolvedSide}-${resolvedIndex}`,
      { 'alpha-arc-compare-callout--animated': animation },
    ]"
    :style="positionStyle"
  >
    <!-- Left side: [Badge] [Heading + Content] -->
    <template v-if="!isRight">
      <component :is="badgeNode" v-if="badgeNode" />
      <ArcCompareBadge v-else />
      <div
        class="flex flex-col items-start text-left min-w-0 pt-0.5"
        :style="textStyle"
      >
        <component :is="headingNode" v-if="headingNode" />
        <ArcCompareHeading v-else />
        <component :is="contentNode" v-if="contentNode" />
        <ArcCompareContent v-else />
        <component :is="node" v-for="(node, i) in otherNodes" :key="i" />
      </div>
    </template>
    <!-- Right side: [Heading + Content] [Badge] -->
    <template v-else>
      <div
        class="flex flex-col items-end text-right min-w-0 pt-0.5"
        :style="textStyle"
      >
        <component :is="headingNode" v-if="headingNode" />
        <ArcCompareHeading v-else />
        <component :is="contentNode" v-if="contentNode" />
        <ArcCompareContent v-else />
        <component :is="node" v-for="(node, i) in otherNodes" :key="i" />
      </div>
      <component :is="badgeNode" v-if="badgeNode" />
      <ArcCompareBadge v-else />
    </template>
  </div>
</template>

<style scoped>
.alpha-arc-compare-callout :deep(p),
.alpha-arc-compare-callout :deep(h1),
.alpha-arc-compare-callout :deep(h2),
.alpha-arc-compare-callout :deep(h3),
.alpha-arc-compare-callout :deep(h4),
.alpha-arc-compare-callout :deep(h5),
.alpha-arc-compare-callout :deep(h6) {
  margin: 0;
  padding: 0;
}

.alpha-arc-compare-callout--animated.alpha-arc-compare-callout--left-0 {
  animation: arc-callout-fade-left 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-compare-start-delay, 0ms) + 120ms) both;
}

.alpha-arc-compare-callout--animated.alpha-arc-compare-callout--left-1 {
  animation: arc-callout-fade-left 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-compare-start-delay, 0ms) + 200ms) both;
}

.alpha-arc-compare-callout--animated.alpha-arc-compare-callout--left-2 {
  animation: arc-callout-fade-left 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-compare-start-delay, 0ms) + 280ms) both;
}

.alpha-arc-compare-callout--animated.alpha-arc-compare-callout--left-3 {
  animation: arc-callout-fade-left 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-compare-start-delay, 0ms) + 360ms) both;
}

.alpha-arc-compare-callout--animated.alpha-arc-compare-callout--right-0 {
  animation: arc-callout-fade-right 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-compare-start-delay, 0ms) + 120ms) both;
}

.alpha-arc-compare-callout--animated.alpha-arc-compare-callout--right-1 {
  animation: arc-callout-fade-right 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-compare-start-delay, 0ms) + 200ms) both;
}

.alpha-arc-compare-callout--animated.alpha-arc-compare-callout--right-2 {
  animation: arc-callout-fade-right 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-compare-start-delay, 0ms) + 280ms) both;
}

.alpha-arc-compare-callout--animated.alpha-arc-compare-callout--right-3 {
  animation: arc-callout-fade-right 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-compare-start-delay, 0ms) + 360ms) both;
}

@keyframes arc-callout-fade-left {
  0% {
    opacity: 0;
    transform: translateX(-14px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes arc-callout-fade-right {
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
