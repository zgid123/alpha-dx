<script setup lang="ts">
defineOptions({
  name: 'HexTriadContent',
});
</script>

<template>
  <p
    class="alpha-hex-triad-content mt-0 mb-0 text-[1rem] leading-relaxed max-w-[240px]"
    :style="{
      margin: 0,
      fontSize: '1rem',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    }"
  >
    <slot>
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod sed diam nonummy nibh
    </slot>
  </p>
</template>
