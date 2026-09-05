<script setup lang="ts">
defineOptions({
  name: 'HexTriadLayer',
});

export interface IHexTriadLayerProps {
  readonly d: string;
  readonly fill?: string;
  readonly filter?: string;
  readonly opacity?: number | string;
}

withDefaults(defineProps<IHexTriadLayerProps>(), {
  opacity: 1,
  fill: undefined,
  filter: undefined,
});
</script>

<template>
  <path
    class="alpha-hex-triad-layer"
    :d="d"
    :fill="fill"
    :filter="filter"
    :style="opacity !== undefined ? { opacity } : undefined"
  />
</template>
