type ColorName =
  | "black"
  | "indigo"
  | "medium-purple"
  | "light-coral"
  | "mustard-yellow"
  | "white";

type PlayerData = {
  name: string;
  score: number;
};

type GameType = "pvp" | "pve";

type GameState = {
  gameType: GameType;
  playerOne: PlayerData;
  playerTwo: PlayerData;
  setGameType: (type: GameType) => void;

  maxDuration: number; // in seconds
  turnPlayer: "p1" | "p2";
  // setTurnPlayer: (turn: GameState["turnPlayer"]) => void;
};

export { ColorName, PlayerData, GameType, GameState };
