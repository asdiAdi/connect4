import { ReactNode, useEffect } from "react";
import socket from "src/socket";
import useSocketStore from "stores/useSocketStore.ts";

// TODO, all socket events will update the gameStore
function SocketWrapper({ children }: { children: ReactNode }) {
  const { setIsConnected } = useSocketStore((state) => state);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, [setIsConnected]);

  return <>{children}</>;
}

export default SocketWrapper;
