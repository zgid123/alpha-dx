<script setup lang="ts">
import { computed, Fragment, inject, provide, useSlots, type VNode } from 'vue';

import {
  ARROW_TRIAD_CALLOUT_KEY,
  ARROW_TRIAD_ROOT_KEY,
  getDefaultArrowTriadItem,
  type IArrowTriadItem,
  type IResolvedArrowTriadItem,
  resolveSingleArrowTriadItem,
} from '../../../../utils/facets/triad/arrow-triad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArrowTriadCallout',
});

export interface IArrowTriadCalloutProps {
  readonly id?: string | number;
  readonly index?: number;
  readonly color?: string;
  readonly cardBg?: string;
  readonly textColor?: string;
  readonly titleColor?: string;
}

const props = withDefaults(defineProps<IArrowTriadCalloutProps>(), {
  id: undefined,
  index: undefined,
  color: undefined,
  cardBg: undefined,
  textColor: undefined,
  titleColor: undefined,
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

const rootContext = inject(ARROW_TRIAD_ROOT_KEY, undefined);

if (!rootContext) {
  console.warn('[ArrowTriadCallout] Must be used inside <ArrowTriad>');
}

const registration =
  props.index === undefined ? rootContext?.registerCallout() : undefined;
const resolvedIndex = computed(() => {
  if (props.index !== undefined) {
    return props.index;
  }

  return registration?.index ?? 0;
});

const activeItem = computed<IResolvedArrowTriadItem>(() => {
  const baseItem =
    rootContext?.items.value[resolvedIndex.value] ??
    getDefaultArrowTriadItem(resolvedIndex.value);

  const override: IArrowTriadItem = {
    id: props.id,
    color: props.color,
    cardBg: props.cardBg,
    textColor: props.textColor,
    titleColor: props.titleColor,
  };

  return resolveSingleArrowTriadItem(
    {
      ...baseItem,
      ...Object.fromEntries(
        Object.entries(override).filter(([_, v]) => {
          return v !== undefined;
        }),
      ),
    },
    resolvedIndex.value,
  );
});

provide(ARROW_TRIAD_CALLOUT_KEY, {
  item: activeItem,
  index: resolvedIndex.value,
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

const defaultNodes = computed(() => {
  if (!slots.default) {
    return [];
  }

  return flattenVNodes(slots.default());
});

const headingNode = computed(() => {
  return defaultNodes.value.find((node) => {
    return hasComponentName(node.type, 'ArrowTriadHeading');
  });
});

const contentNode = computed(() => {
  return defaultNodes.value.find((node) => {
    return hasComponentName(node.type, 'ArrowTriadContent');
  });
});

const iconNode = computed(() => {
  return defaultNodes.value.find((node) => {
    return hasComponentName(node.type, 'ArrowTriadIcon');
  });
});

function isValidSlottedNode(node: VNode): boolean {
  if (typeof node.type === 'symbol') {
    return typeof node.children === 'string' && node.children.trim().length > 0;
  }

  return true;
}

const otherSlottedNodes = computed(() => {
  return defaultNodes.value.filter((node) => {
    return (
      isValidSlottedNode(node) &&
      !hasComponentName(node.type, 'ArrowTriadHeading') &&
      !hasComponentName(node.type, 'ArrowTriadContent') &&
      !hasComponentName(node.type, 'ArrowTriadIcon')
    );
  });
});

const positionStyle = computed(() => {
  const is2Left =
    rootContext?.layout?.value === '2-left-1-right' ||
    rootContext?.layout?.value === '2-left';

  if (is2Left) {
    switch (resolvedIndex.value) {
      case 0: {
        // Top-Left (aligned with Yellow arrow tip pointing North-West)
        return 'right: calc(50% + 150px); top: calc(50% - 170px);';
      }
      case 1: {
        // Bottom-Left (aligned with Green arrow tip pointing South-West)
        return 'right: calc(50% + 150px); top: calc(50% + 15px);';
      }
      case 2: {
        // Middle-Right (aligned with Blue arrow tip pointing East)
        return 'left: calc(50% + 166px); top: calc(50% - 78px);';
      }
      default: {
        return '';
      }
    }
  }

  // 1-left-2-right
  switch (resolvedIndex.value) {
    case 0: {
      // Top-Right (aligned with Yellow arrow tip pointing North-East)
      return 'left: calc(50% + 150px); top: calc(50% - 170px);';
    }

    case 1: {
      // Bottom-Right (aligned with Green arrow tip pointing South-East)
      return 'left: calc(50% + 150px); top: calc(50% + 15px);';
    }
    case 2: {
      // Middle-Left (aligned with Blue arrow tip pointing West)
      return 'right: calc(50% + 166px); top: calc(50% - 78px);';
    }
    default: {
      return '';
    }
  }
});

const animation = computed(() => {
  return rootContext?.animation?.value ?? true;
});

const hasIcon = computed(() => Boolean(iconNode.value));

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arrow-triad-callout absolute w-70 h-38.75 rounded-[20px] px-4 py-3 flex flex-col items-center justify-center text-center z-10 font-sans transition-all duration-300 pointer-events-auto select-none box-border',
);
</script>

<template>
  <div
    v-if="resolvedIndex < 3"
    v-bind="forwardedAttrs()"
    :class="[
      className(),
      `alpha-arrow-triad-callout--${resolvedIndex}`,
      { 'alpha-arrow-triad-callout--animated': animation },
    ]"
    :style="[
      positionStyle,
      activeItem.cardBg
        ? { backgroundColor: activeItem.cardBg }
        : undefined,
    ]"
  >
    <!-- Card Icon Header -->
    <div v-if="hasIcon" class="mb-2 flex items-center justify-center">
      <component :is="iconNode" />
    </div>
    <!-- Title -->
    <component :is="headingNode" v-if="headingNode" />
    <!-- Description -->
    <component :is="contentNode" v-if="contentNode" />
    <!-- Other slotted nodes -->
    <component :is="node" v-for="(node, idx) in otherSlottedNodes" :key="idx" />
  </div>
</template>

<style scoped>
.alpha-arrow-triad-callout--animated.alpha-arrow-triad-callout--0 {
  animation: arrow-triad-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--alpha-arrow-triad-start-delay, 0ms) + 150ms) both;
}

.alpha-arrow-triad-callout--animated.alpha-arrow-triad-callout--1 {
  animation: arrow-triad-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--alpha-arrow-triad-start-delay, 0ms) + 250ms) both;
}

.alpha-arrow-triad-callout--animated.alpha-arrow-triad-callout--2 {
  animation: arrow-triad-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--alpha-arrow-triad-start-delay, 0ms) + 350ms) both;
}

@keyframes arrow-triad-callout-fade {
  0% {
    opacity: 0;
    transform: translateY(12px) scale(0.96);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
