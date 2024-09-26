import { ReactNode, useEffect } from "react";
import socket from "src/socket";
import useSocketStore from "stores/useSocketStore.ts";
import { BoardHistory, TurnPlayer } from "types/game";
import { generateBoard } from "src/utils/game.ts";

// TODO, all socket events will update the gameStore
function SocketWrapper({ children }: { children: ReactNode }) {
  const { setIsConnected, setBoard, placeBoard } = useSocketStore(
    (state) => state,
  );

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    function onEvent<T>(e: T) {
      console.log(e);
    }

    function onSetupBoard(boardHistory: BoardHistory) {
      setBoard(generateBoard(boardHistory));
    }

    function onCountdown(timeLeft: number) {
      console.log(timeLeft);
    }

    function onTurnChange(turnPlayer: TurnPlayer) {}

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("event", onEvent);
    socket.on("setup-board", onSetupBoard);
    socket.on("countdown", onCountdown);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("event", onEvent);
      socket.on("setup-board", onSetupBoard);
      socket.off("countdown", onCountdown);
    };
  }, [setBoard, setIsConnected]);

  return <>{children}</>;
}

export default SocketWrapper;
