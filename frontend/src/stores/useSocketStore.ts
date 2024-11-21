import { create } from "zustand";
import { SocketStore } from "types/socket";
import socket from "src/socket.ts";
import { generateBoard } from "src/utils/game.ts";

const useSocketStore = create<SocketStore>((set) => ({
  isConnected: socket.connected,
  setIsConnected: (isConnected) => {
    set(() => ({ isConnected }));
  },
  connect: async (gameId) => {
    socket.connect();
    socket.emit("initialize", gameId);
  },
  disconnect: () => {
    socket.disconnect();
  },

  startGame: (gameId, maxDuration) => {
    socket.emit("start-game", gameId, maxDuration);
  },
  setBoard: (bh) => {
    set(() => ({ board: generateBoard(bh) }));
  },
  placeBoard: (gameId, turn) => {
    socket.emit("place-board", gameId, turn);
  },
  updateBoard: (turnPlayer, bh) => {
    set(() => ({
      board: generateBoard(bh),
      turnPlayer,
    }));
  },

  board: generateBoard([]),
  pause: true,
  playerOne: { name: "Player 1", score: 0 },
  playerTwo: { name: "Player 2", score: 0 },
  turnPlayer: "p1",
  timeLeft: 0,

  setTurnPlayer: (turnPlayer) => set(() => ({ turnPlayer })),
}));

export default useSocketStore;
