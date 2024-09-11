import { create } from "zustand";
import { SocketStore } from "types/socket";
import socket from "src/socket.ts";

const useSocketStore = create<SocketStore>((set) => ({
  isConnected: socket.connected,
  setIsConnected: (isConnected) => {
    set(() => ({ isConnected }));
  },
  connect: async () => {
    socket.connect();
  },
  disconnect: () => {
    socket.disconnect();
  },
}));

export default useSocketStore;
