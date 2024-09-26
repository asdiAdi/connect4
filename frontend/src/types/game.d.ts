import { PlayerData } from "types/global";

type UserRole = "player1" | "player2" | "watcher";
type User = { userId: string; role: UserRole; name: string };

type Turn = number;
type TurnPlayer = "p1" | "p2";

type BoardCell = TurnPlayer | 0;
type Board = BoardCell[][];

type BoardHistory = Array<Turn>;

type GameType = "pvp" | "pve";

type GameState = {
  pause: boolean;
  gameType: GameType;
  playerOne: PlayerData;
  playerTwo: PlayerData;
  setPause: (val: boolean) => void;
  setGameType: (type: GameType) => void;

  maxDuration: number; // in seconds
  turnPlayer: "p1" | "p2";
  setTurnPlayer: (turn: GameState["turnPlayer"] | "reverse") => void;
};

export type {
  UserRole,
  User,
  Rooms,
  Turn,
  TurnPlayer,
  Win,
  BoardCell,
  Board,
  BoardHistory,
  GameType,
  GameState,
};
