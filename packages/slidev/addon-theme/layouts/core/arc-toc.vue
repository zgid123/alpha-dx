<script setup lang="ts">
import { useSlideContext } from '@slidev/client';
import type { CSSProperties } from 'vue';
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  ref,
  watch,
} from 'vue';

import {
  calculateFullTocArcPoints,
  calculateTocArticleOffsetPx,
  calculateTocCenterAlignmentOffsetPx,
  calculateTocConnectorEndX,
  calculateTocItemCount,
  calculateTocListGapRem,
  calculateTocMarkerPositions,
  calculateTocMiddleMarkerOffsetPx,
  calculateUniformTocArticleWidthPx,
  createTocArcPath,
  createTocConnectorPath,
} from '../../utils/tableOfContents';
import { useMergedUnoAttrs } from '../../utils/useMergedUnoAttrs';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps({
  maxItems: {
    type: [Number, String],
    default: 7,
  },
  maxDepth: {
    type: [Number, String],
    default: 1,
  },
  indexed: {
    type: Boolean,
    default: false,
  },
});

const { className, forwardedAttrs } = useMergedUnoAttrs(
  'alpha-arc-toc slidev-layout default arc-toc-layout h-full',
);

const markerColors = [
  '#ffad21',
  '#24b9aa',
  '#3188e4',
  '#59d875',
  '#f53270',
  '#8b5cf6',
  '#ef4444',
] as const;

interface ITocConnector {
  readonly color: string;
  readonly path: string;
}

const { $slidev, $renderContext } = useSlideContext();

const isPresenter = computed(() => {
  return $renderContext.value === 'presenter';
});

const visibleTocItems = computed(() => {
  return $slidev.nav.tocTree.slice(0, tocItemCount.value);
});

const rootElement = ref<HTMLElement>();
const arcPath = ref('');
const connectors = ref<readonly ITocConnector[]>([]);
const tocItemCount = computed(() => {
  return calculateTocItemCount({
    maximumCount: Number(props.maxItems),
    availableCount: $slidev.nav.tocTree.length,
  });
});
const markerPositions = computed(() => {
  return calculateTocMarkerPositions(tocItemCount.value);
});
const tocContentStyle = computed(() => {
  return {
    '--toc-list-gap': `${calculateTocListGapRem(tocItemCount.value)}rem`,
    left: `calc(40.4% + ${calculateTocMiddleMarkerOffsetPx(tocItemCount.value)}px)`,
  } satisfies CSSProperties;
});
const markerStyles = computed(() => {
  return markerPositions.value.map(
    ({ offsetFromMiddlePx, rightShiftPx, topPercent }, index) => {
      return {
        '--marker-color': markerColors[index],
        left: `calc(40.4% - ${offsetFromMiddlePx}px + ${rightShiftPx}px)`,
        top: `${topPercent}%`,
      } satisfies CSSProperties;
    },
  );
});

let connectorAnimationFrame: number | undefined;
let connectorMutationObserver: MutationObserver | undefined;
let connectorResizeObserver: ResizeObserver | undefined;

function isMiddleItem(index: number, count: number): boolean {
  const middleIndex = (count - 1) / 2;
  return Math.abs(index - middleIndex) < 1;
}

function updateConnectors(): void {
  const root = rootElement.value;

  if (!root || root.clientWidth === 0 || root.clientHeight === 0) {
    arcPath.value = '';
    connectors.value = [];
    return;
  }

  const markers = Array.from(
    root.querySelectorAll<HTMLElement>('.alpha-arc-toc__marker'),
  );
  const articles = Array.from(
    root.querySelectorAll<HTMLElement>(
      '.alpha-arc-toc__content .alpha-arc-toc__item > a',
    ),
  );
  const count = Math.min(markers.length, articles.length);

  articles.forEach((article) => {
    article.style.width = 'max-content';
  });
  const uniformArticleWidthPx = calculateUniformTocArticleWidthPx(
    articles.map((article) => {
      return article.scrollWidth;
    }),
  );
  articles.forEach((article) => {
    article.style.width = `${uniformArticleWidthPx}px`;
  });

  articles.forEach((article, index) => {
    const position = markerPositions.value[index];
    const item = article.closest<HTMLElement>('.alpha-arc-toc__item');

    if (item && position) {
      item.style.transform = `translateX(${calculateTocArticleOffsetPx(position)}px)`;
    }
  });

  const rootRect = root.getBoundingClientRect();
  const scaleX = rootRect.width / root.clientWidth;
  const scaleY = rootRect.height / root.clientHeight;
  const tocContent = root.querySelector<HTMLElement>('.alpha-arc-toc__content');

  arcPath.value = createTocArcPath(
    calculateFullTocArcPoints({
      width: root.clientWidth,
      height: root.clientHeight,
    }),
  );

  if (tocContent && count > 0) {
    tocContent.style.transform = 'none';

    const firstMiddleIndex = Math.floor((count - 1) / 2);
    const lastMiddleIndex = Math.ceil((count - 1) / 2);
    const middleIndices = [firstMiddleIndex, lastMiddleIndex];
    const markerCenterY =
      middleIndices.reduce((sum, index) => {
        const rect = markers[index]?.getBoundingClientRect();
        return sum + (rect ? rect.top + rect.height / 2 : 0);
      }, 0) / middleIndices.length;
    const articleCenterY =
      middleIndices.reduce((sum, index) => {
        const rect = articles[index]?.getBoundingClientRect();
        return sum + (rect ? rect.top + rect.height / 2 : 0);
      }, 0) / middleIndices.length;
    const offsetPx = calculateTocCenterAlignmentOffsetPx(
      markerCenterY,
      articleCenterY,
      scaleY,
    );

    tocContent.style.transform = `translateY(${offsetPx}px)`;
  }

  const nextConnectors: ITocConnector[] = [];

  for (let index = 0; index < count; index += 1) {
    const markerRect = markers[index]?.getBoundingClientRect();
    const articleRect = articles[index]?.getBoundingClientRect();

    if (!markerRect || !articleRect) {
      continue;
    }

    const start = {
      x: (markerRect.left + markerRect.width / 2 - rootRect.left) / scaleX,
      y: (markerRect.top + markerRect.height / 2 - rootRect.top) / scaleY,
    };
    const end = {
      x: calculateTocConnectorEndX({
        articleLeftX: (articleRect.left - rootRect.left) / scaleX,
      }),
      y: (articleRect.top + articleRect.height / 2 - rootRect.top) / scaleY,
    };

    nextConnectors.push({
      color: markerColors[index % markerColors.length] ?? markerColors[0],
      path: createTocConnectorPath(start, end, isMiddleItem(index, count)),
    });
  }

  connectors.value = nextConnectors;
}

function scheduleConnectorUpdate(): void {
  if (connectorAnimationFrame !== undefined) {
    cancelAnimationFrame(connectorAnimationFrame);
  }

  connectorAnimationFrame = requestAnimationFrame(() => {
    connectorAnimationFrame = undefined;
    updateConnectors();
  });
}

onMounted(async () => {
  await nextTick();
  scheduleConnectorUpdate();

  const root = rootElement.value;
  if (!root) {
    return;
  }

  connectorResizeObserver = new ResizeObserver(scheduleConnectorUpdate);
  connectorResizeObserver.observe(root);
  const tocContent = root.querySelector('.alpha-arc-toc__content');
  if (tocContent) {
    connectorMutationObserver = new MutationObserver(scheduleConnectorUpdate);
    connectorMutationObserver.observe(tocContent, {
      childList: true,
      subtree: true,
    });
  }
  window.addEventListener('resize', scheduleConnectorUpdate);
});

watch(tocItemCount, async () => {
  await nextTick();
  scheduleConnectorUpdate();
});

onBeforeUnmount(() => {
  connectorMutationObserver?.disconnect();
  connectorResizeObserver?.disconnect();
  window.removeEventListener('resize', scheduleConnectorUpdate);

  if (connectorAnimationFrame !== undefined) {
    cancelAnimationFrame(connectorAnimationFrame);
  }
});
</script>

<template>
  <div
    ref="rootElement"
    v-bind="forwardedAttrs()"
    :class="className()"
  >
    <header class="alpha-arc-toc__heading">
      <slot>
        <h1>Table of Contents</h1>
      </slot>
    </header>
    <svg
      class="alpha-arc-toc__curve"
      :viewBox="`0 0 ${rootElement?.clientWidth ?? 0} ${rootElement?.clientHeight ?? 0}`"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path :d="arcPath" />
    </svg>
    <div class="alpha-arc-toc__markers" aria-hidden="true">
      <span
        v-for="(markerStyle, index) in markerStyles"
        :key="index"
        class="alpha-arc-toc__marker"
        :style="markerStyle"
      ></span>
    </div>
    <svg
      class="alpha-arc-toc__connectors"
      :viewBox="`0 0 ${rootElement?.clientWidth ?? 0} ${rootElement?.clientHeight ?? 0}`"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        v-for="(connector, index) in connectors"
        :key="index"
        :d="connector.path"
        :stroke="connector.color"
      />
    </svg>
    <nav
      class="alpha-arc-toc__content"
      :style="tocContentStyle"
    >
      <ol class="alpha-arc-toc__list">
        <li
          v-for="(item, index) in visibleTocItems"
          :key="item.path"
          class="alpha-arc-toc__item"
          :class="{ 'alpha-arc-toc__item--active': item.active }"
          :style="{ '--toc-color': markerColors[index % markerColors.length] }"
        >
          <RouterLink
            :to="isPresenter ? `/presenter${item.path}` : item.path"
            @click="($event.target as HTMLElement)?.blur()"
          >
            <span
              v-if="props.indexed"
              class="alpha-arc-toc__item-index"
            >{{ index + 1 }}. </span>
            <span class="alpha-arc-toc__item-text">{{ item.title }}</span>
          </RouterLink>
        </li>
      </ol>
    </nav>
  </div>
</template>

<style scoped>
.alpha-arc-toc {
  --toc-orange: #ffad21;
  --toc-teal: #24b9aa;
  --toc-blue: #3188e4;
  --toc-green: #59d875;
  --toc-pink: #f53270;
  --toc-purple: #8b5cf6;
  --toc-red: #ef4444;
}

.alpha-arc-toc.slidev-layout {
  position: relative;
  overflow: hidden;
  height: 100%;
  padding: 0;
  font-family: ui-sans-serif, system-ui, sans-serif;
}

.alpha-arc-toc__heading {
  position: absolute;
  top: 50%;
  left: 10%;
  z-index: 2;
  width: 25%;
  transform: translateY(-50%);
}

.alpha-arc-toc__heading :deep(h1) {
  max-width: 8ch;
  margin: 0;
  font-family: inherit;
  font-size: 2.65rem;
  font-weight: 800;
  line-height: 1.04;
  letter-spacing: -0.045em;
  text-transform: capitalize;
}

/* Slide markdown often contains explanatory copy after its heading. This
   layout intentionally presents only the heading and the TOC labels. */
.alpha-arc-toc__heading :deep(:not(h1)) {
  display: none;
}

.alpha-arc-toc__curve {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.alpha-arc-toc__curve path {
  fill: none;
  stroke: #d7d7d5;
  stroke-width: 2;
  vector-effect: non-scaling-stroke;
}

.alpha-arc-toc__marker {
  position: absolute;
  z-index: 2;
  width: 1rem;
  height: 1rem;
  border: 0.23rem solid #f8f8f7;
  border-radius: 50%;
  background: var(--marker-color);
  box-shadow: 0 0 0 2px var(--marker-color);
  transform: translate(-50%, -50%);
}

.alpha-arc-toc__connectors {
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  overflow: visible;
  pointer-events: none;
}

.alpha-arc-toc__connectors path {
  fill: none;
  stroke-linecap: round;
  stroke-linejoin: round;
  stroke-width: 2.5;
  vector-effect: non-scaling-stroke;
}

.alpha-arc-toc__content {
  position: absolute;
  top: 9%;
  right: 3%;
  left: 41.2%;
  z-index: 2;
}

.alpha-arc-toc__list {
  display: flex;
  flex-direction: column;
  gap: var(--toc-list-gap);
  margin: 0;
  padding: 0;
  list-style: none;
}

.alpha-arc-toc__item {
  position: relative;
  margin: 0;
  padding: 0;
}

.alpha-arc-toc__item > a {
  position: relative;
  display: flex;
  min-width: 260px;
  min-height: 2.3rem;
  align-items: center;
  justify-content: flex-start;
  width: 260px;
  padding: 0.5rem 1.25rem;
  border: 0;
  border-radius: 999px;
  background: var(--toc-color);
  box-shadow: 0.45rem 0.65rem 0.85rem rgb(15 23 42 / 18%);
  color: white;
  font-family: inherit;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1.15;
  text-align: left;
  text-decoration: none;
  white-space: nowrap;
}

.alpha-arc-toc__item-index {
  margin-right: 0.35rem;
}

.alpha-arc-toc__item--active > a,
.alpha-arc-toc__item > a:hover {
  filter: brightness(1.06);
  transform: translateX(0.35rem);
}
</style>
