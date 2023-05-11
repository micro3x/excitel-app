import { useEffect, useMemo, useState } from 'react';

export const useTimer = <A = unknown, R = void>(
  callback: (timeRun: number) => R,
  tickInterval: number
): [() => void, () => void] => {
  // const [timer, setTimer] = useState<any>(null);
  // const [timeRun, setTimeRun] = useState(0);
  let timer: any = null;

  const start = () => {
    if (timer) {
      clearInterval(timer);
    }
    // setTimeRun(0);
    let elapsedTime = 0;
    timer = setInterval(() => {
      elapsedTime += tickInterval;
      callback(elapsedTime);
    }, tickInterval);
  };

  const stop = () => {
    clearInterval(timer);
  };

  return [start, stop];
};
