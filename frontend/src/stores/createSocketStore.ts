import { create } from "zustand";
import { SocketStore, SocketStoreProps } from "src/types/socket";
import socket from "src/socket.ts";

const createSocketStore = (initProps: SocketStoreProps) => {
  return create<SocketStore>((set) => ({
    ...initProps,
    setIsConnected: (isConnected) => {
      set(() => ({ isConnected }));
    },
  }));
};

export { createSocketStore };
