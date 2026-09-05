<script setup lang="ts">
import {
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
  ARC_COMPARE_ROOT_KEY,
  ARC_COMPARE_SIDE_KEY,
  DEFAULT_RIGHT_COLOR,
} from '../../utils/arcCompare';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import ArcCompareCallout from './ArcCompareCallout.vue';
import ArcCompareContents from './ArcCompareContents.vue';
import ArcCompareTitle from './ArcCompareTitle.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcCompareRight',
});

export interface IArcCompareRightProps {
  readonly color?: string;
  readonly title?: string;
  readonly count?: number;
}

const props = withDefaults(defineProps<IArcCompareRightProps>(), {
  color: DEFAULT_RIGHT_COLOR,
  title: undefined,
  count: undefined,
});

const rootContext = inject(ARC_COMPARE_ROOT_KEY, undefined);

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

let calloutCounter = 0;
onBeforeUpdate(() => {
  calloutCounter = 0;
});

const sideColor = computed(() => {
  return props.color ?? DEFAULT_RIGHT_COLOR;
});

const resolvedCount = computed(() => {
  return props.count ?? rootContext?.pointsCount.value ?? 3;
});

const currentTitle = ref<string>(props.title ?? 'Add Project\nName');

provide(ARC_COMPARE_SIDE_KEY, {
  side: 'right',
  color: sideColor,
  title: computed(() => currentTitle.value),
  setTitle: (val: string) => {
    currentTitle.value = val;
  },
  registerCallout: () => {
    return calloutCounter++;
  },
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
    hasComponentName(node.type, 'ArcCompareTitle') ||
    node.type === ArcCompareTitle
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
  'alpha-arc-compare-right absolute inset-0 w-full h-full pointer-events-none',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <!-- Right Hub Title Display -->
    <div
      class="alpha-arc-compare__hub-title alpha-arc-compare__hub-title--right absolute right-0 flex items-center justify-center z-10 pointer-events-auto"
      :style="hubStyle"
    >
      <component :is="titleNode" v-if="titleNode" />
      <ArcCompareTitle v-else-if="props.title">
        {{ props.title }}
      </ArcCompareTitle>
      <ArcCompareTitle v-else />
    </div>
    <!-- Contents & Callouts -->
    <template v-if="bodyNodes.length > 0">
      <component :is="node" v-for="(node, i) in bodyNodes" :key="i" />
    </template>
    <ArcCompareContents v-else>
      <ArcCompareCallout
        v-for="idx in resolvedCount"
        :key="idx"
        :index="idx - 1"
      />
    </ArcCompareContents>
  </div>
</template>
