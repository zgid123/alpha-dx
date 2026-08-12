<script setup lang="ts">
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

interface ITransitionHeadingProps {
  readonly center?: boolean;
  readonly idle?: boolean;
}

const props = withDefaults(defineProps<ITransitionHeadingProps>(), {
  center: false,
  idle: false,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(() => [
  'alpha-transition-heading transition-all duration-700 ease-in-out absolute whitespace-nowrap',
  {
    'top-[50%] left-[50%] translate-[-50%,-50%]': props.center,
    'top-[2.5rem] left-[3.5rem] translate-[0,0]': props.idle || !props.center,
  },
]);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <slot />
  </div>
</template>
