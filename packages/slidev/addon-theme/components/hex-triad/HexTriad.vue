<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  inject,
  onBeforeUpdate,
  provide,
  ref,
} from 'vue';

import {
  calculateHexTriadCoordinates,
  createRoundedHexagonPath,
  HEX_TRIAD_ROOT_KEY,
  type IHexTriadItem,
  resolveHexTriadItems,
} from '../../utils/hexTriad';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

export interface IHexTriadProps {
  readonly title?: string;
  readonly subtitle?: string;
  readonly animation?: boolean;
  readonly items?: readonly IHexTriadItem[];
  /**
   * Additional delay (ms) before animation starts.
   * Defaults to 600ms inside `shifting-intro` layout, 0ms otherwise.
   */
  readonly startDelay?: number;
  /**
   * Manually control whether animation runs.
   * Defaults to true, or automatically tracks `$clicks > 0` inside `shifting-intro`.
   */
  readonly active?: boolean;
}

const props = withDefaults(defineProps<IHexTriadProps>(), {
  animation: true,
  title: undefined,
  items: undefined,
  active: undefined,
  subtitle: undefined,
  startDelay: undefined,
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
    // Only delay 600ms when the heading is actively shifting up from click 0.
    // On reload at click >= 1, heading is already at the top -> 0ms delay!
    return shiftingIntro.isShifting?.value ? 600 : 0;
  }

  return 0;
});

const resolvedItems = computed(() => resolveHexTriadItems(props.items));

let calloutCounter = 0;
const customBadgeTexts = ref<(string | number)[]>([]);

const registerCallout = () => {
  const idx = calloutCounter++;
  return {
    index: idx,
    item: computed(() => resolvedItems.value[idx] ?? resolvedItems.value[0]),
    setBadgeText: (text: string | number) => {
      customBadgeTexts.value[idx] = text;
    },
  };
};

onBeforeUpdate(() => {
  calloutCounter = 0;
});

provide(HEX_TRIAD_ROOT_KEY, {
  registerCallout,
  items: resolvedItems,
  animation: isAnimated,
});

const item1 = computed(() => {
  return resolvedItems.value[0];
});
const item2 = computed(() => {
  return resolvedItems.value[1];
});
const item3 = computed(() => {
  return resolvedItems.value[2];
});

// Central diagram coordinates
const coords = calculateHexTriadCoordinates();
const {
  hex1,
  hex2,
  hex3,
  badge1,
  badge2,
  badge3,
  centerX,
  centerY,
  hexRadius,
  triadRadius,
  badgeRadius,
} = coords;

const hex1X = hex1.x;
const hex1Y = hex1.y;
const hex2X = hex2.x;
const hex2Y = hex2.y;
const hex3X = hex3.x;
const hex3Y = hex3.y;

const badge1X = badge1.x;
const badge1Y = badge1.y;
const badge2X = badge2.x;
const badge2Y = badge2.y;
const badge3X = badge3.x;
const badge3Y = badge3.y;

const HEX_CORNER_RADIUS = 16;

// Second layer (background pastel hexagons):
// Aligned to first layer, then moved 1/4 block outward:
// - Red: top (-32px)
// - Orange: right-bottom (+27.71px, +16px)
// - Blue: left-bottom (-27.71px, +16px)
const QUARTER_SHIFT = 32;
const shiftCos30 = Number(
  (QUARTER_SHIFT * Math.cos((30 * Math.PI) / 180)).toFixed(2),
);
const shiftSin30 = Number(
  (QUARTER_SHIFT * Math.sin((30 * Math.PI) / 180)).toFixed(2),
);

const hex1BgPath = createRoundedHexagonPath(
  hex1X,
  hex1Y - QUARTER_SHIFT,
  hexRadius,
  HEX_CORNER_RADIUS,
);
const hex2BgPath = createRoundedHexagonPath(
  hex2X + shiftCos30,
  hex2Y + shiftSin30,
  hexRadius,
  HEX_CORNER_RADIUS,
);
const hex3BgPath = createRoundedHexagonPath(
  hex3X - shiftCos30,
  hex3Y + shiftSin30,
  hexRadius,
  HEX_CORNER_RADIUS,
);

// Middle layer (solid base at the same position as front layer)
const hex1BasePath = createRoundedHexagonPath(
  hex1X,
  hex1Y,
  hexRadius,
  HEX_CORNER_RADIUS,
);
const hex2BasePath = createRoundedHexagonPath(
  hex2X,
  hex2Y,
  hexRadius,
  HEX_CORNER_RADIUS,
);
const hex3BasePath = createRoundedHexagonPath(
  hex3X,
  hex3Y,
  hexRadius,
  HEX_CORNER_RADIUS,
);

// Foreground hexagons with rounded borders
const hex1TopPath = createRoundedHexagonPath(
  hex1X,
  hex1Y,
  hexRadius,
  HEX_CORNER_RADIUS,
);
const hex2TopPath = createRoundedHexagonPath(
  hex2X,
  hex2Y,
  hexRadius,
  HEX_CORNER_RADIUS,
);
const hex3TopPath = createRoundedHexagonPath(
  hex3X,
  hex3Y,
  hexRadius,
  HEX_CORNER_RADIUS,
);

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-hex-triad w-full flex flex-col items-center justify-center select-none font-sans',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{ '--hex-start-delay': `${resolvedStartDelay}ms` }"
  >
    <header v-if="title || $slots.title" class="alpha-hex-triad__header mb-4 text-center">
      <slot name="title">
        <h2 class="alpha-hex-triad__title text-2xl font-bold font-sans tracking-tight">
          {{ title }}
        </h2>
      </slot>
      <p v-if="subtitle || $slots.subtitle" class="alpha-hex-triad__subtitle text-sm font-sans">
        <slot name="subtitle">{{ subtitle }}</slot>
      </p>
    </header>
    <div class="alpha-hex-triad__stage relative w-full max-w-5xl h-[440px] flex items-center justify-center">
      <!-- Center Column: Overlapping 3D Rounded Hexagon SVG -->
      <div class="alpha-hex-triad__center relative flex items-center justify-center">
        <svg
          class="alpha-hex-triad__svg w-[450px] h-[420px] overflow-visible"
          viewBox="0 0 540 440"
        >
          <defs>
            <!-- Drop shadow for badges -->
            <filter id="hex-badge-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="3" stdDeviation="4" flood-opacity="0.35" />
            </filter>
            <!-- 3D extrusion shadow for base layer -->
            <filter id="hex-triad-depth" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="6" flood-opacity="0.3" />
            </filter>
            <!-- Gradients for Hex 01 -->
            <linearGradient id="grad-hex-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" :stop-color="item1.color" stop-opacity="0.95" />
              <stop offset="100%" :stop-color="item1.depthColor" stop-opacity="0.9" />
            </linearGradient>
            <!-- Gradients for Hex 02 -->
            <linearGradient id="grad-hex-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" :stop-color="item2.color" stop-opacity="0.95" />
              <stop offset="100%" :stop-color="item2.depthColor" stop-opacity="0.9" />
            </linearGradient>
            <!-- Gradients for Hex 03 -->
            <linearGradient id="grad-hex-3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" :stop-color="item3.color" stop-opacity="0.95" />
              <stop offset="100%" :stop-color="item3.depthColor" stop-opacity="0.9" />
            </linearGradient>
          </defs>
          <!-- LAYER 1: Background Pastel Offset Hexagons (Animated: slides out from behind solid hexagon to offset position) -->
          <g
            class="alpha-hex-layer1 alpha-hex-layer1--3"
            :class="{ 'alpha-hex-layer1--animated': isAnimated }"
          >
            <HexTriadLayer
              :d="hex3BgPath"
              :fill="item3.lightColor ?? item3.color"
              :opacity="0.38"
            />
          </g>
          <g
            class="alpha-hex-layer1 alpha-hex-layer1--2"
            :class="{ 'alpha-hex-layer1--animated': isAnimated }"
          >
            <HexTriadLayer
              :d="hex2BgPath"
              :fill="item2.lightColor ?? item2.color"
              :opacity="0.38"
            />
          </g>
          <g
            class="alpha-hex-layer1 alpha-hex-layer1--1"
            :class="{ 'alpha-hex-layer1--animated': isAnimated }"
          >
            <HexTriadLayer
              :d="hex1BgPath"
              :fill="item1.lightColor ?? item1.color"
              :opacity="0.38"
            />
          </g>
          <!-- LAYER 2: Middle 3D Depth Base Hexagons (3 hexa blocks) -->
          <HexTriadLayer
            :d="hex3BasePath"
            :fill="item3.depthColor"
            filter="url(#hex-triad-depth)"
            :opacity="0.85"
          />
          <HexTriadLayer
            :d="hex2BasePath"
            :fill="item2.depthColor"
            filter="url(#hex-triad-depth)"
            :opacity="0.85"
          />
          <HexTriadLayer
            :d="hex1BasePath"
            :fill="item1.depthColor"
            filter="url(#hex-triad-depth)"
            :opacity="0.85"
          />
          <!-- LAYER 3: Foreground Hexagons with Gradients (3 hexa blocks) -->
          <HexTriadLayer
            :d="hex3TopPath"
            fill="url(#grad-hex-3)"
            :opacity="0.9"
          />
          <HexTriadLayer
            :d="hex2TopPath"
            fill="url(#grad-hex-2)"
            :opacity="0.9"
          />
          <HexTriadLayer
            :d="hex1TopPath"
            fill="url(#grad-hex-1)"
            :opacity="0.9"
          />
          <!-- LAYER 4: White Interconnecting Ring (Circumcircle) -->
          <circle
            class="alpha-hex-triad__circumcircle"
            :cx="centerX"
            :cy="centerY"
            :r="triadRadius"
            fill="none"
            stroke="#ffffff"
            stroke-width="2.5"
            stroke-linecap="round"
            :style="{ opacity: 0.95 }"
          />
          <!-- LAYER 5: Center Circular Badges (Centered Directly on the White Circle) -->
          <!-- Badge 03 (Bottom-Left) -->
          <HexTriadCenterBadge
            :x="badge3X"
            :y="badge3Y"
            :radius="badgeRadius"
            :color="item3.color"
            :text="customBadgeTexts[2] || item3.id"
          />
          <!-- Badge 02 (Bottom-Right) -->
          <HexTriadCenterBadge
            :x="badge2X"
            :y="badge2Y"
            :radius="badgeRadius"
            :color="item2.color"
            :text="customBadgeTexts[1] || item2.id"
          />
          <!-- Badge 01 (Top) -->
          <HexTriadCenterBadge
            :x="badge1X"
            :y="badge1Y"
            :radius="badgeRadius"
            :color="item1.color"
            :text="customBadgeTexts[0] || item1.id"
          />
        </svg>
      </div>
      <!-- If default slot provided, render user's <HexTriadCallout> components -->
      <slot v-if="$slots.default" />
      <!-- Fallback: render 3 default callouts if no slots provided -->
      <template v-else>
        <HexTriadCallout />
        <HexTriadCallout />
        <HexTriadCallout />
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Layer 1 (Pastel Hexagons) slides out with overlapping cascading stagger */
.alpha-hex-layer1--1.alpha-hex-layer1--animated {
  animation: hex-layer1-slide-1 500ms cubic-bezier(0.25, 1, 0.5, 1) calc(var(--hex-start-delay, 0ms) + 100ms) both;
}

.alpha-hex-layer1--2.alpha-hex-layer1--animated {
  animation: hex-layer1-slide-2 500ms cubic-bezier(0.25, 1, 0.5, 1) calc(var(--hex-start-delay, 0ms) + 300ms) both;
}

.alpha-hex-layer1--3.alpha-hex-layer1--animated {
  animation: hex-layer1-slide-3 500ms cubic-bezier(0.25, 1, 0.5, 1) calc(var(--hex-start-delay, 0ms) + 500ms) both;
}

@keyframes hex-layer1-slide-1 {
  0% {
    transform: translate(0px, 32px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}

@keyframes hex-layer1-slide-2 {
  0% {
    transform: translate(-27.71px, -16px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}

@keyframes hex-layer1-slide-3 {
  0% {
    transform: translate(27.71px, -16px);
  }
  100% {
    transform: translate(0px, 0px);
  }
}
</style>
