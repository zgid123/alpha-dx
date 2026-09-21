<script setup lang="ts">
withDefaults(
  defineProps<{
    to?: string;
  }>(),
  {
    to: '',
  },
);
</script>

<template>
  <a :href="to">
    <slot />
  </a>
</template>
