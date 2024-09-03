import { create } from "zustand";
import { GameState } from "src/types/global";

const useGameStore = create<GameState>((set) => ({
  pause: true,
  gameType: "pvp",
  playerOne: { name: "Player One", score: 0 },
  playerTwo: { name: "Player Two", score: 0 },
  setGameType: (type) =>
    set(() => ({
      //TODO: player can set their own names
      gameType: type === "pve" ? "pvp" : "pve",
      playerOne:
        type === "pve"
          ? { name: "Player One", score: 0 }
          : { name: "You", score: 0 },
      playerTwo:
        type === "pve"
          ? { name: "Player Two", score: 0 }
          : { name: "CPU", score: 0 },
    })),

  maxDuration: 30,
}));

export default useGameStore;
