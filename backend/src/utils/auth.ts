import { verify } from "jsonwebtoken";
import { TokenData } from "../types/global";

const SECRET = process.env.SECRET as string;

function getUserTokenData(token?: string): TokenData | undefined {
  if (!!token) {
    const decoded = verify(token, SECRET);

    if (typeof decoded !== "string") {
      if ("userId" in decoded && "username" in decoded) {
        const { userId, username } = decoded;
        return { userId, username };
      }
    }
  }

  return undefined;
}

export { getUserTokenData };
