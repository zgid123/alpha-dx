<script setup lang="ts">
import { computed, inject } from 'vue';

import {
  GEAR_TRIAD_DETAILS_KEY,
  GEAR_TRIAD_ROOT_KEY,
} from '../../../../utils/facets/triad/gear-triad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'GearTriadDetail',
});

export interface IGearTriadDetailProps {
  readonly step?: string | number;
  readonly option?: number;
  readonly color?: string;
}

const props = withDefaults(defineProps<IGearTriadDetailProps>(), {
  step: undefined,
  option: undefined,
  color: undefined,
});

const rootContext = inject(GEAR_TRIAD_ROOT_KEY, undefined);
const detailsContext = inject(GEAR_TRIAD_DETAILS_KEY, undefined);

const registration = detailsContext
  ? detailsContext.registerContent(props.option)
  : undefined;

const isVisible = computed(() => {
  if (props.option !== undefined && detailsContext) {
    return props.option === detailsContext.activeOptionIndex.value + 1;
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

const stepColor = computed(() => {
  if (props.color) {
    return props.color;
  }

  if (props.option !== undefined && rootContext?.items.value) {
    const item = rootContext.items.value[props.option - 1];
    if (item?.color) {
      return item.color;
    }
  }

  return (
    detailsContext?.activeItem.value.color ??
    'var(--alpha-gear-triad-detail-number)'
  );
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-gear-triad-detail flex items-center gap-4 select-none',
);
</script>

<template>
  <div v-if="isVisible" v-bind="forwardedAttrs()" :class="className()">
    <span
      class="alpha-gear-triad-detail__step font-bold text-2xl w-10 shrink-0 leading-tight font-sans tracking-tight"
      :style="{ color: stepColor }"
    >
      {{ resolvedStep }}
    </span>
    <p
      class="alpha-gear-triad-detail__body flex-1 text-(--alpha-gear-triad-detail) font-normal font-sans leading-[1.45]"
    >
      <slot />
    </p>
  </div>
</template>
