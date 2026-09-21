import type { ComputedRef, CSSProperties, Ref } from 'vue';
import { computed, inject, ref, toRef } from 'vue';

export function resolveAssetUrl(url: string): string {
  return url;
}

export function handleBackground(
  background?: string,
  dim = false,
  backgroundSize = 'cover',
): CSSProperties {
  const isColor =
    background && (background[0] === '#' || background.startsWith('rgb'));

  const style: CSSProperties = {
    background: isColor ? background : undefined,
    color: background && !isColor ? 'white' : undefined,
    backgroundImage: isColor
      ? undefined
      : background
        ? dim
          ? `linear-gradient(#0005, #0008), url(${resolveAssetUrl(background)})`
          : `url("${resolveAssetUrl(background)}")`
        : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize,
  };

  if (!style.background) {
    delete style.background;
  }

  return style;
}

export interface ISlidevNavShim {
  readonly tocTree: ReadonlyArray<{
    readonly no: number;
    readonly title: string;
    readonly path: string;
    readonly children?: ReadonlyArray<unknown>;
  }>;
  readonly currentPath: string;
  readonly currentPage: number;
  readonly isPresenter: boolean;
}

export interface ISlidevContextShim {
  readonly nav: ISlidevNavShim;
  readonly configs: Record<string, unknown>;
  readonly themeConfigs: ComputedRef<Record<string, unknown>>;
}

export function useSlideContext() {
  const fallbackSlidev: ISlidevContextShim = {
    nav: {
      tocTree: [],
      currentPath: '/1',
      currentPage: 1,
      isPresenter: false,
    },
    configs: {},
    themeConfigs: computed(() => ({})),
  };

  const $slidev = inject<ISlidevContextShim>(
    '$$slidev-context',
    fallbackSlidev,
  );
  const $nav = toRef($slidev, 'nav');
  const $clicksContext = inject<Ref<{ current: number; total: number }>>(
    '$$slidev-clicks-context',
    ref({ current: 0, total: 0 }),
  );
  const $clicks = toRef($clicksContext.value, 'current');
  const $page = inject<Ref<number>>('$$slidev-page', ref(1));
  const $renderContext = inject<Ref<string>>(
    '$$slidev-render-context',
    ref('slide'),
  );
  const $frontmatter = inject<Record<string, unknown>>(
    '$$slidev-fontmatter',
    {},
  );
  const $route = inject<unknown>('$$slidev-route', undefined);
  const $scale = inject<Ref<number>>('$$slidev-slide-scale', ref(1));
  const $zoom = inject<ComputedRef<number>>(
    '$$slidev-slide-zoom',
    computed(() => 1),
  );

  return {
    $slidev,
    $nav,
    $clicksContext,
    $clicks,
    $page,
    $route,
    $renderContext,
    $frontmatter,
    $scale,
    $zoom,
  };
}
