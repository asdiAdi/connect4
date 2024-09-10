import { create } from "zustand";
import { GameState } from "src/types/global";

const useGameStore = create<GameState>((set) => ({
  pause: true,
  gameType: "pvp",
  playerOne: { name: "Player 1", score: 0 },
  playerTwo: { name: "Player 2", score: 0 },
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
