import React from "react";
import PlayerYouIcon from "components/Icons/PlayerYouIcon.tsx";
import classNames from "classnames";
import styles from "./styles.module.scss";
import { PlayerData } from "types/game";

type Props = {
  playerData: PlayerData;
  orientation?: "left" | "right";
  Icon?: React.FC<{ className: string }>;
  className?: string;
};

function ScoreCard(props: Props) {
  const {
    playerData,
    orientation = "left",
    Icon = PlayerYouIcon,
    className,
  } = props;
  const { name, score } = playerData;

  return (
    <div
      className={classNames(
        styles["score-card"],
        styles[`score-card--${orientation}`],
        className,
      )}
    >
      <div className={styles["score-card__name"]}>{name?.toUpperCase()}</div>
      <div className={styles["score-card__score"]}>{score}</div>
      <Icon
        className={classNames(
          styles["score-card__icon"],
          styles[`score-card__icon--${orientation}`],
        )}
      />
    </div>
  );
}

export default ScoreCard;
