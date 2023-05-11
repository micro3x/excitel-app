import { useEffect, useMemo } from 'react';

function debounce<A = unknown, R = void>(
  callback: (args?: A) => R,
  delay: number
): [(args?: A) => Promise<R>, () => void] {
  let timer: NodeJS.Timeout;

  const debouncedFunc = (args?: A): Promise<R> =>
    new Promise((resolve) => {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        resolve(callback(args));
      }, delay);
    });

  const teardown = () => clearTimeout(timer);

  return [debouncedFunc, teardown];
}

export const useDebounce = <A = unknown, R = void>(
  callback: (args?: A) => R,
  delay: number
): [(args?: A) => Promise<R>, () => void] => {
  const [debouncedFunc, teardown] = useMemo(
    () => debounce<A, R>(callback, delay),
    [callback, delay]
  );

  useEffect(() => () => teardown(), []);

  const abort = () => teardown();

  return [debouncedFunc, abort];
};
