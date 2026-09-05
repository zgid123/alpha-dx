<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  inject,
  onBeforeUpdate,
  provide,
  ref,
  useSlots,
} from 'vue';

import {
  ARROW_TRIAD_ROOT_KEY,
  createArrowTriadGeometry,
  getDefaultArrowTriadItem,
  type IArrowTriadItem,
  resolveArrowTriadItems,
  type TArrowTriadLayout,
} from '../../utils/arrowTriad';
import { useDiagramAutoScale } from '../../utils/useDiagramAutoScale';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import ArrowTriadCallout from './ArrowTriadCallout.vue';

defineOptions({
  name: 'ArrowTriad',
  inheritAttrs: false,
});

export interface IArrowTriadProps {
  readonly items?: readonly IArrowTriadItem[];
  readonly animation?: boolean;
  readonly height?: number | string;
  readonly startDelay?: number;
  readonly active?: boolean;
  readonly triangleHead?: boolean;
  readonly neckLine?: boolean;
  readonly scale?: number;
  readonly autoScale?: boolean;
  readonly maxScale?: number;
  readonly hidePagy?: boolean;
  readonly layout?: TArrowTriadLayout;
  readonly offsetX?: number;
}

const props = withDefaults(defineProps<IArrowTriadProps>(), {
  items: undefined,
  animation: true,
  height: undefined,
  startDelay: undefined,
  active: undefined,
  triangleHead: true,
  neckLine: true,
  scale: undefined,
  autoScale: true,
  maxScale: undefined,
  hidePagy: undefined,
  layout: '2-left-1-right',
  offsetX: undefined,
});

const slots = useSlots();

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

const resolvedItems = computed(() => {
  return resolveArrowTriadItems(props.items);
});

let calloutCounter = 0;
onBeforeUpdate(() => {
  calloutCounter = 0;
});

const registerCallout = () => {
  const idx = calloutCounter++;

  return {
    index: idx,
    item: computed(() => {
      return resolvedItems.value[idx] ?? getDefaultArrowTriadItem(idx);
    }),
  };
};

const resolvedLayout = computed<TArrowTriadLayout>(() => props.layout);

const is2Left = computed(() => {
  return (
    resolvedLayout.value === '2-left-1-right' ||
    resolvedLayout.value === '2-left'
  );
});

provide(ARROW_TRIAD_ROOT_KEY, {
  registerCallout,
  items: resolvedItems,
  animation: isAnimated,
  layout: resolvedLayout,
});

const geo = createArrowTriadGeometry();

const rootRef = ref<HTMLElement | null>(null);

const { resolvedScale, containerHeight } = useDiagramAutoScale({
  rootRef,
  baseWidth: 900,
  baseHeight: 390,
  scale: () => props.scale,
  autoScale: () => props.autoScale,
  maxScale: () => props.maxScale,
  height: () => props.height,
});

const resolvedOffsetX = computed(() => {
  if (props.offsetX !== undefined) {
    return props.offsetX;
  }

  return is2Left.value ? -8 : 8;
});

const stageTransform = computed(() => {
  const parts: string[] = [];
  if (resolvedOffsetX.value !== 0) {
    parts.push(`translateX(${resolvedOffsetX.value}px)`);
  }

  if (resolvedScale.value !== 1) {
    parts.push(`scale(${resolvedScale.value})`);
  }

  return parts.length > 0 ? parts.join(' ') : undefined;
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

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arrow-triad w-full flex-1 flex flex-col items-center justify-center select-none font-sans relative min-h-0',
);
</script>

<template>
  <div
    ref="rootRef"
    v-bind="forwardedAttrs()"
    :class="[
      className(),
      { 'hide-pagy': props.hidePagy },
    ]"
    :data-hide-pagy="props.hidePagy ? '' : undefined"
    :style="{
      height: resolvedHeightStyle,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
      '--arrow-triad-start-delay': `${resolvedStartDelay}ms`,
    }"
  >
    <!-- Relative stage container -->
    <div
      class="alpha-arrow-triad__stage relative w-full h-full min-h-[350px] max-w-[900px] flex items-center justify-center overflow-visible"
      :style="{
        transform: stageTransform,
        transformOrigin: 'center center',
      }"
    >
      <!-- Central SVG graphic: 3 curved arrows + concentric dashed arcs -->
      <div
        class="alpha-arrow-triad__center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[362px] pointer-events-none"
      >
        <svg
          class="w-full h-full overflow-visible"
          :viewBox="`0 0 ${geo.viewBoxWidth} ${geo.viewBoxHeight}`"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g :transform="is2Left ? `translate(${geo.viewBoxWidth}, 0) scale(-1, 1)` : undefined">
            <!-- Dashed Guide Arcs -->
            <g
              class="alpha-arrow-triad__dashed"
              :class="{ 'alpha-arrow-triad--animated': isAnimated }"
              fill="none"
              stroke="#94a3b8"
              stroke-width="1.8"
              stroke-dasharray="4 4"
              opacity="0.8"
            >
              <path
                v-for="(d, idx) in geo.dashedArcs"
                :key="idx"
                :d="d"
              />
            </g>
          <!-- Arrow 0: Yellow Arrow (Top-Right) -->
          <g
            class="alpha-arrow-triad__branch alpha-arrow-triad__branch--yellow"
            :class="{ 'alpha-arrow-triad--animated': isAnimated }"
          >
            <path
              :d="props.triangleHead ? geo.yellowArrow.stemPath : geo.yellowArrow.path"
              :fill="resolvedItems[0].color"
            />
            <polygon
              v-if="props.triangleHead"
              :points="geo.yellowArrow.outerHeadPoints"
              :fill="resolvedItems[0].color"
              :stroke="resolvedItems[0].depthColor"
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              v-else-if="props.neckLine"
              :d="geo.yellowArrow.neckLine"
              fill="none"
              :stroke="resolvedItems[0].depthColor"
              stroke-width="4"
              stroke-linecap="round"
            />
          </g>
          <!-- Arrow 1: Green Arrow (Bottom-Right) -->
          <g
            class="alpha-arrow-triad__branch alpha-arrow-triad__branch--green"
            :class="{ 'alpha-arrow-triad--animated': isAnimated }"
          >
            <path
              :d="props.triangleHead ? geo.greenArrow.stemPath : geo.greenArrow.path"
              :fill="resolvedItems[1].color"
            />
            <polygon
              v-if="props.triangleHead"
              :points="geo.greenArrow.outerHeadPoints"
              :fill="resolvedItems[1].color"
              :stroke="resolvedItems[1].depthColor"
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              v-else-if="props.neckLine"
              :d="geo.greenArrow.neckLine"
              fill="none"
              :stroke="resolvedItems[1].depthColor"
              stroke-width="4"
              stroke-linecap="round"
            />
          </g>
          <!-- Arrow 2: Blue Arrow (Left) -->
          <g
            class="alpha-arrow-triad__branch alpha-arrow-triad__branch--blue"
            :class="{ 'alpha-arrow-triad--animated': isAnimated }"
          >
            <path
              :d="props.triangleHead ? geo.blueArrow.stemPath : geo.blueArrow.path"
              :fill="resolvedItems[2].color"
            />
            <polygon
              v-if="props.triangleHead"
              :points="geo.blueArrow.outerHeadPoints"
              :fill="resolvedItems[2].color"
              :stroke="resolvedItems[2].depthColor"
              stroke-width="4"
              stroke-linejoin="round"
            />
            <path
              v-else-if="props.neckLine"
              :d="geo.blueArrow.neckLine"
              fill="none"
              :stroke="resolvedItems[2].depthColor"
              stroke-width="4"
              stroke-linecap="round"
            />
          </g>
        </g>
      </svg>
    </div>
    <!-- Callout Cards -->
    <slot>
      <ArrowTriadCallout :index="0" />
      <ArrowTriadCallout :index="1" />
      <ArrowTriadCallout :index="2" />
    </slot>
  </div>
</div>
</template>

<style scoped>
.alpha-arrow-triad--animated.alpha-arrow-triad__dashed {
  animation: arrow-triad-dashed-fade 500ms ease-out calc(var(--arrow-triad-start-delay, 0ms) + 100ms) both;
}

.alpha-arrow-triad--animated.alpha-arrow-triad__branch--yellow {
  animation: arrow-triad-branch-pop 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arrow-triad-start-delay, 0ms) + 50ms) both;
  transform-origin: 349px 319px;
}

.alpha-arrow-triad--animated.alpha-arrow-triad__branch--green {
  animation: arrow-triad-branch-pop 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arrow-triad-start-delay, 0ms) + 120ms) both;
  transform-origin: 349px 319px;
}

.alpha-arrow-triad--animated.alpha-arrow-triad__branch--blue {
  animation: arrow-triad-branch-pop 450ms cubic-bezier(0.16, 1, 0.3, 1) calc(var(--arrow-triad-start-delay, 0ms) + 190ms) both;
  transform-origin: 349px 319px;
}

@keyframes arrow-triad-branch-pop {
  0% {
    transform: scale(0.85);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}

@keyframes arrow-triad-dashed-fade {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.8;
  }
}
</style>
