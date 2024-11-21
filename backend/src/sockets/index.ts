import { Server } from "socket.io";
import db from "../models/index";
import { generateBoard, getWinningPositions, placeBoard } from "../utils/game";

const applySocketsMiddlewares = (io: Server) => {
  setInterval(async () => {
    const activeGames = await db.ActiveGames.findAll();
    activeGames.forEach((game) => {
      const { game_id, counter, max_duration, is_paused, turn_player } = game;
      const room = io.sockets.adapter.rooms.get(game_id);

      if (!room || room.size === 0) {
        game.destroy();
        return;
      } else if (room.size === 1) {
        game.update({ is_paused: true });
        return;
      }

      if (is_paused) return;

      if (counter > max_duration) {
        const nextTurnPlayer = turn_player === "p1" ? "p2" : "p1";
        game.update({
          counter: 0,
          turn_player: nextTurnPlayer,
        });

        // io.to(game_id).emit("turn-change", nextTurnPlayer);
      } else {
        game.increment("counter", { by: 1 });
        // io.to(game_id).emit("countdown", counter + 1);
      }
    });
  }, 1000);

  io.on("connection", (socket) => {
    socket.emit("connected");

    socket.on("initialize", async (gameId) => {
      socket.join(gameId);
    });

    // const middlewares = require("../middlewares").socketMiddlewares;
    // middlewares.forEach((middleware) => middleware(socket, () => {}));
    // chat(socket);

    socket.on("start-game", async (game_id: string, max_duration: number) => {
      const [game] = await db.ActiveGames.findOrCreate({
        where: { game_id },
      });
      await game.update({ max_duration });
    });

    socket.on("place-board", async (game_id, turn: number) => {
      // TODO: add try catch
      const activeGame = await db.ActiveGames.findByPk(game_id);

      if (!activeGame) {
        throw Error("No game found with id " + game_id);
      }

      const { board_history, turn_player } = activeGame;
      const board = generateBoard(board_history);

      placeBoard(turn, board);
      const positions = getWinningPositions(board);
      const isWon = positions.length > 0;

      if (isWon) {
        const nextBoardHistory = board_history.concat([turn, 0]);

        await db.ActiveGames.destroy({ where: { game_id } });
        await db.History.create({
          game_id,
          board_history: nextBoardHistory,
          winner: turn_player,
          loser: turn_player === "p1" ? "p2" : "p1",
        });

        socket.emit("game-over", nextBoardHistory);
      } else {
        const nextTurnPlayer = turn_player === "p1" ? "p2" : "p1";
        const nextBoardHistory = board_history.concat([turn]);

        await db.ActiveGames.update(
          {
            board_history: nextBoardHistory,
            turn_player: nextTurnPlayer,
          },
          {
            where: {
              game_id,
            },
          },
        );

        socket.emit("update-board", nextTurnPlayer, nextBoardHistory);
      }
    });

    socket.on("disconnect", () => {
      console.log(socket.id);
    });
  });
};

export { applySocketsMiddlewares };
