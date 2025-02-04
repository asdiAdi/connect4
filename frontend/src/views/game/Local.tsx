import PauseModal from "components/Modals/PauseModal.tsx";
import styles from "./styles.module.scss";
import ScoreBoard from "views/game/ScoreBoard.tsx";
import TimerCard from "components/Cards/TimerCard.tsx";
import { useState } from "react";
import useGameStore from "stores/useGameStore.ts";
import { useNavigate } from "react-router-dom";
import PlayArea from "views/game/PlayArea.tsx";
import Navbar from "views/game/Navbar.tsx";
import RectangleBackground from "components/Background/RectangleBackground.tsx";

function Local() {
  const {
    board,
    placeBoard,
    pause,
    setPause,
    maxDuration,
    playerOne,
    turnPlayer,
    setTurnPlayer,
    initialize,
    winner,
    resetBoard,
  } = useGameStore();

  const [timerKey, setTimerKey] = useState<number>(Math.random());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const onRestart = () => {
    initialize();
    setTimerKey(Math.random());
  };

  return (
    <div className={styles["container"]}>
      <RectangleBackground />

      <div className={styles["game"]}>
        <Navbar
          className={styles["game__nav"]}
          toggle={() => setPause(!pause)}
          onRestart={onRestart}
        />

        <ScoreBoard className={styles["game__score"]} />

        <div className={styles["game__board"]}>
          <PlayArea
            className={styles["game__board__area"]}
            onPlace={placeBoard}
            board={board}
            turnPlayer={turnPlayer}
            onLoad={() => setIsLoading(false)}
          />

          <TimerCard
            key={timerKey}
            pause={pause || isLoading}
            maxCount={maxDuration}
            turnPlayer={turnPlayer}
            name={turnPlayer === "p1" ? (playerOne.name ?? "Guest") : "CPU"}
            className={styles["game__board__timer"]}
            callback={() => setTurnPlayer("reverse")}
          />
        </div>
      </div>

      <PauseModal
        isOpen={pause}
        toggle={() => setPause(!pause)}
        onQuit={() => {
          initialize();
          navigate("/");
        }}
        onContinue={() => {
          setPause(false);
          if (winner) {
            resetBoard();
          }
        }}
        onRestart={onRestart}
        winner={winner}
      />
    </div>
  );
}

export default Local;
