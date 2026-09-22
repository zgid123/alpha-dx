<script setup lang="ts">
import { computed, inject, onBeforeUpdate, provide, useSlots } from 'vue';

import {
  GEAR_TRIAD_CONTENTS_KEY,
  GEAR_TRIAD_ROOT_KEY,
  getDefaultGearTriadItem,
  type IResolvedGearTriadItem,
} from '../../../../utils/gearTriad';

defineOptions({
  name: 'GearTriadContents',
});

export interface IGearTriadContentsProps {
  readonly title?: string;
  readonly description?: string;
  readonly option?: number;
}

const props = withDefaults(defineProps<IGearTriadContentsProps>(), {
  title: undefined,
  description: undefined,
  option: undefined,
});

const slots = useSlots();
const rootContext = inject(GEAR_TRIAD_ROOT_KEY, undefined);
rootContext?.registerContents();

let contentCounter = 0;
const optionCounters: Record<number, number> = {};
onBeforeUpdate(() => {
  contentCounter = 0;
  for (const k in optionCounters) {
    optionCounters[k] = 0;
  }
});

const registerContent = (option?: number) => {
  if (option !== undefined) {
    optionCounters[option] = (optionCounters[option] ?? 0) + 1;
    return { index: optionCounters[option] - 1 };
  }
  const idx = contentCounter++;
  return { index: idx };
};

const resolvedOptionIndex = computed(() => {
  if (props.option !== undefined) {
    return Math.max(0, props.option - 1);
  }
  return rootContext?.activeOptionIndex.value ?? 0;
});

const activeItem = computed<IResolvedGearTriadItem>(() => {
  if (rootContext?.items.value) {
    const item = rootContext.items.value[resolvedOptionIndex.value];
    if (item) {
      return item;
    }
  }
  return getDefaultGearTriadItem(resolvedOptionIndex.value);
});

provide(GEAR_TRIAD_CONTENTS_KEY, {
  activeItem,
  activeOptionIndex: resolvedOptionIndex,
  registerContent,
});

const isVisible = computed(() => {
  if (!rootContext?.isShifted.value) {
    return false;
  }
  if (props.option !== undefined) {
    return props.option - 1 === rootContext.activeOptionIndex.value;
  }
  return true;
});
</script>

<template>
  <div
    class="alpha-gear-triad-contents absolute right-2.5 top-1/2 -translate-y-1/2 w-[490px] flex flex-col select-none box-border pointer-events-auto transition-all duration-500 ease-out"
    :class="[
      isVisible
        ? 'opacity-100 translate-x-0 delay-200'
        : 'opacity-0 pointer-events-none translate-x-8',
    ]"
  >
    <!-- Header: Option Title -->
    <slot name="title">
      <h3 class="alpha-gear-triad-contents__title text-2xl font-bold font-sans tracking-tight text-slate-900 mb-2">
        {{ props.title ?? activeItem.title }}
      </h3>
    </slot>
    <!-- Header: Option Description -->
    <slot name="description">
      <p class="alpha-gear-triad-contents__desc text-sm font-sans text-slate-500 leading-relaxed mb-6">
        {{ props.description ?? activeItem.description }}
      </p>
    </slot>
    <!-- Body: List of GearTriadContent items -->
    <div class="alpha-gear-triad-contents__items flex flex-col gap-3.5">
      <slot v-if="$slots[String(resolvedOptionIndex + 1)]" :name="String(resolvedOptionIndex + 1)" />
      <slot v-else-if="$slots[`option-${resolvedOptionIndex + 1}`]" :name="`option-${resolvedOptionIndex + 1}`" />
      <slot v-else />
    </div>
  </div>
</template>
