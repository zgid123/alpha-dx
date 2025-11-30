export type TCallback = (...args: unknown[]) => unknown;

interface IIntervalOptions {
  delay?: number;
}

export function debounce<T extends TCallback>(
  func: T,
  opts?: IIntervalOptions,
): (args?: Parameters<T>[number]) => void {
  const { delay } = opts || {};

  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (args: Parameters<T>[number]) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      func?.(args);
    }, delay);
  };
}

export function throttle<T extends TCallback>(
  func: T,
  opts?: IIntervalOptions,
): (args?: Parameters<T>[number]) => void {
  let lastInvokeTime = 0;
  const { delay = 1_000 } = opts || {};

  return (args: Parameters<T>[number]) => {
    const now = Date.now();

    if (now - lastInvokeTime >= delay) {
      func?.(args);

      lastInvokeTime = now;
    }
  };
}
