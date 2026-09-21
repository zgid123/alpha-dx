<script setup lang="ts">
defineOptions({
  name: 'QuadHubCenter',
});

export interface IQuadHubCenterProps {
  readonly title?: string;
  readonly radius?: number;
  readonly subtitle?: string;
}

const props = withDefaults(defineProps<IQuadHubCenterProps>(), {
  title: undefined,
  subtitle: undefined,
  radius: 58,
});
</script>

<template>
  <div
    class="alpha-quad-hub-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 rounded-full bg-white flex flex-col items-center justify-center text-center shadow-lg pointer-events-auto select-none"
    :style="{
      width: `${props.radius * 2}px`,
      height: `${props.radius * 2}px`,
      boxShadow: '0 4px 18px rgba(0, 0, 0, 0.12)',
      fontFamily: 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif',
    }"
  >
    <slot>
      <slot name="title">
        <span
          v-if="props.title"
          :class="[
            'text-[23px] font-extrabold text-slate-800 tracking-tight leading-none',
            { 'mb-2': props.subtitle },
          ]"
          style="font-family: inherit;"
        >
          {{ props.title }}
        </span>
      </slot>
      <slot name="subtitle">
        <span
          v-if="props.subtitle"
          class="text-[13px] font-medium text-slate-400 tracking-normal leading-none"
          style="font-family: inherit;"
        >
          {{ props.subtitle }}
        </span>
      </slot>
    </slot>
  </div>
</template>
