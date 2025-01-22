import { Request, Response, NextFunction } from "express";
import { getUserTokenData } from "../utils/auth";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    const tokenData = getUserTokenData(req.headers.authorization);
    if (tokenData) {
      next();
    } else {
      res.status(401).send({ message: "No token provided" });
    }

    return;
  } catch (err) {
    console.error(err);
  }
}

export { verifyToken };
