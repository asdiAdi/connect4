import { create } from "zustand";
import { SocketStore } from "types/socket";
import socket from "src/socket.ts";

const useSocketStore = create<SocketStore>((set) => ({
  isConnected: socket.connected,
  setIsConnected: (isConnected) => {
    set(() => ({ isConnected }));
  },
  connect: (roomId: string) => {
    socket.connect();
    socket.emit("join-room", roomId);
  },
  disconnect: () => {
    socket.disconnect();
  },
}));

export default useSocketStore;
