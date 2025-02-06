export type ColorName =
  | "black"
  | "indigo"
  | "medium-purple"
  | "light-coral"
  | "mustard-yellow"
  | "white";

export type IconSize = "s" | "m" | "l";

type UserRole = "player1" | "player2" | "watcher";
type User = { userId: string; role: UserRole; name: string };
type CellName = `${string}${number}`;

type Turn = number;
type TurnPlayer = "p1" | "p2";

export type PlayerData = {
  name?: string;
  score: number;
};

type BoardCell = {
  value: TurnPlayer | null;
  row: number;
  col: number;
  name: CellName;
};
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
  turnPlayer: TurnPlayer;
  setTurnPlayer: (turn: GameState["turnPlayer"] | "reverse") => void;

  board: Board;
  placeBoard: (num: number) => void;
  initialize: () => void;
  resetBoard: () => void;
  winner: string | null;
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
  CellName,
};
