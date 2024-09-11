import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "types/socket";

// "undefined" means the URL will be computed from the `window.location` object
// const URL =
//   process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";
// const URL = `http://localhost:${process.env.VITE_PORT}`;

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:4000",
  {
    autoConnect: false,
  },
);

export default socket;
