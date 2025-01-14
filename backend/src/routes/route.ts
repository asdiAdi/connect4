import { Router } from "express";
import {
  postGame,
  getActiveGame,
  getActiveGames,
  getHistories,
  getHistory,
} from "../controllers/controller";
import { generateBoard } from "../utils/game";

const route = Router();

route.get("/", (req, res) => {
  // res.send("Welcome to the server!");
  res.send(JSON.stringify({ board: generateBoard([1]) }));
});
route.get("/games/:gameId", getActiveGame);
route.get("/games", getActiveGames);
route.get("/histories/:gameId", getHistory);
route.get("/histories", getHistories);
route.post("/game", postGame);

export { route };
