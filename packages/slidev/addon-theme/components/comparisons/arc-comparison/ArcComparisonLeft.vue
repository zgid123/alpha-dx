<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  provide,
  ref,
  useSlots,
  isVNode,
  type VNode,
  watch,
} from 'vue';

import {
  ARC_COMPARISON_HUB_INNER_CLEARANCE_PX,
  ARC_COMPARISON_HUB_OUTER_PADDING_PX,
  ARC_COMPARISON_ROOT_KEY,
  ARC_COMPARISON_SIDE_KEY,
  calculateArcComparisonHubAvailableWidth,
  DEFAULT_LEFT_COLOR,
  useArcComparisonHubTitleFontSize,
} from '../../../utils/comparisons/arc-comparison';
import {
  ARC_ORBIT_ROOT_KEY,
  type IArcOrbitGeometry,
  type TArcOrbitPosition,
} from '../../../utils/core/arc-orbit';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcComparisonLeft',
});

export interface IArcComparisonLeftProps {
  readonly color?: string;
  readonly title?: string | VNode;
  readonly count?: number;
}

const props = withDefaults(defineProps<IArcComparisonLeftProps>(), {
  color: DEFAULT_LEFT_COLOR,
  title: undefined,
  count: undefined,
});

const rootContext = inject(ARC_COMPARISON_ROOT_KEY, undefined);

const slots = useSlots();

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

const currentTitle = ref<string>(
  typeof props.title === 'string' ? props.title : '',
);
watch(
  () => props.title,
  (title) => {
    currentTitle.value = typeof title === 'string' ? title : '';
  },
);

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
  items: computed(() => {
    return [];
  }),
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

const defaultNodes = computed(() => {
  if (!slots.default) {
    return [];
  }

  return flattenVNodes(slots.default());
});

const titleTextRef = ref<HTMLElement | null>(null);

const isInCenter = computed(() => {
  const isLayout = rootContext?.as?.value === 'layout';
  const isMoved = rootContext?.isMoved?.value ?? false;

  return isLayout && !isMoved;
});

const availableTitleWidth = computed(() => {
  const hubR = rootContext?.geo.value.left.hubRadius ?? 170;
  const vsR = rootContext?.geo.value.vsRadius ?? 26;

  return calculateArcComparisonHubAvailableWidth({
    hubRadius: hubR,
    vsRadius: vsR,
  });
});

const { fontSize: titleFontSize } = useArcComparisonHubTitleFontSize({
  titleTextRef,
  availableWidth: availableTitleWidth,
  inCenter: isInCenter,
  sharedFontSize: rootContext?.hubTitleFontSize,
  onFontSizeChange: (size: number) => {
    rootContext?.setSideHubTitleFontSize?.('left', size);
  },
});

const hubStyle = computed(() => {
  const hubR = rootContext?.geo.value.left.hubRadius ?? 170;
  const vsR = rootContext?.geo.value.vsRadius ?? 26;
  const centerY = rootContext?.geo.value.centerY ?? 240;
  const isLayout = rootContext?.as?.value === 'layout';
  const isMoved = rootContext?.isMoved?.value ?? false;
  const centerX = rootContext?.geo.value.centerX ?? 500;
  const edgeOffset = rootContext?.edgeOffset?.value ?? 30;
  const inCenter = isLayout && !isMoved;
  const targetLeft = inCenter ? `${centerX - hubR}px` : '0px';
  const targetWidth = inCenter ? `${hubR}px` : `${edgeOffset + hubR}px`;
  const innerPadding = `${vsR + ARC_COMPARISON_HUB_INNER_CLEARANCE_PX}px`;
  const outerPadding = `${ARC_COMPARISON_HUB_OUTER_PADDING_PX}px`;

  return {
    top: `${centerY - hubR}px`,
    left: targetLeft,
    width: targetWidth,
    height: `${hubR * 2}px`,
    paddingRight: inCenter ? innerPadding : undefined,
    paddingLeft: inCenter ? outerPadding : undefined,
    fontSize: `${titleFontSize.value}px`,
    transition: 'all 700ms cubic-bezier(0.16, 1, 0.3, 1)',
  };
});

const rootStyle = computed(() => {
  if (!props.color || props.color === DEFAULT_LEFT_COLOR) {
    return undefined;
  }

  return {
    '--alpha-arc-comparison-left-title': props.color,
    '--alpha-arc-comparison-left-accent': props.color,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-comparison-left absolute inset-0 w-full h-full pointer-events-none',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()" :style="rootStyle">
    <!-- Left Hub Title Display -->
    <h3
      class="alpha-arc-comparison__hub-title alpha-arc-comparison__hub-title--left absolute flex items-center justify-center z-10 pointer-events-auto font-sans font-bold text-center px-2 leading-tight select-none tracking-tight whitespace-pre-line text-[18px] text-(--alpha-arc-comparison-left-title)"
      :style="hubStyle"
    >
      <span
        ref="titleTextRef"
        class="alpha-arc-comparison__hub-title-text max-w-full"
      >
        <slot v-if="$slots.title" name="title" />
        <component :is="props.title" v-else-if="isVNode(props.title)" />
        <span v-else-if="typeof props.title === 'string'">{{
          props.title
        }}</span>
      </span>
    </h3>
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
      <div
        class="alpha-arc-comparison-contents absolute inset-0 w-full h-full pointer-events-none"
      >
        <component :is="node" v-for="(node, i) in defaultNodes" :key="i" />
      </div>
    </div>
  </div>
</template>
