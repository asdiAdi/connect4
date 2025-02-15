import { ReactNode, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSocketStore from "stores/useSocketStore.ts";
import useAuthStore from "stores/useAuthStore.ts";
import socket from "src/socket";
import { BoardHistory, TurnPlayer } from "types/game";

type SocketWrapperProps = {
  children: ReactNode;
  redirectCallback: (value: string) => void;
};

function SocketWrapper({ children, redirectCallback }: SocketWrapperProps) {
  const {
    connect,
    setIsConnected,
    setTurnPlayer,
    setPause,
    setCounter,
    setObserverCount,
    setBoard,
    endGame,
    continueGame,
    updateBoard,
    setPlayerTwo,
    addChatHistory,
  } = useSocketStore();

  const { username } = useAuthStore();

  const { gameId = "" } = useParams();

  useEffect(() => {
    if (username && gameId) {
      connect(gameId, username);
    }
  }, [gameId, connect, username]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onSetupBoard(bh: BoardHistory) {
      setBoard(bh);
    }

    function onTurnChange(turn: TurnPlayer) {
      setTurnPlayer(turn);
    }

    function onCountdown(counter: number) {
      setCounter(counter);
    }

    function onUpdateObserverCount(num: number) {
      setObserverCount(num);
    }

    function onUpdateBoard(turnPlayer: TurnPlayer, bh: BoardHistory) {
      updateBoard(turnPlayer, bh);
    }

    function onPause(isPaused: boolean) {
      setPause(isPaused);
    }

    function onAddPlayerTwo(name: string) {
      setPlayerTwo(name);
    }

    function onAddChatHistory(username: string, message: string) {
      addChatHistory(username, message);
    }

    function onGameOver(player: TurnPlayer) {
      endGame(player);
    }

    function onPlayerLeft(name: string) {
      redirectCallback(name);
    }

    function onContinueGame() {
      continueGame();
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("add-chat-history", onAddChatHistory);
    socket.on("pause", onPause);
    socket.on("add-player-two", onAddPlayerTwo);
    socket.on("setup-board", onSetupBoard);
    socket.on("turn-change", onTurnChange);
    socket.on("countdown", onCountdown);
    socket.on("observer-count", onUpdateObserverCount);
    socket.on("update-board", onUpdateBoard);
    socket.on("game-over", onGameOver);
    socket.on("player-left", onPlayerLeft);
    socket.on("continue-game", onContinueGame);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("add-chat-history", onAddChatHistory);
      socket.off("pause", onPause);
      socket.off("add-player-two", onAddPlayerTwo);
      socket.off("setup-board", onSetupBoard);
      socket.off("turn-change", onTurnChange);
      socket.off("countdown", onCountdown);
      socket.off("observer-count", onUpdateObserverCount);
      socket.off("update-board", onUpdateBoard);
      socket.off("game-over", onGameOver);
      socket.off("player-left", onPlayerLeft);
      socket.off("continue-game", onContinueGame);
    };
  }, [
    setBoard,
    setPlayerTwo,
    setPause,
    setIsConnected,
    updateBoard,
    gameId,
    setTurnPlayer,
    setCounter,
    setObserverCount,
    addChatHistory,
    endGame,
    continueGame,
    redirectCallback,
  ]);

  return <>{children}</>;
}

export default SocketWrapper;
