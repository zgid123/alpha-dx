<script setup lang="ts">
import { computed, inject, onUnmounted, useSlots, type VNode } from 'vue';

import {
  ARC_DID_LAYER_KEY,
  ARC_DID_ROOT_KEY,
  ARC_DID_SECTOR_KEY,
} from '../../../utils/defenseInDepth/arcDid/context';
import {
  calculatePartAngles,
  polarToCartesian,
} from '../../../utils/defenseInDepth/arcDid/createArcDiDGeometry';
import type {
  IArcDiDPartItem,
  TArcDiDPartPosition,
} from '../../../utils/defenseInDepth/arcDid/types';
import { DEFAULT_DID_DOT_COLOR } from '../../../utils/defenseInDepth/shared/constants';

defineOptions({
  name: 'ArcDiDLayerPart',
});

export interface IArcDiDLayerPartProps {
  readonly label?: string;
  readonly index?: number;
  readonly angle?: number;
  readonly radius?: number;
  readonly radialOffset?: number;
  readonly color?: string;
  readonly icon?: string;
  readonly showDot?: boolean;
  readonly span?: number;
  readonly position?: TArcDiDPartPosition;
  readonly maxWidth?: number | string;
  readonly rotate?: boolean | number | 'tangent' | 'auto';
  readonly skew?: boolean | number | string;
  readonly active?: boolean;
}

const props = withDefaults(defineProps<IArcDiDLayerPartProps>(), {
  label: undefined,
  index: undefined,
  angle: undefined,
  radius: undefined,
  radialOffset: undefined,
  color: undefined,
  icon: undefined,
  showDot: false,
  span: undefined,
  position: undefined,
  maxWidth: undefined,
  rotate: undefined,
  skew: undefined,
  active: undefined,
});

const slots = useSlots();
const rootContext = inject(ARC_DID_ROOT_KEY, undefined);
const layerContext = inject(ARC_DID_LAYER_KEY, undefined);
const sectorContext = inject(ARC_DID_SECTOR_KEY, undefined);

function extractTextFromVNodes(nodes: VNode[]): string {
  let text = '';
  for (const node of nodes) {
    if (typeof node.type === 'string' && node.type === 'br') {
      text += '\n';
    } else if (typeof node.children === 'string') {
      text += node.children;
    } else if (Array.isArray(node.children)) {
      text += extractTextFromVNodes(node.children as VNode[]);
    }
  }
  return text.trim();
}

const slottedLabel = computed<string>(() => {
  if (props.label) {
    return props.label;
  }
  if (slots.default) {
    const vnodes = slots.default();
    const textNode = vnodes[0]?.children;
    if (typeof textNode === 'string') {
      return textNode.trim();
    }
    return extractTextFromVNodes(slots.default());
  }
  return '';
});

const partToken = Symbol();
const registrationData = computed<IArcDiDPartItem>(() => ({
  label: slottedLabel.value,
  angle: props.angle,
  radius: props.radius,
  radialOffset: props.radialOffset,
  color: props.color,
  icon: props.icon,
  span: props.span,
  position: props.position,
  maxWidth: props.maxWidth,
  rotate: props.rotate,
  skew: props.skew,
  active: props.active,
}));

const registration = sectorContext
  ? sectorContext.registerPart(partToken, registrationData)
  : layerContext?.registerPart(partToken, registrationData);

onUnmounted(() => {
  registration?.unregister();
});

const resolvedIndex = computed<number>(() => {
  if (props.index !== undefined) {
    return Number(props.index);
  }
  return registration?.index.value ?? 0;
});

const calculatedPosition = computed(() => {
  const geo = layerContext?.layerGeo.value;
  const rootGeo = rootContext?.geo.value;

  if (props.angle !== undefined && rootGeo && geo) {
    const r = props.radius ?? geo.midRadius + (props.radialOffset ?? 0);
    return polarToCartesian(rootGeo.cx, rootGeo.cy, r, props.angle);
  }

  if (sectorContext) {
    const partGeo = sectorContext.sectorGeo.value?.parts[resolvedIndex.value];
    if (partGeo) {
      return { x: partGeo.x, y: partGeo.y };
    }
  } else {
    const standalonePartGeo =
      layerContext?.layerGeo.value?.sectors[resolvedIndex.value]?.parts[0];
    if (standalonePartGeo) {
      return { x: standalonePartGeo.x, y: standalonePartGeo.y };
    }
  }

  const partGeo = geo?.parts[resolvedIndex.value];
  if (partGeo) {
    return { x: partGeo.x, y: partGeo.y };
  }

  if (rootGeo && geo) {
    const totalParts = layerContext?.partsCount?.value ?? 1;
    const angles = calculatePartAngles(totalParts);
    const fallbackAngle = angles[resolvedIndex.value] ?? 90;
    const r = props.radius ?? geo.midRadius + (props.radialOffset ?? 0);
    return polarToCartesian(rootGeo.cx, rootGeo.cy, r, fallbackAngle);
  }

  return { x: 0, y: 0 };
});

const isAnimated = computed(() => rootContext?.animation.value ?? true);
const rootStartDelay = computed(() => rootContext?.startDelay.value ?? 0);

const effectiveDotColor = computed(() => {
  return props.color ?? layerContext?.color.value ?? DEFAULT_DID_DOT_COLOR;
});

const animationDelay = computed(() => {
  const layerIdx = layerContext?.layerIndex.value ?? 0;
  const sectorIdx = sectorContext?.sectorIndex.value ?? 0;
  return (
    rootStartDelay.value +
    layerIdx * 120 +
    sectorIdx * 60 +
    resolvedIndex.value * 40 +
    200
  );
});

const maxContentWidth = computed(() => {
  if (props.maxWidth !== undefined) {
    return typeof props.maxWidth === 'number'
      ? `${props.maxWidth}px`
      : props.maxWidth;
  }
  if (sectorContext) {
    const partGeo = sectorContext.sectorGeo.value?.parts[resolvedIndex.value];
    if (partGeo?.maxContentWidth) {
      return `${partGeo.maxContentWidth}px`;
    }
  } else {
    const standalonePartGeo =
      layerContext?.layerGeo.value?.sectors[resolvedIndex.value]?.parts[0];
    if (standalonePartGeo?.maxContentWidth) {
      return `${standalonePartGeo.maxContentWidth}px`;
    }
  }
  const geo = layerContext?.layerGeo.value;
  if (!geo) return '110px';
  const partGeo = geo.parts[resolvedIndex.value];
  if (partGeo?.maxContentWidth) {
    return `${partGeo.maxContentWidth}px`;
  }
  const span =
    partGeo?.startAngle !== undefined && partGeo?.endAngle !== undefined
      ? Math.abs(partGeo.startAngle - partGeo.endAngle)
      : 35;
  const arcLength = geo.midRadius * (span * (Math.PI / 180));
  return `${Math.max(100, Math.min(180, Math.round(arcLength * 0.92)))}px`;
});

const isSplitSector = computed(() => {
  if (
    props.position === 'top' ||
    props.position === 'bottom' ||
    props.position === 'middle'
  ) {
    return true;
  }
  if (sectorContext?.sectorGeo.value?.split) {
    return true;
  }
  if ((sectorContext?.sectorGeo.value?.parts.length ?? 0) > 1) {
    return true;
  }
  return false;
});

const resolvedAngle = computed<number>(() => {
  if (props.angle !== undefined) {
    return props.angle;
  }
  if (sectorContext) {
    const partGeo = sectorContext.sectorGeo.value?.parts[resolvedIndex.value];
    if (partGeo?.angle !== undefined) {
      return partGeo.angle;
    }
    if (sectorContext.sectorGeo.value?.midAngle !== undefined) {
      return sectorContext.sectorGeo.value.midAngle;
    }
  }
  const geo = layerContext?.layerGeo.value;
  const partGeo = geo?.parts[resolvedIndex.value];
  if (partGeo?.angle !== undefined) {
    return partGeo.angle;
  }
  return 90;
});

const effectiveRotate = computed(() => {
  return props.rotate ?? sectorContext?.rotate?.value;
});

const effectiveSkew = computed(() => {
  return props.skew ?? sectorContext?.skew?.value;
});

const resolvedRotation = computed<string | undefined>(() => {
  const rot = effectiveRotate.value;
  if (rot === undefined || rot === false) {
    const sk = effectiveSkew.value;
    if (sk === true || sk === 'tangent' || sk === 'auto') {
      const tangent = Math.round(90 - resolvedAngle.value);
      return `rotate(${tangent}deg)`;
    }
    return undefined;
  }
  if (typeof rot === 'number') {
    return `rotate(${rot}deg)`;
  }
  if (rot === true || rot === 'tangent' || rot === 'auto') {
    const tangent = Math.round(90 - resolvedAngle.value);
    return `rotate(${tangent}deg)`;
  }
  if (typeof rot === 'string') {
    return rot.includes('rotate')
      ? rot
      : rot.includes('deg')
        ? `rotate(${rot})`
        : `rotate(${rot}deg)`;
  }
  return undefined;
});

const resolvedSkew = computed<string | undefined>(() => {
  const sk = effectiveSkew.value;
  if (sk === undefined || sk === false) {
    return undefined;
  }
  if (sk === true || sk === 'tangent' || sk === 'auto') {
    return undefined;
  }
  if (typeof sk === 'number') {
    return `skewX(${sk}deg)`;
  }
  if (typeof sk === 'string') {
    return sk.includes('skew') || sk.includes('rotate')
      ? sk
      : sk.includes('deg')
        ? `skewX(${sk})`
        : `skewX(${sk}deg)`;
  }
  return undefined;
});

const partLabelTransform = computed<string | undefined>(() => {
  const transforms: string[] = [];
  if (resolvedRotation.value) {
    transforms.push(resolvedRotation.value);
  }
  if (resolvedSkew.value) {
    transforms.push(resolvedSkew.value);
  }
  return transforms.length > 0 ? transforms.join(' ') : undefined;
});

const isSelfActive = computed<boolean>(() => {
  if (props.active !== undefined) {
    return props.active;
  }
  if (rootContext?.isPartActive) {
    return rootContext.isPartActive(
      slottedLabel.value,
      resolvedIndex.value,
      props.active,
    );
  }
  if (rootContext?.activePart?.value !== undefined) {
    const ap = rootContext.activePart.value;
    return ap === slottedLabel.value || ap === resolvedIndex.value;
  }
  return false;
});

const hasAnyActivePart = computed<boolean>(() => {
  return rootContext?.hasAnyActivePart?.value ?? false;
});

function handlePartAreaClick(event: MouseEvent): void {
  if (rootContext?.interactive?.value && rootContext.setActivePart) {
    event.stopPropagation();
    if (isSelfActive.value) {
      rootContext.setActivePart(undefined);
    } else {
      rootContext.setActivePart(slottedLabel.value);
    }
  }
}
</script>

<template>
  <div
    class="alpha-arc-did__part alpha-arc-did__part-area absolute flex flex-col items-center justify-center select-none text-center transition-all duration-300 ease-out"
    :class="[
      { 'alpha-arc-did__part--animated': isAnimated },
      { 'alpha-arc-did__part--active': isSelfActive },
      hasAnyActivePart && !isSelfActive ? 'opacity-30' : 'opacity-100',
      rootContext?.interactive?.value ? 'cursor-pointer pointer-events-auto' : 'pointer-events-none',
    ]"
    :data-active="isSelfActive"
    :style="{
      left: `${calculatedPosition.x}px`,
      top: `${calculatedPosition.y}px`,
      transform: 'translate(-50%, -50%)',
      zIndex: isSelfActive ? 30 : 10,
      '--part-delay': `${animationDelay}ms`,
    }"
    @click="handlePartAreaClick"
  >
    <!-- Optional Dot Indicator or Icon -->
    <div
      v-if="props.showDot || props.icon"
      class="relative flex items-center justify-center cursor-default group mb-1"
    >
      <span
        v-if="props.icon"
        class="text-xs text-white"
        :class="props.icon"
      />
      <div
        v-else-if="props.showDot"
        class="w-4 h-4 rounded-full transition-all duration-200 flex items-center justify-center"
        :class="[
          isSelfActive ? 'scale-125 ring-2 ring-white shadow-[0_0_12px_#38bdf8]' : 'group-hover:scale-125',
        ]"
        :style="{
          background: isSelfActive
            ? 'radial-gradient(circle at 35% 32%, #ffffff 25%, #38bdf8 70%, #0369a1 100%)'
            : props.color
              ? `radial-gradient(circle at 35% 32%, #ffffff 15%, ${effectiveDotColor} 65%, #0f172a 100%)`
              : 'radial-gradient(circle at 35% 32%, #ffffff 15%, #cbd5e1 55%, #94a3b8 100%)',
          boxShadow: isSelfActive
            ? '0 0 12px rgba(56, 189, 248, 0.9), inset 0 1px 1px rgba(255, 255, 255, 0.9)'
            : '0 2px 5px rgba(0, 0, 0, 0.28), inset 0 1px 1px rgba(255, 255, 255, 0.8)',
        }"
      />
    </div>

    <!-- Part Area Content -->
    <div
      class="alpha-arc-did__part-label-wrapper"
      :style="{
        transform: partLabelTransform,
      }"
    >
      <div
        class="alpha-arc-did__part-label alpha-arc-did__part-content text-center font-medium leading-tight text-white drop-shadow-sm whitespace-pre-line transition-all duration-200"
        :class="[
          isSplitSector ? 'text-[11px] md:text-xs' : 'text-xs md:text-sm',
          isSelfActive
            ? 'font-bold !text-white scale-110'
            : 'hover:scale-105',
        ]"
        :style="{
          maxWidth: maxContentWidth,
          color: isSelfActive ? '#ffffff' : props.color,
          textShadow: isSelfActive
            ? '0 0 12px rgba(255, 255, 255, 0.95), 0 2px 6px rgba(0, 0, 0, 0.9)'
            : undefined,
        }"
      >
        <slot>{{ slottedLabel }}</slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.alpha-arc-did__part-label {
  word-break: normal;
  overflow-wrap: normal;
  hyphens: none;
  white-space: pre-line;
}

.alpha-arc-did__part--animated {
  animation: arc-did-part-pop 450ms cubic-bezier(0.16, 1, 0.3, 1) var(--part-delay, 0ms) both;
}

@keyframes arc-did-part-pop {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.6);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}
</style>
