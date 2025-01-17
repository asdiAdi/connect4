import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
const SECRET = process.env.SECRET as string;

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }

  try {
    const decoded = verify(token, SECRET);
    if (typeof decoded !== "string") {
      if ("userId" in decoded && "username" in decoded) {
        next();
        return;
      }
    }
    res.status(401).send({ message: "No token provided" });
  } catch (err) {
    console.error(err);
  }
}

export { verifyToken };
