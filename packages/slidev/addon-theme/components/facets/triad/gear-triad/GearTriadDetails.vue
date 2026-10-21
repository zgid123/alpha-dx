<script setup lang="ts">
import {
  computed,
  Fragment,
  inject,
  onBeforeUpdate,
  provide,
  useSlots,
  type VNode,
} from 'vue';

import {
  GEAR_TRIAD_DETAILS_KEY,
  GEAR_TRIAD_ROOT_KEY,
  getDefaultGearTriadItem,
  type IResolvedGearTriadItem,
} from '../../../../utils/facets/triad/gear-triad';
import { useMergedUnoAttrs } from '../../../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
  name: 'GearTriadDetails',
});

export interface IGearTriadDetailsProps {
  readonly option?: number;
}

const props = withDefaults(defineProps<IGearTriadDetailsProps>(), {
  option: undefined,
});

const slots = useSlots();

function flattenVNodes(nodes: VNode[]): VNode[] {
  const result: VNode[] = [];
  for (const node of nodes) {
    if (node.type === Fragment && Array.isArray(node.children)) {
      result.push(...flattenVNodes(node.children as VNode[]));
    } else {
      result.push(node);
    }
  }

  return result;
}

const defaultNodes = computed(() =>
  slots.default ? flattenVNodes(slots.default()) : [],
);
const headingNode = computed(() =>
  defaultNodes.value.find((node) => {
    const type = node.type as { name?: string; __name?: string };

    return (
      type?.name === 'GearTriadDetailsHeading' ||
      type?.__name === 'GearTriadDetailsHeading'
    );
  }),
);
const descriptionNode = computed(() =>
  defaultNodes.value.find((node) => {
    const type = node.type as { name?: string; __name?: string };

    return (
      type?.name === 'GearTriadDetailsContent' ||
      type?.__name === 'GearTriadDetailsContent'
    );
  }),
);
const detailNodes = computed(() =>
  defaultNodes.value.filter((node) => {
    const type = node.type as { name?: string; __name?: string };

    return !['GearTriadDetailsHeading', 'GearTriadDetailsContent'].includes(
      type?.name ?? type?.__name ?? '',
    );
  }),
);
const rootContext = inject(GEAR_TRIAD_ROOT_KEY, undefined);
rootContext?.registerDetails();

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

provide(GEAR_TRIAD_DETAILS_KEY, {
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

const { className, forwardedAttrs } = useMergedUnoAttrs(() => {
  const visibilityClasses = isVisible.value
    ? 'opacity-100 pointer-events-auto translate-x-0 delay-200'
    : 'opacity-0 pointer-events-none translate-x-8';

  return `alpha-gear-triad-details absolute right-2.5 top-1/2 -translate-y-1/2 w-122.5 flex flex-col select-none box-border transition-all duration-500 ease-out ${visibilityClasses}`;
});
</script>

<template>
  <div v-bind="forwardedAttrs()" :class="className()">
    <component :is="headingNode" v-if="headingNode" />
    <component :is="descriptionNode" v-if="descriptionNode" />
    <div class="alpha-gear-triad-details__items flex flex-col gap-3.5">
      <slot
        v-if="$slots[String(resolvedOptionIndex + 1)]"
        :name="String(resolvedOptionIndex + 1)"
      />
      <slot
        v-else-if="$slots[`option-${resolvedOptionIndex + 1}`]"
        :name="`option-${resolvedOptionIndex + 1}`"
      />
      <component
        :is="node"
        v-for="(node, index) in detailNodes"
        v-else
        :key="index"
      />
    </div>
  </div>
</template>
