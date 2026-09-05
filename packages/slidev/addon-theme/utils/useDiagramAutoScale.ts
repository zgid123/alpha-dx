import {
  type ComputedRef,
  computed,
  onMounted,
  onUnmounted,
  type Ref,
  ref,
} from 'vue';

export interface IUseDiagramAutoScaleOptions {
  readonly rootRef: Ref<HTMLElement | null>;
  readonly baseWidth: number;
  readonly baseHeight: number;
  readonly scale?: Ref<number | undefined> | (() => number | undefined);
  readonly autoScale?: Ref<boolean | undefined> | (() => boolean | undefined);
  readonly maxScale?: Ref<number | undefined> | (() => number | undefined);
  readonly height?:
    | Ref<number | string | undefined>
    | (() => number | string | undefined);
  readonly pagyClearance?: number;
}

export interface IUseDiagramAutoScaleResult {
  readonly resolvedScale: ComputedRef<number>;
  readonly autoScaleValue: Ref<number>;
  readonly containerHeight: Ref<number>;
  readonly updateScale: () => void;
}

function resolveValue<T>(val: Ref<T> | (() => T) | undefined, fallback: T): T {
  if (typeof val === 'function') {
    const res = (val as () => T)();

    return res !== undefined ? res : fallback;
  }

  if (val !== undefined && val.value !== undefined) {
    return val.value;
  }

  return fallback;
}

/**
 * Automatically computes a scale factor (via CSS transform: scale)
 * so that diagram components (ArrowTriad, QuadHub, ArcArrowProcess, etc.)
 * fit comfortably inside the available slide canvas without clipping or overlaying pagination.
 */
export function useDiagramAutoScale(
  options: IUseDiagramAutoScaleOptions,
): IUseDiagramAutoScaleResult {
  const { rootRef, baseWidth, baseHeight, pagyClearance = 32 } = options;

  const autoScaleValue = ref<number>(1);
  const containerHeight = ref<number>(0);

  const updateScale = () => {
    if (typeof window === 'undefined' || !rootRef.value) {
      return;
    }

    const el = rootRef.value;
    const parent = el.parentElement;

    if (!parent) {
      return;
    }

    // 1. Locate slide container if inside Slidev
    const pageEl = el.closest<HTMLElement>(
      '.slidev-page, [data-slidev-page], .slidev-slide-content',
    );
    const layoutEl = el.closest<HTMLElement>('.slidev-layout');
    const slideEl = pageEl || layoutEl;

    // Immediate parent padding
    const parentStyle = window.getComputedStyle(parent);
    const padLeft = Number.parseFloat(parentStyle.paddingLeft) || 0;
    const padRight = Number.parseFloat(parentStyle.paddingRight) || 0;
    const padTop = Number.parseFloat(parentStyle.paddingTop) || 0;
    const padBottom = Number.parseFloat(parentStyle.paddingBottom) || 0;

    // Available width inside parent or slide layout
    let availW = 0;

    if (parent.clientWidth > 0) {
      availW = parent.clientWidth - padLeft - padRight;
    } else if (slideEl && slideEl.clientWidth > 0) {
      const slideStyle = window.getComputedStyle(slideEl);
      const sPadLeft = Number.parseFloat(slideStyle.paddingLeft) || 0;
      const sPadRight = Number.parseFloat(slideStyle.paddingRight) || 0;
      availW = slideEl.clientWidth - sPadLeft - sPadRight;
    } else if (el.clientWidth > 0) {
      availW = el.clientWidth;
    }

    // Available height inside parent or slide layout
    let availH = 0;
    const explicitHeight = resolveValue(options.height, undefined);

    if (typeof explicitHeight === 'number') {
      availH = explicitHeight;
    } else if (
      typeof explicitHeight === 'string' &&
      explicitHeight.endsWith('px')
    ) {
      availH = Number.parseFloat(explicitHeight);
    }

    if (!availH) {
      // Calculate sibling heights inside parent (e.g. title, headers)
      let siblingsH = 0;

      for (let i = 0; i < parent.children.length; i++) {
        const child = parent.children[i];

        if (child && child !== el && child instanceof HTMLElement) {
          siblingsH += child.offsetHeight;
          const cs = window.getComputedStyle(child);
          siblingsH +=
            (Number.parseFloat(cs.marginTop) || 0) +
            (Number.parseFloat(cs.marginBottom) || 0);
        }
      }

      // Check if pagination element is present and visible
      const pagyEl =
        pageEl?.querySelector<HTMLElement>(
          '.alpha-academic-pagy, .slidev-page-nav, [aria-label="Slide pagination"]',
        ) ||
        slideEl?.querySelector<HTMLElement>(
          '.alpha-academic-pagy, .slidev-page-nav, [aria-label="Slide pagination"]',
        ) ||
        (typeof document !== 'undefined'
          ? document.querySelector<HTMLElement>(
              '.alpha-academic-pagy, .slidev-page-nav',
            )
          : null);
      const isPagyVisible =
        pagyEl && window.getComputedStyle(pagyEl).display !== 'none';
      const clearance = isPagyVisible ? pagyClearance : 16;

      if (parent.clientHeight > 0 && parent !== slideEl) {
        availH = Math.max(
          0,
          parent.clientHeight - padTop - padBottom - siblingsH - clearance,
        );
      }

      if (availH <= 0 && slideEl && slideEl.clientHeight > 0) {
        const slideStyle = window.getComputedStyle(slideEl);
        const sPadTop = Number.parseFloat(slideStyle.paddingTop) || 0;
        const sPadBottom = Number.parseFloat(slideStyle.paddingBottom) || 0;

        let slideSiblingsH = siblingsH;

        if (parent !== slideEl) {
          for (let i = 0; i < slideEl.children.length; i++) {
            const child = slideEl.children[i];

            if (
              child &&
              child !== parent &&
              !child.contains(parent) &&
              child instanceof HTMLElement
            ) {
              slideSiblingsH += child.offsetHeight;
              const cs = window.getComputedStyle(child);
              slideSiblingsH +=
                (Number.parseFloat(cs.marginTop) || 0) +
                (Number.parseFloat(cs.marginBottom) || 0);
            }
          }
        }

        availH = Math.max(
          0,
          slideEl.clientHeight -
            sPadTop -
            sPadBottom -
            slideSiblingsH -
            clearance,
        );
      }
    }

    if (availH > 0 && Math.abs(availH - containerHeight.value) > 1) {
      containerHeight.value = Math.round(availH);
    }

    if (availW <= 0) {
      availW = baseWidth;
    }

    let targetScale = 1;

    if (availW > 0 && availH > 0) {
      const scaleX = availW / baseWidth;
      const scaleY = availH / baseHeight;
      targetScale = Math.min(scaleX, scaleY);
    } else if (availW > 0) {
      targetScale = availW / baseWidth;
    }

    const maxScaleProp = resolveValue(options.maxScale, undefined);

    if (maxScaleProp !== undefined) {
      targetScale = Math.min(targetScale, maxScaleProp);
    }

    targetScale = Math.round(targetScale * 1000) / 1000;

    if (Math.abs(targetScale - autoScaleValue.value) > 0.005) {
      autoScaleValue.value = targetScale;
    }
  };

  let observer: ResizeObserver | null = null;

  onMounted(() => {
    if (typeof window === 'undefined' || !rootRef.value) {
      return;
    }

    updateScale();
    requestAnimationFrame(() => {
      updateScale();
    });

    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(() => {
        updateScale();
      });

      observer.observe(rootRef.value);

      if (rootRef.value.parentElement) {
        observer.observe(rootRef.value.parentElement);
      }

      const pageEl = rootRef.value.closest<HTMLElement>(
        '.slidev-page, [data-slidev-page], .slidev-slide-content',
      );
      const layoutEl = rootRef.value.closest<HTMLElement>('.slidev-layout');
      const slideEl = pageEl || layoutEl;

      if (slideEl && slideEl !== rootRef.value.parentElement) {
        observer.observe(slideEl);
      }

      if (
        pageEl &&
        pageEl !== slideEl &&
        pageEl !== rootRef.value.parentElement
      ) {
        observer.observe(pageEl);
      }
    } else {
      window.addEventListener('resize', updateScale);
    }
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
      observer = null;
    } else if (typeof window !== 'undefined') {
      window.removeEventListener('resize', updateScale);
    }
  });

  const resolvedScale = computed((): number => {
    const scaleProp = resolveValue(options.scale, undefined);

    if (scaleProp !== undefined) {
      return scaleProp;
    }

    const autoScaleProp = resolveValue(options.autoScale, true);

    if (autoScaleProp === false) {
      return 1;
    }

    const maxScaleProp = resolveValue(options.maxScale, undefined);

    if (maxScaleProp !== undefined) {
      return Math.min(autoScaleValue.value, maxScaleProp);
    }

    return autoScaleValue.value;
  });

  return {
    resolvedScale,
    autoScaleValue,
    containerHeight,
    updateScale,
  };
}
