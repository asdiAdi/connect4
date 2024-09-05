import express from "express";
import "dotenv/config";
import { createServer } from "node:http";
// import { Server } from "socket.io";
// import { rooms } from "./src/controllers/controller";
// import { hasPlayer1, hasPlayer2, hasRoomId } from "./src/utils/room";
import { route } from "./src/routes/route";

const PORT = process.env.PORT;
// const API = `http://localhost:${PORT}`;

const app = express();
// parse application/json
app.use(express.json({ limit: "10mb" }));

const server = createServer(app);
// const io = new Server(server, {
//   cors: { origin: true },
// });

app.use(route);

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   const userId = socket.id;
//   socket.on("join-room", (roomId) => {
//     try {
//       if (!hasRoomId(roomId)) {
//         socket.emit("error", { text: `No room with id ${roomId}` });
//         socket.disconnect();
//       } else {
//         socket.join(roomId);
//         if (!hasPlayer1(roomId) && !hasPlayer2(roomId)) {
//           //   assign player 1
//           rooms[roomId].push({ userId, role: "player1", name: "" });
//         } else if (!hasPlayer1(roomId) && hasPlayer2(roomId)) {
//           //   assign player 1
//           //   This should not trigger ever
//           rooms[roomId].push({ userId, role: "player1", name: "" });
//         } else if (hasPlayer1(roomId) && !hasPlayer2(roomId)) {
//           //   assign player 2
//           rooms[roomId].push({ userId, role: "player2", name: "" });
//         } else {
//           //   assign watcher
//           rooms[roomId].push({ userId, role: "watcher", name: "" });
//         }
//       }
//
//       console.log({ rooms });
//     } catch (err) {
//       socket.emit("error", err);
//     }
//   });
//
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
//
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

server.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
