import { act, renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';
import { useTimer } from './useTimer';

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('should call callback after delay', async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 50));
    const [myFunc] = result.current;
    await act(async () => {
      myFunc();
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('should call callback after delay only once', async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 50));
    const [myFunc] = result.current;
    await act(async () => {
      myFunc();
      await vi.advanceTimersByTimeAsync(10);
      myFunc();
      await vi.advanceTimersByTimeAsync(10);
      myFunc();
      await vi.advanceTimersByTimeAsync(200);
    });
    expect(callback).toHaveBeenCalledTimes(1);
  });
  it('should not call callback before delay', async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 50));
    const [myFunc] = result.current;
    await act(async () => {
      myFunc();
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(callback).not.toHaveBeenCalledTimes(1);
  });
  it('should not call callback before delay multiple calls', async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 50));
    const [myFunc] = result.current;
    await act(async () => {
      myFunc();
      await vi.advanceTimersByTimeAsync(10);
      myFunc();
      await vi.advanceTimersByTimeAsync(10);
      myFunc();
      await vi.advanceTimersByTimeAsync(10);
    });
    expect(callback).not.toHaveBeenCalledTimes(1);
  });
  it('should not call callback if aborted', async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useDebounce(callback, 50));
    const [myFunc, abort] = result.current;
    await act(async () => {
      myFunc();
      await vi.advanceTimersByTimeAsync(10);
      abort();
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(callback).not.toHaveBeenCalledTimes(1);
  });
});

describe('useTimer', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });
  it('should call callback of tick', async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimer(callback, 20));
    const [start] = result.current;
    await act(async () => {
      start();
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(callback).toHaveBeenCalledTimes(5);
  });
  it('should stop calling callback when stopped', async () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useTimer(callback, 20));
    const [start, stop] = result.current;
    await act(async () => {
      start();
      await vi.advanceTimersByTimeAsync(60);
      stop();
      await vi.advanceTimersByTimeAsync(100);
    });
    expect(callback).toHaveBeenCalledTimes(3);
  });
});
