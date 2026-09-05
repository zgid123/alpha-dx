<script setup lang="ts">
import { computed, Fragment, inject, provide, useSlots, type VNode } from 'vue';

import {
  DEFAULT_HEX_TRIAD_ITEMS,
  HEX_TRIAD_CALLOUT_KEY,
  HEX_TRIAD_ROOT_KEY,
  type IHexTriadItem,
} from '../../utils/hexTriad';
import HexTriadBadge from './HexTriadBadge.vue';
import HexTriadContent from './HexTriadContent.vue';
import HexTriadHeading from './HexTriadHeading.vue';

defineOptions({
  name: 'HexTriadCallout',
});

interface INamedComponent {
  readonly name?: string;
}

function hasComponentName(type: unknown, name: string): boolean {
  if (typeof type === 'object' && type !== null && 'name' in type) {
    return (type as INamedComponent).name === name;
  }

  return false;
}

const rootContext = inject(HEX_TRIAD_ROOT_KEY, undefined);

if (!rootContext) {
  console.warn('[HexTriadCallout] Must be used inside <HexTriad>');
}

const registration = rootContext?.registerCallout();
const index = registration?.index ?? 0;

const fallbackItem = computed<IHexTriadItem>(() => {
  return DEFAULT_HEX_TRIAD_ITEMS[0];
});

const item = registration?.item ?? fallbackItem;

const setBadgeText = (text: string | number): void => {
  registration?.setBadgeText(text);
};

provide(HEX_TRIAD_CALLOUT_KEY, {
  item,
  index,
  setBadgeText,
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

function isBadgeNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'HexTriadBadge') || node.type === HexTriadBadge
  );
}

function isHeadingNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'HexTriadHeading') ||
    node.type === HexTriadHeading
  );
}

function isContentNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'HexTriadContent') ||
    node.type === HexTriadContent
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

// Positions matching the design exactly:
// Index 0: upper-right pocket above orange hex
// Index 1: lower-right, right of orange hex
// Index 2: lower-left, left of blue hex
const positionStyle = computed(() => {
  if (index === 0) {
    return 'left: calc(50% + 90px); top: 20px;';
  }

  if (index === 1) {
    return 'left: calc(50% + 185px); top: 210px;';
  }

  return 'right: calc(50% + 185px); top: 210px;';
});

const animation = computed(() => rootContext?.animation?.value ?? true);

const containerClass = computed(() => {
  if (index === 2) {
    return `alpha-hex-triad-callout alpha-hex-triad-callout--${index} absolute flex items-start gap-3 justify-end text-right z-10 pointer-events-auto`;
  }

  return `alpha-hex-triad-callout alpha-hex-triad-callout--${index} absolute flex items-start gap-3 justify-start text-left z-10 pointer-events-auto`;
});
</script>

<template>
  <div
    v-if="index < 3"
    :class="[containerClass, { 'alpha-hex-triad-callout--animated': animation }]"
    :style="positionStyle"
  >
    <!-- For Index 0 and 1: Badge on left, Text on right -->
    <template v-if="index !== 2">
      <component :is="badgeNode" v-if="badgeNode" />
      <HexTriadBadge v-else />
      <div class="flex flex-col items-start text-left">
        <component :is="headingNode" v-if="headingNode" />
        <HexTriadHeading v-else />
        <component :is="contentNode" v-if="contentNode" />
        <HexTriadContent v-else />
        <component :is="node" v-for="(node, i) in otherNodes" :key="i" />
      </div>
    </template>
    <!-- For Index 2 (Blue / Left): Text on left, Badge on right -->
    <template v-else>
      <div class="flex flex-col items-end text-right">
        <component :is="headingNode" v-if="headingNode" />
        <HexTriadHeading v-else />
        <component :is="contentNode" v-if="contentNode" />
        <HexTriadContent v-else />
        <component :is="node" v-for="(node, i) in otherNodes" :key="i" />
      </div>
      <component :is="badgeNode" v-if="badgeNode" />
      <HexTriadBadge v-else />
    </template>
  </div>
</template>

<style scoped>
.alpha-hex-triad-callout--animated.alpha-hex-triad-callout--0 {
  animation: hex-callout-display 400ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--hex-start-delay, 0ms) + 250ms) both;
}

.alpha-hex-triad-callout--animated.alpha-hex-triad-callout--1 {
  animation: hex-callout-display 400ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--hex-start-delay, 0ms) + 450ms) both;
}

.alpha-hex-triad-callout--animated.alpha-hex-triad-callout--2 {
  animation: hex-callout-display 400ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--hex-start-delay, 0ms) + 650ms) both;
}

@keyframes hex-callout-display {
  0% {
    opacity: 0;
    transform: translateY(12px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
