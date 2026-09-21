<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  provide,
  ref,
  useSlots,
  type VNode,
} from 'vue';

import {
  ARC_COMPARISON_ROOT_KEY,
  ARC_COMPARISON_SIDE_KEY,
  DEFAULT_RIGHT_COLOR,
} from '../../../utils/arcComparison';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import ArcComparisonCallout from './ArcComparisonCallout.vue';
import ArcComparisonContents from './ArcComparisonContents.vue';
import ArcComparisonTitle from './ArcComparisonTitle.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonRight',
});

export interface IArcComparisonRightProps {
  readonly color?: string;
  readonly title?: string;
  readonly count?: number;
}

const props = withDefaults(defineProps<IArcComparisonRightProps>(), {
  color: DEFAULT_RIGHT_COLOR,
  title: undefined,
  count: undefined,
});

const rootContext = inject(ARC_COMPARISON_ROOT_KEY, undefined);

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

  if (typeof type === 'function') {
    return (type as { name?: string }).name === name;
  }

  return false;
}

const registeredCalloutIds = ref<symbol[]>([]);

const registerCallout = (id?: symbol): number | ComputedRef<number> => {
  if (id) {
    if (!registeredCalloutIds.value.includes(id)) {
      registeredCalloutIds.value.push(id);
    }
    return computed(() => registeredCalloutIds.value.indexOf(id));
  }

  const fallbackToken = Symbol();
  registeredCalloutIds.value.push(fallbackToken);
  return registeredCalloutIds.value.indexOf(fallbackToken);
};

const unregisterCallout = (id: symbol): void => {
  registeredCalloutIds.value = registeredCalloutIds.value.filter(
    (item) => item !== id,
  );
};

const sideColor = computed(() => {
  return props.color ?? DEFAULT_RIGHT_COLOR;
});

const resolvedCount = computed(() => {
  return props.count ?? rootContext?.pointsCount.value ?? 3;
});

const currentTitle = ref<string>(props.title ?? 'Add Project\nName');

provide(ARC_COMPARISON_SIDE_KEY, {
  side: 'right',
  color: sideColor,
  title: computed(() => currentTitle.value),
  setTitle: (val: string) => {
    currentTitle.value = val;
  },
  registerCallout,
  unregisterCallout,
  count: resolvedCount,
});

function isSignificantNode(node: VNode): boolean {
  if (typeof node.type === 'symbol') {
    if (typeof node.children === 'string' && !node.children.trim()) {
      return false;
    }
  }

  if (typeof node.children === 'string' && !node.children.trim()) {
    return false;
  }

  return true;
}

function flattenVNodes(nodes: VNode[]): VNode[] {
  const result: VNode[] = [];

  for (const node of nodes) {
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flattenVNodes(node.children as VNode[]));
    } else if (isSignificantNode(node)) {
      result.push(node);
    }
  }

  return result;
}

function isTitleNode(node: VNode): boolean {
  return (
    hasComponentName(node.type, 'ArcComparisonTitle') ||
    node.type === ArcComparisonTitle
  );
}

const defaultNodes = computed(() => {
  if (!slots.default) {
    return [];
  }

  return flattenVNodes(slots.default());
});

const titleNode = computed(() => {
  return defaultNodes.value.find(isTitleNode);
});

const bodyNodes = computed(() => {
  return defaultNodes.value.filter((node) => !isTitleNode(node));
});

const hubStyle = computed(() => {
  const hubR = rootContext?.geo.value.right.hubRadius ?? 170;
  const centerY = rootContext?.geo.value.centerY ?? 240;

  return {
    top: `${centerY - hubR}px`,
    width: `${hubR}px`,
    height: `${hubR * 2}px`,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-comparison-right absolute inset-0 w-full h-full pointer-events-none',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <!-- Right Hub Title Display -->
    <div
      class="alpha-arc-comparison__hub-title alpha-arc-comparison__hub-title--right absolute right-0 flex items-center justify-center z-10 pointer-events-auto"
      :style="hubStyle"
    >
      <component :is="titleNode" v-if="titleNode" />
      <ArcComparisonTitle v-else-if="props.title">
        {{ props.title }}
      </ArcComparisonTitle>
      <ArcComparisonTitle v-else />
    </div>
    <!-- Contents & Callouts -->
    <template v-if="bodyNodes.length > 0">
      <component :is="node" v-for="(node, i) in bodyNodes" :key="i" />
    </template>
    <ArcComparisonContents v-else>
      <ArcComparisonCallout
        v-for="idx in resolvedCount"
        :key="idx"
        :index="idx - 1"
      />
    </ArcComparisonContents>
  </div>
</template>
