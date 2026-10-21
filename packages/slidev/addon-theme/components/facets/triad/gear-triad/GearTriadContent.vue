<script setup lang="ts">
import { computed, inject } from 'vue';

import { GEAR_TRIAD_CALLOUT_KEY } from '../../../../utils/facets/triad/gear-triad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'GearTriadContent',
});

export interface IGearTriadContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IGearTriadContentProps>(), {
  color: undefined,
});

const calloutContext = inject(GEAR_TRIAD_CALLOUT_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? calloutContext?.item.value.textColor ?? undefined;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-gear-triad-content font-sans leading-[1.45] font-normal text-(--alpha-gear-triad-content) select-none',
);
</script>

<template>
  <p
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="
      contentColor && !contentColor.includes('--alpha-gear-triad-content')
        ? { '--alpha-gear-triad-content': contentColor }
        : undefined
    "
  >
    <slot />
  </p>
</template>
