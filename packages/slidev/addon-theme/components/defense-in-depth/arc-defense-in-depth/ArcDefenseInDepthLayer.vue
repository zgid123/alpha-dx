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
  ARC_DID_ROOT_KEY,
  type IArcDefenseInDepthLayerContext,
  type IArcDefenseInDepthRegisteredLayerData,
  type IArcDefenseInDepthRegisteredSectorData,
} from '../../../utils/defense-in-depth/arc-defense-in-depth/context';
import type {
  IArcDefenseInDepthPartItem,
  IArcDefenseInDepthSectorItem,
} from '../../../utils/defense-in-depth/arc-defense-in-depth/types';

import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArcDefenseInDepthLayer',
});

export interface IArcDefenseInDepthLayerProps {
  readonly color?: string;
  readonly textColor?: string;
  readonly index?: number;
  readonly active?: boolean;
}

const props = withDefaults(defineProps<IArcDefenseInDepthLayerProps>(), {
  color: undefined,
  textColor: undefined,
  index: undefined,
  active: undefined,
});

const rootContext = inject(ARC_DID_ROOT_KEY, undefined);
const currentTitle = ref<string | undefined>();

// Manage sector and part registrations within this layer
const registeredSectorTokens = ref<symbol[]>([]);
const registeredSectorData = ref<
  Map<symbol, IArcDefenseInDepthRegisteredSectorData>
>(new Map());

function registerSector(
  token?: symbol,
  sectorDataRef?: ComputedRef<
    IArcDefenseInDepthRegisteredSectorData | undefined
  >,
) {
  const sToken = token ?? Symbol();

  if (!registeredSectorTokens.value.includes(sToken)) {
    registeredSectorTokens.value = [...registeredSectorTokens.value, sToken];
  }

  let stopWatch: (() => void) | undefined;

  if (sectorDataRef) {
    stopWatch = watch(
      sectorDataRef,
      (val) => {
        const nextMap = new Map(registeredSectorData.value);

        if (val) {
          nextMap.set(sToken, val);
        } else {
          nextMap.delete(sToken);
        }

        registeredSectorData.value = nextMap;
      },
      {
        immediate: true,
      },
    );
  }

  const index = computed(() => registeredSectorTokens.value.indexOf(sToken));

  return {
    index,
    unregister: () => {
      stopWatch?.();
      registeredSectorTokens.value = registeredSectorTokens.value.filter(
        (t) => t !== sToken,
      );
      const nextMap = new Map(registeredSectorData.value);
      nextMap.delete(sToken);
      registeredSectorData.value = nextMap;
    },
  };
}

function registerPart(
  token?: symbol,
  partDataRef?: ComputedRef<IArcDefenseInDepthPartItem | undefined>,
) {
  const pToken = token ?? Symbol();
  const sectorDataRef = computed<
    IArcDefenseInDepthRegisteredSectorData | undefined
  >(() => {
    const pData = partDataRef?.value;

    if (!pData) {
      return undefined;
    }

    return {
      parts: [pData],
      split: false,
      angle: pData.angle,
      span: pData.span,
      color: pData.color,
      rotate: pData.rotate,
      skew: pData.skew,
    };
  });

  return registerSector(pToken, sectorDataRef);
}

const registeredSectorsList = computed<IArcDefenseInDepthSectorItem[]>(() => {
  return registeredSectorTokens.value
    .map((token) => registeredSectorData.value.get(token))
    .filter((item): item is IArcDefenseInDepthRegisteredSectorData => {
      return item !== undefined;
    })
    .map((data) => {
      return {
        parts: data.parts ?? [],
        split: data.split,
        angle: data.angle,
        span: data.span,
        color: data.color,
        rotate: data.rotate,
        skew: data.skew,
      };
    });
});

const registeredPartsList = computed<IArcDefenseInDepthPartItem[]>(() => {
  return registeredSectorsList.value.flatMap(
    (s) => s.parts as IArcDefenseInDepthPartItem[],
  );
});

const layerToken = Symbol();
const layerRegistrationData = computed<IArcDefenseInDepthRegisteredLayerData>(
  () => {
    return {
      title: currentTitle.value,
      color: props.color,
      sectors: registeredSectorsList.value,
      parts: registeredPartsList.value,
      index: props.index !== undefined ? Number(props.index) : undefined,
    };
  },
);

const registration = rootContext?.registerLayer(
  layerToken,
  layerRegistrationData,
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

const layerGeo = computed(() => {
  if (!rootContext) {
    return undefined;
  }

  return rootContext.geo.value.layers[resolvedIndex.value];
});

const isActive = computed<boolean>(() => {
  if (props.active !== undefined) {
    return props.active;
  }

  if (!rootContext) {
    return false;
  }

  return (
    rootContext.activeIndex.value === -1 ||
    rootContext.activeIndex.value === resolvedIndex.value
  );
});

const effectiveColor = computed<string>(() => {
  if (props.color) {
    return props.color;
  }

  if (rootContext) {
    return rootContext.getLayerColor(resolvedIndex.value);
  }

  return 'var(--alpha-arc-defense-in-depth-layer-accent)';
});

const layerContext: IArcDefenseInDepthLayerContext = {
  layerIndex: resolvedIndex,
  layerGeo,
  isActive,
  color: effectiveColor,
  textColor: computed(() => props.textColor),
  title: computed(() => currentTitle.value),
  setTitle: (title: string) => {
    currentTitle.value = title;
  },
  partsCount: computed(() => registeredPartsList.value.length),
  registerPart,
  registerSector,
};

provide(ARC_DID_LAYER_KEY, layerContext);

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-defense-in-depth__layer contents',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :data-index="resolvedIndex"
    :data-active="isActive"
  >
    <!-- Default children slots -->
    <slot />
  </div>
</template>
