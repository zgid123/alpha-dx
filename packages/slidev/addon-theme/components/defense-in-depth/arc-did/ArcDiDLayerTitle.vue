<script setup lang="ts">
import { computed, inject, ref, useSlots, type VNode, watch } from 'vue';

import { ARC_DID_LAYER_KEY } from '../../../utils/defenseInDepth/arcDid/context';

defineOptions({
  name: 'ArcDiDLayerTitle',
});

export interface IArcDiDLayerTitleProps {
  readonly title?: string;
  readonly color?: string;
}

const props = withDefaults(defineProps<IArcDiDLayerTitleProps>(), {
  title: undefined,
  color: undefined,
});

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
  if (props.title) {
    return props.title;
  }
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

const positionStyle = computed(() => {
  const geo = layerContext?.layerGeo.value;
  if (!geo) {
    return {};
  }
  return {
    left: `${geo.titlePosition.x}px`,
    top: `${geo.titlePosition.y}px`,
    transform: 'translate(-50%, -50%)',
    maxWidth: `${maxTitleWidth.value}px`,
  };
});
</script>

<template>
  <div
    class="alpha-arc-did__layer-title absolute z-20 pointer-events-auto select-none text-center"
    :style="positionStyle"
  >
    <div
      class="font-semibold text-slate-800 dark:text-slate-100 tracking-tight leading-snug whitespace-pre-line text-sm md:text-base transition-colors duration-200"
      :style="{ color: props.color ?? layerContext?.textColor?.value }"
    >
      <slot>{{ props.title }}</slot>
    </div>
  </div>
</template>

<style scoped>
.alpha-arc-did__layer-title {
  max-width: 140px;
}
</style>
