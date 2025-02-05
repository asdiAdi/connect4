import { create } from "zustand";
import { GameState } from "src/types/game";
import {
  generateBoard,
  getWinningPositions,
  placeBoard,
} from "src/utils/game.ts";

const useGameStore = create<GameState>((set) => ({
  pause: false,
  gameType: "pvp",
  playerOne: { name: "Player 1", score: 0 },
  playerTwo: { name: "Player 2", score: 0 },
  turnPlayer: "p1",
  setPause: (val) => set(() => ({ pause: val })),
  setTurnPlayer: (val) =>
    set(({ turnPlayer }) => ({
      turnPlayer:
        val === "reverse" ? (turnPlayer === "p1" ? "p2" : "p1") : turnPlayer,
    })),
  setGameType: (type) =>
    set(() => ({
      gameType: type,
      playerOne:
        type === "pvp"
          ? { name: "Player 1", score: 0 }
          : { name: "You", score: 0 },
      playerTwo:
        type === "pvp"
          ? { name: "Player 2", score: 0 }
          : { name: "CPU", score: 0 },
    })),
  maxDuration: 30,

  board: generateBoard([]),
  placeBoard: (num) =>
    set(({ board, turnPlayer, playerOne, playerTwo }) => {
      const _board = placeBoard(num, board);
      const positions = getWinningPositions(_board);
      const isWon = positions.length > 0;

      return {
        board: _board,
        turnPlayer: turnPlayer === "p1" ? "p2" : "p1",
        pause: isWon,
        winner: isWon
          ? turnPlayer === "p1"
            ? playerOne.name
            : playerTwo.name
          : null,
        ...(isWon
          ? turnPlayer === "p1"
            ? { playerOne: { ...playerOne, score: playerOne.score + 1 } }
            : { playerTwo: { ...playerTwo, score: playerTwo.score + 1 } }
          : {}),
      };
    }),
  initialize: () =>
    set(() => ({
      board: generateBoard([]),
      turnPlayer: "p1",
      pause: false,
      playerOne: { name: "Player 1", score: 0 },
      playerTwo: { name: "Player 2", score: 0 },
      winner: null,
    })),
  resetBoard: () => set(() => ({ board: generateBoard([]), winner: null })),
  winner: null,
}));

export default useGameStore;
