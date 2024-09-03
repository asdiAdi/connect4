import React from "react";
import PlayerYouIcon from "components/Icons/PlayerYouIcon.tsx";

import { PlayerData } from "src/types/global";
import cx from "classnames";
import styles from "./styles.module.scss";

type Props = {
  playerData: PlayerData;
  orientation?: "left" | "right";
  Icon?: React.FC<{ className: string }>;
  className?: string;
};

function ScoreCard(props: Props) {
  const {
    playerData = {
      name: "",
      score: 0,
    },
    orientation = "left",
    Icon = PlayerYouIcon,
    className = undefined,
  } = props;
  const { name, score } = playerData;

  return (
    <div
      className={cx(
        styles["score-card"],
        styles[`score-card-${orientation}`],
        className,
      )}
    >
      <div className={styles["score-card-name"]}>{name.toUpperCase()}</div>
      <div className={styles["score-card-score"]}>{score}</div>
      <Icon
        className={cx(
          styles["score-card-icon"],
          styles[`score-card-icon-${orientation}`],
        )}
      />
    </div>
  );
}

export default ScoreCard;
