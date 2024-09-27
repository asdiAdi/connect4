import { Timeout } from "../types/global";

const countDown = ({
  maxDuration,
  callback,
  onEndCallback,
}: {
  maxDuration: number;
  callback: (num: number) => void;
  onEndCallback: () => Promise<void>;
}): Timeout => {
  let count = maxDuration;
  return setInterval(() => {
    count--;
    callback(count);

    if (count == 0) {
      void onEndCallback();
      count = maxDuration;
    }
  }, 1000);
};

export { countDown };
