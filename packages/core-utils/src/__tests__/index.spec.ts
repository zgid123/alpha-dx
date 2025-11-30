import { debounce, throttle } from '..';

describe('#debounce', () => {
  const mockFn = vi.fn();

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    mockFn.mockReset();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  suite('when no delay option', () => {
    it('fires function as setTimeout with undefined timer', () => {
      const debouncedFn = debounce(mockFn);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).toBeCalledTimes(0);

      vi.advanceTimersByTime(10);
      expect(mockFn).toBeCalledTimes(1);
    });
  });

  suite('when delay option is passed', () => {
    it('fires function as setTimeout with delay', () => {
      const debouncedFn = debounce(mockFn, {
        delay: 100,
      });

      debouncedFn();
      debouncedFn();
      debouncedFn();

      expect(mockFn).toBeCalledTimes(0);

      vi.advanceTimersByTime(90);
      expect(mockFn).toBeCalledTimes(0);

      vi.advanceTimersByTime(10);
      expect(mockFn).toBeCalledTimes(1);
    });
  });
});

describe('#throttle', () => {
  const mockFn = vi.fn();

  beforeAll(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    mockFn.mockReset();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  suite('when no delay option', () => {
    it('fires function immediately at first time and after 1_000ms', () => {
      const throttledFn = throttle(mockFn);

      throttledFn();
      expect(mockFn).toBeCalledTimes(1);

      throttledFn();
      vi.advanceTimersByTime(10);
      expect(mockFn).toBeCalledTimes(1);

      vi.advanceTimersByTime(1_000);
      throttledFn();
      expect(mockFn).toBeCalledTimes(2);

      vi.advanceTimersByTime(900);
      throttledFn();
      expect(mockFn).toBeCalledTimes(2);

      vi.advanceTimersByTime(1_000);
      throttledFn();
      expect(mockFn).toBeCalledTimes(3);
    });
  });

  suite('when delay option is passed', () => {
    it('fires function immediately at first time and after delay', () => {
      const throttledFn = throttle(mockFn, {
        delay: 100,
      });

      throttledFn();
      expect(mockFn).toBeCalledTimes(1);

      throttledFn();
      vi.advanceTimersByTime(10);
      expect(mockFn).toBeCalledTimes(1);

      vi.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toBeCalledTimes(2);

      vi.advanceTimersByTime(90);
      throttledFn();
      expect(mockFn).toBeCalledTimes(2);

      vi.advanceTimersByTime(100);
      throttledFn();
      expect(mockFn).toBeCalledTimes(3);
    });
  });
});
