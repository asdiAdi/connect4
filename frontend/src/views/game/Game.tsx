import useModal from "components/Modals/useModal.ts";
import PauseModal from "components/Modals/PauseModal.tsx";
import BoardImage from "components/Images/BoardImage.tsx";
import styles from "./styles.module.scss";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import SimpleButton from "components/Buttons/SimpleButton.tsx";
import ScoreBoard from "views/game/ScoreBoard.tsx";
import TimerCard from "components/Cards/TimerCard.tsx";
import { useState } from "react";

function Game() {
  const { isOpen, toggle } = useModal();
  const [timerKey, setTimerKey] = useState<number>(Math.random());
  const [pause, setPause] = useState<boolean>(false);
  const [turnPlayer, setTurnPlayer] = useState<"p1" | "p2">("p1");

  return (
    <div className={styles["container"]}>
      <div className={styles["game"]}>
        <nav className={styles["game-nav"]}>
          <SimpleButton className={styles["game-nav-button"]} text="menu" />
          <LogoIcon className={styles["game-nav-logo"]} />
          <SimpleButton className={styles["game-nav-button"]} text="restart" />
        </nav>

        <ScoreBoard className={styles["game-score"]} />
        <BoardImage className={styles["game-board"]} />

        <TimerCard
          key={timerKey}
          pause={pause}
          maxCount={30}
          turnPlayer={turnPlayer}
        />
      </div>

      <PauseModal
        isOpen={isOpen}
        toggle={toggle}
        onContinue={() => {
          setPause(false);
          toggle(false);
        }}
        onRestart={() => {
          setPause(true);
          setTurnPlayer("p1");
          setTimerKey(Math.random());
          toggle(false);
        }}
        onQuit={() => {
          // route to main menu
        }}
      />
    </div>
  );
}

export default Game;
