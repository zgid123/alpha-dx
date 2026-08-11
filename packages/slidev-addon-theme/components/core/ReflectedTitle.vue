<script setup lang="ts">
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

defineProps({
  title: {
    type: String,
    required: true,
  },
});

const { className, forwardedAttrs } = useMergedUnoAttrs(`
  slidev-addon-reflected-title
  relative
  text-5xl
  font-bold
  tracking-tight
  !text-[#a5f3fc]
  after:content-[var(--title)]
  after:block
  after:mt-2
  after:absolute
  after:text-current
  after:opacity-60
  after:text-3xl
  after:font-light
  after:tracking-normal
  after:w-full
  after:text-center
  after:overflow-hidden
  after:mask-[linear-gradient(to_bottom,black_0%,transparent_100%)]
  after:animate-slide-in-down
  after:animate-duration-1000
`);
</script>

<template>
  <h1
    v-bind="forwardedAttrs()"
    :style="{
      '--title': `'${title}'`,
    }"
    :class="className()"
  >
    {{ title }}
  </h1>
</template>
