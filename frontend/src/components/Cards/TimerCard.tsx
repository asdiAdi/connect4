import cx from "classnames";
import styles from "./styles.module.scss";
import { useState, useEffect } from "react";

type Props = {
  maxCount?: number; //in seconds
  pause?: boolean;
  className?: string;
};

function TimerCard(props: Props) {
  const { pause = true, className = undefined, maxCount = 30 }: Props = props;
  const [count, setCount] = useState<number>(maxCount);

  useEffect(() => {
    let timer = 0;
    if (!pause && count > 0) {
      timer = setInterval(() => {
        setCount((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [count, pause]);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCount((prev) => prev - 1);
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [count]);

  return <div className={cx(styles["timer-card"], className)}>{count}</div>;
}

export default TimerCard;
