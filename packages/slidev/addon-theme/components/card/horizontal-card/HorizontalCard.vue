<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  provide,
  useSlots,
  isVNode,
  type VNode,
} from 'vue';

import {
  createHorizontalCardAccentPath,
  createHorizontalCardPath,
  HORIZ_CARD_KEY,
  type THorizontalCardBadgeVariant,
} from '../../../utils/card/horizontal-card';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  name: 'HorizontalCard',
  inheritAttrs: false,
});

export interface IHorizontalCardProps {
  readonly color?: string;
  readonly dots?: boolean;
  readonly title?: string | VNode;
  readonly cardBg?: string;
  readonly textColor?: string;
  readonly step?: string | number;
  readonly icon?: string | object;
  readonly hasIconCircle?: boolean;
  /**
   * Controls the badge display mode:
   * - 'outside': ribbon badge anchored over the top border (default)
   * - 'none' | 'hidden': badge is completely hidden
   */
  readonly variant?: THorizontalCardBadgeVariant;
  readonly badgeVariant?: THorizontalCardBadgeVariant;
}

const props = withDefaults(defineProps<IHorizontalCardProps>(), {
  dots: true,
  step: '01',
  icon: undefined,
  color: 'var(--alpha-horizontal-card-accent)',
  cardBg: 'var(--alpha-horizontal-card-bg)',
  title: undefined,
  textColor: undefined,
  variant: undefined,
  badgeVariant: 'outside',
  hasIconCircle: undefined,
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
  return hasComponentName(node.type, 'HorizontalCardBadge');
}

function isIconNode(node: VNode): boolean {
  return hasComponentName(node.type, 'HorizontalCardIcon');
}

function isContentNode(node: VNode): boolean {
  return hasComponentName(node.type, 'HorizontalCardContent');
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

const slottedIcon = computed(() => {
  return defaultNodes.value.find(isIconNode);
});

const slottedContent = computed(() => {
  return defaultNodes.value.find(isContentNode);
});

const otherSlottedNodes = computed(() => {
  return defaultNodes.value.filter((node) => {
    return !isBadgeNode(node) && !isIconNode(node) && !isContentNode(node);
  });
});

const customColor = computed(() => {
  return props.color !== 'var(--alpha-horizontal-card-accent)'
    ? props.color
    : undefined;
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

const resolvedBadgeVariant = computed<THorizontalCardBadgeVariant>(() => {
  return props.variant ?? props.badgeVariant ?? 'outside';
});

const isBadgeVisible = computed(() => {
  return (
    resolvedBadgeVariant.value !== 'none' &&
    resolvedBadgeVariant.value !== 'hidden'
  );
});

const resolvedStep = computed(() => {
  return props.step;
});

provide(HORIZ_CARD_KEY, {
  step: resolvedStep,
  color: customColor as ComputedRef<string>,
  textColor: resolvedTextColor,
});

// Fixed coordinate grid for crisp SVG vector drawing
const CARD_WIDTH = 360;
const CARD_HEIGHT = 260;

const cardPath = computed(() => {
  return createHorizontalCardPath({
    chamferX: 60,
    chamferY: 76,
    borderRadius: 24,
    chamferFillet: 22,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  });
});

const accentPath = computed(() => {
  return createHorizontalCardAccentPath({
    chamferX: 60,
    chamferY: 76,
    chamferFillet: 22,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    accentThickness: 16,
    accentTopFillet: 22,
    accentBottomFillet: 22,
  });
});

// Determine whether icon circle is active
const isIconActive = computed(() => {
  if (props.hasIconCircle !== undefined) {
    return props.hasIconCircle;
  }

  return Boolean(props.icon || slots.icon || slottedIcon.value !== undefined);
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-horizontal-card relative inline-block select-none w-90 h-65 font-sans',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      '--alpha-horizontal-card-accent': customColor,
      '--alpha-horizontal-card-title': customColor,
      '--alpha-horizontal-card-bg':
        props.cardBg !== 'var(--alpha-horizontal-card-bg)'
          ? resolvedCardBg
          : undefined,
    }"
  >
    <!-- SVG Vector Layer: Bottom-left accent blob + filleted chamfered card outline -->
    <svg
      aria-hidden="true"
      class="absolute -left-7 -top-4 w-104 h-73 pointer-events-none overflow-visible"
      viewBox="-28 -16 416 292"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Layer 1: Solid accent shape behind the card & chamfer -->
      <path
        class="alpha-horizontal-card__accent"
        :d="accentPath"
        :fill="resolvedColor"
      />
      <!-- Layer 2: Main card body with stroke border and filleted chamfered cut -->
      <path
        class="alpha-horizontal-card__body"
        :d="cardPath"
        :fill="resolvedCardBg"
        :stroke="resolvedColor"
        stroke-width="2.75"
        stroke-linejoin="round"
      />
    </svg>
    <!-- Ribbon Step Badge at top left (hangs over the top border) -->
    <div v-if="isBadgeVisible" class="absolute left-5 -top-5 z-10">
      <slot name="badge">
        <component :is="slottedBadge" v-if="slottedBadge" />
        <HorizontalCardBadge v-else :step="resolvedStep" :color="customColor" />
      </slot>
    </div>
    <!-- Card Content Layer -->
    <div
      class="relative z-10 w-full h-full pt-10 pb-6 px-6 flex flex-col justify-between"
    >
      <!-- Middle Row: Optional Icon Circle + Text Content -->
      <div
        class="flex items-center gap-4 flex-1"
        :class="{ 'pl-1': isIconActive }"
      >
        <!-- Icon Circle (rendered when icon/slot is provided) -->
        <template v-if="isIconActive">
          <slot name="icon">
            <component :is="slottedIcon" v-if="slottedIcon" />
            <HorizontalCardIcon
              v-else
              :icon="props.icon"
              :color="customColor"
              :size="100"
            />
          </slot>
        </template>
        <!-- Heading + Body Description -->
        <div class="flex-1 flex flex-col justify-center min-w-0 pr-1">
          <h4
            v-if="$slots.title || props.title != null"
            class="alpha-horizontal-card-title mb-2 font-bold text-(--alpha-horizontal-card-title)"
          >
            <slot v-if="$slots.title" name="title" />
            <component :is="props.title" v-else-if="isVNode(props.title)" />
            <span v-else-if="typeof props.title === 'string'">{{
              props.title
            }}</span>
          </h4>
          <slot name="content">
            <component :is="slottedContent" v-if="slottedContent" />
          </slot>
          <!-- Any other custom slotted components -->
          <component
            :is="node"
            v-for="(node, index) in otherSlottedNodes"
            :key="index"
          />
        </div>
      </div>
      <!-- Bottom Row: Decorative Indicator Dots -->
      <div v-if="props.dots" class="flex justify-end items-center pr-2 pb-1">
        <slot name="dots">
          <div class="inline-flex items-center gap-1.5 opacity-90">
            <span
              class="w-2 h-2 rounded-full inline-block"
              :style="{ backgroundColor: resolvedColor }"
            />
            <span
              class="w-2 h-2 rounded-full inline-block"
              :style="{ backgroundColor: resolvedColor }"
            />
            <span
              class="w-2 h-2 rounded-full inline-block"
              :style="{ backgroundColor: resolvedColor }"
            />
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
