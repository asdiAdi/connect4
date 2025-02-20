import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "types/socket";

const URL = import.meta.env.VITE_API_URL || null;

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(URL, {
  autoConnect: false,
});

export default socket;
