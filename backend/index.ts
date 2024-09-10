import express from "express";
import "dotenv/config";
import { createServer } from "node:http";
import { Server } from "socket.io";
// import { rooms } from "./src/controllers/controller";
// import { hasPlayer1, hasPlayer2, hasRoomId } from "./src/utils/room";
import { route } from "./src/routes/route";
import { Sequelize } from "sequelize";
import { applySocketsMiddlewares } from "./src/sockets";

const PORT = process.env.PORT;
// const API = `http://localhost:${PORT}`;
const PGHOST = process.env.PGHOST as string;
const PGPORT = process.env.PGPORT as string;
const PGUSER = process.env.PGUSER as string;
const PGPASSWORD = process.env.PGPASSWORD as string;
const PGDATABASE = process.env.PGDATABASE as string;

const app = express();
// parse application/json
app.use(express.json({ limit: "10mb" }));
app.use(route);

const server = createServer(app);
const sequelize = new Sequelize(
  `postgres://${PGUSER}:${PGPASSWORD}@${PGHOST}:${PGPORT}/${PGDATABASE}`,
);
// const sequelize = new Sequelize(PGDATABASE, PGUSER, PGPASSWORD, {
//   dialect: "postgres",
//   dialectOptions: {
//   },
// });

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

const io = new Server(server, {
  cors: { origin: true },
});

applySocketsMiddlewares(io);

server.listen(PORT, () => {
  console.log(`server running at port: ${PORT}`);
});
