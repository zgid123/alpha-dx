<script setup lang="ts">
import GearTriadDemo from './GearTriadDemo.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);
</script>

<template>
  <GearTriadDemo :theme="props.theme" :with-contents="true" />
</template>
