<script setup lang="ts">
import HexagonTriad from '@alphacifer/slidev-addon-theme/components/facets/triad/hexagon-triad/HexagonTriad.vue';
import HexagonTriadBadge from '@alphacifer/slidev-addon-theme/components/facets/triad/hexagon-triad/HexagonTriadBadge.vue';
import HexagonTriadCallout from '@alphacifer/slidev-addon-theme/components/facets/triad/hexagon-triad/HexagonTriadCallout.vue';
import HexagonTriadContent from '@alphacifer/slidev-addon-theme/components/facets/triad/hexagon-triad/HexagonTriadContent.vue';
import HexagonTriadHeading from '@alphacifer/slidev-addon-theme/components/facets/triad/hexagon-triad/HexagonTriadHeading.vue';
import { ref } from 'vue';

import SlidevMockup from '../../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);

const animation = ref(true);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <HexagonTriad :animation="animation">
      <HexagonTriadCallout>
        <HexagonTriadBadge>01</HexagonTriadBadge>
        <HexagonTriadHeading>Performance</HexagonTriadHeading>
        <HexagonTriadContent
          >Fast builds, instant feedback, and zero-overhead
          runtime.</HexagonTriadContent
        >
      </HexagonTriadCallout>
      <HexagonTriadCallout>
        <HexagonTriadBadge>02</HexagonTriadBadge>
        <HexagonTriadHeading>Reliability</HexagonTriadHeading>
        <HexagonTriadContent
          >Strict type safety paired with deterministic test
          suites.</HexagonTriadContent
        >
      </HexagonTriadCallout>
      <HexagonTriadCallout>
        <HexagonTriadBadge>03</HexagonTriadBadge>
        <HexagonTriadHeading>Scalability</HexagonTriadHeading>
        <HexagonTriadContent
          >Seamless growth across packages, tools, and
          workflows.</HexagonTriadContent
        >
      </HexagonTriadCallout>
    </HexagonTriad>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Animation:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: animation }]"
          @click="animation = true"
        >
          On
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: !animation }]"
          @click="animation = false"
        >
          Off
        </button>
      </div>
    </template>
  </SlidevMockup>
</template>
