import { Router } from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/authController";
import {
  postGame,
  getActiveGame,
  getActiveGames,
  getHistories,
  getHistory,
} from "../controllers/controller";
import { verifyToken } from "../middlewares/authMiddleware";

const route = Router();

// auth
route.post("/register", registerUser);
route.post("/login", loginUser);
route.get("/user", getUser);

// game
route.get("/games/:gameId", verifyToken, getActiveGame);
route.get("/games", verifyToken, getActiveGames);
route.get("/histories/:gameId", verifyToken, getHistory);
route.get("/histories", verifyToken, getHistories);
route.post("/game", verifyToken, postGame);

export { route };
