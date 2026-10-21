<script setup lang="ts">
import GearTriad from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriad.vue';
import GearTriadCallout from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadCallout.vue';
import GearTriadContent from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadContent.vue';
import GearTriadDetail from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadDetail.vue';
import GearTriadDetails from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadDetails.vue';
import GearTriadDetailsContent from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadDetailsContent.vue';
import GearTriadDetailsHeading from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadDetailsHeading.vue';
import GearTriadHeading from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadHeading.vue';
import { ref } from 'vue';

import SlidevMockup from '../../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
    withDetails?: boolean;
  }>(),
  {
    theme: 'seriph',
    withDetails: false,
  },
);

const animation = ref(true);
const step = ref(0);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <GearTriad v-model:step="step" :animation="animation">
      <GearTriadCallout>
        <GearTriadHeading>Option 1</GearTriadHeading>
        <GearTriadContent>
          Formulate testable research questions and theoretical models.
        </GearTriadContent>
      </GearTriadCallout>
      <GearTriadCallout>
        <GearTriadHeading>Option 2</GearTriadHeading>
        <GearTriadContent>
          Execute controlled investigations with automated measurement
          pipelines.
        </GearTriadContent>
      </GearTriadCallout>
      <GearTriadCallout>
        <GearTriadHeading>Option 3</GearTriadHeading>
        <GearTriadContent>
          Subject findings to reproducible peer reviews and empirical analysis.
        </GearTriadContent>
      </GearTriadCallout>
      <template v-if="props.withDetails">
        <GearTriadDetails :option="1">
          <GearTriadDetailsHeading>Phase Deep Dive</GearTriadDetailsHeading>
          <GearTriadDetailsContent>
            Detailed workflow and execution steps for Option 1.
          </GearTriadDetailsContent>
          <GearTriadDetail>
            Option 1: Modern high-performance reactivity layer.
          </GearTriadDetail>
          <GearTriadDetail>
            Option 1: Seamless automated slide deck layout shifts.
          </GearTriadDetail>
          <GearTriadDetail>
            Option 1: Declarative SVG geometry computation.
          </GearTriadDetail>
          <GearTriadDetail>
            Option 1: Synchronized rotation and translation.
          </GearTriadDetail>
        </GearTriadDetails>
        <GearTriadDetails :option="2">
          <GearTriadDetailsHeading>Phase Deep Dive</GearTriadDetailsHeading>
          <GearTriadDetailsContent>
            Detailed workflow and execution steps for Option 2.
          </GearTriadDetailsContent>
          <GearTriadDetail>
            Option 2: Robust type-safe props and slots contract.
          </GearTriadDetail>
          <GearTriadDetail>
            Option 2: Cross-browser hardware-accelerated animations.
          </GearTriadDetail>
          <GearTriadDetail>
            Option 2: Layered Vitest and Biome verification safety net.
          </GearTriadDetail>
          <GearTriadDetail>
            Option 2: Zero-config Slidev click sequence integration.
          </GearTriadDetail>
        </GearTriadDetails>
        <GearTriadDetails :option="3">
          <GearTriadDetailsHeading>Phase Deep Dive</GearTriadDetailsHeading>
          <GearTriadDetailsContent>
            Detailed workflow and execution steps for Option 3.
          </GearTriadDetailsContent>
          <GearTriadDetail>
            Option 3: Modular theme tokens with dark/light variants.
          </GearTriadDetail>
          <GearTriadDetail>
            Option 3: Adaptive aspect-ratio autoscale and responsive fitting.
          </GearTriadDetail>
          <GearTriadDetail>
            Option 3: Clean headless primitives with unstyled defaults.
          </GearTriadDetail>
          <GearTriadDetail>
            Option 3: Enterprise-ready slide presentation components.
          </GearTriadDetail>
        </GearTriadDetails>
      </template>
    </GearTriad>
    <template #controls>
      <div v-if="props.withDetails" class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Active State:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: step === 0 }]"
          @click="step = 0"
        >
          Triad
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: step === 1 }]"
          @click="step = 1"
        >
          Option 1
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: step === 2 }]"
          @click="step = 2"
        >
          Option 2
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: step === 3 }]"
          @click="step = 3"
        >
          Option 3
        </button>
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
