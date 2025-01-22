import { Request, Response } from "express";
import db from "../models";
import { v4 } from "uuid";
import { getUserTokenData } from "../utils/auth";

const postGame = async (req: Request, res: Response) => {
  try {
    const game_id = v4();
    // settings
    const { max_duration } = req.body;

    const tokenData = getUserTokenData(req.headers.authorization);

    if (tokenData) {
      await db.ActiveGames.create({
        game_id,
        player_one: tokenData.username,
        counter: max_duration ?? 5,
      });
      res.send({ game_id });
      return;
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
    const tokenData = getUserTokenData(req.headers.authorization);

    if (activeGame && tokenData) {
      const { player_one, player_two } = activeGame;
      const { username } = tokenData;

      if (player_one !== username && player_two === "") {
        await activeGame.update({
          player_two: username,
        });
      }
      // else if (player_one === "" && player_two !== "") {
      //   const observers = activeGame.observers;
      //   if (!observers.includes(username)) {
      //     await activeGame.update({
      //       observers: [...observers, username],
      //     });
      //   }
      // }

      res.send(activeGame);
    } else {
      res.status(200).send({ message: `No game with id ${gameId}` });
    }

    return;
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
