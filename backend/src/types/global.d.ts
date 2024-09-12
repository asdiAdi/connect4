type UserRole = "player1" | "player2" | "watcher";
type User = { userId: string; role: UserRole; name: string };

type Rooms = {
  [roomId: string]: User[];
};

export type { UserRole, User, Rooms };
