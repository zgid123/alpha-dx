<script setup lang="ts">
import {
  computed,
  Fragment,
  inject,
  onBeforeUnmount,
  provide,
  useSlots,
  type VNode,
  watchEffect,
} from 'vue';

import {
  ARC_ARROW_PROCESS_CALLOUT_KEY,
  ARC_ARROW_PROCESS_ROOT_KEY,
  getDefaultArcArrowProcessItem,
  type IArcArrowProcessItem,
  type IResolvedArcArrowProcessItem,
  resolveSingleArcArrowProcessItem,
} from '../../../utils/process/arc-arrow-process';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  name: 'ArcArrowProcessCallout',
  inheritAttrs: false,
});

export interface IArcArrowProcessCalloutProps {
  readonly id?: string | number;
  readonly index?: number;
  readonly color?: string;
  readonly textColor?: string;
}

const props = withDefaults(defineProps<IArcArrowProcessCalloutProps>(), {
  id: undefined,
  index: undefined,
  color: undefined,
  textColor: undefined,
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

const rootContext = inject(ARC_ARROW_PROCESS_ROOT_KEY, undefined);

if (!rootContext) {
  console.warn(
    '[ArcArrowProcessCallout] Must be used inside <ArcArrowProcess>',
  );
}

const registration =
  props.index === undefined ? rootContext?.registerCallout() : undefined;

const resolvedIndex = computed(() => {
  if (props.index !== undefined) {
    return props.index;
  }

  return registration?.index ?? 0;
});

const resolvedCount = computed<number>(() => {
  return rootContext?.count.value ?? 4;
});

const activeItem = computed<IResolvedArcArrowProcessItem>(() => {
  const baseItem =
    rootContext?.items.value[resolvedIndex.value] ??
    getDefaultArcArrowProcessItem(resolvedIndex.value, resolvedCount.value);

  const override: IArcArrowProcessItem = {
    id: props.id,
    color: props.color,
    textColor: props.textColor,
  };

  return resolveSingleArcArrowProcessItem(
    {
      ...baseItem,
      ...Object.fromEntries(
        Object.entries(override).filter(([_, v]) => {
          return v !== undefined;
        }),
      ),
    },
    resolvedIndex.value,
    resolvedCount.value,
  );
});

watchEffect(() => {
  if (props.color !== undefined) {
    rootContext?.setCalloutColor?.(resolvedIndex.value, props.color);
  }
});

onBeforeUnmount(() => {
  rootContext?.setCalloutColor?.(resolvedIndex.value, undefined);
});

provide(ARC_ARROW_PROCESS_CALLOUT_KEY, {
  item: activeItem,
  index: resolvedIndex.value,
  count: resolvedCount.value,
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
    return hasComponentName(node.type, 'ArcArrowProcessHeading');
  });
});

const contentNode = computed(() => {
  return defaultNodes.value.find((node) => {
    return hasComponentName(node.type, 'ArcArrowProcessContent');
  });
});

const iconNode = computed(() => {
  return defaultNodes.value.find((node) => {
    return hasComponentName(node.type, 'ArcArrowProcessIcon');
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
      !hasComponentName(node.type, 'ArcArrowProcessHeading') &&
      !hasComponentName(node.type, 'ArcArrowProcessContent') &&
      !hasComponentName(node.type, 'ArcArrowProcessIcon')
    );
  });
});

const positionStyle = computed(() => {
  if (resolvedCount.value === 2) {
    switch (resolvedIndex.value) {
      case 0: {
        // Left descending arrow (lowered to flank)
        return 'left: 8px; top: 140px; width: 260px;';
      }
      case 1: {
        // Right ascending arrow (lowered to flank)
        return 'right: 8px; top: 140px; width: 260px;';
      }
      default: {
        return '';
      }
    }
  }

  if (resolvedCount.value === 3) {
    switch (resolvedIndex.value) {
      case 0: {
        // Left descending arrow (lowered to bottom-left flank)
        return 'left: 0px; top: 108px; width: 225px;';
      }
      case 1: {
        // Bottom center trough
        return 'left: calc(50% - 130px); bottom: 8px; width: 260px;';
      }
      case 2: {
        // Right ascending arrow (lowered to bottom-right flank)
        return 'right: 0px; top: 108px; width: 225px;';
      }
      default: {
        return '';
      }
    }
  }

  // 4-arrow layout matching design reference
  switch (resolvedIndex.value) {
    case 0: {
      // Top-Left (left of arrow 1)
      return 'left: 0px; top: 56px; width: 205px;';
    }
    case 1: {
      // Bottom-Left (under arrow 2)
      return 'left: 110px; top: 205px; width: 255px;';
    }
    case 2: {
      // Bottom-Right (under arrow 3)
      return 'right: 110px; top: 205px; width: 255px;';
    }
    case 3: {
      // Top-Right (right of arrow 4)
      return 'right: 0px; top: 56px; width: 205px;';
    }
    default: {
      return '';
    }
  }
});

const animation = computed(() => {
  return rootContext?.animation?.value ?? true;
});

const hasIcon = computed(() => {
  return Boolean(iconNode.value);
});

const isRightAligned = computed(() => {
  return (
    resolvedCount.value === 4 &&
    (resolvedIndex.value === 0 || resolvedIndex.value === 1)
  );
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-arrow-process-callout absolute flex items-start justify-between gap-3 font-sans z-10 transition-all duration-300 pointer-events-auto select-none',
);
</script>

<template>
  <div
    v-if="resolvedIndex < resolvedCount"
    v-bind="forwardedAttrs()"
    :class="
      className([
        `alpha-arc-arrow-process-callout--${resolvedIndex}`,
        isRightAligned ? 'text-right' : 'text-left',
        { 'alpha-arc-arrow-process-callout--animated': animation },
      ])
    "
    :style="positionStyle"
  >
    <!-- Text Column (Heading + Description) -->
    <div
      :class="[
        'flex-1 flex flex-col min-w-0',
        isRightAligned ? 'items-end' : 'items-start',
      ]"
    >
      <component :is="headingNode" v-if="headingNode" />
      <component :is="contentNode" v-if="contentNode" />
      <!-- Other slotted nodes -->
      <component
        :is="node"
        v-for="(node, idx) in otherSlottedNodes"
        :key="idx"
      />
    </div>
    <!-- Outline Icon beside text block -->
    <div v-if="hasIcon" class="shrink-0 mt-1">
      <component :is="iconNode" v-if="iconNode" />
    </div>
  </div>
</template>

<style scoped>
.alpha-arc-arrow-process-callout--animated.alpha-arc-arrow-process-callout--0 {
  animation: arc-arrow-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--arc-arrow-start-delay, 0ms) + 120ms) both;
}

.alpha-arc-arrow-process-callout--animated.alpha-arc-arrow-process-callout--1 {
  animation: arc-arrow-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--arc-arrow-start-delay, 0ms) + 200ms) both;
}

.alpha-arc-arrow-process-callout--animated.alpha-arc-arrow-process-callout--2 {
  animation: arc-arrow-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--arc-arrow-start-delay, 0ms) + 280ms) both;
}

.alpha-arc-arrow-process-callout--animated.alpha-arc-arrow-process-callout--3 {
  animation: arc-arrow-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--arc-arrow-start-delay, 0ms) + 360ms) both;
}

@keyframes arc-arrow-callout-fade {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>
