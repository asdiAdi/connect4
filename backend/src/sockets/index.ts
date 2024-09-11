import { Server } from "socket.io";

// const chat = require("./chat");

const applySocketsMiddlewares = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);
    // const middlewares = require("../middlewares").socketMiddlewares;
    // middlewares.forEach((middleware) => middleware(socket, () => {}));
    // chat(socket);
    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });
};

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

export { applySocketsMiddlewares };
