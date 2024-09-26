type UserRole = "player1" | "player2" | "watcher";
type User = { userId: string; role: UserRole; name: string };

type Rooms = {
  [roomId: string]: User[];
};

type Timeout = ReturnType<typeof setInterval>;

export type { UserRole, User, Rooms, Timeout };
