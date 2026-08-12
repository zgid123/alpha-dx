<script setup lang="ts">
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

interface IReflectedTitleProps {
  readonly title: string;
}

defineProps<IReflectedTitleProps>();

const { className, forwardedAttrs } = useMergedUnoAttrs(`
  alpha-reflected-title
  relative
  text-5xl
  font-bold
  tracking-tight
  !text-[#a5f3fc]
  after:content-[attr(data-title)]
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
    :class="className()"
    :data-title="title"
  >
    {{ title }}
  </h1>
</template>
