<script setup lang="ts">
import GearTriadIcon from './GearTriadIcon.vue';

defineOptions({
  name: 'GearTriadCenter',
});

export interface IGearTriadCenterProps {
  readonly radius?: number;
  readonly icon?: string | object | false;
  readonly iconSize?: number;
}

const props = withDefaults(defineProps<IGearTriadCenterProps>(), {
  radius: 54,
  icon: 'gear',
  iconSize: 42,
});
</script>

<template>
  <div
    class="alpha-gear-triad-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full flex items-center justify-center pointer-events-auto select-none"
    :style="{
      width: `${props.radius * 2}px`,
      height: `${props.radius * 2}px`,
      background: 'linear-gradient(145deg, #ffffff 0%, #f1f5f9 100%)',
      boxShadow: '0 6px 20px -2px rgba(0, 0, 0, 0.22), 0 2px 6px -1px rgba(0, 0, 0, 0.12)',
    }"
  >
    <slot>
      <GearTriadIcon
        v-if="props.icon"
        :icon="props.icon"
        :size="props.iconSize"
        color="#0f172a"
        :stroke-width="1.75"
      />
    </slot>
  </div>
</template>
