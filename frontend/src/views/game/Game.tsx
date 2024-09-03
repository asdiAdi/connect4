import useModal from "components/Modals/useModal.ts";
import PauseModal from "components/Modals/PauseModal.tsx";
import BoardImage from "components/Images/BoardImage.tsx";
import styles from "./styles.module.scss";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import SimpleButton from "components/Buttons/SimpleButton.tsx";
import ScoreBoard from "views/game/ScoreBoard.tsx";
import TimerCard from "components/Cards/TimerCard.tsx";
import { useState } from "react";
import useGameStore from "src/stores/gameStore.ts";
import { redirect } from "react-router-dom";

function Game() {
  const { isOpen, toggle } = useModal();
  const [timerKey, setTimerKey] = useState<number>(Math.random());
  const [pause, setPause] = useState<boolean>(true);

  const [turnPlayer, setTurnPlayer] = useState<"p1" | "p2">("p1");
  const { gameType, maxDuration } = useGameStore();

  return (
    <div className={styles["container"]}>
      <div className={styles["game"]}>
        <nav className={styles["game-nav"]}>
          <SimpleButton
            className={styles["game-nav-button"]}
            text="menu"
            onClick={() => {
              toggle(true);
              setPause(true);
            }}
          />
          <LogoIcon className={styles["game-nav-logo"]} />
          <SimpleButton className={styles["game-nav-button"]} text="restart" />
        </nav>

        <ScoreBoard className={styles["game-score"]} />
        <BoardImage className={styles["game-board"]} />

        <TimerCard
          key={timerKey}
          pause={pause}
          maxCount={maxDuration}
          turnPlayer={turnPlayer}
          callback={() =>
            setTurnPlayer((prev) => (prev === "p1" ? "p2" : "p1"))
          }
        />
      </div>

      <PauseModal
        isOpen={isOpen}
        toggle={toggle}
        onQuit={() => redirect("/main-menu")}
        {...(gameType === "pve" && {
          //Conditionally add onContinue or onRestart
          onContinue: () => {
            setPause(false);
            toggle(false);
          },
          onRestart: () => {
            setPause(false);
            setTurnPlayer("p1");
            setTimerKey(Math.random());
            toggle(false);
          },
        })}
      />
    </div>
  );
}

export default Game;
