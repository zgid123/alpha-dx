<script setup lang="ts">
import { formatDate } from '@alphacifer/core-utils/dateUtils';
import { computed } from 'vue';

import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  date: {
    type: String,
    required: false,
  },
});

const formattedDate = computed(() => {
  return formatDate(props.date ?? new Date(), {
    format: 'dd/MM/yyyy',
  });
});

const { className, forwardedAttrs } = useMergedUnoAttrs('alpha-date');
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    Date: {{ formattedDate }}
  </div>
</template>
