import BoardImage from "components/Images/BoardImage.tsx";
import styles from "./styles.module.scss";
import cx from "classnames";
import MarkerIcon from "components/Icons/MarkerIcon.tsx";
import { Turn } from "types/game";
import useGameStore from "stores/useGameStore.ts";

type PlayAreaProps = {
  className?: string;
};

// this component wraps the board and puts a layer on top that is clickable
// will divide the board area into 7 equal columns
function PlayArea(props: PlayAreaProps) {
  const { className = undefined } = props;
  const turnPlayer = useGameStore((state) => state.turnPlayer);

  return (
    <div className={cx(styles["play-area"], className)}>
      <MarkerIcon
        color={turnPlayer === "p1" ? "red" : "yellow"}
        className={styles["play-area-marker"]}
      />

      <BoardImage />
      <div className={styles["play-area-body"]}>
        {new Array(7).fill(0).map((_, i) => (
          <div
            key={i}
            className={styles["play-area-body-column"]}
            onClick={() => {}}
          />
        ))}
      </div>
    </div>
  );
}

export default PlayArea;
