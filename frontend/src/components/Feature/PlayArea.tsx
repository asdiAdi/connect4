import BoardImage from "components/Images/BoardImage.tsx";
import MarkerIcon from "components/Icons/MarkerIcon.tsx";
import CounterIcon from "components/Icons/CounterIcon.tsx";
import classNames from "classnames";
import styles from "./playarea.module.scss";
import { Board, TurnPlayer } from "types/game";

type PlayAreaProps = {
  onPlace: (num: number) => void;
  board: Board;
  turnPlayer: TurnPlayer;
  onLoad?: () => void;
  className?: string;
};

function PlayArea(props: PlayAreaProps) {
  const { className, onPlace, board, turnPlayer, onLoad } = props;

  return (
    <div className={classNames(styles["play-area"], className)}>
      <BoardImage className={styles["play-area__board"]} onLoad={onLoad} />
      <div className={styles["play-area__body"]}>
        {new Array(7).fill(0).map((_, i) => (
          <div key={`column-${i}`}>
            <div
              className={classNames(
                styles["play-area__body__column"],
                styles["play-area__body__column--top"],
                styles[`play-area__body__column--${i}`],
              )}
              onClick={() => onPlace(turnPlayer === "p1" ? i + 1 : -i - 1)}
            >
              <MarkerIcon
                color={turnPlayer === "p1" ? "red" : "yellow"}
                className={classNames(
                  styles["play-area__marker"],
                  styles[`play-area__marker--${i}`],
                )}
              />
            </div>
            <div
              key={`other-column-${i}`}
              className={classNames(
                styles["play-area__body__column"],
                styles[`play-area__body__column--${i}`],
              )}
            >
              {new Array(6)
                .fill(0)
                .map(
                  (_, j) =>
                    board[j][i].value !== null && (
                      <div
                        key={`row-${i}+${j}`}
                        className={classNames(
                          styles["play-area__counter"],
                          styles[`play-area__counter--${j}`],
                        )}
                      >
                        <CounterIcon
                          color={board[j][i].value === "p1" ? "red" : "yellow"}
                        />
                      </div>
                    ),
                )
                .reverse()}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlayArea;
