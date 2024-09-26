import { createBrowserRouter } from "react-router-dom";
import MainMenu from "views/main-menu/MainMenu.tsx";
import GameRules from "views/game-rules/GameRules.tsx";
import Game from "views/game/Game.tsx";
import Test from "src/Test.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <MainMenu />,
    element: <Test />,
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

export default router;
