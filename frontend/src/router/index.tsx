import { createBrowserRouter } from "react-router-dom";
import MainMenu from "views/main-menu/MainMenu.tsx";
import GameRules from "views/game-rules/GameRules.tsx";
import Game from "views/game/Game.tsx";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainMenu />,
  },
  {
    path: "/game-rules",
    element: <GameRules />,
  },
  {
    path: "/game",
    element: <Game />,
  },
  // TODO: you can return to a paused/saved game /multiplay game
  // {
  //   path: "/game/:gameId",
  //   element: <Game />,
  // },
]);

export default routes;
