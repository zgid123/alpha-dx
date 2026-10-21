<script setup lang="ts">
import { activateOnKeyboard } from '../../../utils/activateOnKeyboard';
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  provide,
  ref,
  useSlots,
  type VNode,
  watch,
} from 'vue';

import {
  ARC_DID_ROOT_KEY,
  type IArcDefenseInDepthRegisteredLayerData,
  type IArcDefenseInDepthRootContext,
} from '../../../utils/defense-in-depth/arc-defense-in-depth/context';
import { createArcDefenseInDepthGeometry } from '../../../utils/defense-in-depth/arc-defense-in-depth/createArcDefenseInDepthGeometry';
import type {
  IArcDefenseInDepthLayerItem,
  IArcDefenseInDepthPartGeometry,
  TArcDefenseInDepthOrder,
} from '../../../utils/defense-in-depth/arc-defense-in-depth/types';
import { lightenColor } from '../../../utils/colors';
import { resolveArcDefenseInDepthPalette } from '../../../utils/defense-in-depth/shared/colors';
import { DEFAULT_DID_COLOR } from '../../../utils/defense-in-depth/shared/constants';
import { useDiagramAutoScale } from '../../../utils/useDiagramAutoScale';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  name: 'ArcDefenseInDepth',
  inheritAttrs: false,
});

export interface IArcDefenseInDepthProps {
  readonly order?: TArcDefenseInDepthOrder;
  readonly count?: number;
  readonly activeIndex?: number;
  readonly color?: string;
  readonly colors?: readonly string[] | string[];
  readonly width?: number | string;
  readonly height?: number | string;
  readonly scale?: number;
  readonly autoScale?: boolean;
  readonly maxScale?: number;
  readonly animation?: boolean;
  readonly startDelay?: number;
  readonly interactive?: boolean;
  readonly viewBoxWidth?: number;
  readonly viewBoxHeight?: number;
  readonly innerRadius?: number;
  readonly outerRadius?: number;
  readonly gap?: number;
  readonly showDecorativeArcs?: boolean;
  readonly titleAngleSpan?: number;
  readonly showPartBoundaries?: boolean;
  readonly activePart?: string | number;
}

const props = withDefaults(defineProps<IArcDefenseInDepthProps>(), {
  order: 'outer-to-inner',
  count: undefined,
  activeIndex: -1,
  activePart: undefined,
  color: DEFAULT_DID_COLOR,
  colors: undefined,
  width: 720,
  height: undefined,
  scale: undefined,
  autoScale: true,
  maxScale: undefined,
  animation: true,
  startDelay: undefined,
  interactive: true,
  viewBoxWidth: 900,
  viewBoxHeight: 460,
  innerRadius: 90,
  outerRadius: 445,
  gap: 0,
  showDecorativeArcs: false,
  titleAngleSpan: undefined,
  showPartBoundaries: true,
});

const emit = defineEmits<{
  (e: 'update:activeIndex', index: number): void;
  (e: 'update:activePart', part: string | number | undefined): void;
  (e: 'select', index: number): void;
  (e: 'part-click', part: IArcDefenseInDepthPartGeometry): void;
  (e: 'click', event: MouseEvent): void;
}>();

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

  if (shiftingIntro) {
    return shiftingIntro.active.value;
  }

  return true;
});

const resolvedStartDelay = computed(() => {
  if (props.startDelay !== undefined) {
    return props.startDelay;
  }

  if (shiftingIntro?.isShifting?.value) {
    return 500;
  }

  return 0;
});

interface INamedComponent {
  readonly type?: {
    readonly name?: string;
    readonly displayName?: string;
    readonly __name?: string;
  };
}

function hasComponentName(type: unknown, targetName: string): boolean {
  if (typeof type === 'object' && type !== null) {
    const comp = type as INamedComponent['type'];
    return (
      comp?.name === targetName ||
      comp?.displayName === targetName ||
      comp?.__name === targetName
    );
  }

  return false;
}

function countSlottedLayers(slotNodes?: VNode[]): number {
  if (!slotNodes) {
    return 0;
  }

  let count = 0;
  for (const node of slotNodes) {
    if (hasComponentName(node.type, 'ArcDefenseInDepthLayer')) {
      count++;
      continue;
    }
    if (node.type === Fragment && Array.isArray(node.children)) {
      count += countSlottedLayers(node.children as VNode[]);
    }
  }

  return count;
}

const slottedLayerCount = computed(() => {
  const defaultSlotNodes = slots.default?.();
  return countSlottedLayers(defaultSlotNodes);
});

const registeredLayerTokens = ref<symbol[]>([]);
const registeredLayerData = ref<
  Map<symbol, IArcDefenseInDepthRegisteredLayerData>
>(new Map());

function registerLayer(
  token?: symbol,
  dataRef?: ComputedRef<IArcDefenseInDepthRegisteredLayerData | undefined>,
) {
  const lToken = token ?? Symbol();
  if (!registeredLayerTokens.value.includes(lToken)) {
    registeredLayerTokens.value = [...registeredLayerTokens.value, lToken];
  }

  let stopWatch: (() => void) | undefined;
  if (dataRef) {
    stopWatch = watch(
      dataRef,
      (val) => {
        const nextMap = new Map(registeredLayerData.value);
        if (val) {
          nextMap.set(lToken, val);
        } else {
          nextMap.delete(lToken);
        }
        registeredLayerData.value = nextMap;
      },
      { immediate: true },
    );
  }

  const index = computed(() => registeredLayerTokens.value.indexOf(lToken));

  return {
    index,
    unregister: () => {
      stopWatch?.();
      registeredLayerTokens.value = registeredLayerTokens.value.filter(
        (t) => t !== lToken,
      );
      const nextMap = new Map(registeredLayerData.value);
      nextMap.delete(lToken);
      registeredLayerData.value = nextMap;
    },
  };
}

const resolvedCount = computed<number>(() => {
  if (props.count !== undefined && props.count > 0) {
    return Math.max(1, Math.min(props.count, 6));
  }

  if (slottedLayerCount.value > 0) {
    return Math.max(1, Math.min(slottedLayerCount.value, 6));
  }

  if (registeredLayerTokens.value.length > 0) {
    return Math.max(1, Math.min(registeredLayerTokens.value.length, 6));
  }

  return 0;
});

const resolvedLayers = computed<IArcDefenseInDepthLayerItem[]>(() => {
  const indexed: (IArcDefenseInDepthLayerItem | undefined)[] = [];
  const unindexed: IArcDefenseInDepthLayerItem[] = [];

  for (let i = 0; i < registeredLayerTokens.value.length; i++) {
    const token = registeredLayerTokens.value[i];
    if (!token) {
      continue;
    }

    const data = registeredLayerData.value.get(token);
    const item: IArcDefenseInDepthLayerItem = {
      title: data?.title ?? '',
      color: data?.color,
      parts: data?.parts ?? [],
      sectors: data?.sectors ?? [],
      titleAngleSpan: data?.titleAngleSpan,
      titleWidth: data?.titleWidth,
    };
    if (data?.index !== undefined && data.index >= 0) {
      indexed[data.index] = item;
    } else {
      unindexed.push(item);
    }
  }

  let unindexedIdx = 0;
  const result: IArcDefenseInDepthLayerItem[] = [];
  const total = Math.max(indexed.length, registeredLayerTokens.value.length);
  for (let i = 0; i < total; i++) {
    const item = indexed[i];
    if (item) {
      result.push(item);
    } else {
      const fallback = unindexed[unindexedIdx++];
      if (fallback) {
        result.push(fallback);
      }
    }
  }

  return result;
});

const palette = computed(() =>
  resolveArcDefenseInDepthPalette(props.color, resolvedCount.value),
);

function getLayerColor(index: number): string {
  if (index >= 0 && index < registeredLayerTokens.value.length) {
    const token = registeredLayerTokens.value[index];
    if (token) {
      const custom = registeredLayerData.value.get(token)?.color;
      if (custom) {
        return custom;
      }
    }
  }

  const customColor = props.colors?.[index];
  if (customColor) {
    return customColor;
  }

  const defaultLayers = palette.value.layerColors;
  return defaultLayers[index % defaultLayers.length] ?? DEFAULT_DID_COLOR;
}

const internalActiveIndex = ref<number>(props.activeIndex);

watch(
  () => props.activeIndex,
  (val) => {
    internalActiveIndex.value = val;
  },
);

function setActiveIndex(index: number): void {
  internalActiveIndex.value = index;
  emit('update:activeIndex', index);
  emit('select', index);
}

const internalActivePart = ref<string | number | undefined>(props.activePart);
watch(
  () => props.activePart,
  (val) => {
    internalActivePart.value = val;
  },
);

function setActivePart(part: string | number | undefined): void {
  internalActivePart.value = part;
  emit('update:activePart', part);
}

function isPartActive(part: IArcDefenseInDepthPartGeometry): boolean {
  if (part.active) {
    return true;
  }

  if (internalActivePart.value !== undefined) {
    return (
      internalActivePart.value === part.label ||
      internalActivePart.value === part.index
    );
  }

  return false;
}

const geo = computed(() => {
  return createArcDefenseInDepthGeometry({
    viewBoxWidth: props.viewBoxWidth,
    viewBoxHeight: props.viewBoxHeight,
    innerRadius: props.innerRadius,
    outerRadius: props.outerRadius,
    count: resolvedCount.value,
    gap: props.gap,
    order: props.order,
    titleAngleSpan: props.titleAngleSpan,
    layers: resolvedLayers.value,
  });
});

const hasAnyActivePart = computed<boolean>(() => {
  if (internalActivePart.value !== undefined) {
    return true;
  }

  for (const layer of geo.value.layers) {
    for (const part of layer.parts) {
      if (part.active) {
        return true;
      }
    }
  }

  return false;
});

function getActivePartFill(
  customColor?: string,
  fallbackBaseColor?: string,
): string {
  const base = customColor || fallbackBaseColor || DEFAULT_DID_COLOR;
  return lightenColor({ hex: base, ratio: 0.5 });
}

function getPartOpacity(layerIndex: number, isActive: boolean): number {
  if (hasAnyActivePart.value) {
    return isActive ? 1 : 0.28;
  }

  if (
    internalActiveIndex.value === -1 ||
    internalActiveIndex.value === layerIndex
  ) {
    return 1;
  }

  return 0.45;
}

function handlePartClick(
  part: IArcDefenseInDepthPartGeometry,
  layerIndex: number,
): void {
  if (!props.interactive) {
    return;
  }

  emit('part-click', part);
  if (isPartActive(part)) {
    setActivePart(undefined);
  } else {
    setActivePart(part.label);
    if (
      internalActiveIndex.value !== -1 &&
      internalActiveIndex.value !== layerIndex
    ) {
      setActiveIndex(layerIndex);
    }
  }
}

const rootContext: IArcDefenseInDepthRootContext = {
  geo,
  count: resolvedCount,
  activeIndex: internalActiveIndex,
  setActiveIndex,
  activePart: internalActivePart,
  setActivePart,
  hasAnyActivePart,
  isPartActive: (label, index, activeProp) => {
    if (activeProp) {
      return true;
    }

    if (internalActivePart.value !== undefined) {
      return (
        internalActivePart.value === label || internalActivePart.value === index
      );
    }
    return false;
  },
  color: computed(() => props.color),
  colors: computed(() => props.colors),
  order: computed(() => props.order),
  animation: isAnimated,
  interactive: computed(() => props.interactive),
  startDelay: resolvedStartDelay,
  getLayerColor,
  registerLayer,
};

provide(ARC_DID_ROOT_KEY, rootContext);

const { resolvedScale, containerHeight } = useDiagramAutoScale({
  rootRef,
  baseWidth: props.viewBoxWidth,
  baseHeight: props.viewBoxHeight,
  scale: () => props.scale,
  autoScale: () => props.autoScale,
  maxScale: () => props.maxScale,
  width: () => props.width,
  height: () => props.height,
});

const stageTransform = computed(() => {
  if (resolvedScale.value !== 1) {
    return `scale(${resolvedScale.value})`;
  }

  return undefined;
});

const resolvedWidthStyle = computed(() => {
  if (props.width !== undefined) {
    return typeof props.width === 'number' ? `${props.width}px` : props.width;
  }

  return '100%';
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

  return `${props.viewBoxHeight}px`;
});

function handleLayerClick(index: number): void {
  if (props.interactive) {
    if (internalActiveIndex.value === index) {
      setActiveIndex(-1);
    } else {
      setActiveIndex(index);
    }
  }
}

function handleContainerClick(event: MouseEvent): void {
  emit('click', event);
}

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-defense-in-depth w-full flex items-center justify-center select-none relative border-0 p-0 m-0 min-w-0 bg-transparent',
);
</script>

<template>
  <fieldset
    ref="rootRef"
    aria-label="Defense in depth diagram"
    v-bind="forwardedAttrs()"
    :class="className()"
    :data-count="resolvedCount"
    :data-active-index="internalActiveIndex"
    :data-order="props.order"
    :style="{
      width: resolvedWidthStyle,
      height: resolvedHeightStyle,
      '--alpha-arc-defense-in-depth-start-delay': `${resolvedStartDelay}ms`,
    }"
    @click="handleContainerClick"
    @keydown="activateOnKeyboard"
  >
    <!-- Stage Container with diagram auto-scale -->
    <div
      class="alpha-arc-defense-in-depth__stage relative flex items-center justify-center overflow-visible shrink-0"
      :style="{
        width: `${props.viewBoxWidth}px`,
        height: `${props.viewBoxHeight}px`,
        transform: stageTransform,
        transformOrigin: 'center center',
      }"
    >
      <!-- Base SVG Layer: Concentric Arcs and Decorative Flairs -->
      <svg
        class="alpha-arc-defense-in-depth__svg absolute inset-0 w-full h-full overflow-visible pointer-events-none"
        :viewBox="`0 0 ${props.viewBoxWidth} ${props.viewBoxHeight}`"
        xmlns="http://www.w3.org/2000/svg"
      >
        <title>Defense in depth diagram</title>
        <defs>
          <filter
            id="alpha-arc-defense-in-depth-glow"
            x="-20%"
            y="-20%"
            width="140%"
            height="140%"
          >
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        <!-- Concentric Arc Bands (Seamless with zero spacing) -->
        <g class="alpha-arc-defense-in-depth__layers">
          <g
            v-for="layer in geo.layers"
            :key="layer.index"
            class="alpha-arc-defense-in-depth__layer-group"
          >
            <!-- Full base band -->
            <path
              :d="layer.path"
              :fill="getLayerColor(layer.index)"
              :stroke="props.showPartBoundaries ? palette.strokeColor : 'none'"
              :stroke-width="props.showPartBoundaries ? 1.5 : 0"
              stroke-linejoin="round"
              class="alpha-arc-defense-in-depth__band transition-all duration-300 ease-out pointer-events-none"
              :class="[
                { 'alpha-arc-defense-in-depth__band--animated': isAnimated },
              ]"
              :style="{
                opacity: hasAnyActivePart
                  ? (internalActiveIndex === layer.index ? 0.45 : 0.25)
                  : (internalActiveIndex === -1 || internalActiveIndex === layer.index ? 1 : 0.45),
                filter:
                  internalActiveIndex === layer.index && !hasAnyActivePart
                    ? 'var(--alpha-arc-defense-in-depth-layer-glow)'
                    : undefined,
                '--layer-anim-delay': `${resolvedStartDelay + layer.index * 100}ms`,
              }"
            />

            <!-- Title Sector Boundary/Area (when layer has parts) -->
            <path
              v-if="props.showPartBoundaries && layer.titlePath && layer.parts.length > 0"
              :d="layer.titlePath"
              :fill="getLayerColor(layer.index)"
              :stroke="palette.strokeColor"
              stroke-width="1.5"
              stroke-linejoin="round"
              class="alpha-arc-defense-in-depth__band alpha-arc-defense-in-depth__sector alpha-arc-defense-in-depth__sector--title transition-all duration-300 ease-out hover:brightness-105 pointer-events-none"
              :class="[
                { 'alpha-arc-defense-in-depth__band--animated': isAnimated },
              ]"
              :style="{
                opacity: hasAnyActivePart
                  ? (internalActiveIndex === layer.index ? 0.45 : 0.25)
                  : (internalActiveIndex === -1 || internalActiveIndex === layer.index ? 1 : 0.45),
                '--layer-anim-delay': `${resolvedStartDelay + layer.index * 100}ms`,
              }"
            />

            <!-- Interactive Part Sector Areas on top with visible boundaries -->
            <template v-if="layer.sectors.length > 0">
              <template v-for="sector in layer.sectors" :key="sector.index">
                <!-- If sector has split: true, render individual track sub-bands -->
                <template v-if="sector.split">
                  <path
                    v-for="part in sector.parts"
                    :key="part.index"
                    :d="part.path"
                    :fill="isPartActive(part) ? getActivePartFill(part.color || sector.color, getLayerColor(layer.index)) : (part.color || sector.color || getLayerColor(layer.index))"
                    :stroke="isPartActive(part) ? 'var(--alpha-arc-defense-in-depth-active-stroke)' : (props.showPartBoundaries ? palette.strokeColor : 'none')"
                    :stroke-width="isPartActive(part) ? 3.5 : (props.showPartBoundaries ? 1.5 : 0)"
                    stroke-linejoin="round"
                    class="alpha-arc-defense-in-depth__band alpha-arc-defense-in-depth__sector alpha-arc-defense-in-depth__sector--part transition-all duration-300 ease-out hover:brightness-110 pointer-events-none"
                    :class="[
                      { 'alpha-arc-defense-in-depth__band--animated': isAnimated },
                      { 'alpha-arc-defense-in-depth__sector--active': isPartActive(part) },
                    ]"
                    :style="{
                      opacity: getPartOpacity(layer.index, isPartActive(part)),
                      filter: isPartActive(part)
                        ? 'var(--alpha-arc-defense-in-depth-active-glow)'
                        : undefined,
                      '--layer-anim-delay': `${resolvedStartDelay + layer.index * 100}ms`,
                    }"
                  />
                </template>
                <!-- If sector is NOT split: render the entire sector band -->
                <template v-else>
                  <path
                    :d="sector.path"
                    :fill="sector.parts[0] && isPartActive(sector.parts[0]) ? getActivePartFill(sector.color, getLayerColor(layer.index)) : (sector.color || getLayerColor(layer.index))"
                    :stroke="sector.parts[0] && isPartActive(sector.parts[0]) ? 'var(--alpha-arc-defense-in-depth-active-stroke)' : (props.showPartBoundaries ? palette.strokeColor : 'none')"
                    :stroke-width="sector.parts[0] && isPartActive(sector.parts[0]) ? 3.5 : (props.showPartBoundaries ? 1.5 : 0)"
                    stroke-linejoin="round"
                    class="alpha-arc-defense-in-depth__band alpha-arc-defense-in-depth__sector alpha-arc-defense-in-depth__sector--part transition-all duration-300 ease-out hover:brightness-110 pointer-events-none"
                    :class="[
                      { 'alpha-arc-defense-in-depth__band--animated': isAnimated },
                      { 'alpha-arc-defense-in-depth__sector--active': sector.parts[0] && isPartActive(sector.parts[0]) },
                    ]"
                    :style="{
                      opacity: getPartOpacity(layer.index, !!(sector.parts[0] && isPartActive(sector.parts[0]))),
                      filter: sector.parts[0] && isPartActive(sector.parts[0])
                        ? 'var(--alpha-arc-defense-in-depth-active-glow)'
                        : undefined,
                      '--layer-anim-delay': `${resolvedStartDelay + layer.index * 100}ms`,
                    }"
                  />
                </template>

                <!-- Divider concentric lines when sector is split -->
                <template
                  v-if="props.showPartBoundaries && sector.split && sector.dividerPaths.length > 0"
                >
                  <path
                    v-for="(dPath, dIdx) in sector.dividerPaths"
                    :key="dIdx"
                    :d="dPath"
                    fill="none"
                    :stroke="palette.strokeColor"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    class="pointer-events-none"
                  />
                </template>
              </template>
            </template>
          </g>
        </g>

        <!-- Active Sector Highlight Overlay (rendered on top of all layers and dividers so stroke & glow are never clipped) -->
        <g
          v-if="hasAnyActivePart"
          class="alpha-arc-defense-in-depth__active-sectors pointer-events-none"
        >
          <template v-for="layer in geo.layers" :key="layer.index">
            <template v-for="sector in layer.sectors" :key="sector.index">
              <template v-if="sector.split">
                <template v-for="part in sector.parts" :key="part.index">
                  <path
                    v-if="isPartActive(part) && part.path"
                    :d="part.path"
                    :fill="getActivePartFill(part.color || sector.color, getLayerColor(layer.index))"
                    stroke="var(--alpha-arc-defense-in-depth-active-stroke)"
                    stroke-width="3.5"
                    stroke-linejoin="round"
                    class="alpha-arc-defense-in-depth__band alpha-arc-defense-in-depth__sector alpha-arc-defense-in-depth__sector--active pointer-events-none"
                    :style="{
                      filter: 'var(--alpha-arc-defense-in-depth-active-glow)',
                    }"
                  />
                </template>
              </template>
              <template v-else>
                <path
                  v-if="sector.parts[0] && isPartActive(sector.parts[0]) && sector.path"
                  :d="sector.path"
                  :fill="getActivePartFill(sector.color, getLayerColor(layer.index))"
                  stroke="var(--alpha-arc-defense-in-depth-active-stroke)"
                  stroke-width="3.5"
                  stroke-linejoin="round"
                  class="alpha-arc-defense-in-depth__band alpha-arc-defense-in-depth__sector alpha-arc-defense-in-depth__sector--active pointer-events-none"
                  :style="{
                    filter: 'var(--alpha-arc-defense-in-depth-active-glow)',
                  }"
                />
              </template>
            </template>
          </template>
        </g>

        <!-- Center Cutout Hole (Solid White Semicircle) -->
        <path
          v-if="geo.innerCutoutPath"
          :d="geo.innerCutoutPath"
          fill="var(--alpha-arc-defense-in-depth-center-fill)"
          stroke="none"
          class="pointer-events-none"
        />
      </svg>

      <template v-if="props.interactive">
        <template v-for="layer in geo.layers" :key="`layer-${layer.index}`">
          <button
            type="button"
            class="alpha-interaction-control"
            :aria-label="`Select layer ${layer.index + 1}`"
            :style="{ clipPath: `path('${layer.path}')` }"
            @click="handleLayerClick(layer.index)"
          />
          <button
            v-if="props.showPartBoundaries && layer.titlePath && layer.parts.length > 0"
            type="button"
            class="alpha-interaction-control"
            :aria-label="`Select layer ${layer.index + 1}`"
            :style="{ clipPath: `path('${layer.titlePath}')` }"
            @click="handleLayerClick(layer.index)"
          />
          <template v-for="sector in layer.sectors" :key="sector.index">
            <template v-if="sector.split">
              <button
                v-for="part in sector.parts"
                :key="part.index"
                type="button"
                class="alpha-interaction-control"
                :aria-label="`Select part ${part.index + 1}`"
                :style="{ clipPath: `path('${part.path}')` }"
                @click.stop="handlePartClick(part, layer.index)"
              />
            </template>
            <button
              v-else
              type="button"
              class="alpha-interaction-control"
              :aria-label="`Select sector ${sector.index + 1}`"
              :style="{ clipPath: `path('${sector.path}')` }"
              @click.stop="sector.parts[0] ? handlePartClick(sector.parts[0], layer.index) : handleLayerClick(layer.index)"
            />
          </template>
        </template>
      </template>

      <!-- Stage Overlays: Slotted Layers -->
      <div
        class="alpha-arc-defense-in-depth__stage-overlay absolute inset-0 w-full h-full pointer-events-none"
      >
        <slot />
      </div>
    </div>
  </fieldset>
</template>

<style scoped>
.alpha-arc-defense-in-depth__band--animated {
  animation: arc-defense-in-depth-band-in 600ms cubic-bezier(0.16, 1, 0.3, 1)
    var(--layer-anim-delay, 0ms) both;
  transform-origin: 50% 90%;
}

@keyframes arc-defense-in-depth-band-in {
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
