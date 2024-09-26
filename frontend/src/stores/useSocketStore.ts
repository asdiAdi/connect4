import { create } from "zustand";
import { SocketStore } from "types/socket";
import socket from "src/socket.ts";
import { generateBoard } from "src/utils/game.ts";

const DEFAULT_CONFIG = {
  maxDuration: 30,
};

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

  startGame: (config) => {
    socket.emit("start-game", config ?? DEFAULT_CONFIG);
  },
  setBoard: (board) => {
    set(() => ({ board }));
  },
  placeBoard: (turn) => {
    socket.emit("place-board", turn);
  },

  board: generateBoard([]),
  pause: true,
  playerOne: { name: "Player 1", score: 0 },
  playerTwo: { name: "Player 2", score: 0 },
  turnPlayer: "p1",
  timeLeft: 0,
}));

export default useSocketStore;
