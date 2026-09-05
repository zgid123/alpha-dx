<script setup lang="ts">
import { useSlideContext } from '@slidev/client';
import {
  computed,
  onMounted,
  provide,
  ref,
  shallowRef,
  useSlots,
  watch,
  watchEffect,
} from 'vue';

import { collectShiftingIntroNodes } from '../../utils/shiftingHeading/collectShiftingIntroNodes';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const context = useSlideContext();
const slots = useSlots();
const { $clicks } = context;

let isInitialLoad = true;
const isShifting = ref(false);

onMounted(() => {
  // Allow Slidev router to sync URL clicks on page reload before treating changes as user navigation
  setTimeout(() => {
    isInitialLoad = false;
  }, 100);
});

provide('SLIDEV_LAYOUT_SHIFTING_INTRO', {
  clicks: $clicks,
  active: computed(() => $clicks.value > 0),
  isShifting: computed(() => isShifting.value),
});

watch($clicks, (newVal, oldVal) => {
  if (isInitialLoad) {
    isShifting.value = false;

    return;
  }

  if (oldVal === 0 && newVal > 0) {
    isShifting.value = true;
  } else {
    isShifting.value = false;
  }
});

const nodes = shallowRef(collectShiftingIntroNodes([]));

watchEffect(() => {
  const children = slots.default?.() || [];
  nodes.value = collectShiftingIntroNodes(children);
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-shifting-intro slidev-layout shifting-intro-layout',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <component
      :is="nodes.title"
      v-if="nodes.title"
      aria-hidden="true"
      class="op-0"
    />
    <TransitionHeading
      v-if="nodes.title"
      :idle="$clicks !== 0"
      :center="$clicks === 0"
    >
      <component :is="nodes.title" />
    </TransitionHeading>
    <div
      v-click
      class="hidden"
    />
    <div
      :class="[
        $clicks > 0 ? 'opacity-100' : 'opacity-0',
        isShifting ? 'transition-all duration-1000 delay-600' : 'transition-none delay-0',
      ]"
    >
      <template v-for="(content) in nodes.contents" :key="content.key">
        <component
          v-if="nodes.clickRef.has(content.key)"
          :is="content.node"
          v-click="nodes.clickRef.get(content.key)"
        />
        <component
          v-else
          :is="content.node"
        />
      </template>
    </div>
  </div>
</template>
