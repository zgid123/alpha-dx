<script setup lang="ts">
import { computed, inject } from 'vue';

import { ARC_ARROW_PROCESS_CALLOUT_KEY } from '../../../utils/process/arc-arrow-process';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  name: 'ArcArrowProcessContent',
  inheritAttrs: false,
});

export interface IArcArrowProcessContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IArcArrowProcessContentProps>(), {
  color: undefined,
});

const calloutContext = inject(ARC_ARROW_PROCESS_CALLOUT_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? calloutContext?.item.value.textColor;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-arrow-process-content font-sans leading-[1.45] font-normal text-(--alpha-arc-arrow-process-content) select-none line-clamp-4',
);
</script>

<template>
  <p
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="
      contentColor && !contentColor.includes('--alpha-arc-arrow-process-content')
        ? { '--alpha-arc-arrow-process-content': contentColor }
        : undefined
    "
  >
    <slot />
  </p>
</template>
