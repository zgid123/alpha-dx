<script setup lang="ts">
import { computed } from 'vue';

import { DEFAULT_ARC_ARROW_PATH } from '../../utils/arcArrowProcess';

defineOptions({
  name: 'ArcArrowProcessArrow',
});

export interface IArcArrowProcessArrowProps {
  readonly color?: string;
  readonly gradientEnd?: string;
  readonly stroke?: string;
  readonly strokeWidth?: number;
  readonly width?: number | string;
  readonly height?: number | string;
  readonly rotation?: number;
  readonly standalone?: boolean;
  readonly path?: string;
  readonly viewBox?: string;
  readonly originY?: number;
}

const props = withDefaults(defineProps<IArcArrowProcessArrowProps>(), {
  color: '#6fa3b5',
  gradientEnd: '#8cb8c8',
  stroke: '#ffffff',
  strokeWidth: 2.5,
  width: undefined,
  height: undefined,
  rotation: 0,
  standalone: undefined,
  path: undefined,
  viewBox: undefined,
  originY: -220,
});

const uid = Math.random().toString(36).slice(2, 8);
const gradId = computed(() => `arc-arrow-grad-${uid}`);
const shadowId = computed(() => `arc-arrow-shadow-${uid}`);

const isStandalone = computed(() => {
  if (props.standalone !== undefined) {
    return props.standalone;
  }

  return props.rotation === 0;
});

const resolvedPath = computed(() => {
  return props.path ?? DEFAULT_ARC_ARROW_PATH;
});

const resolvedViewBox = computed(() => {
  if (props.viewBox !== undefined) {
    return props.viewBox;
  }

  return isStandalone.value ? '-125 335 310 150' : '0 -30 1000 370';
});

const resolvedWidth = computed(() => {
  if (props.width !== undefined) {
    return typeof props.width === 'number' ? `${props.width}px` : props.width;
  }

  return isStandalone.value ? '380px' : '100%';
});

const resolvedHeight = computed(() => {
  if (props.height !== undefined) {
    return typeof props.height === 'number'
      ? `${props.height}px`
      : props.height;
  }

  return isStandalone.value ? '215px' : '100%';
});
</script>

<template>
  <div
    class="alpha-arc-arrow-process-arrow inline-flex items-center justify-center select-none"
    :style="{
      width: resolvedWidth,
      height: resolvedHeight,
    }"
  >
    <svg
      class="w-full h-full overflow-visible"
      :viewBox="resolvedViewBox"
      preserveAspectRatio="xMidYMin meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <filter
          :id="shadowId"
          x="-30%"
          y="-30%"
          width="160%"
          height="160%"
        >
          <feDropShadow
            dx="0"
            dy="5"
            stdDeviation="5"
            flood-opacity="0.22"
            flood-color="#000000"
          />
        </filter>
        <linearGradient
          :id="gradId"
          x1="0%"
          y1="100%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" :stop-color="props.color" />
          <stop offset="100%" :stop-color="props.gradientEnd ?? props.color" />
        </linearGradient>
      </defs>
      <g v-if="!isStandalone" :transform="`translate(500, ${props.originY}) rotate(${props.rotation})`">
        <path
          :d="resolvedPath"
          :fill="`url(#${gradId})`"
          :stroke="props.stroke"
          :stroke-width="props.strokeWidth"
          stroke-linejoin="round"
          :filter="`url(#${shadowId})`"
        />
      </g>
      <path
        v-else
        :d="resolvedPath"
        :fill="`url(#${gradId})`"
        :stroke="props.stroke"
        :stroke-width="props.strokeWidth"
        stroke-linejoin="round"
        :filter="`url(#${shadowId})`"
      />
    </svg>
  </div>
</template>
