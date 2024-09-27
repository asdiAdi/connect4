import express from "express";
import cors from "cors";
import "dotenv/config";
import { createServer } from "node:http";
import { Server } from "socket.io";
// import { rooms } from "./src/controllers/controller";
// import { hasPlayer1, hasPlayer2, hasRoomId } from "./src/utils/room";
import { route } from "./src/routes/route";
import { applySocketsMiddlewares } from "./src/sockets";
import db from "./src/models";

const PORT = process.env.PORT;
// const API = `http://localhost:${PORT}`;
const app = express();
app.use(cors());
// parse application/json
app.use(express.json({ limit: "10mb" }));
app.use(route);

const server = createServer(app);

const io = new Server(server, {
  cors: { origin: true },
});

applySocketsMiddlewares(io);

void db.sync();

server.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
