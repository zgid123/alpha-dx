<script setup lang="ts">
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  author: {
    type: String,
    required: false,
    default: 'Alpha',
  },
  team: {
    type: Array,
    required: false,
    default: () => [],
  },
  date: {
    type: String,
    required: true,
  },
});

const { className, forwardedAttrs } = useMergedUnoAttrs(() => [
  'slidev-addon-speaker flex absolute bottom-[15px] right-[30px] flex-col',
  props.team.length ? 'text-left gap-2' : undefined,
]);
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <div v-if="team.length">
      <div v-for="member in team" :key="member as string">
        {{ member }}
      </div>
    </div>
    <div v-else>
      Author: {{ author }}
    </div>
    <Date :date="date" />
  </div>
</template>
