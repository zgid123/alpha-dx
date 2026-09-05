<script setup lang="ts">
import { computed, Fragment, inject, provide, useSlots, type VNode } from 'vue';

import {
  DEFAULT_QUAD_HUB_ITEMS,
  type IResolvedQuadHubItem,
  QUAD_HUB_CALLOUT_KEY,
  QUAD_HUB_ROOT_KEY,
  resolveSingleItem,
  type TQuadHubIcon,
} from '../../utils/quadHub';
import QuadHubContent from './QuadHubContent.vue';
import QuadHubHeading from './QuadHubHeading.vue';

defineOptions({
  name: 'QuadHubCallout',
});

export interface IQuadHubCalloutProps {
  readonly id?: string | number;
  readonly icon?: TQuadHubIcon;
  readonly color?: string;
  readonly cardBg?: string;
  readonly arcColor?: string;
  readonly textColor?: string;
  readonly titleColor?: string;
  readonly arcBorderColor?: string;
}

const props = withDefaults(defineProps<IQuadHubCalloutProps>(), {
  id: undefined,
  icon: undefined,
  color: undefined,
  cardBg: undefined,
  arcColor: undefined,
  textColor: undefined,
  titleColor: undefined,
  arcBorderColor: undefined,
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

  return false;
}

const rootContext = inject(QUAD_HUB_ROOT_KEY, undefined);

if (!rootContext) {
  console.warn('[QuadHubCallout] Must be used inside <QuadHub>');
}

const registration = rootContext?.registerCallout(props);
const index = registration?.index ?? 0;

const [firstDefaultItem] = DEFAULT_QUAD_HUB_ITEMS;

const fallbackItem = computed<IResolvedQuadHubItem>(() => {
  const current = DEFAULT_QUAD_HUB_ITEMS[index];

  return resolveSingleItem(current ?? firstDefaultItem, props);
});

const item = computed<IResolvedQuadHubItem>(() => {
  return registration?.item.value ?? fallbackItem.value;
});

provide(QUAD_HUB_CALLOUT_KEY, {
  item,
  index,
});

const slots = useSlots();

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

function isHeadingNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'QuadHubHeading') ||
    node.type === QuadHubHeading
  );
}

function isContentNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'QuadHubContent') ||
    node.type === QuadHubContent
  );
}

const defaultNodes = computed(() => {
  if (!slots.default) {
    return [];
  }

  return flattenVNodes(slots.default());
});

const headingNode = computed(() => {
  return defaultNodes.value.find(isHeadingNode);
});
const contentNode = computed(() => {
  return defaultNodes.value.find(isContentNode);
});
const otherNodes = computed(() => {
  return defaultNodes.value.filter((node) => {
    return !isHeadingNode(node) && !isContentNode(node);
  });
});

const isLeftCard = computed(() => {
  return index === 0 || index === 3;
});

// Placement corresponding to:
// 0: Top-Left (top row, left side) - 1
// 1: Top-Right (top row, right side) - 2
// 2: Bottom-Right (bottom row, right side) - 3
// 3: Bottom-Left (bottom row, left side) - 4
const positionStyle = computed(() => {
  switch (index) {
    case 0: {
      return 'left: 0; right: calc(50% + 95px); top: 10px; bottom: calc(50% + 14px);';
    }
    case 1: {
      return 'left: calc(50% + 95px); right: 0; top: 10px; bottom: calc(50% + 14px);';
    }
    case 2: {
      return 'left: calc(50% + 95px); right: 0; top: calc(50% + 14px); bottom: 10px;';
    }
    case 3: {
      return 'left: 0; right: calc(50% + 95px); top: calc(50% + 14px); bottom: 10px;';
    }
    default: {
      return '';
    }
  }
});

const animation = computed(() => {
  return rootContext?.animation?.value ?? true;
});
</script>

<template>
  <div
    v-if="index < 4"
    :class="[
      'alpha-quad-hub-callout absolute rounded-2xl flex flex-col justify-center z-0 transition-all duration-300 pointer-events-auto shadow-sm select-none box-border',
      isLeftCard ? 'pl-5 pr-16 py-4 text-right' : 'pl-16 pr-5 py-4 text-left',
      `alpha-quad-hub-callout--${index}`,
      { 'alpha-quad-hub-callout--animated': animation },
    ]"
    :style="[
      positionStyle,
      {
        backgroundColor: item.cardBg,
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
      },
    ]"
  >
    <!-- Left-side callouts (TL & BL): Heading on top (right-aligned), then [description | accentBar] -->
    <template v-if="isLeftCard">
      <div class="w-full flex justify-end mb-1">
        <component :is="headingNode" v-if="headingNode" />
      </div>
      <div class="w-full flex items-stretch justify-end gap-2.5">
        <div class="flex-1 flex flex-col items-end min-w-0">
          <component :is="contentNode" v-if="contentNode" />
          <component :is="node" v-for="(node, i) in otherNodes" :key="i" />
        </div>
        <div
          class="w-[3px] self-stretch min-h-[30px] rounded-full flex-shrink-0 my-0.5"
          :style="{ backgroundColor: item.titleColor }"
        />
      </div>
    </template>
    <!-- Right-side callouts (TR & BR): Heading on top (left-aligned), then [accentBar | description] -->
    <template v-else>
      <div class="w-full flex justify-start mb-1">
        <component :is="headingNode" v-if="headingNode" />
      </div>
      <div class="w-full flex items-stretch justify-start gap-2.5">
        <div
          class="w-[3px] self-stretch min-h-[30px] rounded-full flex-shrink-0 my-0.5"
          :style="{ backgroundColor: item.titleColor }"
        />
        <div class="flex-1 flex flex-col items-start min-w-0">
          <component :is="contentNode" v-if="contentNode" />
          <component :is="node" v-for="(node, i) in otherNodes" :key="i" />
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped>
.alpha-quad-hub-callout :deep(p),
.alpha-quad-hub-callout :deep(h1),
.alpha-quad-hub-callout :deep(h2),
.alpha-quad-hub-callout :deep(h3),
.alpha-quad-hub-callout :deep(h4),
.alpha-quad-hub-callout :deep(h5),
.alpha-quad-hub-callout :deep(h6) {
  margin: 0;
  padding: 0;
}

.alpha-quad-hub-callout--animated.alpha-quad-hub-callout--0 {
  animation: quad-callout-left 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--quad-start-delay, 0ms) + 150ms) both;
}

.alpha-quad-hub-callout--animated.alpha-quad-hub-callout--1 {
  animation: quad-callout-right 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--quad-start-delay, 0ms) + 300ms) both;
}

.alpha-quad-hub-callout--animated.alpha-quad-hub-callout--2 {
  animation: quad-callout-right 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--quad-start-delay, 0ms) + 450ms) both;
}

.alpha-quad-hub-callout--animated.alpha-quad-hub-callout--3 {
  animation: quad-callout-left 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--quad-start-delay, 0ms) + 600ms) both;
}

@keyframes quad-callout-right {
  0% {
    opacity: 0;
    transform: translateX(-28px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes quad-callout-left {
  0% {
    opacity: 0;
    transform: translateX(28px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
