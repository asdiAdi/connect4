import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGameStore from "stores/useGameStore.ts";

import RectangleBackground from "components/Background/RectangleBackground.tsx";
import Navbar from "components/Layout/Navbar.tsx";
import ScoreBoard from "views/game/ScoreBoard.tsx";
import TimerCard from "components/Cards/TimerCard.tsx";
import PlayArea from "components/Feature/PlayArea.tsx";
import PauseModal from "components/Modals/PauseModal.tsx";
import styles from "./styles.module.scss";

function Local() {
  const {
    board,
    placeBoard,
    pause,
    setPause,
    maxDuration,
    playerOne,
    playerTwo,
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
          toggleLeft={() => setPause(!pause)}
          textLeft="menu"
          toggleRight={onRestart}
          textRight="restart"
        />

        <ScoreBoard
          className={styles["game__score"]}
          playerOne={playerOne}
          playerTwo={playerTwo}
        />

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
        title={winner ? `${winner} Won` : undefined}
      />
    </div>
  );
}

export default Local;
