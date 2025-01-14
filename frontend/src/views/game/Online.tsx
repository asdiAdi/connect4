import PauseModal from "components/Modals/PauseModal.tsx";
import styles from "src/styles.module.scss";
// import ScoreBoard from "views/game/ScoreBoard.tsx";
// import TimerCard from "components/Cards/TimerCard.tsx";
// import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SocketWrapper from "components/Wrapper/SocketWrapper.tsx";
import useSocketStore from "stores/useSocketStore.ts";
import { useQuery } from "@tanstack/react-query";
import { getActiveGame, getPastGame } from "api/api.ts";
import { useEffect, useState } from "react";
// import PlayArea from "views/game/PlayArea.tsx";
// import Navbar from "views/game/Navbar.tsx";

//TODO: click to suggest on observers

function Online() {
  const params = useParams();
  const navigate = useNavigate();
  const { gameId } = params;

  const { data: activeGame } = useQuery({
    queryKey: ["active", gameId as string],
    queryFn: ({ queryKey }) => getActiveGame(queryKey[1]),
    staleTime: Infinity,
  });

  const { data: pastGame } = useQuery({
    queryKey: ["past", gameId as string],
    queryFn: ({ queryKey }) => getPastGame(queryKey[1]),
    staleTime: Infinity,
  });

  const {
    isPaused,
    isWon,
    isConnected,
    connect,
    disconnect,
    startGame,
    setBoard,
    board,
    placeBoard,
    updateBoard,
    turnPlayer,
    setGame,
  } = useSocketStore();

  useEffect(() => {
    if (activeGame && activeGame.board_history) {
      setGame(activeGame);
    } else if (pastGame && pastGame.board_history) {
      setGame(pastGame);
    }
  }, [activeGame, pastGame, setGame]);

  return (
    <SocketWrapper>
      <div className={styles["container"]}>
        <div className={styles["game"]}>
          {/*<Navbar*/}
          {/*  className={styles["game-nav"]}*/}
          {/*  toggle={toggle}*/}
          {/*  onRestart={onRestart}*/}
          {/*/>*/}

          {/*<ScoreBoard className={styles["game-score"]} />*/}

          {/*<div className={styles["game-board"]}>*/}
          {/*  <PlayArea className={styles["game-board-area"]} />*/}

          {/*  <TimerCard*/}
          {/*    key={timerKey}*/}
          {/*    pause={pause}*/}
          {/*    maxCount={maxDuration}*/}
          {/*    turnPlayer={turnPlayer}*/}
          {/*    name={turnPlayer === "p1" ? playerOne.name : playerTwo.name}*/}
          {/*    className={styles["game-board-timer"]}*/}
          {/*    callback={() => setTurnPlayer("reverse")}*/}
          {/*  />*/}
          {/*</div>*/}

          {/*  game board test delete*/}
        </div>
      </div>

      <PauseModal
        isOpen={isPaused}
        toggle={() => {}}
        description="Player 2 is reconnecting..."
        onQuit={() => navigate("/")}
      />
    </SocketWrapper>
  );
}

export default Online;
