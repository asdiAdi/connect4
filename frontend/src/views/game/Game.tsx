import useModal from "components/Modals/useModal.ts";
import PauseModal from "components/Modals/PauseModal.tsx";
import styles from "./styles.module.scss";
import ScoreBoard from "views/game/ScoreBoard.tsx";
import TimerCard from "components/Cards/TimerCard.tsx";
import { useState } from "react";
import useGameStore from "stores/useGameStore.ts";
import { useNavigate } from "react-router-dom";
import SocketWrapper from "components/Wrapper/SocketWrapper.tsx";
import PlayArea from "views/game/PlayArea.tsx";
import Navbar from "views/game/Navbar.tsx";

function Game() {
  const { isOpen, toggle } = useModal();
  const [timerKey, setTimerKey] = useState<number>(Math.random());

  const {
    pause,
    setPause,
    gameType,
    maxDuration,
    playerOne,
    playerTwo,
    turnPlayer,
    setTurnPlayer,
  } = useGameStore();

  const navigate = useNavigate();

  const onRestart = () => {
    setPause(false);
    setTurnPlayer("p1");
    setTimerKey(Math.random());
    toggle(false);
  };

  return (
    <SocketWrapper>
      <div className={styles["container"]}>
        <div className={styles["game"]}>
          <Navbar
            className={styles["game-nav"]}
            toggle={toggle}
            onRestart={onRestart}
          />

          <ScoreBoard className={styles["game-score"]} />

          <div className={styles["game-board"]}>
            <PlayArea className={styles["game-board-area"]} />

            <TimerCard
              key={timerKey}
              pause={pause}
              maxCount={maxDuration}
              turnPlayer={turnPlayer}
              name={turnPlayer === "p1" ? playerOne.name : playerTwo.name}
              className={styles["game-board-timer"]}
              callback={() => setTurnPlayer("reverse")}
            />
          </div>
        </div>
      </div>

      <PauseModal
        isOpen={isOpen}
        toggle={toggle}
        onQuit={() => navigate("/")}
        {...(gameType === "pve" && {
          //Conditionally add onContinue or onRestart
          onContinue: () => {
            setPause(false);
            toggle(false);
          },
          onRestart,
        })}
      />
    </SocketWrapper>
  );
}

export default Game;
