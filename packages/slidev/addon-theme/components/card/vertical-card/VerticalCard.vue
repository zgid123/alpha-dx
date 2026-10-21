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

import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import {
  createVerticalCardBottomBlobPath,
  createVerticalCardTopRightBlobPath,
  type TVerticalCardBadgeVariant,
  VERT_CARD_KEY,
} from '../../../utils/card/vertical-card';

defineOptions({
  name: 'VerticalCard',
  inheritAttrs: false,
});

export interface IVerticalCardProps {
  readonly color?: string;
  readonly dots?: boolean;
  readonly title?: string | VNode;
  readonly cardBg?: string;
  readonly textColor?: string;
  readonly hasDivider?: boolean;
  readonly step?: string | number;
  readonly icon?: string | object;
  readonly hasIconCircle?: boolean;
  /**
   * Controls the badge display mode:
   * - 'outside': ribbon badge anchored to the outer left border (default)
   * - 'inside': badge displayed inside the card body (future state)
   * - 'none' | 'hidden': badge is completely hidden
   */
  readonly variant?: TVerticalCardBadgeVariant;
  readonly badgeVariant?: TVerticalCardBadgeVariant;
}

const props = withDefaults(defineProps<IVerticalCardProps>(), {
  dots: true,
  step: '01',
  icon: undefined,
  hasDivider: true,
  title: undefined,
  color: 'var(--alpha-vertical-card-accent)',
  cardBg: 'var(--alpha-vertical-card-bg)',
  variant: undefined,
  textColor: undefined,
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
  return hasComponentName(node.type, 'VerticalCardBadge');
}

function isIconNode(node: VNode): boolean {
  return hasComponentName(node.type, 'VerticalCardIcon');
}

function isContentNode(node: VNode): boolean {
  return hasComponentName(node.type, 'VerticalCardContent');
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
  return props.color !== 'var(--alpha-vertical-card-accent)'
    ? props.color
    : undefined;
});

const resolvedColor = computed(() => {
  return props.color;
});

const resolvedStripeLightColor = computed(() => {
  if (customColor.value) {
    return `color-mix(in srgb, ${props.color} 55%, transparent)`;
  }

  return `var(--alpha-vertical-card-stripe-light, color-mix(in srgb, ${props.color} 55%, transparent))`;
});

const resolvedCardBg = computed(() => {
  return props.cardBg;
});

const resolvedTextColor = computed(() => {
  return props.textColor;
});

const resolvedStep = computed(() => {
  return props.step;
});

const resolvedBadgeVariant = computed<TVerticalCardBadgeVariant>(() => {
  return props.variant ?? props.badgeVariant ?? 'outside';
});

const isBadgeVisible = computed(() => {
  return (
    resolvedBadgeVariant.value !== 'none' &&
    resolvedBadgeVariant.value !== 'hidden'
  );
});

const isBadgeOutside = computed(() => {
  return resolvedBadgeVariant.value === 'outside';
});

provide(VERT_CARD_KEY, {
  step: resolvedStep,
  color: customColor as ComputedRef<string>,
  cardBg: resolvedCardBg,
  badgeVariant: resolvedBadgeVariant,
  hasDivider: computed(() => props.hasDivider),
  textColor: resolvedTextColor,
});

const BLOB_WIDTH = 128;
const BLOB_HEIGHT = 112;

const bottomBlobPath = computed(() => {
  return createVerticalCardBottomBlobPath({
    blobHeight: 96,
    blobWidth: 128,
    borderRadius: 21,
    width: BLOB_WIDTH,
    height: BLOB_HEIGHT,
  });
});

const topRightInnerBlobPath = computed(() => {
  return createVerticalCardTopRightBlobPath({
    blobHeight: 96,
    blobWidth: 128,
    borderRadius: 21,
    width: BLOB_WIDTH,
    height: BLOB_HEIGHT,
  });
});

const topRightOuterBlobPath = computed(() => {
  return createVerticalCardTopRightBlobPath({
    blobHeight: 76,
    blobWidth: 104,
    borderRadius: 21,
    width: BLOB_WIDTH,
    height: BLOB_HEIGHT,
  });
});

// Determine whether icon circle is active (optional icon)
const isIconActive = computed(() => {
  if (props.hasIconCircle !== undefined) {
    return props.hasIconCircle;
  }

  return Boolean(props.icon || slots.icon || slottedIcon.value !== undefined);
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-vertical-card relative flex flex-col w-full h-full select-none rounded-3xl border-[2.75px] border-solid border-(--alpha-vertical-card-accent) bg-(--alpha-vertical-card-bg) font-sans',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      '--alpha-vertical-card-accent': customColor,
      '--alpha-vertical-card-title': customColor,
      '--alpha-vertical-card-bg':
        props.cardBg !== 'var(--alpha-vertical-card-bg)'
          ? resolvedCardBg
          : undefined,
    }"
  >
    <!-- Clipped decorative accent layers (responsive and symmetrical in opposite corners) -->
    <div
      class="absolute inset-0 rounded-[21.25px] overflow-hidden pointer-events-none"
    >
      <!-- Bottom-left organic wave blob (kept as requested) -->
      <svg
        aria-hidden="true"
        class="absolute bottom-0 left-0 w-32 h-28 pointer-events-none overflow-visible"
        viewBox="0 0 128 112"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="alpha-vertical-card__blob"
          :d="bottomBlobPath"
          :fill="resolvedColor"
        />
      </svg>
      <!-- Top-right corner organic wave blob (symmetrical with bottom-left) -->
      <svg
        aria-hidden="true"
        class="absolute top-0 right-0 w-32 h-28 pointer-events-none overflow-visible"
        viewBox="0 0 128 112"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Inner diagonal wave band (lighter tone) -->
        <path
          class="alpha-vertical-card__blob-top-inner"
          :d="topRightInnerBlobPath"
          :fill="resolvedStripeLightColor"
        />
        <!-- Outer diagonal wave accent (accent tone) -->
        <path
          class="alpha-vertical-card__blob-top-outer"
          :d="topRightOuterBlobPath"
          :fill="resolvedColor"
        />
      </svg>
    </div>
    <!-- Ribbon Step Badge on left edge (pointing right into the card) -->
    <div
      v-if="isBadgeOutside && isBadgeVisible"
      class="absolute -left-5 z-10"
      :class="isIconActive ? 'top-18' : 'top-15'"
    >
      <slot name="badge">
        <component :is="slottedBadge" v-if="slottedBadge" />
        <VerticalCardBadge v-else :step="resolvedStep" :color="customColor" />
      </slot>
    </div>
    <!-- Card Content Layer -->
    <div
      class="relative z-10 w-full h-full pt-8 pb-5 px-6 flex flex-col justify-between items-center"
    >
      <!-- Optional Icon Circle (rendered when icon/slot is provided) -->
      <template v-if="isIconActive">
        <div class="flex items-center justify-center shrink-0 mb-3">
          <slot name="icon">
            <component :is="slottedIcon" v-if="slottedIcon" />
            <VerticalCardIcon
              v-else
              :icon="props.icon"
              :color="customColor"
              :size="108"
            />
          </slot>
        </div>
      </template>
      <!-- Title, Divider, and Content Description -->
      <div
        class="flex flex-col items-center justify-center flex-1 w-full min-w-0"
        :class="{ 'my-auto py-4': !isIconActive }"
      >
        <div
          v-if="$slots.title || props.title != null"
          class="flex flex-col items-center w-full"
        >
          <h3
            class="alpha-vertical-card-title font-sans font-bold tracking-tight leading-tight text-center text-(--alpha-vertical-card-title)"
          >
            <slot v-if="$slots.title" name="title" />
            <component :is="props.title" v-else-if="isVNode(props.title)" />
            <template v-else-if="typeof props.title === 'string'">{{
              props.title
            }}</template>
          </h3>
          <div
            v-if="props.hasDivider"
            class="mt-2.5 flex items-center justify-center w-32 relative"
          >
            <div class="w-full h-[1.5px] bg-(--alpha-vertical-card-title)" />
            <span
              class="absolute w-2 h-2 rounded-full bg-(--alpha-vertical-card-title)"
            />
          </div>
        </div>
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
      <!-- Bottom Row: Centered Decorative Indicator Dots -->
      <div
        v-if="props.dots"
        class="flex justify-center items-center gap-2 pt-1"
      >
        <slot name="dots">
          <span
            class="w-2.5 h-2.5 rounded-full inline-block"
            :style="{ backgroundColor: resolvedColor }"
          />
          <span
            class="w-2.5 h-2.5 rounded-full inline-block opacity-40"
            :style="{ backgroundColor: resolvedColor }"
          />
          <span
            class="w-2.5 h-2.5 rounded-full inline-block opacity-40"
            :style="{ backgroundColor: resolvedColor }"
          />
        </slot>
      </div>
    </div>
  </div>
</template>
