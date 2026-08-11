<script setup lang="ts">
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

defineProps({
  center: {
    type: Boolean,
    default: false,
  },
  idle: {
    type: Boolean,
    default: false,
  },
});

const { className, forwardedAttrs } = useMergedUnoAttrs(`
  shifting-heading
  absolute
  z-1
  start-[var(--shifting-heading-inline,3.5rem)]
  top-[var(--shifting-heading-top,2.5rem)]
  w-max
  translate-x-0
  translate-y-0
  origin-left
`);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
    :data-shifting-heading-state="center && !idle ? 'centered' : 'shifted'"
  >
    <slot />
  </div>
</template>

<style>
.shifting-heading {
  max-width: calc(
    100% - var(--shifting-heading-inline, 3.5rem) -
      var(--shifting-heading-inline, 3.5rem)
  );
  transition:
    inset-inline-start var(--shifting-heading-duration, 700ms) ease-in-out,
    top var(--shifting-heading-duration, 700ms) ease-in-out,
    transform var(--shifting-heading-duration, 700ms) ease-in-out;
  will-change: inset-inline-start, top, transform;
}

.shifting-heading > :is(h1, h2, h3, h4, h5, h6) {
  max-width: 100%;
  margin: 0;
  overflow-wrap: anywhere;
  text-wrap: balance;
}

.shifting-heading[data-shifting-heading-state='centered'] {
  inset-inline-start: 50%;
  top: 50%;
  text-align: center;
  transform: translate(-50%, -50%);
  transform-origin: center;
}

:where([dir='rtl'])
  .shifting-heading[data-shifting-heading-state='centered'] {
  transform: translate(50%, -50%);
}

@media (prefers-reduced-motion: reduce) {
  .shifting-heading {
    transition-duration: 1ms;
  }
}
</style>
