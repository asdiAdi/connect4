export type UserRole = "player1" | "player2" | "watcher";
export type User = { userId: string; role: UserRole; name: string };

export type Rooms = {
  [roomId: string]: User[];
};
