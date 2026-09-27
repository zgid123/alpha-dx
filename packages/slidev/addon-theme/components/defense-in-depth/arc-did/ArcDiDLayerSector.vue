<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  inject,
  onUnmounted,
  provide,
  ref,
  watch,
} from 'vue';

import {
  ARC_DID_LAYER_KEY,
  ARC_DID_SECTOR_KEY,
  type IArcDiDRegisteredSectorData,
  type IArcDiDSectorContext,
} from '../../../utils/defenseInDepth/arcDid/context';
import type { IArcDiDPartItem } from '../../../utils/defenseInDepth/arcDid/types';

defineOptions({
  name: 'ArcDiDLayerSector',
});

export interface IArcDiDLayerSectorProps {
  readonly split?: boolean;
  readonly angle?: number;
  readonly span?: number;
  readonly color?: string;
  readonly index?: number;
  readonly rotate?: boolean | number | 'tangent' | 'auto';
  readonly skew?: boolean | number | string;
}

const props = withDefaults(defineProps<IArcDiDLayerSectorProps>(), {
  split: true,
  angle: undefined,
  span: undefined,
  color: undefined,
  index: undefined,
  rotate: undefined,
  skew: undefined,
});

const layerContext = inject(ARC_DID_LAYER_KEY, undefined);

const registeredPartTokens = ref<symbol[]>([]);
const registeredPartData = ref<Map<symbol, IArcDiDPartItem>>(new Map());

function registerPart(
  token?: symbol,
  partDataRef?: ComputedRef<IArcDiDPartItem | undefined>,
) {
  const pToken = token ?? Symbol();
  if (!registeredPartTokens.value.includes(pToken)) {
    registeredPartTokens.value = [...registeredPartTokens.value, pToken];
  }

  let stopWatch: (() => void) | undefined;
  if (partDataRef) {
    stopWatch = watch(
      partDataRef,
      (val) => {
        const nextMap = new Map(registeredPartData.value);
        if (val) {
          nextMap.set(pToken, val);
        } else {
          nextMap.delete(pToken);
        }
        registeredPartData.value = nextMap;
      },
      { immediate: true },
    );
  }

  const index = computed(() => registeredPartTokens.value.indexOf(pToken));

  return {
    index,
    unregister: () => {
      stopWatch?.();
      registeredPartTokens.value = registeredPartTokens.value.filter(
        (t) => t !== pToken,
      );
      const nextMap = new Map(registeredPartData.value);
      nextMap.delete(pToken);
      registeredPartData.value = nextMap;
    },
  };
}

const registeredPartsList = computed<IArcDiDPartItem[]>(() => {
  return registeredPartTokens.value
    .map((token) => registeredPartData.value.get(token))
    .filter((item): item is IArcDiDPartItem => item !== undefined);
});

const sectorToken = Symbol();
const sectorRegistrationData = computed<IArcDiDRegisteredSectorData>(() => ({
  parts: registeredPartsList.value,
  split: props.split,
  angle: props.angle,
  span: props.span,
  color: props.color,
  index: props.index !== undefined ? Number(props.index) : undefined,
  rotate: props.rotate,
  skew: props.skew,
}));

const registration = layerContext?.registerSector(
  sectorToken,
  sectorRegistrationData,
);

onUnmounted(() => {
  registration?.unregister();
});

const resolvedIndex = computed<number>(() => {
  if (props.index !== undefined) {
    return Number(props.index);
  }
  return registration?.index.value ?? 0;
});

const sectorGeo = computed(() => {
  return layerContext?.layerGeo.value?.sectors[resolvedIndex.value];
});

const sectorContext: IArcDiDSectorContext = {
  sectorIndex: resolvedIndex,
  sectorGeo,
  rotate: computed(() => props.rotate),
  skew: computed(() => props.skew),
  registerPart,
};

provide(ARC_DID_SECTOR_KEY, sectorContext);
</script>

<template>
  <div
    class="alpha-arc-did__layer-sector contents pointer-events-none"
    :data-sector-index="resolvedIndex"
    :data-split="props.split"
  >
    <slot />
  </div>
</template>
