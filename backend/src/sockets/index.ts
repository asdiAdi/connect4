import { Server } from "socket.io";
import { Timeout } from "../types/global";
import { countDown } from "../utils/time";
import db from "../models/index";
import { validateTurn } from "../utils/game";

const applySocketsMiddlewares = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);
    // const middlewares = require("../middlewares").socketMiddlewares;
    // middlewares.forEach((middleware) => middleware(socket, () => {}));
    // chat(socket);

    const counters: { game_id: string; interval: Timeout }[] = [];

    socket.on("start-game", async (config: { maxDuration: number }) => {
      console.log("game started", config);
      // TODO: History
      //generate board and put to history

      const { game_id, board_history } = await db.ActiveGames.create();

      const interval = countDown({
        maxDuration: config.maxDuration,
        callback: (num) => {
          socket.emit("countdown", num);
        },
        onEndCallback: async () => {
          const activeGame = await db.ActiveGames.findByPk(game_id);

          if (!activeGame) {
            throw Error("No game found with id " + game_id);
          }

          const nextTurnPlayer = activeGame.turn_player === "p1" ? "p2" : "p1";
          await db.ActiveGames.update(
            { turn_player: nextTurnPlayer },
            {
              where: {
                game_id,
              },
            },
          );

          socket.emit("turn-change", nextTurnPlayer);
        },
      });

      counters.push({ game_id, interval });
      socket.emit("setup-board", board_history);
    });

    socket.on("place-board", async (game_id, turn: number) => {
      // TODO: add try catch
      const activeGame = await db.ActiveGames.findByPk(game_id);

      if (!activeGame) {
        throw Error("No game found with id " + game_id);
      }

      const { board_history, turn_player } = activeGame;

      if (!validateTurn(turn, board_history)) {
        throw Error("Turns not found with id " + game_id);
      }

      // TODO: if isWon

      const nextTurnPlayer = turn_player === "p1" ? "p2" : "p1";
      const nextBoardHistory = board_history.concat([turn]);

      await db.ActiveGames.update(
        {
          board_history: board_history.concat([turn]),
          turn_player: nextTurnPlayer,
        },
        {
          where: {
            game_id,
          },
        },
      ).then(() => {
        socket.emit("place-board", nextBoardHistory);
        socket.emit("turn-change", nextTurnPlayer);
      });
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });
};

export { applySocketsMiddlewares };
