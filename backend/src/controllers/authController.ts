import { Request, Response } from "express";

// Databases
// TODO: User
// userid, username, password, key to own user History, key to current Active Game, wins, loss, date created, last login
// TODO: History
// historyId, key to Win User(id), key to Lose User(id), gameHistory array data

// TODO: Create User
// TODO: Login User
// TODO: generateToken / sessions
// TODO: change password
// TODO: 2 factor
// TODO: Captcha

const createUser = async (req: Request, res: Response) => {
  try {
  } catch (error) {
    console.log(error);
    res.status(500).send({ text: "Something went wrong" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
  } catch (err) {
    console.error(err);
    res.status(500).send({ text: "Something went wrong" });
  }
};
