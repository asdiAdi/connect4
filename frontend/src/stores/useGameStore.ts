import { create } from "zustand";
import { GameState } from "src/types/game";

// TODO: initial state using Get api when reconnecting to a game
//  I need to wrap this in a context
const useGameStore = create<GameState>((set) => ({
  pause: true,
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
      //TODO: player can set their own names
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
}));

export default useGameStore;
