<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  provide,
  useSlots,
  type VNode,
} from 'vue';

import {
  createHorizCardAccentPath,
  createHorizCardPath,
  HORIZ_CARD_KEY,
  hexToRgba,
} from '../../utils/horizCard';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  name: 'HorizCard',
  inheritAttrs: false,
});

export interface IHorizCardProps {
  readonly color?: string;
  readonly dots?: boolean;
  readonly title?: string;
  readonly cardBg?: string;
  readonly textColor?: string;
  readonly titleColor?: string;
  readonly lightColor?: string;
  readonly description?: string;
  readonly step?: string | number;
  readonly icon?: string | object;
  readonly hasIconCircle?: boolean;
}

const props = withDefaults(defineProps<IHorizCardProps>(), {
  dots: true,
  step: '01',
  icon: undefined,
  color: '#ea583a',
  cardBg: '#ffffff',
  title: 'Lorem Ipsum',
  textColor: undefined,
  lightColor: undefined,
  titleColor: undefined,
  description: undefined,
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
  return hasComponentName(node.type, 'HorizCardBadge');
}

function isIconNode(node: VNode): boolean {
  return hasComponentName(node.type, 'HorizCardIcon');
}

function isHeadingNode(node: VNode): boolean {
  return hasComponentName(node.type, 'HorizCardHeading');
}

function isContentNode(node: VNode): boolean {
  return hasComponentName(node.type, 'HorizCardContent');
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

const slottedHeading = computed(() => {
  return defaultNodes.value.find(isHeadingNode);
});

const slottedContent = computed(() => {
  return defaultNodes.value.find(isContentNode);
});

const otherSlottedNodes = computed(() => {
  return defaultNodes.value.filter((node) => {
    return (
      !isBadgeNode(node) &&
      !isIconNode(node) &&
      !isHeadingNode(node) &&
      !isContentNode(node)
    );
  });
});

const resolvedColor = computed(() => {
  return props.color;
});

const resolvedLightColor = computed(() => {
  return (
    props.lightColor ??
    hexToRgba({
      alpha: 0.16,
      hex: props.color,
    })
  );
});

const resolvedCardBg = computed(() => {
  return props.cardBg;
});

const resolvedTitleColor = computed(() => {
  return props.titleColor ?? props.color;
});

const resolvedTextColor = computed(() => {
  return props.textColor;
});

const resolvedStep = computed(() => {
  return props.step;
});

provide(HORIZ_CARD_KEY, {
  step: resolvedStep,
  color: resolvedColor,
  cardBg: resolvedCardBg,
  lightColor: resolvedLightColor,
  titleColor: resolvedTitleColor,
  textColor: resolvedTextColor as ComputedRef<string | undefined>,
});

// Fixed coordinate grid for crisp SVG vector drawing
const CARD_WIDTH = 360;
const CARD_HEIGHT = 260;

const cardPath = computed(() => {
  return createHorizCardPath({
    chamferX: 60,
    chamferY: 76,
    borderRadius: 24,
    chamferFillet: 22,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
  });
});

const accentPath = computed(() => {
  return createHorizCardAccentPath({
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
  'alpha-horiz-card relative inline-block select-none w-[360px] h-[260px] font-sans',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <!-- SVG Vector Layer: Bottom-left accent blob + filleted chamfered card outline -->
    <svg
      class="absolute -left-[28px] -top-[16px] w-[416px] h-[292px] pointer-events-none overflow-visible"
      viewBox="-28 -16 416 292"
      xmlns="http://www.w3.org/2000/svg"
    >
      <!-- Layer 1: Solid accent shape behind the card & chamfer -->
      <path
        class="alpha-horiz-card__accent"
        :d="accentPath"
        :fill="resolvedColor"
      />
      <!-- Layer 2: Main card body with stroke border and filleted chamfered cut -->
      <path
        class="alpha-horiz-card__body"
        :d="cardPath"
        :fill="resolvedCardBg"
        :stroke="resolvedColor"
        stroke-width="2.75"
        stroke-linejoin="round"
      />
    </svg>
    <!-- Ribbon Step Badge at top left (hangs over the top border) -->
    <div class="absolute left-[20px] -top-[20px] z-10">
      <slot name="badge">
        <component :is="slottedBadge" v-if="slottedBadge" />
        <HorizCardBadge v-else :step="resolvedStep" :color="resolvedColor" />
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
            <HorizCardIcon
              v-else
              :icon="props.icon"
              :color="resolvedColor"
              :light-color="resolvedLightColor"
              :size="100"
            />
          </slot>
        </template>
        <!-- Heading + Body Description -->
        <div class="flex-1 flex flex-col justify-center min-w-0 pr-1">
          <slot name="title">
            <component :is="slottedHeading" v-if="slottedHeading" />
            <HorizCardHeading
              v-else
              :color="resolvedTitleColor"
              class="mb-2 text-lg"
            >
              {{ props.title }}
            </HorizCardHeading>
          </slot>
          <slot name="description">
            <component :is="slottedContent" v-if="slottedContent" />
            <HorizCardContent
              v-else
              :color="resolvedTextColor"
              class="text-[11px] leading-[1.45]"
            >
              <template v-if="props.description">
                {{ props.description }}
              </template>
            </HorizCardContent>
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
