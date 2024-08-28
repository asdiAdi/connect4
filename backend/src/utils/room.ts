import { rooms } from "../controllers/controller";

const hasRoomId = (roomId: string): boolean => rooms.hasOwnProperty(roomId);
const hasPlayer1 = (roomId: string): boolean => {
  if (hasRoomId(roomId)) {
    return rooms[roomId].some((room) => room.role === "player1");
  } else {
    throw new Error("Room id not found");
  }
};
const hasPlayer2 = (roomId: string): boolean => {
  if (hasRoomId(roomId)) {
    return rooms[roomId].some((room) => room.role === "player2");
  } else {
    throw new Error("Room id not found");
  }
};

export { hasRoomId, hasPlayer1, hasPlayer2 };
