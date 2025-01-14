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
        timeLeft: counter,
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
  timeLeft: 0,
  isWon: false,
  setTurnPlayer: (turnPlayer) => set(() => ({ turnPlayer })),
}));

export default useSocketStore;
