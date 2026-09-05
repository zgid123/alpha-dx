<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  onBeforeUpdate,
  onMounted,
  onUnmounted,
  provide,
  ref,
  shallowReactive,
  useId,
  useSlots,
  type VNode,
} from 'vue';

import {
  calculateQuadHubCoordinates,
  DEFAULT_QUAD_HUB_ITEMS,
  type IQuadBox,
  type IQuadHubItem,
  type IQuadHubRegistration,
  type IQuadPoint,
  type IResolvedQuadHubItem,
  QUAD_HUB_ROOT_KEY,
  resolveQuadHubItems,
} from '../../utils/quadHub';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';
import QuadHubCallout from './QuadHubCallout.vue';
import QuadHubCenter from './QuadHubCenter.vue';
import QuadHubIcon from './QuadHubIcon.vue';

defineOptions({
  name: 'QuadHub',
  inheritAttrs: false,
});

export interface IQuadBlockData {
  readonly box: IQuadBox;
  readonly arcPath: string;
  readonly iconPos: IQuadPoint;
  readonly numberPos: IQuadPoint;
  readonly item: IResolvedQuadHubItem;
}

export interface IQuadHubProps {
  readonly title?: string;
  readonly items?: readonly IQuadHubItem[];
  readonly active?: boolean;
  readonly height?: number | string;
  readonly arcRatio?: number;
  readonly subtitle?: string;
  readonly animation?: boolean;
  readonly startDelay?: number;
  readonly arcBorderRatio?: number;
  readonly scale?: number;
  readonly autoScale?: boolean;
  readonly maxScale?: number;
}

const props = withDefaults(defineProps<IQuadHubProps>(), {
  title: undefined,
  items: undefined,
  active: undefined,
  height: undefined,
  arcRatio: 0.55,
  subtitle: undefined,
  animation: true,
  startDelay: undefined,
  arcBorderRatio: 0.8,
  scale: undefined,
  autoScale: true,
  maxScale: undefined,
});

const resolvedHeightStyle = computed(() => {
  if (props.height === undefined) {
    return undefined;
  }

  return typeof props.height === 'number' ? `${props.height}px` : props.height;
});

const uid = useId();
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

function flattenVNodes(nodes: readonly VNode[]): readonly VNode[] {
  const result: VNode[] = [];

  for (const node of nodes) {
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flattenVNodes(node.children as readonly VNode[]));
    } else {
      result.push(node);
    }
  }

  return result;
}

const shiftingIntro = inject<
  | {
      active: ComputedRef<boolean>;
      isShifting?: ComputedRef<boolean>;
    }
  | undefined
>('SLIDEV_LAYOUT_SHIFTING_INTRO', undefined);

const isAnimated = computed((): boolean => {
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

const resolvedStartDelay = computed((): number => {
  if (props.startDelay !== undefined) {
    return props.startDelay;
  }

  if (shiftingIntro) {
    return shiftingIntro.isShifting?.value ? 600 : 0;
  }

  return 0;
});

const registeredCallouts = shallowReactive<Map<number, IQuadHubItem>>(
  new Map(),
);

const resolvedItems = computed(
  (): readonly [
    IResolvedQuadHubItem,
    IResolvedQuadHubItem,
    IResolvedQuadHubItem,
    IResolvedQuadHubItem,
  ] => {
    const rawDefaultNodes = slots.default ? slots.default() : [];
    const flattenedNodes = flattenVNodes(rawDefaultNodes);
    const calloutNodes = flattenedNodes.filter((node) => {
      return (
        hasComponentName(node.type, 'QuadHubCallout') ||
        node.type === QuadHubCallout
      );
    });

    const mergedItems: IQuadHubItem[] = [];

    for (let i = 0; i < 4; i++) {
      const slotProps =
        (calloutNodes[i]?.props as IQuadHubItem | undefined) ?? {};
      const regProps = registeredCallouts.get(i) ?? {};
      const propItem = props.items?.[i] ?? {};

      mergedItems.push({
        ...propItem,
        ...slotProps,
        ...regProps,
      });
    }

    return resolveQuadHubItems({
      items: mergedItems,
      arcRatio: props.arcRatio,
      arcBorderRatio: props.arcBorderRatio,
    });
  },
);

const [firstFallbackItem] = DEFAULT_QUAD_HUB_ITEMS;

let calloutCounter = 0;

const registerCallout = (calloutProps?: IQuadHubItem): IQuadHubRegistration => {
  const idx = calloutCounter++;

  if (calloutProps) {
    registeredCallouts.set(idx, calloutProps);
  }

  return {
    index: idx,
    item: computed((): IResolvedQuadHubItem => {
      const current = resolvedItems.value[idx];
      return current ?? resolvedItems.value[0] ?? firstFallbackItem;
    }),
  };
};

onBeforeUpdate(() => {
  calloutCounter = 0;
});

provide(QUAD_HUB_ROOT_KEY, {
  items: resolvedItems,
  animation: isAnimated,
  registerCallout,
});

// Precision coordinates calculation for SVG elements
const coords = calculateQuadHubCoordinates({
  gap: 14,
  width: 136,
  height: 150,
  arcRadius: 104,
  hubRadius: 58,
  arcInsetDeg: 11,
  viewBoxSize: 360,
  cornerRadius: 26,
  iconPaddingX: 30,
  iconPaddingY: 32,
  arcBorderWidth: 5,
});

const {
  centerX,
  centerY,
  arcPaths,
  arcRadius,
  hubRadius,
  quadrants,
  viewBoxSize,
  iconPositions,
  arcBorderWidth,
  numberPositions,
} = coords;

const quadrantBlocks = computed(
  (): readonly [
    IQuadBlockData,
    IQuadBlockData,
    IQuadBlockData,
    IQuadBlockData,
  ] => {
    const [i0, i1, i2, i3] = resolvedItems.value;
    return [
      {
        box: quadrants[0],
        item: i0,
        arcPath: arcPaths[0],
        iconPos: iconPositions[0],
        numberPos: numberPositions[0],
      },
      {
        box: quadrants[1],
        item: i1,
        arcPath: arcPaths[1],
        iconPos: iconPositions[1],
        numberPos: numberPositions[1],
      },
      {
        box: quadrants[2],
        item: i2,
        arcPath: arcPaths[2],
        iconPos: iconPositions[2],
        numberPos: numberPositions[2],
      },
      {
        box: quadrants[3],
        item: i3,
        arcPath: arcPaths[3],
        iconPos: iconPositions[3],
        numberPos: numberPositions[3],
      },
    ] as const;
  },
);

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-quad-hub w-full flex-1 flex flex-col items-center justify-center select-none font-sans min-h-0',
);

const rootRef = ref<HTMLElement | null>(null);
const autoScaleValue = ref<number>(1);

const BASE_WIDTH = 940;
const BASE_HEIGHT = 350;

const updateScale = () => {
  if (!rootRef.value) {
    return;
  }

  const el = rootRef.value;
  const parent = el.parentElement;

  if (!parent) {
    return;
  }

  // 1. Measure the immediate parent container
  const parentStyle = window.getComputedStyle(parent);
  const padLeft = Number.parseFloat(parentStyle.paddingLeft) || 0;
  const padRight = Number.parseFloat(parentStyle.paddingRight) || 0;
  const padTop = Number.parseFloat(parentStyle.paddingTop) || 0;
  const padBottom = Number.parseFloat(parentStyle.paddingBottom) || 0;

  // Usable width inside parent block
  let availW = 0;
  if (parent.clientWidth > 0) {
    availW = parent.clientWidth - padLeft - padRight;
  } else if (el.clientWidth > 0) {
    availW = el.clientWidth;
  }

  // Usable height inside parent block
  let availH = 0;

  if (typeof props.height === 'number') {
    availH = props.height;
  } else if (typeof props.height === 'string' && props.height.endsWith('px')) {
    availH = Number.parseFloat(props.height);
  }

  if (!availH) {
    // Count height of sibling elements inside parent (e.g. titles, headers)
    let siblingsH = 0;
    for (let i = 0; i < parent.children.length; i++) {
      const child = parent.children[i];

      if (child !== el && child instanceof HTMLElement) {
        siblingsH += child.offsetHeight;
        const cs = window.getComputedStyle(child);
        siblingsH +=
          (Number.parseFloat(cs.marginTop) || 0) +
          (Number.parseFloat(cs.marginBottom) || 0);
      }
    }

    // If parent has a defined height (flex-1, h-full, explicit height)
    if (parent.clientHeight > 0) {
      availH = Math.max(
        0,
        parent.clientHeight - padTop - padBottom - siblingsH,
      );
    }

    // If still 0 or parent has height: auto, check slide layout container
    if (availH <= 0) {
      const slideEl = el.closest<HTMLElement>(
        '.slidev-layout, .slidev-page, [data-slidev-page]',
      );

      if (slideEl) {
        const slideStyle = window.getComputedStyle(slideEl);
        const sPadTop = Number.parseFloat(slideStyle.paddingTop) || 0;
        const sPadBottom = Number.parseFloat(slideStyle.paddingBottom) || 0;
        const sPadLeft = Number.parseFloat(slideStyle.paddingLeft) || 0;
        const sPadRight = Number.parseFloat(slideStyle.paddingRight) || 0;

        if (availW <= 0 && slideEl.clientWidth > 0) {
          availW = slideEl.clientWidth - sPadLeft - sPadRight;
        }

        if (slideEl.clientHeight > 0) {
          availH = Math.max(
            0,
            slideEl.clientHeight - sPadTop - sPadBottom - siblingsH,
          );
        }
      }
    }
  }

  if (availW <= 0) {
    availW = BASE_WIDTH;
  }

  let targetScale = 1;

  if (availW > 0 && availH > 0) {
    const scaleX = availW / BASE_WIDTH;
    const scaleY = availH / BASE_HEIGHT;
    targetScale = Math.min(scaleX, scaleY);
  } else if (availW > 0) {
    targetScale = availW / BASE_WIDTH;
  }

  if (props.maxScale !== undefined) {
    targetScale = Math.min(targetScale, props.maxScale);
  }

  if (Math.abs(targetScale - autoScaleValue.value) > 0.005) {
    autoScaleValue.value = targetScale;
  }
};

let observer: ResizeObserver | null = null;

onMounted(() => {
  if (typeof window === 'undefined' || !rootRef.value) {
    return;
  }

  updateScale();

  requestAnimationFrame(() => {
    updateScale();
  });

  if (typeof ResizeObserver !== 'undefined') {
    observer = new ResizeObserver(() => {
      updateScale();
    });

    observer.observe(rootRef.value);

    if (rootRef.value.parentElement) {
      observer.observe(rootRef.value.parentElement);
    }

    const slideEl = rootRef.value.closest<HTMLElement>(
      '.slidev-layout, .slidev-page, [data-slidev-page]',
    );

    if (slideEl && slideEl !== rootRef.value.parentElement) {
      observer.observe(slideEl);
    }
  } else {
    window.addEventListener('resize', updateScale);
  }
});

onUnmounted(() => {
  if (observer) {
    observer.disconnect();
    observer = null;
  } else if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateScale);
  }
});

const resolvedScale = computed((): number => {
  if (props.scale !== undefined) {
    return props.scale;
  }

  if (props.autoScale === false) {
    return 1;
  }

  if (props.maxScale !== undefined) {
    return Math.min(autoScaleValue.value, props.maxScale);
  }

  return autoScaleValue.value;
});
</script>

<template>
  <div
    ref="rootRef"
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      height: resolvedHeightStyle,
      fontFamily:
        'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
      '--quad-start-delay': `${resolvedStartDelay}ms`,
    }"
  >
    <div
      class="alpha-quad-hub__stage relative w-full h-full min-h-[350px] max-w-[1020px] mx-auto flex items-center justify-center overflow-visible"
      :style="{
        transform: props.scale !== undefined ? `scale(${props.scale})` : undefined,
        transformOrigin: 'center center',
      }"
    >
      <!-- Center Diagram: 4 Colored Quadrants + Concentric Arcs -->
      <div
        class="alpha-quad-hub__center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-[390px] h-[390px] z-10 pointer-events-none"
      >
        <svg
          class="alpha-quad-hub__svg w-[390px] h-[390px] overflow-visible"
          :viewBox="`0 0 ${viewBoxSize} ${viewBoxSize}`"
        >
          <defs>
            <!-- Drop shadow for the quadrant blocks (unique per component instance) -->
            <filter :id="`quad-block-shadow-${uid}`" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" flood-opacity="0.10" />
            </filter>
            <!-- Quadrant Clip Paths for Rounded Corner Squares (unique per instance) -->
            <clipPath
              v-for="(block, idx) in quadrantBlocks"
              :id="`clip-quad-${uid}-${idx}`"
              :key="idx"
            >
              <rect
                :x="block.box.x"
                :y="block.box.y"
                :width="block.box.width"
                :height="block.box.height"
                :rx="block.box.rx"
                :ry="block.box.rx"
              />
            </clipPath>
          </defs>
          <!-- Quadrant Blocks (0: TL, 1: TR, 2: BR, 3: BL) -->
          <g
            v-for="(block, idx) in quadrantBlocks"
            :key="idx"
            :class="[
              'alpha-quad-block',
              `alpha-quad-block--${idx}`,
              { 'alpha-quad-block--animated': isAnimated },
            ]"
            :filter="`url(#quad-block-shadow-${uid})`"
          >
            <!-- Base solid colored rounded rectangle -->
            <rect
              :x="block.box.x"
              :y="block.box.y"
              :width="block.box.width"
              :height="block.box.height"
              :rx="block.box.rx"
              :ry="block.box.rx"
              :fill="block.item.color"
            />
            <!-- Concentric Opaque Pastel Inner Arc Band (Clipped to Quadrant) -->
            <circle
              :cx="centerX"
              :cy="centerY"
              :r="arcRadius"
              :fill="block.item.arcColor"
              :clip-path="`url(#clip-quad-${uid}-${idx})`"
            />
            <!-- Floating Arc Separator Border (Touches pastel area without overlay) -->
            <path
              :d="block.arcPath"
              fill="none"
              :stroke="block.item.arcBorderColor"
              :stroke-width="arcBorderWidth"
              stroke-linecap="butt"
            />
            <!-- Step Number (01, 02, 03, 04) -->
            <text
              :x="block.numberPos.x"
              :y="block.numberPos.y + 6"
              text-anchor="middle"
              fill="#2c3e50"
              class="font-extrabold text-[18.5px] select-none font-sans"
              style="font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;"
            >
              {{ block.item.id }}
            </text>
          </g>
        </svg>
        <!-- HTML Icon Overlay Layer (ensures UnoCSS mask icons render reliably) -->
        <div class="alpha-quad-hub__icons absolute top-0 left-0 w-[360px] h-[360px] pointer-events-none">
          <div
            v-for="(block, idx) in quadrantBlocks"
            :key="idx"
            :class="[
              'alpha-quad-block',
              `alpha-quad-block--${idx}`,
              { 'alpha-quad-block--animated': isAnimated },
            ]"
            class="absolute flex items-center justify-center w-[34px] h-[34px]"
            :style="{
              top: `${block.iconPos.y - 17}px`,
              left: `${block.iconPos.x - 17}px`,
            }"
          >
            <QuadHubIcon
              v-if="block.item.icon !== false && block.item.icon !== undefined"
              :icon="block.item.icon"
              :size="34"
              color="#ffffff"
            />
          </div>
        </div>
        <!-- Central Circular Hub -->
        <slot name="hub">
          <QuadHubCenter
            :title="props.title"
            :subtitle="props.subtitle"
            :radius="hubRadius"
          />
        </slot>
      </div>
      <!-- Callout Cards -->
      <slot />
    </div>
  </div>
</template>

<style scoped>
.alpha-quad-block--animated.alpha-quad-block--0 {
  animation: quad-block-pop 400ms cubic-bezier(0.2, 0.9, 0.4, 1) calc(var(--quad-start-delay, 0ms) + 100ms) both;
}

.alpha-quad-block--animated.alpha-quad-block--1 {
  animation: quad-block-pop 400ms cubic-bezier(0.2, 0.9, 0.4, 1) calc(var(--quad-start-delay, 0ms) + 200ms) both;
}

.alpha-quad-block--animated.alpha-quad-block--2 {
  animation: quad-block-pop 400ms cubic-bezier(0.2, 0.9, 0.4, 1) calc(var(--quad-start-delay, 0ms) + 300ms) both;
}

.alpha-quad-block--animated.alpha-quad-block--3 {
  animation: quad-block-pop 400ms cubic-bezier(0.2, 0.9, 0.4, 1) calc(var(--quad-start-delay, 0ms) + 400ms) both;
}

@keyframes quad-block-pop {
  0% {
    opacity: 0;
    transform: scale(0.92);
    transform-origin: center center;
  }
  100% {
    opacity: 1;
    transform: scale(1);
    transform-origin: center center;
  }
}
</style>
