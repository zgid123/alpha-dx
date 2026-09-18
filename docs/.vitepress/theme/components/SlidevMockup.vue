<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';

const props = withDefaults(
  defineProps<{
    theme?: 'seriph' | 'academic';
    layoutClass?: string;
  }>(),
  {
    theme: 'seriph',
    layoutClass: 'default',
  },
);

const isDark = ref(false);
const isFullscreen = ref(false);

const stageRef = ref<HTMLElement | null>(null);
const stageWidth = ref(980);
const windowWidth = ref(1920);
const windowHeight = ref(1080);

// Default Slidev presentation canvas dimensions (980x551.25, 16:9)
const CANVAS_WIDTH = 980;
const CANVAS_HEIGHT = 551.25;

const embeddedScale = computed(() => {
  if (!stageWidth.value) return 1;
  return Math.min(stageWidth.value / CANVAS_WIDTH, 1);
});

const fullscreenScale = computed(() => {
  const maxW = Math.max(windowWidth.value - 48, 320);
  const maxH = Math.max(windowHeight.value - 96, 240);
  return Math.min(maxW / CANVAS_WIDTH, maxH / CANVAS_HEIGHT);
});

function toggleFullscreen() {
  isFullscreen.value = !isFullscreen.value;
  updateDimensions();
}

function toggleColorMode() {
  isDark.value = !isDark.value;
}

function handleKeydown(event: KeyboardEvent) {
  if (event.key === 'Escape' && isFullscreen.value) {
    isFullscreen.value = false;
  }
}

let resizeObserver: ResizeObserver | null = null;

function updateDimensions() {
  if (typeof window !== 'undefined') {
    windowWidth.value = window.innerWidth;
    windowHeight.value = window.innerHeight;
  }
  if (stageRef.value) {
    stageWidth.value = stageRef.value.clientWidth;
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    window.addEventListener('keydown', handleKeydown);

    if (stageRef.value && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        if (stageRef.value) {
          stageWidth.value = stageRef.value.clientWidth;
        }
      });
      resizeObserver.observe(stageRef.value);
    }
  }
});

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('resize', updateDimensions);
    window.removeEventListener('keydown', handleKeydown);
  }
  if (resizeObserver) {
    resizeObserver.disconnect();
  }
});

defineExpose({
  isDark,
  isFullscreen,
  toggleColorMode,
  toggleFullscreen,
});
</script>

<template>
  <div class="slidev-mockup">
    <!-- Mockup Header with Light/Dark Mode Toggle and Presentation Mode Trigger -->
    <div class="slidev-mockup__header">
      <div class="slidev-mockup__header-left">
        <span class="slidev-mockup__badge">
          {{ props.theme === 'academic' ? 'Slidev Academic Theme (16:9)' : 'Slidev Presentation (16:9)' }}
        </span>
        <span class="slidev-mockup__package">
          {{ props.theme === 'academic' ? '@alphacifer/slidev-academic-theme' : '@alphacifer/slidev-addon-theme' }}
        </span>
      </div>

      <div class="slidev-mockup__header-right">
        <!-- Addon Theme Light/Dark Mode Toggle -->
        <button
          v-if="props.theme !== 'academic'"
          type="button"
          class="slidev-mockup__theme-toggle"
          :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
          @click="toggleColorMode"
        >
          <span class="slidev-mockup__theme-icon">{{ isDark ? '🌙' : '☀️' }}</span>
          <span>{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
        </button>

        <button
          type="button"
          class="slidev-mockup__fullscreen-btn"
          title="Open Fullscreen Presentation Mode (Esc to exit)"
          @click="toggleFullscreen"
        >
          ⛶ Presentation Mode
        </button>
      </div>
    </div>

    <!-- Scaled Slide Stage -->
    <div
      ref="stageRef"
      class="slidev-mockup__stage"
      :style="{ height: `${CANVAS_HEIGHT * embeddedScale}px` }"
    >
      <div
        :class="[
          'slidev-page',
          props.theme === 'academic'
            ? 'slidev-theme-academic'
            : ['slidev-theme-seriph', isDark ? 'dark' : 'light'],
        ]"
        :style="{
          width: `${CANVAS_WIDTH}px`,
          height: `${CANVAS_HEIGHT}px`,
          transform: `scale(${embeddedScale})`,
          transformOrigin: 'top left',
        }"
      >
        <div
          :class="[
            'slidev-layout',
            props.theme === 'academic' ? 'alpha-academic-default' : props.layoutClass,
          ]"
        >
          <slot :is-dark="isDark" :is-fullscreen="false" />
        </div>
      </div>
    </div>

    <!-- Optional Interactive Controls Bar -->
    <div v-if="$slots.controls" class="slidev-mockup__controls">
      <slot name="controls" :is-dark="isDark" />
    </div>

    <!-- Fullscreen Presentation Popup Modal -->
    <Teleport to="body">
      <div
        v-if="isFullscreen"
        class="slidev-popup"
        @click.self="toggleFullscreen"
      >
        <div class="slidev-popup__bar">
          <div class="slidev-popup__title">
            <span>{{ props.theme === 'academic' ? 'Slidev Academic Presentation Mode' : 'Slidev Presentation Mode' }}</span>
            <span class="slidev-popup__hint">Press ESC or click outside to exit</span>
          </div>

          <div class="slidev-popup__actions">
            <!-- Fullscreen Light/Dark Toggle for Addon -->
            <button
              v-if="props.theme !== 'academic'"
              type="button"
              class="slidev-mockup__theme-toggle"
              :title="isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
              @click="toggleColorMode"
            >
              <span class="slidev-mockup__theme-icon">{{ isDark ? '🌙' : '☀️' }}</span>
              <span>{{ isDark ? 'Dark Mode' : 'Light Mode' }}</span>
            </button>

            <button
              type="button"
              class="slidev-popup__close-btn"
              @click="toggleFullscreen"
            >
              ✕ Exit
            </button>
          </div>
        </div>

        <div class="slidev-popup__screen">
          <div
            :class="[
              'slidev-page',
              props.theme === 'academic'
                ? 'slidev-theme-academic'
                : ['slidev-theme-seriph', isDark ? 'dark' : 'light'],
            ]"
            :style="{
              width: `${CANVAS_WIDTH}px`,
              height: `${CANVAS_HEIGHT}px`,
              transform: `scale(${fullscreenScale})`,
              transformOrigin: 'center center',
            }"
          >
            <div
              :class="[
                'slidev-layout',
                props.theme === 'academic' ? 'alpha-academic-default' : props.layoutClass,
              ]"
            >
              <slot :is-dark="isDark" :is-fullscreen="true" />
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>
