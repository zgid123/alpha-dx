<script setup lang="ts">
import { useSlideContext } from '@slidev/client';
import { computed, Fragment, isVNode, useSlots, type VNode } from 'vue';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const slots = useSlots();
const { $clicks } = useSlideContext();

function flattenTopLevel(nodes: VNode[]): VNode[] {
  return nodes.flatMap((node) => {
    if (node.type === Fragment && Array.isArray(node.children))
      return flattenTopLevel(node.children.filter(isVNode));

    return node;
  });
}

const nodes = computed(() => {
  const children = flattenTopLevel(slots.default?.() ?? []);
  const titleIndex = children.findIndex((node) => node.type === 'h1');

  return {
    title: titleIndex >= 0 ? children[titleIndex] : null,
    contents:
      titleIndex >= 0
        ? children.filter((_, index) => index !== titleIndex)
        : children,
  };
});

const isRevealed = computed(() => !nodes.value.title || $clicks.value > 0);
const { className, forwardedAttrs } = useMergedUnoAttrs(
  'slidev-layout shifting-intro-layout relative',
);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <TransitionHeading
      v-if="nodes.title"
      :center="!isRevealed"
      :idle="isRevealed"
    >
      <component :is="nodes.title" />
    </TransitionHeading>

    <VClickGap
      v-if="nodes.title"
      :size="1"
    />

    <div
      class="shifting-intro-content"
      :class="{ 'is-revealed': isRevealed }"
      :aria-hidden="!isRevealed"
      :inert="!isRevealed || undefined"
    >
      <component
        :is="content"
        v-for="(content, index) in nodes.contents"
        :key="content.key ?? index"
      />
    </div>
  </div>
</template>

<style>
.shifting-intro-content {
  box-sizing: border-box;
  min-height: 100%;
  padding-top: var(--shifting-heading-content-offset, 4.25rem);
  visibility: hidden;
  opacity: 0;
  transition:
    opacity var(--shifting-content-exit-duration, 250ms) ease-out,
    visibility 0s linear var(--shifting-content-exit-duration, 250ms);
}

.shifting-intro-content.is-revealed {
  visibility: visible;
  opacity: 1;
  transition:
    opacity var(--shifting-content-duration, 700ms) ease-out
      var(--shifting-content-delay, 450ms),
    visibility 0s linear;
}

@media (prefers-reduced-motion: reduce) {
  .shifting-intro-content,
  .shifting-intro-content.is-revealed {
    transition-duration: 1ms;
    transition-delay: 0ms;
  }
}

@media print {
  .shifting-heading,
  .shifting-intro-content,
  .shifting-intro-content.is-revealed {
    transition: none;
  }
}
</style>
