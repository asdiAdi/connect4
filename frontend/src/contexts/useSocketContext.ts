import { SocketStore } from "src/types/socket";
import { useContext } from "react";
import { useStore } from "zustand";
import { SocketContext } from "./SocketContext";

function useSocketContext<T>(selector: (state: SocketStore) => T): T {
  const store = useContext(SocketContext);
  if (store === null) {
    throw new Error("Missing SocketContext.Provider in the tree");
  }

  return useStore(store, selector);
}

export default useSocketContext;
