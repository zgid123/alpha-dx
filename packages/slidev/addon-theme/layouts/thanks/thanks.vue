<script setup lang="ts">
import SquareThanks from '../../components/core/thanks/SquareThanks.vue';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-thanks slidev-layout thanks',
);
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <SquareThanks>
      <slot />
    </SquareThanks>
  </div>
</template>
