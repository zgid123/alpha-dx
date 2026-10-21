const MINIMUM_TOC_ARTICLE_WIDTH_PX = 260;

export function calculateUniformTocArticleWidthPx(
  articleWidths: readonly number[],
): number {
  return articleWidths.reduce(
    (longestWidth, width) => Math.max(longestWidth, width),
    MINIMUM_TOC_ARTICLE_WIDTH_PX,
  );
}
