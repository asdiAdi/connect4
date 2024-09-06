type UserRole = "player1" | "player2" | "watcher";
type User = { userId: string; role: UserRole; name: string };

type Rooms = {
  [roomId: string]: User[];
};

type Turn = number;
type Win = "!";

type Board = Turn[][];

type BoardHistory = Array<Turn | Win>;

export type { UserRole, User, Rooms, Turn, Win, Board, BoardHistory };
