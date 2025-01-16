import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ message: "No token provided" });
  }
  const SECRET = process.env.SECRET as string;

  try {
    const decoded = verify(token, SECRET);
    console.log(decoded);
    // next();
  } catch (err) {
    console.error(err);
  }
}

export { verifyToken };
