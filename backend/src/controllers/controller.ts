import { Request, Response } from "express";
import db from "../models";
import { v4 } from "uuid";

const postGame = async (req: Request, res: Response) => {
  try {
    const game_id = v4();
    await db.ActiveGames.create({ game_id });

    res.send({ game_id });
  } catch (err) {
    console.error(err);
    res.status(500).send({ text: "Something went wrong" });
  }
};

const getActiveGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const activeGame = await db.ActiveGames.findOne({
      where: { game_id: gameId },
    });

    if (!activeGame) {
      res.status(200).send({ text: `No game with id ${gameId}` });
    } else {
      res.send(activeGame);
    }
  } catch (err) {
    res.status(500).send({ text: "Something went wrong" });
  }
};

const getActiveGames = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const activeGames = await db.ActiveGames.findAll();

    if (!activeGames) {
      res.status(200).send({ text: `No game with id ${gameId}` });
    } else {
      res.send(activeGames);
    }
  } catch (err) {
    res.status(500).send({ text: "Something went wrong" });
  }
};

const getHistory = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const history = await db.History.findOne({ where: { game_id: gameId } });

    if (!history) {
      res.status(200).send({ text: `No game with id ${gameId}` });
    } else {
      res.send(history);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ text: "Something went wrong" });
  }
};

const getHistories = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const histories = await db.History.findAll();

    if (!histories) {
      res.status(200).send({ text: `No game with id ${gameId}` });
    } else {
      res.send(histories);
    }
  } catch (err) {
    res.status(500).send({ text: "Something went wrong" });
  }
};

export { postGame, getActiveGame, getActiveGames, getHistory, getHistories };
