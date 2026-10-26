import {
  type ComputedRef,
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  type Ref,
  ref,
  watch,
} from 'vue';

export const DEFAULT_ARC_COMPARISON_HUB_TITLE_FONT_SIZE = 18;
export const MIN_ARC_COMPARISON_HUB_TITLE_FONT_SIZE = 8;
export const ARC_COMPARISON_HUB_OUTER_PADDING_PX = 8;
export const ARC_COMPARISON_HUB_INNER_CLEARANCE_PX = 8;

export interface ICalculateArcComparisonHubAvailableWidthOptions {
  readonly hubRadius: number;
  readonly vsRadius: number;
  readonly innerClearancePx?: number;
  readonly outerPaddingPx?: number;
}

export interface ICalculateArcComparisonHubTitleFontSizeOptions {
  readonly availableWidth: number;
  readonly contentWidth: number;
  readonly inCenter: boolean;
  readonly baseFontSize?: number;
  readonly minFontSize?: number;
}

export interface IResolveSharedArcComparisonHubTitleFontSizeOptions {
  readonly leftFontSize: number;
  readonly rightFontSize: number;
  readonly inCenter: boolean;
  readonly baseFontSize?: number;
  readonly minFontSize?: number;
}

export interface IMeasureArcComparisonHubTitleFontSizeOptions {
  readonly element: HTMLElement | null;
  readonly availableWidth: number;
  readonly inCenter: boolean;
  readonly baseFontSize?: number;
  readonly minFontSize?: number;
}

export interface IUseArcComparisonHubTitleFontSizeOptions {
  readonly titleTextRef: Ref<HTMLElement | null>;
  readonly availableWidth: ComputedRef<number>;
  readonly inCenter: ComputedRef<boolean>;
  readonly sharedFontSize?: ComputedRef<number>;
  readonly onFontSizeChange?: (fontSize: number) => void;
  readonly baseFontSize?: number;
  readonly minFontSize?: number;
}

export interface IUseArcComparisonHubTitleFontSizeResult {
  readonly fontSize: ComputedRef<number>;
  readonly updateFontSize: () => void;
}

export function calculateArcComparisonHubAvailableWidth({
  hubRadius,
  vsRadius,
  innerClearancePx = ARC_COMPARISON_HUB_INNER_CLEARANCE_PX,
  outerPaddingPx = ARC_COMPARISON_HUB_OUTER_PADDING_PX,
}: ICalculateArcComparisonHubAvailableWidthOptions): number {
  const innerPaddingPx = vsRadius + innerClearancePx;

  return Math.max(0, hubRadius - innerPaddingPx - outerPaddingPx);
}

export function calculateArcComparisonHubTitleFontSize({
  availableWidth,
  contentWidth,
  inCenter,
  baseFontSize = DEFAULT_ARC_COMPARISON_HUB_TITLE_FONT_SIZE,
  minFontSize = MIN_ARC_COMPARISON_HUB_TITLE_FONT_SIZE,
}: ICalculateArcComparisonHubTitleFontSizeOptions): number {
  if (!inCenter || availableWidth <= 0 || contentWidth <= 0) {
    return baseFontSize;
  }

  if (contentWidth <= availableWidth) {
    return baseFontSize;
  }

  const scaledFontSize =
    Math.floor(((baseFontSize * availableWidth) / contentWidth) * 10) / 10;

  return Math.max(minFontSize, Math.min(baseFontSize, scaledFontSize));
}

export function resolveSharedArcComparisonHubTitleFontSize({
  leftFontSize,
  rightFontSize,
  inCenter,
  baseFontSize = DEFAULT_ARC_COMPARISON_HUB_TITLE_FONT_SIZE,
  minFontSize = MIN_ARC_COMPARISON_HUB_TITLE_FONT_SIZE,
}: IResolveSharedArcComparisonHubTitleFontSizeOptions): number {
  if (!inCenter) {
    return baseFontSize;
  }

  return Math.max(
    minFontSize,
    Math.min(baseFontSize, leftFontSize, rightFontSize),
  );
}

export function measureArcComparisonHubTitleFontSize({
  element,
  availableWidth,
  inCenter,
  baseFontSize = DEFAULT_ARC_COMPARISON_HUB_TITLE_FONT_SIZE,
  minFontSize = MIN_ARC_COMPARISON_HUB_TITLE_FONT_SIZE,
}: IMeasureArcComparisonHubTitleFontSizeOptions): number {
  if (!inCenter || !element || availableWidth <= 0) {
    return baseFontSize;
  }

  const prevDisplay = element.style.display;
  const prevWidth = element.style.width;
  const prevMaxWidth = element.style.maxWidth;
  const prevMinWidth = element.style.minWidth;
  const prevTextAlign = element.style.textAlign;
  const prevFontSize = element.style.fontSize;

  try {
    element.style.display = 'block';
    element.style.width = `${availableWidth}px`;
    element.style.maxWidth = `${availableWidth}px`;
    element.style.minWidth = '0px';
    element.style.textAlign = 'left';
    element.style.fontSize = `${baseFontSize}px`;

    const contentWidth = element.scrollWidth;

    if (contentWidth <= 0) {
      return baseFontSize;
    }

    let nextFontSize = calculateArcComparisonHubTitleFontSize({
      availableWidth,
      contentWidth,
      inCenter: true,
      baseFontSize,
      minFontSize,
    });

    if (nextFontSize < baseFontSize) {
      element.style.fontSize = `${nextFontSize}px`;
      const fittedWidth = element.scrollWidth;

      if (fittedWidth > availableWidth) {
        nextFontSize = calculateArcComparisonHubTitleFontSize({
          availableWidth,
          contentWidth: fittedWidth,
          inCenter: true,
          baseFontSize: nextFontSize,
          minFontSize,
        });
      }
    }

    return nextFontSize;
  } finally {
    element.style.display = prevDisplay;
    element.style.width = prevWidth;
    element.style.maxWidth = prevMaxWidth;
    element.style.minWidth = prevMinWidth;
    element.style.textAlign = prevTextAlign;
    element.style.fontSize = prevFontSize;
  }
}

export function useArcComparisonHubTitleFontSize({
  titleTextRef,
  availableWidth,
  inCenter,
  sharedFontSize,
  onFontSizeChange,
  baseFontSize = DEFAULT_ARC_COMPARISON_HUB_TITLE_FONT_SIZE,
  minFontSize = MIN_ARC_COMPARISON_HUB_TITLE_FONT_SIZE,
}: IUseArcComparisonHubTitleFontSizeOptions): IUseArcComparisonHubTitleFontSizeResult {
  const fittedFontSize = ref<number>(baseFontSize);
  let isMeasuring = false;
  let resizeObserver: ResizeObserver | null = null;
  let mutationObserver: MutationObserver | null = null;

  const reportFontSize = (size: number): void => {
    if (Math.abs(size - fittedFontSize.value) > 0.05) {
      fittedFontSize.value = size;
    }

    onFontSizeChange?.(fittedFontSize.value);
  };

  const updateFontSize = (): void => {
    if (isMeasuring || typeof window === 'undefined') {
      return;
    }

    if (!inCenter.value) {
      reportFontSize(baseFontSize);

      return;
    }

    const element = titleTextRef.value;

    if (!element) {
      return;
    }

    isMeasuring = true;

    try {
      const measuredSize = measureArcComparisonHubTitleFontSize({
        element,
        availableWidth: availableWidth.value,
        inCenter: inCenter.value,
        baseFontSize,
        minFontSize,
      });

      reportFontSize(measuredSize);
    } finally {
      isMeasuring = false;
    }
  };

  watch(
    [inCenter, availableWidth],
    () => {
      updateFontSize();
      void nextTick(() => {
        updateFontSize();
      });
    },
    {
      flush: 'post',
    },
  );

  onMounted(() => {
    updateFontSize();

    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        updateFontSize();
      });
    }

    if (typeof document !== 'undefined' && 'fonts' in document) {
      void document.fonts?.ready?.then(() => {
        updateFontSize();
      });
    }

    const element = titleTextRef.value;

    if (!element) {
      return;
    }

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        updateFontSize();
      });
      resizeObserver.observe(element);

      if (element.parentElement) {
        resizeObserver.observe(element.parentElement);
      }
    }

    if (typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(() => {
        updateFontSize();
      });
      mutationObserver.observe(element, {
        childList: true,
        characterData: true,
        subtree: true,
      });
    }
  });

  onUpdated(() => {
    updateFontSize();
  });

  onBeforeUnmount(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
      resizeObserver = null;
    }

    if (mutationObserver) {
      mutationObserver.disconnect();
      mutationObserver = null;
    }

    onFontSizeChange?.(baseFontSize);
  });

  const fontSize = computed((): number => {
    if (!inCenter.value) {
      return baseFontSize;
    }

    if (sharedFontSize !== undefined) {
      return Math.min(fittedFontSize.value, sharedFontSize.value);
    }

    return fittedFontSize.value;
  });

  return {
    fontSize,
    updateFontSize,
  };
}
