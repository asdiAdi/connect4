import { Request, Response } from "express";
import db from "../models";
import { v4 } from "uuid";
import { verify } from "jsonwebtoken";
const SECRET = process.env.SECRET as string;

const postGame = async (req: Request, res: Response) => {
  try {
    const game_id = v4();
    const token = req.headers.authorization;
    // settings
    const { max_duration } = req.body;

    if (token) {
      const decoded = verify(token, SECRET);
      if (typeof decoded !== "string") {
        if ("userId" in decoded && "username" in decoded) {
          const { username } = decoded;
          await db.ActiveGames.create({
            game_id,
            player_one: username,
            counter: max_duration ?? 5,
          });
          res.send({ game_id });
          return;
        }
      }
    }

    res.status(401).send({ message: "No token provided" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getActiveGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const activeGame = await db.ActiveGames.findOne({
      where: { game_id: gameId },
    });

    if (!activeGame) {
      res.status(200).send({ message: `No game with id ${gameId}` });
    } else {
      res.send(activeGame);
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getActiveGames = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const activeGames = await db.ActiveGames.findAll();

    if (!activeGames) {
      res.status(200).send({ message: `No game with id ${gameId}` });
    } else {
      res.send(activeGames);
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getHistory = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const history = await db.History.findOne({ where: { game_id: gameId } });

    if (!history) {
      res.status(200).send({ message: `No game with id ${gameId}` });
    } else {
      res.send(history);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const getHistories = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const histories = await db.History.findAll();

    if (!histories) {
      res.status(200).send({ message: `No game with id ${gameId}` });
    } else {
      res.send(histories);
    }
  } catch (err) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export { postGame, getActiveGame, getActiveGames, getHistory, getHistories };
