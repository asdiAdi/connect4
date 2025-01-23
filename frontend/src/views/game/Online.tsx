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
import { useEffect, useRef, useState } from "react";
import useAuthStore from "stores/useAuthStore.ts";
import cx from "classnames";
import WatchIcon from "components/Icons/WatchIcon.tsx";
// import PlayArea from "views/game/PlayArea.tsx";
// import Navbar from "views/game/Navbar.tsx";

//TODO: click to suggest on observers

function Online() {
  const params = useParams();
  const navigate = useNavigate();
  const { gameId } = params;

  const [colHover, setColHover] = useState<number | null>(null);
  const [message, setMessage] = useState("");
  const textRef = useRef<HTMLTextAreaElement>(null);

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
    winner,
    board,
    placeBoard,
    turnPlayer,
    playerOne,
    playerTwo,
    setGame,
    counter,
    observerCount,
    sendChat,
    chatHistory,
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

  useEffect(() => {
    if (textRef.current !== null) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [chatHistory]);

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
          <div>Player: {username}</div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "150px",
            }}
          >
            <div style={{ marginRight: "5px" }}>Time Left: {counter}</div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "35px",
              }}
            >
              <WatchIcon /> <span>{observerCount}</span>
            </div>
          </div>

          {winner !== "" && <h2>Winner: {winner}</h2>}

          {/*  TODO: play again modal*/}
          {/*<PlayAgainModal*/}
          {/*  isOpen={isPaused && winner !== ""}*/}
          {/*  onPlayAgain={() => {}}*/}
          {/*  checkedP1={true}*/}
          {/*  checkedP2={true}*/}
          {/*/>*/}

          <div
            style={{
              marginTop: "25px",
              marginBottom: "25px",
              width: "max-content",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                minHeight: "fit-content",
                minWidth: "fit-content",
                border:
                  isMyTurn && !isPaused ? "5px solid green" : "5px solid gray",
              }}
            >
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
                        className={cx({
                          [styles["test-col-header"]]:
                            !isPaused &&
                            isMyTurn &&
                            iCol === colHover &&
                            iRow === board.length - 1,
                        })}
                        style={{
                          position: "relative",
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
                        onClick={() =>
                          isMyTurn &&
                          !isPaused &&
                          placeBoard(
                            gameId as string,
                            turnPlayer === "p1" ? iCol + 1 : (iCol + 1) * -1,
                          )
                        }
                        onMouseEnter={() => {
                          setColHover(iCol);
                        }}
                        onMouseLeave={() => {
                          setColHover(null);
                        }}
                      />
                    ))}
                  </div>
                ))
                .reverse()}
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "50px",
                minHeight: "100%",
                fontSize: "10px",
              }}
            >
              <textarea
                style={{
                  height: "70%",
                  minWidth: "350px",
                  marginBottom: "4px",
                  border: "2px solid gray",
                  backgroundColor: "#d1d1d1",
                  fontSize: "10px",
                  lineHeight: "1",
                }}
                value={chatHistory
                  .map((chat) => {
                    const { user, message } = chat;
                    return `${user}: ${message}`;
                  })
                  .join("\n")}
                ref={textRef}
                readOnly
              />
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (message !== "" && gameId) {
                    sendChat(gameId, username ?? "Guest", message);
                    setMessage("");
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="chat"
                  style={{
                    minWidth: "350px",
                    border: "2px solid gray",
                    backgroundColor: "#d1d1d1",
                    fontSize: "12px",
                  }}
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                  disabled={!gameId}
                />
              </form>
            </div>
          </div>
        </div>
      </div>

      <PauseModal
        isOpen={isPaused && winner === ""}
        toggle={() => {}}
        description={
          opponentName
            ? winner !== ""
              ? `${opponentName} is reconnecting...`
              : "Pause"
            : "Waiting for new opponent..."
        }
        onQuit={() => navigate("/")}
      />
    </SocketWrapper>
  );
}

export default Online;
