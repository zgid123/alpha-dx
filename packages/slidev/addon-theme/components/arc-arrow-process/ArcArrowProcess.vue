<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  onBeforeUpdate,
  provide,
  ref,
  useSlots,
  type VNode,
} from 'vue';

import {
  ARC_ARROW_PROCESS_ROOT_KEY,
  createArcArrowProcessGeometry,
  getDefaultArcArrowProcessItem,
  type IArcArrowProcessItem,
  type IArcArrowProcessRegistration,
  type IResolvedArcArrowProcessItem,
  resolveArcArrowProcessItems,
} from '../../utils/arcArrowProcess';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import ArcArrowProcessArrow from './ArcArrowProcessArrow.vue';
import ArcArrowProcessCallout from './ArcArrowProcessCallout.vue';

defineOptions({
  name: 'ArcArrowProcess',
  inheritAttrs: false,
});

export interface IArcArrowProcessProps {
  readonly items?: readonly IArcArrowProcessItem[];
  readonly count?: number;
  readonly animation?: boolean;
  readonly height?: number | string;
  readonly startDelay?: number;
  readonly active?: boolean;
  readonly rotationOffset?: number;
}

const props = withDefaults(defineProps<IArcArrowProcessProps>(), {
  items: undefined,
  count: undefined,
  animation: true,
  height: 370,
  startDelay: undefined,
  active: undefined,
  rotationOffset: undefined,
});

const slots = useSlots();

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

function countCallouts(nodes: VNode[]): number {
  let count = 0;

  for (const node of flattenVNodes(nodes)) {
    if (hasComponentName(node.type, 'ArcArrowProcessCallout')) {
      count++;
    }
  }

  return count;
}

const slottedCount = computed(() => {
  if (!slots.default) {
    return 0;
  }

  return countCallouts(slots.default());
});

const shiftingIntro = inject<
  | {
      active: ComputedRef<boolean>;
      isShifting?: ComputedRef<boolean>;
    }
  | undefined
>('SLIDEV_LAYOUT_SHIFTING_INTRO', undefined);

const isAnimated = computed(() => {
  if (!props.animation) {
    return false;
  }

  if (props.active !== undefined) {
    return props.active;
  }

  if (shiftingIntro) {
    return shiftingIntro.active.value;
  }

  return true;
});

const resolvedStartDelay = computed(() => {
  if (props.startDelay !== undefined) {
    return props.startDelay;
  }

  if (shiftingIntro) {
    return shiftingIntro.isShifting?.value ? 600 : 0;
  }

  return 0;
});

const resolvedCount = computed<number>(() => {
  if (props.count !== undefined) {
    return props.count;
  }

  if (slottedCount.value > 0) {
    return slottedCount.value;
  }

  if (props.items && props.items.length > 0) {
    return props.items.length;
  }

  return 4;
});

const resolvedItems = computed(() => {
  return resolveArcArrowProcessItems(props.items, resolvedCount.value);
});

const registeredCalloutColors = ref<Record<number, string>>({});

const setCalloutColor = (index: number, color: string | undefined) => {
  if (color === undefined) {
    const updated = { ...registeredCalloutColors.value };
    delete updated[index];
    registeredCalloutColors.value = updated;
  } else {
    registeredCalloutColors.value = {
      ...registeredCalloutColors.value,
      [index]: color,
    };
  }
};

const slottedCalloutProps = computed(() => {
  if (!slots.default) {
    return [];
  }

  const nodes = flattenVNodes(slots.default()).filter((node) =>
    hasComponentName(node.type, 'ArcArrowProcessCallout'),
  );

  return nodes.map((node, idx) => {
    const rawProps = node.props;
    const explicitIndex =
      rawProps?.index !== undefined && rawProps.index !== null
        ? Number(rawProps.index)
        : idx;

    return {
      index: explicitIndex,
      color: typeof rawProps?.color === 'string' ? rawProps.color : undefined,
    };
  });
});

const getArrowColor = (idx: number): string => {
  if (registeredCalloutColors.value[idx]) {
    return registeredCalloutColors.value[idx];
  }

  const slottedMatch = slottedCalloutProps.value.find((p) => p.index === idx);
  if (slottedMatch?.color) {
    return slottedMatch.color;
  }

  if (props.items?.[idx]?.color) {
    return props.items[idx].color;
  }

  return getDefaultArcArrowProcessItem(idx, resolvedCount.value).color;
};

const getArrowGradientEnd = (idx: number): string | undefined => {
  if (props.items?.[idx]?.gradientEnd) {
    return props.items[idx].gradientEnd;
  }

  if (registeredCalloutColors.value[idx]) {
    return registeredCalloutColors.value[idx];
  }

  const slottedMatch = slottedCalloutProps.value.find((p) => p.index === idx);
  if (slottedMatch?.color) {
    return slottedMatch.color;
  }

  return getDefaultArcArrowProcessItem(idx, resolvedCount.value).gradientEnd;
};

let calloutCounter = 0;
onBeforeUpdate(() => {
  calloutCounter = 0;
});

const registerCallout = (): IArcArrowProcessRegistration => {
  const idx = calloutCounter++;

  return {
    index: idx,
    item: computed<IResolvedArcArrowProcessItem>(() => {
      const item = resolvedItems.value[idx] ?? resolvedItems.value[0];

      if (item) {
        return item;
      }

      return getDefaultArcArrowProcessItem(idx, resolvedCount.value);
    }),
  };
};

provide(ARC_ARROW_PROCESS_ROOT_KEY, {
  items: resolvedItems,
  count: resolvedCount,
  animation: isAnimated,
  registerCallout,
  setCalloutColor,
});

const geo = computed(() => {
  return createArcArrowProcessGeometry(
    resolvedCount.value,
    props.rotationOffset,
  );
});

const resolvedHeightStyle = computed(() => {
  if (props.height === undefined) {
    return '100%';
  }

  return typeof props.height === 'number' ? `${props.height}px` : props.height;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-arrow-process w-full flex items-start justify-center select-none font-sans relative',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      height: resolvedHeightStyle,
      minHeight: '340px',
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
      '--arc-arrow-start-delay': `${resolvedStartDelay}ms`,
    }"
  >
    <!-- Relative stage container -->
    <div
      class="alpha-arc-arrow-process__stage relative w-full h-full max-w-[1000px] flex items-start justify-center overflow-visible"
    >
      <!-- Central Graphic: Reusing ArcArrowProcessArrow -->
      <div
        class="alpha-arc-arrow-process__center absolute inset-0 w-full h-full pointer-events-none"
      >
        <ArcArrowProcessArrow
          v-for="(arrow, idx) in geo.arrows"
          :key="idx"
          :class="[
            'alpha-arc-arrow-process__arrow absolute inset-0 w-full h-full',
            `alpha-arc-arrow-process__arrow--${idx}`,
            { 'alpha-arc-arrow-process--animated': isAnimated },
          ]"
          :color="getArrowColor(idx)"
          :gradient-end="getArrowGradientEnd(idx)"
          :origin-y="geo.cy"
          :path="arrow.path"
          :rotation="arrow.rotation"
          :standalone="false"
        />
      </div>
      <!-- Callout Cards -->
      <slot v-if="slots.default" />
      <template v-else>
        <ArcArrowProcessCallout
          v-for="idx in resolvedCount"
          :key="idx - 1"
          :index="idx - 1"
        />
      </template>
    </div>
  </div>
</template>

<style scoped>
.alpha-arc-arrow-process--animated.alpha-arc-arrow-process__arrow--0 {
  animation: arc-arrow-pop 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-arrow-start-delay, 0ms) + 50ms) both;
  transform-origin: 500px -220px;
}

.alpha-arc-arrow-process--animated.alpha-arc-arrow-process__arrow--1 {
  animation: arc-arrow-pop 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-arrow-start-delay, 0ms) + 130ms) both;
  transform-origin: 500px -220px;
}

.alpha-arc-arrow-process--animated.alpha-arc-arrow-process__arrow--2 {
  animation: arc-arrow-pop 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-arrow-start-delay, 0ms) + 210ms) both;
  transform-origin: 500px -220px;
}

.alpha-arc-arrow-process--animated.alpha-arc-arrow-process__arrow--3 {
  animation: arc-arrow-pop 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-arrow-start-delay, 0ms) + 290ms) both;
  transform-origin: 500px -220px;
}

@keyframes arc-arrow-pop {
  0% {
    opacity: 0;
    transform: scale(0.92);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
