<script setup lang="ts">
import { computed, Fragment, provide, useSlots, type VNode } from 'vue';

import { CHEVRON_CARD_KEY } from '../../utils/chevronCard';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import ChevronCardBadge from './ChevronCardBadge.vue';
import ChevronCardContent from './ChevronCardContent.vue';
import ChevronCardHeading from './ChevronCardHeading.vue';

defineOptions({
  name: 'ChevronCard',
  inheritAttrs: false,
});

export interface IChevronCardProps {
  readonly step?: string | number;
  readonly icon?: string | object;
  readonly color?: string;
  readonly width?: number | string;
  readonly cardBg?: string;
  readonly height?: number | string;
  readonly textColor?: string;
  readonly animation?: boolean;
  readonly notchDepth?: number;
  readonly titleColor?: string;
  readonly chevronWidth?: number;
  readonly borderRadius?: number;
}

const props = withDefaults(defineProps<IChevronCardProps>(), {
  step: '01',
  icon: undefined,
  color: '#f59e0b',
  width: undefined,
  cardBg: '#f5f5f7',
  height: undefined,
  textColor: undefined,
  animation: true,
  notchDepth: 26,
  titleColor: undefined,
  chevronWidth: 130,
  borderRadius: 18,
});

const slots = useSlots();

interface INamedComponent {
  readonly name?: string;
}

function hasComponentName(type: unknown, name: string): boolean {
  if (typeof type === 'object' && type !== null && 'name' in type) {
    return (type as INamedComponent).name === name;
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

function isBadgeNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'ChevronCardBadge') ||
    node.type === ChevronCardBadge
  );
}

function isHeadingNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'ChevronCardHeading') ||
    node.type === ChevronCardHeading
  );
}

function isContentNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'ChevronCardContent') ||
    node.type === ChevronCardContent
  );
}

const defaultNodes = computed(() => {
  if (!slots.default) {
    return [];
  }

  return flattenVNodes(slots.default());
});

const slottedBadge = computed(() => {
  return defaultNodes.value.find(isBadgeNode);
});

const slottedHeading = computed(() => {
  return defaultNodes.value.find(isHeadingNode);
});

const slottedContent = computed(() => {
  return defaultNodes.value.find(isContentNode);
});

const otherSlottedNodes = computed(() => {
  return defaultNodes.value.filter((node) => {
    return !isBadgeNode(node) && !isHeadingNode(node) && !isContentNode(node);
  });
});

const resolvedStep = computed(() => {
  return props.step;
});

const resolvedColor = computed(() => {
  return props.color;
});

const resolvedCardBg = computed(() => {
  return props.cardBg;
});

const resolvedTextColor = computed(() => {
  return props.textColor;
});

const resolvedTitleColor = computed(() => {
  return props.titleColor;
});

provide(CHEVRON_CARD_KEY, {
  step: resolvedStep,
  color: resolvedColor,
  cardBg: resolvedCardBg,
  textColor: resolvedTextColor,
  titleColor: resolvedTitleColor,
});

const resolvedWidth = computed(() => {
  if (props.width === undefined) {
    return undefined;
  }

  return typeof props.width === 'number' ? `${props.width}px` : props.width;
});

const resolvedHeight = computed(() => {
  if (props.height === undefined) {
    return undefined;
  }

  return typeof props.height === 'number' ? `${props.height}px` : props.height;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-chevron-card flex items-stretch w-full select-none font-sans',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="[
      className(),
      { 'alpha-chevron-card--animated': props.animation },
    ]"
    :style="{
      width: resolvedWidth,
      minHeight: resolvedHeight ?? '112px',
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
    }"
  >
    <!-- Chevron Step Badge Layer -->
    <div class="flex-shrink-0 z-10 flex">
      <slot name="badge">
        <component :is="slottedBadge" v-if="slottedBadge" />
        <ChevronCardBadge
          v-else
          :step="resolvedStep"
          :icon="props.icon"
          :color="resolvedColor"
          :width="props.chevronWidth"
          :notch-depth="props.notchDepth"
        />
      </slot>
    </div>
    <!-- Content Body Layer -->
    <div
      class="flex-1 min-w-0 flex flex-col justify-center py-4 pr-6"
      :style="{
        backgroundColor: resolvedCardBg,
        borderRadius: `0 ${props.borderRadius}px ${props.borderRadius}px 0`,
        marginLeft: `-${props.notchDepth}px`,
        paddingLeft: `${props.notchDepth + 20}px`,
      }"
    >
      <slot name="title">
        <component :is="slottedHeading" v-if="slottedHeading" />
      </slot>
      <slot name="description">
        <component :is="slottedContent" v-if="slottedContent" />
      </slot>
      <component
        :is="node"
        v-for="(node, index) in otherSlottedNodes"
        :key="index"
      />
    </div>
  </div>
</template>

<style scoped>
.alpha-chevron-card--animated {
  animation: chevron-card-fade-in 400ms cubic-bezier(0.16, 1, 0.3, 1) both;
}

@keyframes chevron-card-fade-in {
  0% {
    opacity: 0;
    transform: translateX(-16px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}
</style>
