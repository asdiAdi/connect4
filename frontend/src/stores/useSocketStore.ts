import { create } from "zustand";
import { SocketStore } from "types/socket";
import socket from "src/socket.ts";

const useSocketStore = create<SocketStore>((set) => ({
  isConnected: socket.connected,
  setIsConnected: (isConnected) => {
    set(() => ({ isConnected }));
  },
  connect: async () => {
    console.log(socket.connect());
  },
  disconnect: () => {
    console.log(socket.disconnect());
  },
}));

export default useSocketStore;
