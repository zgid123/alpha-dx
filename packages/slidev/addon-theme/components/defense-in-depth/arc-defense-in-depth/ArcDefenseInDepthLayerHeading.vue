<script setup lang="ts">
import { computed, inject, useSlots, type VNode, watch } from 'vue';

import { ARC_DID_LAYER_KEY } from '../../../utils/defense-in-depth/arc-defense-in-depth/context';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcDefenseInDepthLayerHeading',
});

export interface IArcDefenseInDepthLayerHeadingProps {
  readonly color?: string;
}

const props = defineProps<IArcDefenseInDepthLayerHeadingProps>();

const slots = useSlots();
const layerContext = inject(ARC_DID_LAYER_KEY, undefined);

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

const rawTitle = computed(() => {
  if (slots.default) {
    return extractTextFromVNodes(slots.default());
  }

  return '';
});

watch(
  rawTitle,
  (val) => {
    if (val && layerContext?.setTitle) {
      layerContext.setTitle(val);
    }
  },
  { immediate: true },
);

const maxTitleWidth = computed(() => {
  const geo = layerContext?.layerGeo.value;
  if (!geo) {
    return 130;
  }

  const arcLen = geo.midRadius * (40 * (Math.PI / 180));
  return Math.max(75, Math.min(130, Math.round(arcLen * 0.82)));
});

const headingColor = computed(() => {
  return props.color ?? layerContext?.textColor?.value;
});

const positionStyle = computed(() => {
  const geo = layerContext?.layerGeo.value;
  const colorVars = headingColor.value
    ? { '--alpha-arc-defense-in-depth-layer-heading': headingColor.value }
    : {};

  if (!geo) {
    return colorVars;
  }

  return {
    left: `${geo.titlePosition.x}px`,
    top: `${geo.titlePosition.y}px`,
    transform: 'translate(-50%, -50%)',
    maxWidth: `${maxTitleWidth.value}px`,
    ...colorVars,
  };
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-defense-in-depth__layer-title absolute z-20 max-w-[140px] pointer-events-auto select-none text-center font-semibold text-(--alpha-arc-defense-in-depth-layer-heading) tracking-tight leading-snug whitespace-pre-line text-sm md:text-base transition-colors duration-200',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()" :style="positionStyle">
    <slot />
  </div>
</template>
