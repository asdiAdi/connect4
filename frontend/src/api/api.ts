import { request } from "src/utils/crud.ts";
import { Active_Game, Active_Games, Past_Game, Past_Games } from "types/api";

const postGame = () =>
  request<{ game_id: string }>({ method: "POST", url: "/game" });

const getActiveGame = (gameId: string) =>
  request<Active_Game>({ method: "GET", url: `/games/${gameId}` });

const getActiveGames = () =>
  request<Active_Games>({ method: "GET", url: `/games/` });

const getPastGame = (gameId: string) =>
  request<Past_Game>({ method: "GET", url: `/histories/${gameId}` });

const getPastGames = () =>
  request<Past_Games>({ method: "GET", url: "/histories" });

export { postGame, getActiveGame, getActiveGames, getPastGame, getPastGames };
