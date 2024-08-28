import { Router } from "express";
import { createRoom, getRoom } from "../controllers/controller";

const route = Router();

route.get("/", (req, res) => {
  res.send("hello world");
});
route.post("/create-room", createRoom);
route.get("/r/:roomId", getRoom);

export { route };
