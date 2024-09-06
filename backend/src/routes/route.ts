import { Router } from "express";
import { createRoom, getRoom } from "../controllers/controller";
import { generateBoard } from "../utils/game";

const route = Router();

route.get("/", (req, res) => {
  // res.send("Welcome to the server!");
  res.send(JSON.stringify({ board: generateBoard([1]) }));
});
route.post("/create-room", createRoom);
route.get("/r/:roomId", getRoom);

export { route };
