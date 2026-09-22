<script setup lang="ts">
import { computed, Fragment, inject, provide, useSlots, type VNode } from 'vue';

import {
  GEAR_TRIAD_CALLOUT_KEY,
  GEAR_TRIAD_ROOT_KEY,
  getDefaultGearTriadItem,
  type IGearTriadItem,
  type IResolvedGearTriadItem,
  resolveSingleGearTriadItem,
  type TGearTriadIcon,
} from '../../../../utils/gearTriad';
import GearTriadDescription from './GearTriadDescription.vue';
import GearTriadHeading from './GearTriadHeading.vue';

defineOptions({
  name: 'GearTriadCallout',
});

export interface IGearTriadCalloutProps {
  readonly id?: string | number;
  readonly index?: number;
  readonly icon?: TGearTriadIcon;
  readonly color?: string;
  readonly depthColor?: string;
  readonly cardBg?: string;
  readonly textColor?: string;
  readonly titleColor?: string;
  readonly title?: string;
  readonly description?: string;
}

const props = withDefaults(defineProps<IGearTriadCalloutProps>(), {
  id: undefined,
  index: undefined,
  icon: undefined,
  color: undefined,
  depthColor: undefined,
  cardBg: undefined,
  textColor: undefined,
  titleColor: undefined,
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

const rootContext = inject(GEAR_TRIAD_ROOT_KEY, undefined);

if (!rootContext) {
  console.warn('[GearTriadCallout] Must be used inside <GearTriad>');
}

const overrideProps = computed<IGearTriadItem>(() => {
  const raw: IGearTriadItem = {
    id: props.id,
    color: props.color,
    depthColor: props.depthColor,
    icon: props.icon,
    cardBg: props.cardBg,
    textColor: props.textColor,
    titleColor: props.titleColor,
    title: props.title,
    description: props.description,
  };

  return Object.fromEntries(
    Object.entries(raw).filter(([_, v]) => v !== undefined),
  );
});

const registration =
  props.index === undefined
    ? rootContext?.registerCallout(overrideProps)
    : undefined;

const resolvedIndex = computed(() => {
  if (props.index !== undefined) {
    return props.index;
  }

  return registration?.index ?? 0;
});

const activeItem = computed<IResolvedGearTriadItem>(() => {
  const baseItem =
    rootContext?.items.value[resolvedIndex.value] ??
    getDefaultGearTriadItem(resolvedIndex.value);

  return resolveSingleGearTriadItem(
    {
      ...baseItem,
      ...overrideProps.value,
    },
    resolvedIndex.value,
  );
});

provide(GEAR_TRIAD_CALLOUT_KEY, {
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
    return hasComponentName(node.type, 'GearTriadHeading');
  });
});

const descriptionNode = computed(() => {
  return defaultNodes.value.find((node) => {
    return hasComponentName(node.type, 'GearTriadDescription');
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
      !hasComponentName(node.type, 'GearTriadHeading') &&
      !hasComponentName(node.type, 'GearTriadDescription')
    );
  });
});

const positionStyle = computed(() => {
  switch (resolvedIndex.value) {
    case 0: {
      // Option 1: Left side, vertically level with Cyan petal
      return 'right: calc(50% + 185px); top: calc(50% - 115px); text-align: right; width: 250px;';
    }
    case 1: {
      // Option 2: Right side, vertically level with Orange petal
      return 'left: calc(50% + 185px); top: calc(50% - 115px); text-align: left; width: 250px;';
    }
    case 2: {
      // Option 3: Bottom centered, below Pink teeth
      return 'left: 50%; transform: translateX(-50%); top: calc(50% + 155px); text-align: center; width: 280px;';
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
    v-if="resolvedIndex < 3"
    :class="[
      'alpha-gear-triad-callout absolute flex flex-col z-10 select-none box-border pointer-events-auto transition-all duration-500 ease-out',
      `alpha-gear-triad-callout--${resolvedIndex}`,
      { 'alpha-gear-triad-callout--animated': animation },
      { 'alpha-gear-triad-callout--shifted': rootContext?.isShifted.value },
    ]"
    :style="[
      positionStyle,
      {
        backgroundColor: activeItem.cardBg ?? 'transparent',
        fontFamily:
          'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
      },
    ]"
  >
    <!-- Title Slot / Heading -->
    <slot name="title">
      <component :is="headingNode" v-if="headingNode" />
      <GearTriadHeading v-else :color="activeItem.titleColor">
        {{ activeItem.title }}
      </GearTriadHeading>
    </slot>
    <!-- Description Slot -->
    <slot name="description">
      <component :is="descriptionNode" v-if="descriptionNode" />
      <GearTriadDescription v-else :color="activeItem.textColor">
        {{ activeItem.description }}
      </GearTriadDescription>
    </slot>
    <!-- Other Slotted Nodes -->
    <component
      :is="node"
      v-for="(node, idx) in otherSlottedNodes"
      :key="idx"
    />
  </div>
</template>

<style scoped>
.alpha-gear-triad-callout--animated.alpha-gear-triad-callout--0 {
  animation: gear-triad-callout-fade 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--gear-start-delay, 0ms) + 150ms) both;
}

.alpha-gear-triad-callout--animated.alpha-gear-triad-callout--1 {
  animation: gear-triad-callout-fade 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--gear-start-delay, 0ms) + 300ms) both;
}

.alpha-gear-triad-callout--animated.alpha-gear-triad-callout--2 {
  animation: gear-triad-callout-fade-center 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--gear-start-delay, 0ms) + 450ms) both;
}

.alpha-gear-triad-callout--shifted {
  opacity: 0 !important;
  pointer-events: none !important;
  transform: rotate(-25deg) scale(0.85) !important;
}

.alpha-gear-triad-callout--shifted.alpha-gear-triad-callout--1 {
  transform: rotate(25deg) scale(0.85) !important;
}

.alpha-gear-triad-callout--shifted.alpha-gear-triad-callout--2 {
  transform: translateX(-50%) rotate(-15deg) scale(0.85) !important;
}

@keyframes gear-triad-callout-fade {
  0% {
    opacity: 0;
    transform: translateY(10px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes gear-triad-callout-fade-center {
  0% {
    opacity: 0;
    transform: translate(-50%, 10px) scale(0.97);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
}
</style>
