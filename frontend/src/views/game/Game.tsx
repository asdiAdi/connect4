import useModal from "components/Modals/useModal.ts";
import PauseModal from "components/Modals/PauseModal.tsx";
import BoardImage from "components/Images/BoardImage.tsx";
import styles from "./styles.module.scss";
import LogoIcon from "components/Icons/LogoIcon.tsx";
import SimpleButton from "components/Buttons/SimpleButton.tsx";
import ScoreBoard from "views/game/ScoreBoard.tsx";
import TimerCard from "components/Cards/TimerCard.tsx";
import { useState } from "react";
import useGameStore from "stores/useGameStore.ts";
import { useNavigate } from "react-router-dom";
import SocketWrapper from "components/Wrapper/SocketWrapper.tsx";

function Game() {
  const { isOpen, toggle } = useModal();
  const [timerKey, setTimerKey] = useState<number>(Math.random());
  const [pause, setPause] = useState<boolean>(false);

  const [turnPlayer, setTurnPlayer] = useState<"p1" | "p2">("p1");
  const { gameType, maxDuration, playerOne, playerTwo } = useGameStore();

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
            {gameType === "pve" ? (
              <SimpleButton
                className={styles["game-nav-button"]}
                text="restart"
                onClick={onRestart}
              />
            ) : (
              <div className={styles["game-nav-button"]} />
            )}
          </nav>

          <ScoreBoard className={styles["game-score"]} />

          <div className={styles["game-board"]}>
            <BoardImage className={styles["game-board-image"]} />

            <TimerCard
              key={timerKey}
              pause={pause}
              maxCount={maxDuration}
              turnPlayer={turnPlayer}
              name={turnPlayer === "p1" ? playerOne.name : playerTwo.name}
              className={styles["game-board-timer"]}
              callback={() =>
                setTurnPlayer((prev) => (prev === "p1" ? "p2" : "p1"))
              }
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
