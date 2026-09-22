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
  DEFAULT_LEFT_COLOR,
  DEFAULT_LEFT_ITEMS,
} from '../../../utils/arcComparison';
import {
  ARC_ORBIT_ROOT_KEY,
  type IArcOrbitGeometry,
  type TArcOrbitPosition,
} from '../../../utils/arcOrbit';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import ArcComparisonContents from './ArcComparisonContents.vue';
import ArcComparisonOrbit from './ArcComparisonOrbit.vue';
import ArcComparisonTitle from './ArcComparisonTitle.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonLeft',
});

export interface IArcComparisonLeftProps {
  readonly color?: string;
  readonly title?: string;
  readonly count?: number;
}

const props = withDefaults(defineProps<IArcComparisonLeftProps>(), {
  color: DEFAULT_LEFT_COLOR,
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
  return props.color ?? DEFAULT_LEFT_COLOR;
});

const resolvedCount = computed(() => {
  return props.count ?? rootContext?.pointsCount.value ?? 3;
});

const currentTitle = ref<string>(props.title ?? 'Add Project\nName');

provide(ARC_COMPARISON_SIDE_KEY, {
  side: 'left',
  color: sideColor,
  title: computed(() => currentTitle.value),
  setTitle: (val: string) => {
    currentTitle.value = val;
  },
  registerCallout,
  unregisterCallout,
  count: resolvedCount,
});

const leftOrbitGeo = computed<IArcOrbitGeometry>(() => {
  const sideGeo = rootContext?.geo.value.left;

  return {
    viewBoxWidth: rootContext?.geo.value.viewBoxWidth ?? 500,
    viewBoxHeight: rootContext?.geo.value.viewBoxHeight ?? 480,
    position: 'left',
    hubCenter: sideGeo?.hubCenter ?? { x: 0, y: 240 },
    hubRadius: sideGeo?.hubRadius ?? 135,
    hubPath: sideGeo?.hubPath ?? '',
    arcPath: sideGeo?.arcPath ?? '',
    topDot: sideGeo?.topDot ?? { x: 0, y: 0 },
    bottomDot: sideGeo?.bottomDot ?? { x: 0, y: 0 },
    dotRadius: sideGeo?.dotRadius ?? 3.5,
    nodes: sideGeo?.nodes ?? [],
    callouts: sideGeo?.callouts ?? [],
    pointsCount: resolvedCount.value,
  };
});

provide(ARC_ORBIT_ROOT_KEY, {
  position: computed<TArcOrbitPosition>(() => 'left'),
  color: sideColor,
  pointsCount: resolvedCount,
  geo: leftOrbitGeo,
  animation: computed(() => rootContext?.animation?.value ?? true),
  startDelay: computed(() => rootContext?.startDelay?.value ?? 0),
  title: computed(() => currentTitle.value),
  setTitle: (val: string) => {
    currentTitle.value = val;
  },
  registerCallout,
  unregisterCallout,
  edgeOffset: computed(() => rootContext?.edgeOffset?.value ?? 30),
  items: computed(() => DEFAULT_LEFT_ITEMS),
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
    hasComponentName(node.type, 'ArcOrbitTitle') ||
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
  const hubR = rootContext?.geo.value.left.hubRadius ?? 170;
  const centerY = rootContext?.geo.value.centerY ?? 240;
  const isLayout = rootContext?.as?.value === 'layout';
  const isMoved = rootContext?.isMoved?.value ?? false;
  const centerX = rootContext?.geo.value.centerX ?? 500;
  const edgeOffset = rootContext?.edgeOffset?.value ?? 30;
  const inCenter = isLayout && !isMoved;
  const targetLeft = inCenter ? `${centerX - hubR}px` : '0px';
  const targetWidth = inCenter ? `${hubR}px` : `${edgeOffset + hubR}px`;

  return {
    top: `${centerY - hubR}px`,
    left: targetLeft,
    width: targetWidth,
    height: `${hubR * 2}px`,
    paddingRight: inCenter ? '28px' : undefined,
    paddingLeft: inCenter ? '8px' : undefined,
    transition: 'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-comparison-left absolute inset-0 w-full h-full pointer-events-none',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <!-- Left Hub Title Display -->
    <div
      class="alpha-arc-comparison__hub-title alpha-arc-comparison__hub-title--left absolute flex items-center justify-center z-10 pointer-events-auto"
      :style="hubStyle"
    >
      <component :is="titleNode" v-if="titleNode" />
      <ArcComparisonTitle v-else-if="props.title">
        {{ props.title }}
      </ArcComparisonTitle>
      <ArcComparisonTitle v-else />
    </div>
    <!-- Contents & Callouts -->
    <div
      v-if="rootContext?.as?.value !== 'layout' || rootContext?.isMoved?.value"
      class="alpha-arc-comparison__contents-wrapper transition-opacity duration-500 ease-out"
      :class="{
        'opacity-0': rootContext?.as?.value === 'layout' && !rootContext?.isMoved?.value,
        'opacity-100': rootContext?.as?.value !== 'layout' || rootContext?.isMoved?.value,
      }"
      :style="{
        transitionDelay:
          rootContext?.as?.value === 'layout' && rootContext?.isMoved?.value
            ? '300ms'
            : '0ms',
      }"
    >
      <template v-if="bodyNodes.length > 0">
        <component :is="node" v-for="(node, i) in bodyNodes" :key="i" />
      </template>
      <ArcComparisonContents v-else>
        <ArcComparisonOrbit
          v-for="idx in resolvedCount"
          :key="idx"
          :index="idx - 1"
        />
      </ArcComparisonContents>
    </div>
  </div>
</template>
