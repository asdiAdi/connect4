import { create } from "zustand";
import { SocketStore } from "types/socket";
import socket from "src/socket.ts";
import { generateBoard } from "src/utils/game.ts";

const useSocketStore = create<SocketStore>((set) => ({
  isConnected: socket.connected,
  observerCount: 0,
  setIsConnected: (isConnected) => {
    set(() => ({ isConnected }));
  },
  setCounter: (counter) => {
    set(() => ({ counter }));
  },
  setObserverCount: (observerCount) => set(() => ({ observerCount })),
  connect: async (gameId, username) => {
    socket.connect();
    socket.emit("initialize", gameId, username);
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
  setPause: (isPaused) => set(() => ({ isPaused: isPaused })),
  setTurnPlayer: (turnPlayer) => set(() => ({ turnPlayer })),
  setPlayerTwo: (name) =>
    set((state) => ({ playerTwo: { ...state.playerTwo, name } })),
  updateBoard: (turnPlayer, bh) => {
    set(() => ({
      board: generateBoard(bh),
      turnPlayer,
    }));
  },
  setGame: (game) => {
    if ("history_id" in game) {
      const {
        board_history,
        player_one,
        player_one_score,
        player_two,
        player_two_score,
        winner,
      } = game;
      set(() => ({
        board: generateBoard(board_history),
        playerOne: { name: player_one, score: player_one_score },
        playerTwo: { name: player_two, score: player_two_score },
        isWon: winner,
      }));
    } else {
      const {
        board_history,
        turn_player,
        is_paused,
        max_duration,
        counter,
        player_one,
        player_one_score,
        player_two,
        player_two_score,
      } = game;
      set(() => ({
        board: generateBoard(board_history),
        isPaused: is_paused,
        turnPlayer: turn_player,
        max_duration: max_duration,
        counter: counter,
        winner: false,
        playerOne: { name: player_one, score: player_one_score },
        playerTwo: { name: player_two, score: player_two_score },
      }));
    }
  },
  board: generateBoard([]),
  isPaused: true,
  playerOne: { name: "Player 1", score: 0 },
  playerTwo: { name: "Player 2", score: 0 },
  turnPlayer: "p1",
  counter: 0,
  isWon: false,
}));

export default useSocketStore;
