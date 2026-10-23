<script setup lang="ts">
import type { MotionVariants, Variant } from '@vueuse/motion';

import { useMergedUnoAttrs } from '../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'SquareThanksContent',
});

const props = withDefaults(
  defineProps<{
    readonly animation?: boolean;
    readonly color?: string;
  }>(),
  {
    animation: true,
    color: undefined,
  },
);

interface IGetMotionPropsParams {
  enter: Variant;
  initial: Variant;
}

const getMotionProps = ({
  enter,
  initial,
}: IGetMotionPropsParams): MotionVariants<string> => {
  if (props.animation) {
    return { enter, initial };
  }

  const state = { ...enter, transition: { duration: 0 } };
  return { enter: state, initial: state };
};

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-square-thanks-content absolute top-[50%] left-[69%] translate-x-[-50%] translate-y-[-50%] text-3xl text-(--alpha-square-thanks-content)',
);
</script>

<template>
  <div
    v-motion
    v-bind="{
      ...forwardedAttrs(),
      ...getMotionProps({
        initial: { x: -80, opacity: 0 },
        enter: {
          x: -130,
          y: -46,
          opacity: 1,
          transition: { delay: 2_800, duration: 1_000 },
        },
      }),
    }"
    :class="className()"
    :style="
      props.color && !props.color.includes('--alpha-square-thanks-content')
        ? { '--alpha-square-thanks-content': props.color }
        : undefined
    "
  >
    <slot />
  </div>
</template>

<style scoped>
.alpha-square-thanks-content :deep(h1),
.alpha-square-thanks-content :deep(h2),
.alpha-square-thanks-content :deep(h3),
.alpha-square-thanks-content :deep(h4),
.alpha-square-thanks-content :deep(h5),
.alpha-square-thanks-content :deep(h6),
.alpha-square-thanks-content :deep(p),
.alpha-square-thanks-content :deep(div) {
  margin: 0;
  padding: 0;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  color: inherit;
}
</style>
