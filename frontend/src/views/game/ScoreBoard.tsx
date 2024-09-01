import ScoreCard from "components/Cards/ScoreCard.tsx";
import styles from "./styles.module.scss";
import cx from "classnames";

type Props = {
  type?: "pvp" | "pve";
  className?: string;
};
function ScoreBoard(props) {
  const { type = "pvp", className = undefined } = props;

  return (
    <div className={cx(styles["score-board"], className)}>
      <ScoreCard
        className={styles["score-board-left"]}
        orientation={"left"}
        player={"one"}
      />
      <ScoreCard
        className={styles["score-board-right"]}
        orientation={"right"}
        player={"two"}
      />
    </div>
  );
}

export default ScoreBoard;
