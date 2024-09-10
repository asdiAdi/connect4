type UserRole = "player1" | "player2" | "watcher";
type User = { userId: string; role: UserRole; name: string };

type Rooms = {
  [roomId: string]: User[];
};

type Turn = number;
type TurnPlayer = "p1" | "p2";
type Win = "!";

type BoardCell = TurnPlayer | 0;
type Board = BoardCell[][];

type BoardHistory = Array<Turn | Win>;

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
};
