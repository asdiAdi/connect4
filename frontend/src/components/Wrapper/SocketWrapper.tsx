import { ReactNode, useEffect } from "react";
import socket from "src/socket";
import useSocketStore from "stores/useSocketStore.ts";
import { BoardHistory, TurnPlayer } from "types/game";
import { useParams } from "react-router-dom";
import useAuthStore from "stores/useAuthStore.ts";

type SocketWrapperProps = {
  onDisconnect: () => void;
  children: ReactNode;
};

function SocketWrapper({
  children,
  onDisconnect: onDisconnectProps,
}: SocketWrapperProps) {
  const {
    connect,
    setIsConnected,
    setTurnPlayer,
    setPause,
    setCounter,
    setObserverCount,
    setBoard,
    endGame,
    updateBoard,
    setPlayerTwo,
    addChatHistory,
  } = useSocketStore();

  const { username } = useAuthStore();

  const { gameId = "" } = useParams();

  useEffect(() => {
    if (username && gameId) {
      console.log(username, gameId);
      connect(gameId, username);
    } else {
    }
  }, [gameId, connect, username]);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      onDisconnectProps();
      setIsConnected(false);
    }

    function onEvent<T>(e: T) {
      console.log(e);
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

    function onGameOver(winner: string) {
      endGame(winner);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("add-chat-history", onAddChatHistory);
    socket.on("event", onEvent);
    socket.on("pause", onPause);
    socket.on("add-player-two", onAddPlayerTwo);
    socket.on("setup-board", onSetupBoard);
    socket.on("turn-change", onTurnChange);
    socket.on("countdown", onCountdown);
    socket.on("observer-count", onUpdateObserverCount);
    socket.on("update-board", onUpdateBoard);
    socket.on("game-over", onGameOver);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("add-chat-history", onAddChatHistory);
      socket.off("event", onEvent);
      socket.off("pause", onPause);
      socket.off("add-player-two", onAddPlayerTwo);
      socket.off("setup-board", onSetupBoard);
      socket.off("turn-change", onTurnChange);
      socket.off("countdown", onCountdown);
      socket.off("observer-count", onUpdateObserverCount);
      socket.off("update-board", onUpdateBoard);
      socket.off("game-over", onGameOver);
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
  ]);

  return <>{children}</>;
}

export default SocketWrapper;
