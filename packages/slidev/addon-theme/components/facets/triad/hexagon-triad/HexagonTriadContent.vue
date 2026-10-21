<script setup lang="ts">
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'HexagonTriadContent',
});

export interface IHexagonTriadContentProps {
  readonly color?: string;
}

const props = withDefaults(defineProps<IHexagonTriadContentProps>(), {
  color: undefined,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-hexagon-triad-content font-sans leading-relaxed max-w-60 text-(--alpha-hexagon-triad-content)',
);
</script>

<template>
  <p
    v-bind="forwardedAttrs()"
    :class="className()"
    :style="
      props.color
        ? { '--alpha-hexagon-triad-content': props.color }
        : undefined
    "
  >
    <slot />
  </p>
</template>
