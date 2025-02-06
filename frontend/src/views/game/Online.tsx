import PauseModal from "components/Modals/PauseModal.tsx";
import ScoreBoard from "components/Feature/ScoreBoard.tsx";
import TimerCard from "components/Cards/TimerCard.tsx";
import { useNavigate, useParams } from "react-router-dom";
import SocketWrapper from "components/Wrapper/SocketWrapper.tsx";
import useSocketStore from "stores/useSocketStore.ts";
import { useQuery } from "@tanstack/react-query";
import { getActiveGame, getPastGame } from "api/api.ts";
import { useEffect, useRef, useState } from "react";
import useAuthStore from "stores/useAuthStore.ts";
import PlayArea from "components/Feature/PlayArea.tsx";
import Navbar from "components/Layout/Navbar.tsx";
import styles from "./styles.module.scss";
import RectangleBackground from "components/Background/RectangleBackground.tsx";
// import WatchIcon from "components/Icons/WatchIcon.tsx";

function Online() {
  const params = useParams();
  const navigate = useNavigate();
  const { gameId } = params;

  const [isLoading, setIsLoading] = useState<boolean>(true);

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
    enabled: false,
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
    setTurnPlayer,
  } = useSocketStore();

  const { username } = useAuthStore();

  useEffect(() => {
    if (!isLoadingActiveGame && !isLoadingPastGame) {
      if (activeGame && activeGame.board_history) {
        setGame(activeGame);
      } else if (pastGame && pastGame.board_history) {
        setGame(pastGame);
      } else {
        navigate("/", { state: "openSignUp" });
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
        // navigate("/");
      }}
    >
      <div className={styles["container"]}>
        <RectangleBackground />

        <div className={styles["game"]}>
          <Navbar
            className={styles["game__nav"]}
            // textRight={`Observers: ${observerCount}`}
          />

          <ScoreBoard
            className={styles["game__score"]}
            playerOne={playerOne}
            playerTwo={playerTwo}
          />

          <div className={styles["game__board"]}>
            <PlayArea
              className={styles["game__board__area"]}
              onPlace={(num) =>
                isMyTurn && !isPaused && placeBoard(gameId as string, num)
              }
              board={board}
              turnPlayer={turnPlayer}
              onLoad={() => setIsLoading(false)}
            />

            <TimerCard
              pause={isPaused}
              turnPlayer={turnPlayer}
              name={
                turnPlayer === "p1"
                  ? (playerOne.name ?? "Player 1")
                  : (playerTwo.name ?? "Player 2")
              }
              className={styles["game__board__timer"]}
              callback={() => setTurnPlayer("reverse")}
            />
          </div>
        </div>

        {/*<PlayAgainModal*/}
        {/*  isOpen={isPaused && winner !== ""}*/}
        {/*  onPlayAgain={() => {}}*/}
        {/*  checkedP1={true}*/}
        {/*  checkedP2={true}*/}
        {/*/>*/}

        <PauseModal
          isOpen={isPaused && winner === ""}
          toggle={() => {}}
          description={
            opponentName !== ""
              ? winner !== ""
                ? `${opponentName} is reconnecting...`
                : "Reconnecting..."
              : "Waiting for new opponent..."
          }
          onQuit={() => navigate("/")}
        />
      </div>
    </SocketWrapper>
  );
}

export default Online;
