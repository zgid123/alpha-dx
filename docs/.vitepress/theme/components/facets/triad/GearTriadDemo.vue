<script setup lang="ts">
import GearTriad from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriad.vue';
import GearTriadCallout from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadCallout.vue';
import GearTriadContent from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadContent.vue';
import GearTriadContents from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadContents.vue';
import GearTriadDescription from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadDescription.vue';
import GearTriadHeading from '@alphacifer/slidev-addon-theme/components/facets/triad/gear-triad/GearTriadHeading.vue';
import { ref } from 'vue';

import SlidevMockup from '../../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
    withContents?: boolean;
  }>(),
  {
    theme: 'seriph',
    withContents: false,
  },
);

const title = ref('');
const subtitle = ref('');
const animation = ref(true);
const step = ref(0);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <template #default="{ isFullscreen }">
      <div class="gear-triad-demo-container">
        <GearTriad
          v-model:step="step"
          :title="title || undefined"
          :subtitle="subtitle || undefined"
          :animation="animation"
        >
          <GearTriadCallout>
            <GearTriadHeading>Option 1</GearTriadHeading>
            <GearTriadDescription>
              Formulate testable research questions and theoretical models.
            </GearTriadDescription>
          </GearTriadCallout>
          <GearTriadCallout>
            <GearTriadHeading>Option 2</GearTriadHeading>
            <GearTriadDescription>
              Execute controlled investigations with automated measurement pipelines.
            </GearTriadDescription>
          </GearTriadCallout>
          <GearTriadCallout>
            <GearTriadHeading>Option 3</GearTriadHeading>
            <GearTriadDescription>
              Subject findings to reproducible peer reviews and empirical analysis.
            </GearTriadDescription>
          </GearTriadCallout>
          <template v-if="props.withContents">
            <GearTriadContents :option="1">
              <GearTriadContent>
                Option 1: Modern high-performance reactivity layer.
              </GearTriadContent>
              <GearTriadContent>
                Option 1: Seamless automated slide deck layout shifts.
              </GearTriadContent>
              <GearTriadContent>
                Option 1: Declarative SVG geometry computation.
              </GearTriadContent>
              <GearTriadContent>
                Option 1: Synchronized rotation and translation.
              </GearTriadContent>
            </GearTriadContents>
            <GearTriadContents :option="2">
              <GearTriadContent>
                Option 2: Robust type-safe props and slots contract.
              </GearTriadContent>
              <GearTriadContent>
                Option 2: Cross-browser hardware-accelerated animations.
              </GearTriadContent>
              <GearTriadContent>
                Option 2: Layered Vitest and Biome verification safety net.
              </GearTriadContent>
              <GearTriadContent>
                Option 2: Zero-config Slidev click sequence integration.
              </GearTriadContent>
            </GearTriadContents>
            <GearTriadContents :option="3">
              <GearTriadContent>
                Option 3: Modular theme tokens with dark/light variants.
              </GearTriadContent>
              <GearTriadContent>
                Option 3: Adaptive aspect-ratio autoscale and responsive fitting.
              </GearTriadContent>
              <GearTriadContent>
                Option 3: Clean headless primitives with unstyled defaults.
              </GearTriadContent>
              <GearTriadContent>
                Option 3: Enterprise-ready slide presentation components.
              </GearTriadContent>
            </GearTriadContents>
          </template>
        </GearTriad>
      </div>
    </template>
    <template #controls>
      <div v-if="props.withContents" class="slidev-mockup__control-group">
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
        <label for="gear-title" class="slidev-mockup__label">Title:</label>
        <input
          id="gear-title"
          v-model="title"
          placeholder="Optional Title"
          class="slidev-mockup__input"
        />
      </div>
      <div class="slidev-mockup__control-group">
        <label for="gear-subtitle" class="slidev-mockup__label">Subtitle:</label>
        <input
          id="gear-subtitle"
          v-model="subtitle"
          placeholder="Optional Subtitle"
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
.gear-triad-demo-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
