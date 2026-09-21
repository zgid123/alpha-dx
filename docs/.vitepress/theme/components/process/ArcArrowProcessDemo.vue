<script setup lang="ts">
import ArcArrowProcess from '@alphacifer/slidev-addon-theme/components/process/arc-arrow-process/ArcArrowProcess.vue';
import ArcArrowProcessArrow from '@alphacifer/slidev-addon-theme/components/process/arc-arrow-process/ArcArrowProcessArrow.vue';
import ArcArrowProcessCallout from '@alphacifer/slidev-addon-theme/components/process/arc-arrow-process/ArcArrowProcessCallout.vue';
import ArcArrowProcessContent from '@alphacifer/slidev-addon-theme/components/process/arc-arrow-process/ArcArrowProcessContent.vue';
import ArcArrowProcessHeading from '@alphacifer/slidev-addon-theme/components/process/arc-arrow-process/ArcArrowProcessHeading.vue';
import { ref } from 'vue';

import SlidevMockup from '../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);

const mode = ref<'diagram' | 'single'>('diagram');
const count = ref<2 | 3 | 4>(3);
const animation = ref(true);
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <!-- Standalone single chevron arrow -->
    <ArcArrowProcessArrow
      v-if="mode === 'single'"
      :width="380"
      :height="215"
      color="#6fa3b5"
      gradient-end="#8cb8c8"
    />

      <!-- 3-stage process flow -->
      <ArcArrowProcess
        v-else-if="count === 3"
        :count="3"
        :animation="animation"
      >
        <ArcArrowProcessCallout>
          <ArcArrowProcessHeading>Discovery & Plan</ArcArrowProcessHeading>
          <ArcArrowProcessContent>
            Analyze domain architecture and specify component contracts.
          </ArcArrowProcessContent>
        </ArcArrowProcessCallout>
        <ArcArrowProcessCallout>
          <ArcArrowProcessHeading>Implementation</ArcArrowProcessHeading>
          <ArcArrowProcessContent>
            Construct SVG geometry with interlocking notches and clean code.
          </ArcArrowProcessContent>
        </ArcArrowProcessCallout>
        <ArcArrowProcessCallout>
          <ArcArrowProcessHeading>Verification & Ship</ArcArrowProcessHeading>
          <ArcArrowProcessContent>
            Execute comprehensive Vitest suites and build production presentations.
          </ArcArrowProcessContent>
        </ArcArrowProcessCallout>
      </ArcArrowProcess>

      <!-- 2-stage process flow -->
      <ArcArrowProcess
        v-else-if="count === 2"
        :count="2"
        :animation="animation"
      >
        <ArcArrowProcessCallout>
          <ArcArrowProcessHeading>Discovery & Strategy</ArcArrowProcessHeading>
          <ArcArrowProcessContent>
            Analyze system architecture and formulate requirements.
          </ArcArrowProcessContent>
        </ArcArrowProcessCallout>
        <ArcArrowProcessCallout>
          <ArcArrowProcessHeading>Implementation & Ship</ArcArrowProcessHeading>
          <ArcArrowProcessContent>
            Execute precision implementations with strict test verification.
          </ArcArrowProcessContent>
        </ArcArrowProcessCallout>
      </ArcArrowProcess>

      <!-- 4-stage process flow -->
      <ArcArrowProcess
        v-else
        :count="4"
        :animation="animation"
      >
        <ArcArrowProcessCallout>
          <ArcArrowProcessHeading>Stage 01</ArcArrowProcessHeading>
          <ArcArrowProcessContent>Analyze requirements and specifications.</ArcArrowProcessContent>
        </ArcArrowProcessCallout>
        <ArcArrowProcessCallout>
          <ArcArrowProcessHeading>Stage 02</ArcArrowProcessHeading>
          <ArcArrowProcessContent>Formulate architectural plans and boundaries.</ArcArrowProcessContent>
        </ArcArrowProcessCallout>
        <ArcArrowProcessCallout>
          <ArcArrowProcessHeading>Stage 03</ArcArrowProcessHeading>
          <ArcArrowProcessContent>Implement components and type systems.</ArcArrowProcessContent>
        </ArcArrowProcessCallout>
        <ArcArrowProcessCallout>
          <ArcArrowProcessHeading>Stage 04</ArcArrowProcessHeading>
          <ArcArrowProcessContent>Verify test suites and ship production artifacts.</ArcArrowProcessContent>
        </ArcArrowProcessCallout>
      </ArcArrowProcess>

    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Display:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: mode === 'diagram' }]"
          @click="mode = 'diagram'"
        >
          Process Diagram
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: mode === 'single' }]"
          @click="mode = 'single'"
        >
          Single Arrow
        </button>
      </div>

      <div v-if="mode === 'diagram'" class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Steps:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: count === 2 }]"
          @click="count = 2"
        >
          2 Steps
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: count === 3 }]"
          @click="count = 3"
        >
          3 Steps
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: count === 4 }]"
          @click="count = 4"
        >
          4 Steps
        </button>
      </div>

      <div v-if="mode === 'diagram'" class="slidev-mockup__control-group">
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
