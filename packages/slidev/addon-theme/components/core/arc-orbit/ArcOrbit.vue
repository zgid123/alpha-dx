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
  ARC_ORBIT_ROOT_KEY,
  createArcOrbitGeometry,
  DEFAULT_ARC_ORBIT_COLOR,
  type IArcOrbitItem,
  type TArcOrbitPosition,
} from '../../../utils/arcOrbit';
import { useDiagramAutoScale } from '../../../utils/useDiagramAutoScale';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';
import ArcOrbitCallout from './ArcOrbitCallout.vue';
import ArcOrbitContents from './ArcOrbitContents.vue';
import ArcOrbitTitle from './ArcOrbitTitle.vue';

defineOptions({
  inheritAttrs: false,
  name: 'ArcOrbit',
});

export interface IArcOrbitProps {
  readonly position?: TArcOrbitPosition;
  readonly count?: number;
  readonly color?: string;
  readonly title?: string;
  readonly items?: readonly IArcOrbitItem[];
  readonly animation?: boolean;
  readonly height?: number | string;
  readonly startDelay?: number;
  readonly active?: boolean;
  readonly scale?: number;
  readonly autoScale?: boolean;
  readonly maxScale?: number;
  readonly hubRadius?: number;
  readonly arcRadius?: number;
  readonly arcOffset?: number;
  readonly edgeOffset?: number;
  readonly viewBoxWidth?: number;
  readonly viewBoxHeight?: number;
}

const props = withDefaults(defineProps<IArcOrbitProps>(), {
  position: 'left',
  count: undefined,
  color: DEFAULT_ARC_ORBIT_COLOR,
  title: undefined,
  items: undefined,
  animation: true,
  height: undefined,
  startDelay: undefined,
  active: undefined,
  scale: undefined,
  autoScale: true,
  maxScale: undefined,
  hubRadius: undefined,
  arcRadius: undefined,
  arcOffset: undefined,
  edgeOffset: 30,
  viewBoxWidth: 500,
  viewBoxHeight: 480,
});

const emit = defineEmits<(e: 'click', event: MouseEvent) => void>();

const slots = useSlots();
const rootRef = ref<HTMLElement | null>(null);

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
    return shiftingIntro.isShifting?.value ? 500 : 0;
  }

  return 0;
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

  if (typeof type === 'function') {
    return (type as { name?: string }).name === name;
  }

  return false;
}

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
    hasComponentName(node.type, 'ArcOrbitTitle') ||
    hasComponentName(node.type, 'ArcComparisonTitle') ||
    node.type === ArcOrbitTitle
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

const resolvedCount = computed(() => {
  if (props.count === 4 || (props.count as unknown) === '4') {
    return 4;
  }

  for (const node of defaultNodes.value) {
    if (node.props?.count === 4 || (node.props?.count as unknown) === '4') {
      return 4;
    }
  }

  return props.count ? Math.max(1, Math.min(Number(props.count), 4)) : 3;
});

const geo = computed(() => {
  return createArcOrbitGeometry({
    viewBoxWidth: props.viewBoxWidth,
    viewBoxHeight: props.viewBoxHeight,
    position: props.position,
    hubRadius: props.hubRadius,
    edgeOffset: props.edgeOffset,
    arcRadius: props.arcRadius,
    arcOffset: props.arcOffset,
    pointsCount: resolvedCount.value,
  });
});

let clipInstanceCounter = 0;
const clipId = `alpha-arc-orbit-clip-${++clipInstanceCounter}`;

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

const currentTitle = ref<string>(props.title ?? 'Add Topic\nTitle');

provide(ARC_ORBIT_ROOT_KEY, {
  position: computed(() => props.position ?? 'left'),
  color: computed(() => props.color ?? DEFAULT_ARC_ORBIT_COLOR),
  pointsCount: resolvedCount,
  geo,
  animation: isAnimated,
  startDelay: resolvedStartDelay,
  title: computed(() => currentTitle.value),
  setTitle: (val: string) => {
    currentTitle.value = val;
  },
  registerCallout,
  unregisterCallout,
  edgeOffset: computed(() => props.edgeOffset ?? 30),
  items: computed(() => props.items),
});

const { resolvedScale, containerHeight } = useDiagramAutoScale({
  rootRef,
  baseWidth: props.viewBoxWidth,
  baseHeight: props.viewBoxHeight,
  scale: () => props.scale,
  autoScale: () => props.autoScale,
  maxScale: () => props.maxScale,
  height: () => props.height,
});

const stageTransform = computed(() => {
  if (resolvedScale.value !== 1) {
    return `scale(${resolvedScale.value})`;
  }

  return undefined;
});

const resolvedHeightStyle = computed(() => {
  if (props.height !== undefined) {
    return typeof props.height === 'number'
      ? `${props.height}px`
      : props.height;
  }

  if (containerHeight.value > 0) {
    return `${containerHeight.value}px`;
  }

  return undefined;
});

const hubStyle = computed(() => {
  const hubR = geo.value.hubRadius;
  const centerY = geo.value.hubCenter.y;
  const isRight = props.position === 'right';
  const edgeOffset = props.edgeOffset ?? 30;

  return {
    top: `${centerY - hubR}px`,
    ...(isRight ? { right: '0px' } : { left: '0px' }),
    width: `${hubR + edgeOffset}px`,
    height: `${hubR * 2}px`,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-orbit w-full flex-1 flex flex-col justify-center select-none font-sans relative min-h-0',
);

function handleClick(event: MouseEvent): void {
  emit('click', event);
}
</script>

<template>
  <div
    ref="rootRef"
    v-bind="forwardedAttrs()"
    :class="[
      className(),
      `alpha-arc-orbit--${props.position}`,
      props.position === 'right' ? 'items-end' : 'items-start',
    ]"
    :data-position="props.position"
    :style="{
      height: resolvedHeightStyle,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
      '--arc-orbit-start-delay': `${resolvedStartDelay}ms`,
    }"
    @click="handleClick"
  >
    <!-- Relative stage container -->
    <div
      class="alpha-arc-orbit__stage relative flex items-center justify-center overflow-visible flex-shrink-0"
      :style="{
        width: `${props.viewBoxWidth}px`,
        height: `${props.viewBoxHeight}px`,
        transform: stageTransform,
        transformOrigin: 'center center',
      }"
    >
      <!-- Base SVG Layer -->
      <svg
        class="alpha-arc-orbit__svg absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        :viewBox="`0 0 ${props.viewBoxWidth} ${props.viewBoxHeight}`"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath :id="clipId">
            <rect x="0" y="0" :width="props.viewBoxWidth" :height="props.viewBoxHeight" />
          </clipPath>
        </defs>
        <!-- Semicircular Hub Background -->
        <g :clip-path="`url(#${clipId})`">
          <g
            class="alpha-arc-orbit__hub"
            :class="[
              `alpha-arc-orbit__hub--${props.position}`,
              { 'alpha-arc-orbit--animated': isAnimated },
            ]"
          >
            <path
              :d="geo.hubPath"
              fill="#f1f3f6"
              class="transition-colors duration-300 dark:fill-slate-800/80"
            />
          </g>
        </g>
        <!-- Arc Guide Line and End Dots -->
        <g
          class="alpha-arc-orbit__arc transition-opacity duration-500 ease-out"
          :class="[
            `alpha-arc-orbit__arc--${props.position}`,
            { 'alpha-arc-orbit--animated': isAnimated },
          ]"
        >
          <path
            :d="geo.arcPath"
            fill="none"
            stroke="#cbd5e1"
            stroke-width="1.5"
            class="transition-colors duration-300 dark:stroke-slate-700"
          />
          <circle
            :cx="geo.topDot.x"
            :cy="geo.topDot.y"
            :r="geo.dotRadius"
            fill="#94a3b8"
            class="dark:fill-slate-600"
          />
          <circle
            :cx="geo.bottomDot.x"
            :cy="geo.bottomDot.y"
            :r="geo.dotRadius"
            fill="#94a3b8"
            class="dark:fill-slate-600"
          />
        </g>
      </svg>
      <!-- Hub Title Display -->
      <div
        class="alpha-arc-orbit__hub-title absolute flex items-center justify-center z-10 pointer-events-auto"
        :class="`alpha-arc-orbit__hub-title--${props.position}`"
        :style="hubStyle"
      >
        <component :is="titleNode" v-if="titleNode" />
        <ArcOrbitTitle v-else-if="props.title">
          {{ props.title }}
        </ArcOrbitTitle>
        <ArcOrbitTitle v-else />
      </div>
      <!-- Contents & Callouts Layer -->
      <div class="alpha-arc-orbit__contents-wrapper absolute inset-0 w-full h-full pointer-events-none">
        <template v-if="bodyNodes.length > 0">
          <component :is="node" v-for="(node, i) in bodyNodes" :key="i" />
        </template>
        <ArcOrbitContents v-else>
          <ArcOrbitCallout
            v-for="idx in resolvedCount"
            :key="idx"
            :index="idx - 1"
          />
        </ArcOrbitContents>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alpha-arc-orbit--animated.alpha-arc-orbit__hub--left {
  animation: arc-orbit-hub-left-in 550ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 30ms) both;
}

.alpha-arc-orbit--animated.alpha-arc-orbit__hub--right {
  animation: arc-orbit-hub-right-in 550ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 30ms) both;
}

.alpha-arc-orbit--animated.alpha-arc-orbit__arc {
  animation: arc-orbit-line-fade 500ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arc-orbit-start-delay, 0ms) + 100ms) both;
}

@keyframes arc-orbit-hub-left-in {
  0% {
    opacity: 0;
    transform: translateX(-40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes arc-orbit-hub-right-in {
  0% {
    opacity: 0;
    transform: translateX(40px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes arc-orbit-line-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
