<script setup lang="ts">
import { activateOnKeyboard } from '../../../utils/activateOnKeyboard';
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  provide,
  ref,
  useId,
  useSlots,
  isVNode,
  watch,
  type VNode,
} from 'vue';

import {
  ARC_ORBIT_ROOT_KEY,
  createArcOrbitGeometry,
  DEFAULT_ARC_ORBIT_COLOR,
  type TArcOrbitPosition,
} from '../../../utils/core/arc-orbit';
import { useDiagramAutoScale } from '../../../utils/useDiagramAutoScale';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcOrbit',
});

export interface IArcOrbitProps {
  readonly position?: TArcOrbitPosition;
  readonly count?: number;
  readonly color?: string;
  readonly title?: string | VNode;
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

const uid = useId();
const clipId = `alpha-arc-orbit-clip-${uid}`;

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

const currentTitle = ref<string>(
  typeof props.title === 'string' ? props.title : '',
);
watch(
  () => props.title,
  (title) => {
    currentTitle.value = typeof title === 'string' ? title : '';
  },
);

const orbitColor = computed(() => props.color ?? DEFAULT_ARC_ORBIT_COLOR);

provide(ARC_ORBIT_ROOT_KEY, {
  position: computed(() => props.position ?? 'left'),
  color: orbitColor,
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
  items: computed(() => {
    return [];
  }),
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

const customColor = computed(() => {
  return props.color && props.color !== DEFAULT_ARC_ORBIT_COLOR
    ? props.color
    : undefined;
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
  'alpha-arc-orbit w-full flex-1 flex flex-col justify-center select-none font-sans relative min-h-0 border-0 p-0 m-0 min-w-0 bg-transparent',
);

function handleClick(event: MouseEvent): void {
  emit('click', event);
}
</script>

<template>
  <fieldset
    ref="rootRef"
    aria-label="Arc orbit diagram"
    v-bind="forwardedAttrs()"
    :class="[
      className(props.position === 'right' ? 'items-end' : 'items-start'),
      `alpha-arc-orbit--${props.position}`,
    ]"
    :data-position="props.position"
    :style="{
      height: resolvedHeightStyle,
      '--alpha-arc-orbit-start-delay': `${resolvedStartDelay}ms`,
      '--alpha-arc-orbit-accent': customColor,
      '--alpha-arc-orbit-title': customColor,
    }"
    @click="handleClick"
    @keydown="activateOnKeyboard"
  >
    <!-- Relative stage container -->
    <div
      class="alpha-arc-orbit__stage relative flex items-center justify-center overflow-visible shrink-0"
      :style="{
        width: `${props.viewBoxWidth}px`,
        height: `${props.viewBoxHeight}px`,
        transform: stageTransform,
        transformOrigin: 'center center',
      }"
    >
      <!-- Base SVG Layer -->
      <svg
        aria-hidden="true"
        class="alpha-arc-orbit__svg absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        :viewBox="`0 0 ${props.viewBoxWidth} ${props.viewBoxHeight}`"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath :id="clipId">
            <rect
              x="0"
              y="0"
              :width="props.viewBoxWidth"
              :height="props.viewBoxHeight"
            />
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
              fill="var(--alpha-arc-orbit-hub-fill)"
              class="transition-colors duration-300"
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
            stroke="var(--alpha-arc-orbit-guide-stroke)"
            stroke-width="1.5"
            class="transition-colors duration-300"
          />
          <circle
            :cx="geo.topDot.x"
            :cy="geo.topDot.y"
            :r="geo.dotRadius"
            fill="var(--alpha-arc-orbit-guide-dot)"
          />
          <circle
            :cx="geo.bottomDot.x"
            :cy="geo.bottomDot.y"
            :r="geo.dotRadius"
            fill="var(--alpha-arc-orbit-guide-dot)"
          />
        </g>
      </svg>
      <!-- Hub Title Display -->
      <h3
        class="alpha-arc-orbit__hub-title absolute flex items-center justify-center z-10 pointer-events-auto font-sans font-bold text-center px-2 leading-tight select-none tracking-tight whitespace-pre-line text-(--alpha-arc-orbit-title)"
        :class="`alpha-arc-orbit__hub-title--${props.position}`"
        :style="hubStyle"
      >
        <slot v-if="$slots.title" name="title" />
        <component :is="props.title" v-else-if="isVNode(props.title)" />
        <span v-else-if="typeof props.title === 'string'">{{
          props.title
        }}</span>
      </h3>
      <!-- Contents & Callouts Layer -->
      <div
        class="alpha-arc-orbit__contents-wrapper absolute inset-0 w-full h-full pointer-events-none"
      >
        <component :is="node" v-for="(node, i) in defaultNodes" :key="i" />
      </div>
    </div>
  </fieldset>
</template>

<style scoped>
.alpha-arc-orbit--animated.alpha-arc-orbit__hub--left {
  animation: arc-orbit-hub-left-in 550ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--alpha-arc-orbit-start-delay, 0ms) + 30ms) both;
}

.alpha-arc-orbit--animated.alpha-arc-orbit__hub--right {
  animation: arc-orbit-hub-right-in 550ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--alpha-arc-orbit-start-delay, 0ms) + 30ms) both;
}

.alpha-arc-orbit--animated.alpha-arc-orbit__arc {
  animation: arc-orbit-line-fade 500ms cubic-bezier(0.16, 1, 0.3, 1)
    calc(var(--alpha-arc-orbit-start-delay, 0ms) + 100ms) both;
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
