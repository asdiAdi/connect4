import ScoreCard from "components/Cards/ScoreCard.tsx";
import styles from "./styles.module.scss";
import cx from "classnames";
import useGameStore from "src/stores/gameStore.ts";

type Props = {
  className?: string;
};

function ScoreBoard(props: Props) {
  const { className = undefined } = props;
  const { playerOne, playerTwo } = useGameStore();

  return (
    <div className={cx(styles["score-board"], className)}>
      <ScoreCard
        className={styles["score-board-left"]}
        orientation={"left"}
        playerData={playerOne}
      />
      <ScoreCard
        className={styles["score-board-right"]}
        orientation={"right"}
        playerData={playerTwo}
      />
    </div>
  );
}

export default ScoreBoard;
