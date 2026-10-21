import { useAttrs } from 'vue';

import { mergeUno } from './merge-uno';
import type { TUnoClassValue } from './merge-uno/types';

type TUnoClassSource = TUnoClassValue | (() => TUnoClassValue);

interface IUseMergedUnoAttrsResult {
  readonly className: (...extraDefaults: TUnoClassValue[]) => string;
  readonly forwardedAttrs: () => Record<string, unknown>;
}

/**
 * Merges a component's default UnoCSS classes with its consumer-provided class.
 * The original class attribute is removed from the forwarded attributes so Vue
 * cannot append it a second time after conflict resolution.
 */
export function useMergedUnoAttrs(
  defaultClasses: TUnoClassSource,
): IUseMergedUnoAttrsResult {
  const attrs = useAttrs();

  const className = (...extraDefaults: TUnoClassValue[]): string => {
    const resolvedDefaults =
      typeof defaultClasses === 'function' ? defaultClasses() : defaultClasses;

    return mergeUno(
      resolvedDefaults,
      ...extraDefaults,
      attrs.class as TUnoClassValue,
    );
  };

  const forwardedAttrs = (): Record<string, unknown> => {
    const result = {
      ...attrs,
    };

    delete result.class;
    return result;
  };

  return {
    className,
    forwardedAttrs,
  };
}
