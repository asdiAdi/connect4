import PlayerOneIcon from "components/Icons/PlayerOneIcon.tsx";
import PlayerTwoIcon from "components/Icons/PlayerTwoIcon.tsx";
import PlayerYouIcon from "components/Icons/PlayerYouIcon.tsx";
import PlayerCpuIcon from "components/Icons/PlayerCpuIcon.tsx";
import styles from "./styles.module.scss";
import cx from "classnames";

const defaultValues = {
  one: { name: "player 1", Icon: PlayerOneIcon },
  two: { name: "player 2", Icon: PlayerTwoIcon },
  you: { name: "you", Icon: PlayerYouIcon },
  cpu: { name: "cpu", Icon: PlayerCpuIcon },
};

type Props = {
  player?: keyof typeof defaultValues;
  playerName?: string;
  score?: number;
  orientation?: "left" | "right";
  className?: string;
};

function ScoreCard(props: Props) {
  const {
    player = "one",
    playerName = undefined,
    score = 0,
    orientation = "left",
    className = undefined,
  } = props;
  const { name, Icon } = defaultValues[player];
  const nameCaps = playerName ? playerName.toUpperCase() : name.toUpperCase();

  return (
    <div
      className={cx(
        styles["score-card"],
        styles[`score-card-${orientation}`],
        className,
      )}
    >
      <div className={styles["score-card-name"]}>{nameCaps}</div>
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
