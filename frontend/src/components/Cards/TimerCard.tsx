import { useState, useEffect } from "react";
import TurnBackgroundOne from "components/Images/TurnBackgroundOne.tsx";
import TurnBackgroundTwo from "components/Images/TurnBackgroundTwo.tsx";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { TurnPlayer } from "types/game";

type Props = {
  pause: boolean;
  turnPlayer: TurnPlayer;
  name: string;
  maxCount?: number; //in seconds
  callback?: () => void;
  className?: string;
};

function TimerCard(props: Props) {
  const {
    pause,
    turnPlayer = "p1",
    name = "player 1",
    maxCount = 30,
    className,
    callback,
  }: Props = props;
  const [count, setCount] = useState(maxCount);

  useEffect(() => {
    let timer: number = 0;
    if (!pause) {
      if (count > 0) {
        timer = window.setInterval(() => {
          setCount((prev) => prev - 1);
        }, 1000);
      } else {
        setCount(maxCount);
        if (callback) callback();
      }
    }

    return () => clearInterval(timer);
  }, [count, pause, callback, maxCount]);

  useEffect(() => {
    setCount(maxCount);
  }, [maxCount]);

  return (
    <div className={classNames(styles["timer-card"], className)}>
      <span className={styles["timer-card__name"]}>
        {`${name}'s turn`.toUpperCase()}
      </span>
      <span className={styles["timer-card__count"]}>{`${count}s`}</span>
      {turnPlayer === "p1" && (
        <TurnBackgroundOne className={styles["timer-card__icon"]} />
      )}
      {turnPlayer === "p2" && (
        <TurnBackgroundTwo className={styles["timer-card__icon"]} />
      )}
    </div>
  );
}

export default TimerCard;
