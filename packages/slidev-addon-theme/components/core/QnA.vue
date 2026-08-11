<script setup lang="ts">
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

defineProps({
  startDelay: {
    type: Number,
    default: 11_500,
  },
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'slidev-addon-qna flex items-center gap-8 text-8xl font-bold color-[#2b90b6]',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <span
      v-motion
      :initial="{
        opacity: 0,
        x: -500,
        rotate: -360,
      }"
      :enter="{
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
          duration: 800,
          ease: 'easeOut',
          delay: 400 + startDelay,
        }
      }"
    >
      Q
    </span>
    <span
      v-motion
      :initial="{
        opacity: 1,
        y: -1_000
      }"
      :enter="{
        y: [-1_000, 0],
        transition: {
          y: {
            duration: 1_000,
            type: 'spring',
            stiffness: 200,
            damping: 15,
            delay: 0 + startDelay,
          }
        }
      }"
    >
      &
    </span>
    <span
      v-motion
      :initial="{ opacity: 0, x: 500, rotate: 360 }"
      :enter="{
        opacity: 1,
        x: 0,
        rotate: 0,
        transition: {
          duration: 800,
          ease: 'easeOut',
          delay: 600 + startDelay,
        },
      }"
    >
      A
    </span>
  </div>
</template>
