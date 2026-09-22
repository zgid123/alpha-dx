<script setup lang="ts">
import { computed, inject } from 'vue';

import { GEAR_TRIAD_CONTENTS_KEY } from '../../../../utils/gearTriad';

defineOptions({
  name: 'GearTriadContent',
});

export interface IGearTriadContentProps {
  readonly step?: string | number;
  readonly option?: number;
}

const props = withDefaults(defineProps<IGearTriadContentProps>(), {
  step: undefined,
  option: undefined,
});

const contentsContext = inject(GEAR_TRIAD_CONTENTS_KEY, undefined);

const registration = contentsContext
  ? contentsContext.registerContent(props.option)
  : undefined;

const isVisible = computed(() => {
  if (props.option !== undefined && contentsContext) {
    return props.option === contentsContext.activeOptionIndex.value + 1;
  }
  return true;
});

const resolvedStep = computed(() => {
  if (props.step !== undefined) {
    if (typeof props.step === 'number') {
      return String(props.step).padStart(2, '0');
    }
    return String(props.step);
  }

  const idx = (registration?.index ?? 0) + 1;
  return String(idx).padStart(2, '0');
});
</script>

<template>
  <div
    v-if="isVisible"
    class="alpha-gear-triad-content flex items-start gap-4 select-none"
  >
    <span class="alpha-gear-triad-content__step font-bold text-2xl text-slate-700 w-10 flex-shrink-0 leading-tight font-sans tracking-tight">
      {{ resolvedStep }}
    </span>
    <div class="alpha-gear-triad-content__body flex-1 text-[0.92rem] text-slate-600 font-normal font-sans leading-[1.45]">
      <slot />
    </div>
  </div>
</template>
