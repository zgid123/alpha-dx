<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';
import GearTriadIcon from './GearTriadIcon.vue';

defineOptions({
  inheritAttrs: false,
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

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-gear-triad-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full flex items-center justify-center bg-linear-145 from-(--alpha-gear-triad-center-bg-start) to-(--alpha-gear-triad-center-bg-end) shadow-(--alpha-gear-triad-center-shadow) pointer-events-auto select-none',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="{
      width: `${props.radius * 2}px`,
      height: `${props.radius * 2}px`,
    }"
  >
    <slot>
      <GearTriadIcon
        v-if="props.icon"
        :icon="props.icon"
        :size="props.iconSize"
        color="var(--alpha-gear-triad-center-icon)"
        :stroke-width="1.75"
      />
    </slot>
  </div>
</template>
