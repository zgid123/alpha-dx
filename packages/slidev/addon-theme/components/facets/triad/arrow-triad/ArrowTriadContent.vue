<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARROW_TRIAD_CALLOUT_KEY } from '../../../../utils/facets/triad/arrow-triad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'ArrowTriadContent',
});

export interface IArrowTriadContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArrowTriadContentProps>(), {
  color: undefined,
});

const calloutContext = inject(ARROW_TRIAD_CALLOUT_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? calloutContext?.item.value.textColor ?? undefined;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arrow-triad-content font-sans leading-normal text-center font-normal text-(--alpha-arrow-triad-content) select-none',
);
</script>

<template>
  <p
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="
      contentColor && !contentColor.includes('--alpha-arrow-triad-content')
        ? { '--alpha-arrow-triad-content': contentColor }
        : undefined
    "
  >
    <slot />
  </p>
</template>
