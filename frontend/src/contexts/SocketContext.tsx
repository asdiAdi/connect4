import { createContext, ReactNode, useEffect, useRef } from "react";
import { createSocketStore } from "stores/createSocketStore.ts";
import socket from "src/socket";

type CreateSocketStore = ReturnType<typeof createSocketStore>;

const SocketContext = createContext<CreateSocketStore | null>(null);

function SocketProvider({ children }: { children: ReactNode }) {
  const socketStoreRef = useRef<CreateSocketStore | null>(null);

  useEffect(() => {
    console.log("rerender");
    if (socketStoreRef.current === null) {
      // initial data
      socketStoreRef.current = createSocketStore({
        isConnected: socket.connected,
      });
    }
  }, [socketStoreRef]);

  return (
    <SocketContext.Provider value={socketStoreRef.current}>
      {children}
    </SocketContext.Provider>
  );
}

export { SocketContext, SocketProvider };
