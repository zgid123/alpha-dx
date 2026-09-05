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
} from '../../utils/arcArrowProcess';
import ArcArrowProcessContent from './ArcArrowProcessContent.vue';
import ArcArrowProcessHeading from './ArcArrowProcessHeading.vue';
import ArcArrowProcessIcon from './ArcArrowProcessIcon.vue';

defineOptions({
  name: 'ArcArrowProcessCallout',
});

export interface IArcArrowProcessCalloutProps {
  readonly id?: string | number;
  readonly index?: number;
  readonly icon?: string | object | false;
  readonly color?: string;
  readonly textColor?: string;
  readonly title?: string;
  readonly description?: string;
}

const props = withDefaults(defineProps<IArcArrowProcessCalloutProps>(), {
  id: undefined,
  index: undefined,
  icon: undefined,
  color: undefined,
  textColor: undefined,
  title: undefined,
  description: undefined,
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
    icon: props.icon,
    textColor: props.textColor,
    titleColor: props.color,
    title: props.title,
    description: props.description,
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
        return 'left: 30px; top: 165px; width: 270px;';
      }
      case 1: {
        // Right ascending arrow (lowered to flank)
        return 'right: 30px; top: 165px; width: 270px;';
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
        return 'left: 20px; top: 180px; width: 230px;';
      }
      case 1: {
        // Bottom center trough
        return 'left: calc(50% - 120px); top: 250px; width: 240px;';
      }
      case 2: {
        // Right ascending arrow (lowered to bottom-right flank)
        return 'right: 20px; top: 180px; width: 230px;';
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
      return 'left: 8px; top: 20px; width: 245px;';
    }
    case 1: {
      // Bottom-Left (under arrow 2)
      return 'left: 175px; top: 250px; width: 240px;';
    }
    case 2: {
      // Bottom-Right (under arrow 3)
      return 'left: 575px; top: 250px; width: 240px;';
    }
    case 3: {
      // Top-Right (right of arrow 4)
      return 'right: 8px; top: 20px; width: 245px;';
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
  if (props.icon === false || props.icon === 'false') {
    return false;
  }

  if (slots.icon || iconNode.value) {
    return true;
  }

  const iconVal = props.icon !== undefined ? props.icon : activeItem.value.icon;

  if (!iconVal || iconVal === 'false') {
    return false;
  }

  if (typeof iconVal === 'string' && iconVal.trim() === '') {
    return false;
  }

  return true;
});
</script>

<template>
  <div
    v-if="resolvedIndex < resolvedCount"
    :class="[
      'alpha-arc-arrow-process-callout absolute flex items-start justify-between gap-3 text-left z-10 transition-all duration-300 pointer-events-auto select-none',
      `alpha-arc-arrow-process-callout--${resolvedIndex}`,
      { 'alpha-arc-arrow-process-callout--animated': animation },
    ]"
    :style="[
      positionStyle,
      {
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
      },
    ]"
  >
    <!-- Text Column (Heading + Description) -->
    <div class="flex-1 flex flex-col items-start min-w-0">
      <!-- Title -->
      <slot name="title">
        <component :is="headingNode" v-if="headingNode" />
        <ArcArrowProcessHeading v-else :color="activeItem.titleColor">
          {{ activeItem.title }}
        </ArcArrowProcessHeading>
      </slot>
      <!-- Description -->
      <slot name="description">
        <component :is="contentNode" v-if="contentNode" />
        <ArcArrowProcessContent v-else :color="props.textColor">
        </ArcArrowProcessContent>
      </slot>
      <!-- Other slotted nodes -->
      <component
        :is="node"
        v-for="(node, idx) in otherSlottedNodes"
        :key="idx"
      />
    </div>
    <!-- Outline Icon beside text block -->
    <div v-if="hasIcon" class="shrink-0 mt-1">
      <slot name="icon">
        <component :is="iconNode" v-if="iconNode" />
        <ArcArrowProcessIcon
          v-else
          :icon="activeItem.icon"
          :color="activeItem.titleColor"
          :size="36"
        />
      </slot>
    </div>
  </div>
</template>

<style scoped>
.alpha-arc-arrow-process-callout--animated.alpha-arc-arrow-process-callout--0 {
  animation: arc-arrow-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-arrow-start-delay, 0ms) + 120ms) both;
}

.alpha-arc-arrow-process-callout--animated.alpha-arc-arrow-process-callout--1 {
  animation: arc-arrow-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-arrow-start-delay, 0ms) + 200ms) both;
}

.alpha-arc-arrow-process-callout--animated.alpha-arc-arrow-process-callout--2 {
  animation: arc-arrow-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-arrow-start-delay, 0ms) + 280ms) both;
}

.alpha-arc-arrow-process-callout--animated.alpha-arc-arrow-process-callout--3 {
  animation: arc-arrow-callout-fade 400ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-arrow-start-delay, 0ms) + 360ms) both;
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
