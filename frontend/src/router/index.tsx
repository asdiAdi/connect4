import { createBrowserRouter } from "react-router-dom";
import MainMenu from "views/main-menu/MainMenu.tsx";
import GameRules from "views/game-rules/GameRules.tsx";
import Local from "views/game/Local.tsx";
import Online from "views/game/Online.tsx";

const router = createBrowserRouter([
  { path: "/", element: <MainMenu /> },
  {
    path: "/game",
    element: <Local />,
  },
  {
    path: "/game/:gameId",
    // element: <MainMenu />,
    element: <Online />,
  },
  {
    path: "/game-rules",
    element: <GameRules />,
  },
]);

export default router;
