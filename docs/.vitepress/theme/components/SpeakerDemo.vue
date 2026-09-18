<script setup lang="ts">
import Speaker from '@alphacifer/slidev-addon-theme/components/core/Speaker.vue';
import { computed, ref } from 'vue';

import SlidevMockup from './SlidevMockup.vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
  }>(),
  {
    theme: 'seriph',
  },
);

const mode = ref<'single' | 'team'>('single');
const author = ref('Alpha');
const teamInput = ref('Alpha, Beta');
const date = ref('2026-08-12');

const parsedTeam = computed(() => {
  return teamInput.value
    .split(',')
    .map((s) => s.trim())
    .filter(Boolean);
});
</script>

<template>
  <SlidevMockup :theme="props.theme">
    <Speaker
      v-if="mode === 'single'"
      :author="author"
      :date="date"
    />
    <Speaker
      v-else
      :team="parsedTeam"
      :date="date"
    />

    <template #controls>
      <div class="slidev-mockup__control-group">
        <span class="slidev-mockup__label">Mode:</span>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: mode === 'single' }]"
          @click="mode = 'single'"
        >
          Single Author
        </button>
        <button
          type="button"
          :class="['slidev-mockup__btn', { active: mode === 'team' }]"
          @click="mode = 'team'"
        >
          Team
        </button>
      </div>

      <div v-if="mode === 'single'" class="slidev-mockup__control-group">
        <label for="speaker-author-input" class="slidev-mockup__label">Author:</label>
        <input
          id="speaker-author-input"
          v-model="author"
          class="slidev-mockup__input"
          placeholder="Author name"
        />
      </div>

      <div v-else class="slidev-mockup__control-group">
        <label for="speaker-team-input" class="slidev-mockup__label">Team:</label>
        <input
          id="speaker-team-input"
          v-model="teamInput"
          class="slidev-mockup__input"
          placeholder="Alpha, Beta"
        />
      </div>

      <div class="slidev-mockup__control-group">
        <label for="speaker-date-input" class="slidev-mockup__label">Date:</label>
        <input
          id="speaker-date-input"
          v-model="date"
          type="date"
          class="slidev-mockup__input"
        />
      </div>
    </template>
  </SlidevMockup>
</template>
