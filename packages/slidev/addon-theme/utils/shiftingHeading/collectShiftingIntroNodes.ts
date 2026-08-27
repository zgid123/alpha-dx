import type { Directive, VNode } from 'vue';

interface IShiftingIntroContent {
  readonly key: number;
  readonly node: VNode;
}

export interface IShiftingIntroNodes {
  readonly title: VNode | null;
  readonly clickRef: ReadonlyMap<number, number>;
  readonly contents: readonly IShiftingIntroContent[];
}

const CLICK_DIRECTIVE_NAMES = new Set(['click', 'v-click', 'vClick']);

const getDirectiveName = (directive: Directive): string | undefined => {
  if (typeof directive === 'function') {
    return directive.name;
  }

  if ('name' in directive && typeof directive.name === 'string') {
    return directive.name;
  }

  return undefined;
};

const hasImplicitClickDirective = (node: VNode): boolean => {
  return Boolean(
    node.dirs?.some(({ dir, value }) => {
      const name = getDirectiveName(dir);
      return (
        name !== undefined &&
        CLICK_DIRECTIVE_NAMES.has(name) &&
        value === undefined
      );
    }),
  );
};

/**
 * Separates the first heading from a shifting-intro slot and remaps implicit
 * v-click directives after the layout's internal reveal click.
 */
export const collectShiftingIntroNodes = (
  children: readonly VNode[],
): IShiftingIntroNodes => {
  let title: VNode | null = null;
  let clickIndex = 1;
  const clickRef = new Map<number, number>();
  const contents: IShiftingIntroContent[] = [];

  children.forEach((node, key) => {
    if (title === null && node.type === 'h1') {
      title = node;
    } else {
      contents.push({
        key,
        node,
      });
    }

    if (hasImplicitClickDirective(node)) {
      clickIndex += 1;
      clickRef.set(key, clickIndex);
    }
  });

  return {
    title,
    clickRef,
    contents,
  };
};
