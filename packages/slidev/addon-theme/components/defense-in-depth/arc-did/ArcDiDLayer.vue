<script setup lang="ts">
import {
  type ComputedRef,
  computed,
  Fragment,
  inject,
  onUnmounted,
  provide,
  ref,
  useSlots,
  type VNode,
  watch,
} from 'vue';

import {
  ARC_DID_LAYER_KEY,
  ARC_DID_ROOT_KEY,
  type IArcDiDLayerContext,
  type IArcDiDRegisteredLayerData,
  type IArcDiDRegisteredSectorData,
} from '../../../utils/defenseInDepth/arcDid/context';
import type {
  IArcDiDPartGeometry,
  IArcDiDPartItem,
  IArcDiDSectorItem,
} from '../../../utils/defenseInDepth/arcDid/types';
import ArcDiDLayerPart from './ArcDiDLayerPart.vue';
import ArcDiDLayerParts from './ArcDiDLayerParts.vue';
import ArcDiDLayerSector from './ArcDiDLayerSector.vue';
import ArcDiDLayerTitle from './ArcDiDLayerTitle.vue';

defineOptions({
  name: 'ArcDiDLayer',
});

export interface IArcDiDLayerProps {
  readonly title?: string;
  readonly color?: string;
  readonly textColor?: string;
  readonly index?: number;
  readonly active?: boolean;
}

const props = withDefaults(defineProps<IArcDiDLayerProps>(), {
  title: undefined,
  color: undefined,
  textColor: undefined,
  index: undefined,
  active: undefined,
});

const slots = useSlots();
const rootContext = inject(ARC_DID_ROOT_KEY, undefined);

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

function flattenVNodes(nodes: VNode[]): VNode[] {
  const result: VNode[] = [];
  for (const node of nodes) {
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flattenVNodes(node.children as VNode[]));
    } else {
      result.push(node);
    }
  }
  return result;
}

const defaultNodes = computed(() => {
  if (!slots.default) {
    return [];
  }
  return flattenVNodes(slots.default());
});

const hasSlottedTitle = computed(() => {
  return defaultNodes.value.some((node) =>
    hasComponentName(node.type, 'ArcDiDLayerTitle'),
  );
});

const hasSlottedParts = computed(() => {
  if (registeredSectorTokens.value.length > 0) {
    return true;
  }
  return defaultNodes.value.some(
    (node) =>
      hasComponentName(node.type, 'ArcDiDLayerParts') ||
      hasComponentName(node.type, 'ArcDiDLayerPart') ||
      hasComponentName(node.type, 'ArcDiDLayerSector'),
  );
});

const currentTitle = ref<string | undefined>(props.title);
watch(
  () => props.title,
  (val) => {
    if (val !== undefined) {
      currentTitle.value = val;
    }
  },
);

// Manage sector and part registrations within this layer
const registeredSectorTokens = ref<symbol[]>([]);
const registeredSectorData = ref<Map<symbol, IArcDiDRegisteredSectorData>>(
  new Map(),
);

function registerSector(
  token?: symbol,
  sectorDataRef?: ComputedRef<IArcDiDRegisteredSectorData | undefined>,
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
      { immediate: true },
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
  partDataRef?: ComputedRef<IArcDiDPartItem | undefined>,
) {
  const pToken = token ?? Symbol();
  const sectorDataRef = computed<IArcDiDRegisteredSectorData | undefined>(
    () => {
      const pData = partDataRef?.value;
      if (!pData) return undefined;
      return {
        parts: [pData],
        split: false,
        angle: pData.angle,
        span: pData.span,
        color: pData.color,
      };
    },
  );
  return registerSector(pToken, sectorDataRef);
}

const registeredSectorsList = computed<IArcDiDSectorItem[]>(() => {
  return registeredSectorTokens.value
    .map((token) => registeredSectorData.value.get(token))
    .filter((item): item is IArcDiDRegisteredSectorData => item !== undefined)
    .map((data) => ({
      parts: data.parts ?? [],
      split: data.split,
      angle: data.angle,
      span: data.span,
      color: data.color,
    }));
});

const registeredPartsList = computed<IArcDiDPartItem[]>(() => {
  return registeredSectorsList.value.flatMap(
    (s) => s.parts as IArcDiDPartItem[],
  );
});

const layerToken = Symbol();
const layerRegistrationData = computed<IArcDiDRegisteredLayerData>(() => ({
  title: currentTitle.value,
  color: props.color,
  sectors: registeredSectorsList.value,
  parts: registeredPartsList.value,
  index: props.index !== undefined ? Number(props.index) : undefined,
}));

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
  return '#0ea5e9';
});

const layerContext: IArcDiDLayerContext = {
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
</script>

<template>
  <div
    class="alpha-arc-did__layer contents"
    :data-index="resolvedIndex"
    :data-active="isActive"
  >
    <!-- Auto-render title if prop title provided but no slotted ArcDiDLayerTitle -->
    <ArcDiDLayerTitle v-if="!hasSlottedTitle && currentTitle" :title="currentTitle" />

    <!-- Default children slots -->
    <slot />

    <!-- Fallback parts from geometry if layer has no slotted parts and default geo parts/sectors exist -->
    <ArcDiDLayerParts v-if="!hasSlottedParts && registeredSectorTokens.length === 0 && layerGeo && layerGeo.sectors.length > 0">
      <template v-for="sector in layerGeo.sectors" :key="sector.index">
        <ArcDiDLayerSector v-if="sector.parts.length > 1 || sector.split" :split="sector.split">
          <ArcDiDLayerPart
            v-for="part in sector.parts"
            :key="part.index"
            :label="part.label"
            :index="part.index"
            :position="part.position"
            :angle="part.angle"
            :radius="part.radius"
          />
        </ArcDiDLayerSector>
        <ArcDiDLayerPart
          v-else-if="sector.parts[0]"
          :key="sector.parts[0].index"
          :label="sector.parts[0].label"
          :index="sector.parts[0].index"
          :position="sector.parts[0].position"
          :angle="sector.parts[0].angle"
          :radius="sector.parts[0].radius"
        />
      </template>
    </ArcDiDLayerParts>
  </div>
</template>
