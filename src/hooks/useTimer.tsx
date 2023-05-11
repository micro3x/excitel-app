export const useTimer = <R = void>(
  callback: (timeRun: number) => R,
  tickInterval: number
): [() => void, () => void] => {
  let timer: any = null;

  const start = () => {
    if (timer) {
      clearInterval(timer);
    }
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
