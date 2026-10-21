<script setup lang="ts">
import ArcDefenseInDepth from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-defense-in-depth/ArcDefenseInDepth.vue';
import ArcDefenseInDepthLayer from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-defense-in-depth/ArcDefenseInDepthLayer.vue';
import ArcDefenseInDepthLayerPart from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-defense-in-depth/ArcDefenseInDepthLayerPart.vue';
import ArcDefenseInDepthLayerSector from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-defense-in-depth/ArcDefenseInDepthLayerSector.vue';
import ArcDefenseInDepthLayerHeading from '@alphacifer/slidev-addon-theme/components/defense-in-depth/arc-defense-in-depth/ArcDefenseInDepthLayerHeading.vue';
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
const color = ref<string | undefined>(undefined);
const animation = ref<boolean>(true);

const colors: ReadonlyArray<{ label: string; value: string | undefined }> = [
  { label: 'Default', value: undefined },
  { label: 'Cyan', value: '#0ea5e9' },
  { label: 'Teal', value: '#14b8a6' },
  { label: 'Indigo', value: '#6366f1' },
  { label: 'Emerald', value: '#10b981' },
  { label: 'Amber', value: '#f59e0b' },
];
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <div class="w-full h-full flex flex-col justify-between">
      <h1 v-if="title">
        {{ title }}
      </h1>

      <div class="w-full flex-1 flex items-center justify-center min-h-0">
        <ArcDefenseInDepth
          :key="`${color}-${animation}`"
          :color="color"
          :active-index="activeIndex"
          :active-part="activePart"
          :animation="animation"
          @update:active-index="activeIndex = $event"
          @update:active-part="activePart = $event"
        >
          <ArcDefenseInDepthLayer>
            <ArcDefenseInDepthLayerHeading>
              Physical
              <br>
              controls
            </ArcDefenseInDepthLayerHeading>

            <ArcDefenseInDepthLayerPart
              >Access to servers</ArcDefenseInDepthLayerPart
            >
            <ArcDefenseInDepthLayerPart
              >Infrastructure</ArcDefenseInDepthLayerPart
            >
          </ArcDefenseInDepthLayer>

          <ArcDefenseInDepthLayer>
            <ArcDefenseInDepthLayerHeading>
              Administrative
              <br>
              controls
            </ArcDefenseInDepthLayerHeading>

            <ArcDefenseInDepthLayerPart>
              Data-sharing
              <br>
              policy
            </ArcDefenseInDepthLayerPart>
            <ArcDefenseInDepthLayerPart
              >Approved destinations</ArcDefenseInDepthLayerPart
            >
            <ArcDefenseInDepthLayerPart
              >Staff procedures</ArcDefenseInDepthLayerPart
            >
          </ArcDefenseInDepthLayer>

          <ArcDefenseInDepthLayer>
            <ArcDefenseInDepthLayerHeading>
              Technical
              <br>
              controls
            </ArcDefenseInDepthLayerHeading>

            <ArcDefenseInDepthLayerPart :span="22"
              >Authentication</ArcDefenseInDepthLayerPart
            >
            <ArcDefenseInDepthLayerSector :span="46" rotate="tangent">
              <ArcDefenseInDepthLayerPart position="top"
                >Access control</ArcDefenseInDepthLayerPart
              >
              <ArcDefenseInDepthLayerPart position="bottom"
                >Encryption</ArcDefenseInDepthLayerPart
              >
            </ArcDefenseInDepthLayerSector>
            <ArcDefenseInDepthLayerSector>
              <ArcDefenseInDepthLayerPart position="top"
                >DDM</ArcDefenseInDepthLayerPart
              >
              <ArcDefenseInDepthLayerPart position="bottom"
                >DLP</ArcDefenseInDepthLayerPart
              >
            </ArcDefenseInDepthLayerSector>
            <ArcDefenseInDepthLayerPart>Audit</ArcDefenseInDepthLayerPart>
          </ArcDefenseInDepthLayer>
        </ArcDefenseInDepth>
      </div>
    </div>

    <template #controls>
      <div class="flex items-center gap-4 flex-wrap text-xs">
        <div class="flex items-center gap-1.5">
          <span class="text-slate-400">Layer:</span>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ 'border-sky-500! bg-sky-500/20! text-sky-400': activeIndex === -1 }"
            @click="activeIndex = -1"
          >
            All
          </button>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ 'border-sky-500! bg-sky-500/20! text-sky-400': activeIndex === 0 }"
            @click="activeIndex = 0"
          >
            Physical
          </button>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ 'border-sky-500! bg-sky-500/20! text-sky-400': activeIndex === 1 }"
            @click="activeIndex = 1"
          >
            Admin
          </button>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ 'border-sky-500! bg-sky-500/20! text-sky-400': activeIndex === 2 }"
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
            :class="{ 'border-sky-500! bg-sky-500/20! text-sky-400': activePart === undefined }"
            @click="activePart = undefined"
          >
            None
          </button>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ 'border-sky-500! bg-sky-500/20! text-sky-400': activePart === 'DLP' }"
            @click="activePart = 'DLP'"
          >
            DLP
          </button>
          <button
            type="button"
            class="px-2 py-0.5 rounded border border-slate-700 bg-slate-800 text-slate-300 hover:text-white"
            :class="{ 'border-sky-500! bg-sky-500/20! text-sky-400': activePart === 'Encryption' }"
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
            <option v-for="c in colors" :key="c.value" :value="c.value">
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
            >
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
          >
        </div>
      </div>
    </template>
  </SlidevMockup>
</template>
