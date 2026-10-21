<script setup lang="ts">
import { computed, inject } from 'vue';

import { CHEVRON_CARD_KEY } from '../../../utils/card/chevron-card';
import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  name: 'ChevronCardContent',
  inheritAttrs: false,
});

export interface IChevronCardContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IChevronCardContentProps>(), {
  color: undefined,
});

const cardContext = inject(CHEVRON_CARD_KEY, undefined);

const contentColor = computed(() => {
  return props.color ?? cardContext?.textColor.value ?? undefined;
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-chevron-card-content leading-[1.45] font-normal tracking-tight select-none font-sans text-(--alpha-chevron-card-content)',
);
</script>

<template>
  <p
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="
      contentColor ? { '--alpha-chevron-card-content': contentColor } : undefined
    "
  >
    <slot />
  </p>
</template>
