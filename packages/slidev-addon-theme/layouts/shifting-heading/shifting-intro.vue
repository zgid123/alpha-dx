<script setup lang="ts">
import { useSlideContext } from '@slidev/client';
import { ref, shallowRef, useSlots, watch, watchEffect } from 'vue';

import { collectShiftingIntroNodes } from '../../utils/shiftingHeading/collectShiftingIntroNodes';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const context = useSlideContext();
const slots = useSlots();
const { $clicks } = context;

const delayClass = ref('delay-600');

watch($clicks, (newVal, oldVal) => {
  if (newVal > oldVal) {
    delayClass.value = 'delay-600';
  } else {
    delayClass.value = 'delay-0';
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
      class="transition-all duration-1000"
      :class="[
        $clicks > 0 ? 'opacity-100' : 'opacity-0',
        delayClass,
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
