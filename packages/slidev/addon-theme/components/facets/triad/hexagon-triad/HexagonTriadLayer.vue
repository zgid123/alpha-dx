<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'HexagonTriadLayer',
});

export interface IHexagonTriadLayerProps {
  readonly d: string;
  readonly fill?: string;
  readonly filter?: string;
  readonly opacity?: number | string;
}

withDefaults(defineProps<IHexagonTriadLayerProps>(), {
  opacity: 1,
  fill: undefined,
  filter: undefined,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-hexagon-triad-layer',
);
</script>

<template>
  <path
    v-bind="forwardedAttrs()"
    :class="className()"
    :d="d"
    :fill="fill"
    :filter="filter"
    :style="opacity !== undefined ? { opacity } : undefined"
  />
</template>
