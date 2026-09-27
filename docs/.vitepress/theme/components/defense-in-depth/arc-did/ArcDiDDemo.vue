<script setup lang="ts">
import ArcDiD from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-did/ArcDiD.vue';
import ArcDiDLayer from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-did/ArcDiDLayer.vue';
import ArcDiDLayerPart from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-did/ArcDiDLayerPart.vue';
import ArcDiDLayerParts from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-did/ArcDiDLayerParts.vue';
import ArcDiDLayerSector from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-did/ArcDiDLayerSector.vue';
import ArcDiDLayerTitle from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-did/ArcDiDLayerTitle.vue';
import { ref } from 'vue';

import SlidevMockup from '../../common/SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    readonly theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);

const title = ref<string>('Defense-in-Depth Architecture');
const activeIndex = ref<number>(-1);
const activePart = ref<string | undefined>('DLP');
const color = ref<string>('#0ea5e9');
const animation = ref<boolean>(true);

const colors = [
  { label: 'Cyan (Default)', value: '#0ea5e9' },
  { label: 'Teal', value: '#14b8a6' },
  { label: 'Indigo', value: '#6366f1' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Amber', value: '#f59e0b' },
];
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <div class="w-full h-full flex flex-col justify-between">
      <h1
        v-if="title"
        class="text-2xl font-bold font-sans tracking-tight text-slate-900 dark:text-white"
      >
        {{ title }}
      </h1>

      <div class="w-full flex-1 flex items-center justify-center min-h-0">
        <ArcDiD
          :key="`${color}-${animation}`"
          :color="color"
          :active-index="activeIndex"
          :active-part="activePart"
          :animation="animation"
          @update:active-index="activeIndex = $event"
          @update:active-part="activePart = $event"
        >
        <ArcDiDLayer>
          <ArcDiDLayerTitle>
            Physical
            <br />
            controls
          </ArcDiDLayerTitle>
          <ArcDiDLayerParts>
            <ArcDiDLayerPart>Access to servers</ArcDiDLayerPart>
            <ArcDiDLayerPart>Infrastructure</ArcDiDLayerPart>
          </ArcDiDLayerParts>
        </ArcDiDLayer>

        <ArcDiDLayer>
          <ArcDiDLayerTitle>
            Administrative
            <br />
            controls
          </ArcDiDLayerTitle>
          <ArcDiDLayerParts>
            <ArcDiDLayerPart>
              Data-sharing
              <br />
              policy
            </ArcDiDLayerPart>
            <ArcDiDLayerPart>Approved destinations</ArcDiDLayerPart>
            <ArcDiDLayerPart>Staff procedures</ArcDiDLayerPart>
          </ArcDiDLayerParts>
        </ArcDiDLayer>

        <ArcDiDLayer>
          <ArcDiDLayerTitle>
            Technical
            <br />
            controls
          </ArcDiDLayerTitle>
          <ArcDiDLayerParts>
            <ArcDiDLayerPart :span="22">Authentication</ArcDiDLayerPart>
            <ArcDiDLayerSector :span="46" rotate="tangent">
              <ArcDiDLayerPart position="top">Access control</ArcDiDLayerPart>
              <ArcDiDLayerPart position="bottom">Encryption</ArcDiDLayerPart>
            </ArcDiDLayerSector>
            <ArcDiDLayerSector>
              <ArcDiDLayerPart position="top">DDM</ArcDiDLayerPart>
              <ArcDiDLayerPart position="bottom">DLP</ArcDiDLayerPart>
            </ArcDiDLayerSector>
            <ArcDiDLayerPart>Audit</ArcDiDLayerPart>
          </ArcDiDLayerParts>
        </ArcDiDLayer>
      </ArcDiD>
      </div>
    </div>

    <template #controls>
      <div class="flex items-center gap-4 flex-wrap text-xs">
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400">Layer:</span>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ '!border-sky-500 !bg-sky-500/20 text-sky-400': activeIndex === -1 }"
            @click="activeIndex = -1"
          >
            All
          </button>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ '!border-sky-500 !bg-sky-500/20 text-sky-400': activeIndex === 0 }"
            @click="activeIndex = 0"
          >
            Physical
          </button>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ '!border-sky-500 !bg-sky-500/20 text-sky-400': activeIndex === 1 }"
            @click="activeIndex = 1"
          >
            Admin
          </button>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ '!border-sky-500 !bg-sky-500/20 text-sky-400': activeIndex === 2 }"
            @click="activeIndex = 2"
          >
            Technical
          </button>
        </div>

        <div class="flex items-center gap-1.5">
          <span class="text-slate-400">Highlight Part:</span>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ '!border-sky-500 !bg-sky-500/20 text-sky-400': activePart === undefined }"
            @click="activePart = undefined"
          >
            None
          </button>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ '!border-sky-500 !bg-sky-500/20 text-sky-400': activePart === 'DLP' }"
            @click="activePart = 'DLP'"
          >
            DLP
          </button>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ '!border-sky-500 !bg-sky-500/20 text-sky-400': activePart === 'Encryption' }"
            @click="activePart = 'Encryption'"
          >
            Encryption
          </button>
        </div>

        <div class="flex items-center gap-1.5">
          <span class="text-slate-400">Color:</span>
          <select
            v-model="color"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 focus:outline-none"
          >
            <option
              v-for="c in colors"
              :key="c.value"
              :value="c.value"
            >
              {{ c.label }}
            </option>
          </select>
        </div>

        <div class="flex items-center gap-1.5">
          <label class="flex items-center gap-1 cursor-pointer text-slate-300">
            <input
              v-model="animation"
              type="checkbox"
              class="rounded bg-slate-800 border-slate-700 text-sky-500"
            />
            Animation
          </label>
        </div>

        <div class="flex items-center gap-1.5">
          <label for="did-title" class="text-slate-400">Slide Title:</label>
          <input
            id="did-title"
            v-model="title"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-200 text-xs w-48 focus:outline-none focus:border-sky-500"
            placeholder="Slide title"
          />
        </div>
      </div>
    </template>
  </SlidevMockup>
</template>
