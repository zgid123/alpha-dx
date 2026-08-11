<script setup lang="ts">
import { formatDate } from '@alphacifer/core-utils/dateUtils';

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

const formattedDate = formatDate(props.date, {
  format: 'dd/MM/yyyy',
});

const { className, forwardedAttrs } = useMergedUnoAttrs('slidev-addon-date');
</script>

<template>
  <div
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    Date: {{ formattedDate }}
  </div>
</template>
