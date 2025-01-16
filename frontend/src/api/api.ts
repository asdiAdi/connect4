import { request } from "src/utils/crud.ts";
import { Active_Game, Active_Games, Past_Game, Past_Games } from "types/api";

const postRegister = (username: string, password: string) =>
  request<{ token: string }>({
    method: "POST",
    url: "/register",
    data: { username, password },
  });

const postLogin = (username: string, password: string) =>
  request<{ token: string }>({
    method: "POST",
    url: "/login",
    data: { username, password },
  });

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

export {
  postRegister,
  postLogin,
  postGame,
  getActiveGame,
  getActiveGames,
  getPastGame,
  getPastGames,
};
