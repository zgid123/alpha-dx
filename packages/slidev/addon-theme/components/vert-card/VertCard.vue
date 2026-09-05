<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  provide,
  useSlots,
  type VNode,
} from 'vue';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import {
  createVertCardBottomBlobPath,
  createVertCardTopRightBlobPath,
  hexToRgba,
  type TVertCardBadgeVariant,
  VERT_CARD_KEY,
} from '../../utils/vertCard';

defineOptions({
  name: 'VertCard',
  inheritAttrs: false,
});

export interface IVertCardProps {
  readonly color?: string;
  readonly dots?: boolean;
  readonly title?: string;
  readonly cardBg?: string;
  readonly textColor?: string;
  readonly titleColor?: string;
  readonly lightColor?: string;
  readonly stripeColor?: string;
  readonly description?: string;
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
  readonly variant?: TVertCardBadgeVariant;
  readonly badgeVariant?: TVertCardBadgeVariant;
}

const props = withDefaults(defineProps<IVertCardProps>(), {
  dots: true,
  step: '01',
  icon: undefined,
  hasDivider: true,
  title: undefined,
  color: '#ea583a',
  cardBg: '#ffffff',
  variant: undefined,
  textColor: undefined,
  lightColor: undefined,
  titleColor: undefined,
  stripeColor: undefined,
  description: undefined,
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
  return hasComponentName(node.type, 'VertCardBadge');
}

function isIconNode(node: VNode): boolean {
  return hasComponentName(node.type, 'VertCardIcon');
}

function isTitleNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'VertCardTitle') ||
    hasComponentName(node.type, 'VertCardHeading')
  );
}

function isContentNode(node: VNode): boolean {
  return hasComponentName(node.type, 'VertCardContent');
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

const slottedTitle = computed(() => {
  return defaultNodes.value.find(isTitleNode);
});

const slottedContent = computed(() => {
  return defaultNodes.value.find(isContentNode);
});

const otherSlottedNodes = computed(() => {
  return defaultNodes.value.filter((node) => {
    return (
      !isBadgeNode(node) &&
      !isIconNode(node) &&
      !isTitleNode(node) &&
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

const resolvedStripeDarkColor = computed(() => {
  return props.stripeColor ?? props.color;
});

const resolvedStripeLightColor = computed(() => {
  return hexToRgba({
    alpha: 0.55,
    hex: props.color,
  });
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

const resolvedBadgeVariant = computed<TVertCardBadgeVariant>(() => {
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
  color: resolvedColor,
  cardBg: resolvedCardBg,
  lightColor: resolvedLightColor,
  titleColor: resolvedTitleColor,
  badgeVariant: resolvedBadgeVariant,
  stripeColor: resolvedStripeDarkColor,
  hasDivider: computed(() => props.hasDivider),
  textColor: resolvedTextColor as ComputedRef<string | undefined>,
});

const BLOB_WIDTH = 128;
const BLOB_HEIGHT = 112;

const bottomBlobPath = computed(() => {
  return createVertCardBottomBlobPath({
    blobHeight: 96,
    blobWidth: 128,
    borderRadius: 21,
    width: BLOB_WIDTH,
    height: BLOB_HEIGHT,
  });
});

const topRightInnerBlobPath = computed(() => {
  return createVertCardTopRightBlobPath({
    blobHeight: 96,
    blobWidth: 128,
    borderRadius: 21,
    width: BLOB_WIDTH,
    height: BLOB_HEIGHT,
  });
});

const topRightOuterBlobPath = computed(() => {
  return createVertCardTopRightBlobPath({
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
  'alpha-vert-card relative inline-flex flex-col select-none rounded-[24px] border-[2.75px] border-solid font-sans',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      borderColor: resolvedColor,
      backgroundColor: resolvedCardBg,
    }"
  >
    <!-- Clipped decorative accent layers (responsive and symmetrical in opposite corners) -->
    <div
      class="absolute inset-0 rounded-[21.25px] overflow-hidden pointer-events-none"
    >
      <!-- Bottom-left organic wave blob (kept as requested) -->
      <svg
        class="absolute bottom-0 left-0 w-32 h-28 pointer-events-none overflow-visible"
        viewBox="0 0 128 112"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="alpha-vert-card__blob"
          :d="bottomBlobPath"
          :fill="resolvedColor"
        />
      </svg>
      <!-- Top-right corner organic wave blob (symmetrical with bottom-left) -->
      <svg
        class="absolute top-0 right-0 w-32 h-28 pointer-events-none overflow-visible"
        viewBox="0 0 128 112"
        xmlns="http://www.w3.org/2000/svg"
      >
        <!-- Inner diagonal wave band (lighter tone) -->
        <path
          class="alpha-vert-card__blob-top-inner"
          :d="topRightInnerBlobPath"
          :fill="resolvedStripeLightColor"
        />
        <!-- Outer diagonal wave accent (accent tone) -->
        <path
          class="alpha-vert-card__blob-top-outer"
          :d="topRightOuterBlobPath"
          :fill="resolvedStripeDarkColor"
        />
      </svg>
    </div>
    <!-- Ribbon Step Badge on left edge (pointing right into the card) -->
    <div
      v-if="isBadgeOutside && isBadgeVisible"
      class="absolute -left-[20px] z-10"
      :class="isIconActive ? 'top-[72px]' : 'top-[60px]'"
    >
      <slot name="badge">
        <component :is="slottedBadge" v-if="slottedBadge" />
        <VertCardBadge v-else :step="resolvedStep" :color="resolvedColor" />
      </slot>
    </div>
    <!-- Card Content Layer -->
    <div
      class="relative z-10 w-full h-full pt-8 pb-5 px-6 flex flex-col justify-between items-center"
    >
      <!-- Optional Icon Circle (rendered when icon/slot is provided) -->
      <template v-if="isIconActive">
        <div class="flex items-center justify-center flex-shrink-0 mb-3">
          <slot name="icon">
            <component :is="slottedIcon" v-if="slottedIcon" />
            <VertCardIcon
              v-else
              :icon="props.icon"
              :color="resolvedColor"
              :light-color="resolvedLightColor"
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
        <slot name="title">
          <component :is="slottedTitle" v-if="slottedTitle" />
          <VertCardTitle
            v-else-if="props.title"
            :color="resolvedTitleColor"
            :has-divider="props.hasDivider"
          >
            {{ props.title }}
          </VertCardTitle>
        </slot>
        <slot name="description">
          <component :is="slottedContent" v-if="slottedContent" />
          <VertCardContent
            v-else-if="props.description"
            :color="resolvedTextColor"
          >
            {{ props.description }}
          </VertCardContent>
        </slot>
        <!-- Any other custom slotted components -->
        <component
          :is="node"
          v-for="(node, index) in otherSlottedNodes"
          :key="index"
        />
      </div>
      <!-- Bottom Row: Centered Decorative Indicator Dots -->
      <div v-if="props.dots" class="flex justify-center items-center gap-2 pt-1">
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
