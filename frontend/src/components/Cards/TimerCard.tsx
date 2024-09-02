import { useState, useEffect } from "react";
import TurnBackgroundOne from "components/Images/TurnBackgroundOne.tsx";
import TurnBackgroundTwo from "components/Images/TurnBackgroundTwo.tsx";
import cx from "classnames";
import styles from "./styles.module.scss";

type Props = {
  maxCount?: number; //in seconds
  pause?: boolean;
  className?: string;
  turnPlayer?: "p1" | "p2";
};

function TimerCard(props: Props) {
  const {
    pause = true,
    className = undefined,
    maxCount = 30,
    turnPlayer = undefined,
  }: Props = props;
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

  useEffect(() => {
    setCount(maxCount);
  }, [maxCount]);

  return (
    <div className={cx(styles["timer-card"], className)}>
      {turnPlayer === "p1" && <TurnBackgroundOne />}
      {turnPlayer === "p2" && <TurnBackgroundTwo />}
      {count}
    </div>
  );
}

export default TimerCard;
