<script setup lang="ts">
import HexTriad from '@alphacifer/slidev-addon-theme/components/facets/triad/hex-triad/HexTriad.vue';
import HexTriadBadge from '@alphacifer/slidev-addon-theme/components/facets/triad/hex-triad/HexTriadBadge.vue';
import HexTriadCallout from '@alphacifer/slidev-addon-theme/components/facets/triad/hex-triad/HexTriadCallout.vue';
import HexTriadContent from '@alphacifer/slidev-addon-theme/components/facets/triad/hex-triad/HexTriadContent.vue';
import HexTriadHeading from '@alphacifer/slidev-addon-theme/components/facets/triad/hex-triad/HexTriadHeading.vue';
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

const title = ref('Engineering Pillars');
const subtitle = ref('Core values guiding our codebase');
const animation = ref(true);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <template #default="{ isFullscreen }">
      <div :class="{ 'hex-triad-demo-preview': !isFullscreen }">
        <HexTriad
          :title="title"
          :subtitle="subtitle"
          :animation="animation"
        >
          <HexTriadCallout>
            <HexTriadBadge>01</HexTriadBadge>
            <HexTriadHeading>Performance</HexTriadHeading>
            <HexTriadContent>Fast builds, instant feedback, and zero-overhead runtime.</HexTriadContent>
          </HexTriadCallout>
          <HexTriadCallout>
            <HexTriadBadge>02</HexTriadBadge>
            <HexTriadHeading>Reliability</HexTriadHeading>
            <HexTriadContent>Strict type safety paired with deterministic test suites.</HexTriadContent>
          </HexTriadCallout>
          <HexTriadCallout>
            <HexTriadBadge>03</HexTriadBadge>
            <HexTriadHeading>Scalability</HexTriadHeading>
            <HexTriadContent>Seamless growth across packages, tools, and workflows.</HexTriadContent>
          </HexTriadCallout>
        </HexTriad>
      </div>
    </template>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <label for="hex-title" class="slidev-mockup__label">Title:</label>
        <input
          id="hex-title"
          v-model="title"
          class="slidev-mockup__input"
        />
      </div>

      <div class="slidev-mockup__control-group">
        <label for="hex-subtitle" class="slidev-mockup__label">Subtitle:</label>
        <input
          id="hex-subtitle"
          v-model="subtitle"
          class="slidev-mockup__input"
        />
      </div>

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

<style scoped>
.hex-triad-demo-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: -1.75rem;
  transform: scale(0.88);
  transform-origin: top center;
}
</style>
