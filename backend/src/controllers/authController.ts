import { NextFunction, Request, Response } from "express";
import { compare, hash } from "bcrypt";
import db from "../models";
import { sign, verify } from "jsonwebtoken";

// Databases
// TODO: total win, loss, user history
// TODO: change password
// TODO: 2 factor
// TODO: Captcha
// TODO: rate limit

const SECRET = process.env.SECRET as string;

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;
    if (token) {
      const decoded = verify(token, SECRET);
      if (typeof decoded !== "string") {
        if ("userId" in decoded && "username" in decoded) {
          next();
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
          userId: user.user_id,
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
            userId: user.user_id,
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
