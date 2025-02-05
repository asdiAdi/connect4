import { Request, Response } from "express";
import { compare, hash } from "bcrypt";
import db from "../models";
import { sign } from "jsonwebtoken";
import { getUserTokenData } from "../utils/auth";

const SECRET = process.env.SECRET as string;

const getUser = async (req: Request, res: Response) => {
  try {
    const tokenData = getUserTokenData(req.headers.authorization);
    if (tokenData) {
      const { username } = tokenData;
      const isExisting =
        (await db.Users.findOne({ where: { username } })) !== null;

      if (isExisting) {
        res.send({ username: tokenData.username });
      } else {
        res.status(401).send({ message: "No token provided" });
      }
    } else {
      res.status(401).send({ message: "No token provided" });
    }

    return;
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hash(password, 10);

    const isExisting =
      (await db.Users.findOne({ where: { username } })) !== null;

    if (isExisting) {
      res.send({ token: null, message: "User already exists" });
    } else {
      const user = await db.Users.create({
        username: username,
        password: hashedPassword,
      });
      const token = sign(
        {
          userId: user.id,
          username: user.username,
        },
        SECRET,
        { expiresIn: "30d" },
      );

      res.send({ token });
    }

    //   login
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const user = await db.Users.findOne({ where: { username } });

    if (user === null) {
      res.send({
        token: null,
        message: "Wrong username or password",
      });
    } else {
      const passwordMatch = await compare(password, user.password);
      if (!passwordMatch) {
        res.send({ token: null, message: "Invalid password" });
      } else {
        const token = sign(
          {
            userId: user.id,
            username: user.username,
          },
          SECRET,
          { expiresIn: "30d" },
        );

        res.send({ token });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Something went wrong" });
  }
};

export { getUser, registerUser, loginUser };
