<script setup lang="ts">
import { computed, inject, onUnmounted, useSlots, type VNode } from 'vue';

import {
  ARC_DID_LAYER_KEY,
  ARC_DID_ROOT_KEY,
  ARC_DID_SECTOR_KEY,
} from '../../../utils/defense-in-depth/arc-defense-in-depth/context';
import {
  calculatePartAngles,
  polarToCartesian,
} from '../../../utils/defense-in-depth/arc-defense-in-depth/createArcDefenseInDepthGeometry';
import type {
  IArcDefenseInDepthPartItem,
  TArcDefenseInDepthOrientation,
  TArcDefenseInDepthPartPosition,
} from '../../../utils/defense-in-depth/arc-defense-in-depth/types';
import { DEFAULT_DID_DOT_COLOR } from '../../../utils/defense-in-depth/shared/constants';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcDefenseInDepthLayerPart',
});

export interface IArcDefenseInDepthLayerPartProps {
  readonly label?: string;
  readonly index?: number;
  readonly angle?: number;
  readonly radius?: number;
  readonly radialOffset?: number;
  readonly color?: string;
  readonly icon?: string;
  readonly showDot?: boolean;
  readonly span?: number;
  readonly position?: TArcDefenseInDepthPartPosition;
  readonly maxWidth?: number | string;
  readonly rotate?: TArcDefenseInDepthOrientation;
  readonly skew?: TArcDefenseInDepthOrientation;
  readonly active?: boolean;
}

const props = withDefaults(defineProps<IArcDefenseInDepthLayerPartProps>(), {
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
const registrationData = computed<IArcDefenseInDepthPartItem>(() => {
  return {
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
  };
});

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
  if (!geo) {
    return '110px';
  }

  const partGeo = geo.parts[resolvedIndex.value];
  if (partGeo?.maxContentWidth) {
    return `${partGeo.maxContentWidth}px`;
  }

  const span =
    partGeo?.startAngle !== undefined && partGeo?.endAngle !== undefined
      ? Math.abs(partGeo.startAngle - partGeo.endAngle)
      : 35;
  const arcLength = geo.midRadius * (span * (Math.PI / 180));
  return `${Math.max(68, Math.min(105, Math.round(arcLength * 0.85)))}px`;
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

const { className, forwardedAttrs } = useMergedUnoAttrs(() => {
  const colorClass = isSelfActive.value
    ? 'text-(--alpha-arc-defense-in-depth-part-active)'
    : 'text-(--alpha-arc-defense-in-depth-part)';
  const opacityClass =
    hasAnyActivePart.value && !isSelfActive.value
      ? 'opacity-30'
      : 'opacity-100';
  const interactionClass = rootContext?.interactive?.value
    ? 'cursor-pointer pointer-events-auto'
    : 'pointer-events-none';

  return `alpha-arc-defense-in-depth__part alpha-arc-defense-in-depth__part-area absolute flex flex-col items-center justify-center select-none text-center transition-all duration-300 ease-out bg-transparent border-0 p-0 m-0 appearance-none ${colorClass} ${opacityClass} ${interactionClass}`;
});
</script>

<template>
  <button
    type="button"
    v-bind="forwardedAttrs()"
    :disabled="!rootContext?.interactive?.value"
    :aria-label="`Select ${slottedLabel}`"
    :class="[
      className(),
      { 'alpha-arc-defense-in-depth__part--animated': isAnimated },
      { 'alpha-arc-defense-in-depth__part--active': isSelfActive },
    ]"
    :data-active="isSelfActive"
    :style="{
      left: `${calculatedPosition.x}px`,
      top: `${calculatedPosition.y}px`,
      transform: 'translate(-50%, -50%)',
      zIndex: isSelfActive ? 30 : 10,
      color: isSelfActive
        ? 'var(--alpha-arc-defense-in-depth-part-active)'
        : props.color ?? 'var(--alpha-arc-defense-in-depth-part)',
      '--part-delay': `${animationDelay}ms`,
      ...(props.color
        ? { '--alpha-arc-defense-in-depth-part': props.color }
        : {}),
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
        class="text-xs text-current"
        :class="props.icon"
      />
      <div
        v-else-if="props.showDot"
        class="w-4 h-4 rounded-full transition-all duration-200 flex items-center justify-center"
        :class="[
          isSelfActive ? 'scale-125 ring-2 ring-(--alpha-arc-defense-in-depth-part-ring) shadow-[0_0_12px_var(--alpha-arc-defense-in-depth-part-glow)]' : 'group-hover:scale-125',
        ]"
        :style="{
          background: isSelfActive
            ? 'radial-gradient(circle at 35% 32%, var(--alpha-arc-defense-in-depth-part-dot-highlight) 25%, var(--alpha-arc-defense-in-depth-part-dot-active) 70%, var(--alpha-arc-defense-in-depth-part-dot-active-edge) 100%)'
            : props.color
              ? `radial-gradient(circle at 35% 32%, var(--alpha-arc-defense-in-depth-part-dot-highlight) 15%, ${effectiveDotColor} 65%, var(--alpha-arc-defense-in-depth-part-dot-edge) 100%)`
              : 'radial-gradient(circle at 35% 32%, var(--alpha-arc-defense-in-depth-part-dot-highlight) 15%, var(--alpha-arc-defense-in-depth-part-dot-idle) 55%, var(--alpha-arc-defense-in-depth-part-dot-idle-edge) 100%)',
          boxShadow: isSelfActive
            ? 'var(--alpha-arc-defense-in-depth-part-active-shadow)'
            : 'var(--alpha-arc-defense-in-depth-part-shadow)',
        }"
      />
    </div>

    <!-- Part Area Content -->
    <div
      class="alpha-arc-defense-in-depth__part-label-wrapper"
      :style="{
        transform: partLabelTransform,
      }"
    >
      <div
        class="alpha-arc-defense-in-depth__part-label alpha-arc-defense-in-depth__part-content text-center font-medium leading-tight text-current drop-shadow-sm whitespace-pre-line transition-all duration-200"
        :class="[
          isSplitSector ? 'text-[11px] md:text-xs' : 'text-xs md:text-sm',
          isSelfActive ? 'font-bold scale-110' : 'hover:scale-105',
        ]"
        :style="{
          maxWidth: maxContentWidth,
          color: isSelfActive
            ? 'var(--alpha-arc-defense-in-depth-part-active)'
            : props.color ?? 'var(--alpha-arc-defense-in-depth-part)',
          textShadow: isSelfActive
            ? 'var(--alpha-arc-defense-in-depth-part-active-text-shadow)'
            : undefined,
        }"
      >
        <slot>{{ slottedLabel }}</slot>
      </div>
    </div>
  </button>
</template>

<style scoped>
:where(.alpha-arc-defense-in-depth__part),
:where(.alpha-arc-defense-in-depth__part-label) {
  color: var(--alpha-arc-defense-in-depth-part);
}

:where(.alpha-arc-defense-in-depth__part--active),
:where(
  .alpha-arc-defense-in-depth__part--active
    .alpha-arc-defense-in-depth__part-label
) {
  color: var(--alpha-arc-defense-in-depth-part-active);
}

.alpha-arc-defense-in-depth__part-label {
  word-break: normal;
  overflow-wrap: normal;
  hyphens: none;
  white-space: pre-line;
}

.alpha-arc-defense-in-depth__part--animated {
  animation: arc-defense-in-depth-part-pop 450ms cubic-bezier(0.16, 1, 0.3, 1)
    var(--part-delay, 0ms) both;
}

@keyframes arc-defense-in-depth-part-pop {
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
