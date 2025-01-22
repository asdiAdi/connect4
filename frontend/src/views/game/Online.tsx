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
import { useEffect } from "react";
import useAuthStore from "stores/useAuthStore.ts";
// import PlayArea from "views/game/PlayArea.tsx";
// import Navbar from "views/game/Navbar.tsx";

//TODO: click to suggest on observers

function Online() {
  const params = useParams();
  const navigate = useNavigate();
  const { gameId } = params;

  const { data: activeGame, isLoading: isLoadingActiveGame } = useQuery({
    queryKey: ["active", gameId as string],
    queryFn: ({ queryKey }) => getActiveGame(queryKey[1]),
    staleTime: Infinity,
  });

  const { data: pastGame, isLoading: isLoadingPastGame } = useQuery({
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
    playerOne,
    playerTwo,
    setGame,
    counter,
    observerCount,
  } = useSocketStore();

  const { username } = useAuthStore();

  useEffect(() => {
    if (!isLoadingActiveGame && !isLoadingPastGame) {
      if (activeGame && activeGame.board_history) {
        setGame(activeGame);
      } else if (pastGame && pastGame.board_history) {
        setGame(pastGame);
      } else {
        //TODO: error handling no past or active game, add modal?
        navigate("/");
      }
    }
  }, [
    isLoadingActiveGame,
    isLoadingPastGame,
    activeGame,
    pastGame,
    setGame,
    navigate,
  ]);

  const isMyTurn =
    (turnPlayer === "p1" && playerOne.name === username) ||
    (turnPlayer === "p2" && playerTwo.name === username);

  const opponentName =
    playerOne.name === username ? playerTwo.name : playerOne.name;

  return (
    <SocketWrapper
      onDisconnect={() => {
        navigate("/");
      }}
    >
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

          <div>Time Left: {counter}</div>
          <div>ObserverCount: {observerCount}</div>

          <div>Player: {username}</div>

          <div style={{ marginTop: "50px", marginBottom: "10px" }}>
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <button
                key={num}
                onClick={() =>
                  isMyTurn &&
                  placeBoard(
                    gameId as string,
                    turnPlayer === "p1" ? num : num * -1,
                  )
                }
                disabled={!isMyTurn}
              >
                {num}
              </button>
            ))}
          </div>
          {board
            .map((row, iRow) => (
              <div
                key={`row-${iRow}`}
                style={{
                  lineHeight: "0",
                }}
              >
                {row.map((cell, iCol) => (
                  <span
                    key={`row-${iRow}-col-${iCol}`}
                    style={{
                      display: "inline-block",
                      width: "20px",
                      height: "20px",
                      border: "1px solid black",
                      backgroundColor:
                        cell.value === "p1"
                          ? "blue"
                          : cell.value === "p2"
                            ? "red"
                            : "white",
                    }}
                  />
                ))}
              </div>
            ))
            .reverse()}
        </div>
      </div>

      <PauseModal
        isOpen={isPaused}
        toggle={() => {}}
        description={
          opponentName
            ? `${opponentName} is reconnecting...`
            : "Waiting for new opponent..."
        }
        onQuit={() => navigate("/")}
      />
    </SocketWrapper>
  );
}

export default Online;
