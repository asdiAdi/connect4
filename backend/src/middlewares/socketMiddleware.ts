import { Server } from "socket.io";
import db from "../models/index";
import { generateBoard, getWinningPositions, placeBoard } from "../utils/game";

// seconds
const MAX_ROOM_TIMEOUT = 60 * 60;
//TODO: reload bug
//TODO: history page

const applySocketsMiddlewares = (io: Server) => {
  setInterval(async () => {
    const activeGames = await db.ActiveGames.findAll();
    activeGames.forEach((game) => {
      const {
        game_id,
        counter,
        max_duration,
        is_paused,
        turn_player,
        player_one_connection,
        player_two_connection,
      } = game;
      const room = io.sockets.adapter.rooms.get(game_id);

      if (!room || room.size === 0) {
        // destroy room if unused for 60 minutes
        if (
          Math.floor(Math.abs(game.updated_at.valueOf() - Date.now()) / 1000) >=
          MAX_ROOM_TIMEOUT
        ) {
          game.destroy();
        }
        // destroy immediately
        // game.destroy();
        return;
      }

      let numPlayers = 0;

      // update socket connection upon disconnection
      if (!room.has(player_one_connection)) {
        game.update({ player_one_connection: "" });
      } else {
        numPlayers += 1;
      }
      if (!room.has(player_two_connection)) {
        game.update({ player_two_connection: "" });
      } else {
        numPlayers += 1;
      }

      io.to(game_id).emit("observer-count", room ? room.size - numPlayers : 0);

      if (room.has(player_one_connection) && room.has(player_two_connection)) {
        game.update({ is_paused: false });
        io.to(game_id).emit("pause", false);
      } else {
        game.update({ is_paused: true });
        io.to(game_id).emit("pause", true);
      }

      if (is_paused) return;

      if (counter <= 0) {
        const nextTurnPlayer = turn_player === "p1" ? "p2" : "p1";
        game.update({
          counter: max_duration,
          turn_player: nextTurnPlayer,
        });

        io.to(game_id).emit("turn-change", nextTurnPlayer);
        io.to(game_id).emit("countdown", max_duration);
      } else {
        game.decrement("counter", { by: 1 });
        io.to(game_id).emit("countdown", counter - 1);
      }
    });
  }, 1000);

  io.on("connection", (socket) => {
    socket.emit("connected");

    socket.on("initialize", async (game_id: string, username: string) => {
      const game = await db.ActiveGames.findByPk(game_id);
      if (!game || !username) {
        return;
        //   TODO: err
      }

      const { player_one, player_two } = game;
      await socket.join(game_id);

      if (player_one === username) {
        if (socket.id !== game.player_one_connection) {
          io.sockets.sockets.forEach((s) => {
            if (s.id === game.player_one_connection) {
              s.disconnect();
            }
          });
        }
        await game.update({ player_one_connection: socket.id });
      } else if (player_two === username) {
        if (socket.id !== game.player_two_connection) {
          io.sockets.sockets.forEach((s) => {
            if (s.id === game.player_two_connection) {
              s.disconnect();
            }
          });
        }
        await game.update({ player_two_connection: socket.id });
        io.to(game_id).emit("add-player-two", username);
      }
    });

    // const middlewares = require("../middlewares").socketMiddlewares;
    // middlewares.forEach((middleware) => middleware(socket, () => {}));
    // chat(socket);

    socket.on("start-game", async (game_id: string, max_duration: number) => {
      const [game] = await db.ActiveGames.findOrCreate({
        where: { game_id },
      });
      await game.update({ max_duration, is_paused: false });
    });

    socket.on("place-board", async (game_id, turn: number) => {
      // TODO: add try catch
      const activeGame = await db.ActiveGames.findByPk(game_id);

      if (!activeGame) {
        throw Error("No game found with id " + game_id);
      }

      const { board_history, turn_player, max_duration } = activeGame;
      const board = generateBoard(board_history);

      if (
        !(
          (turn_player === "p1" && turn > 0) ||
          (turn_player === "p2" && turn < 0)
        )
      ) {
        return;
      }
      placeBoard(turn, board);

      const positions = getWinningPositions(board);
      const isWon = positions.length > 0;

      const nextTurnPlayer = turn_player === "p1" ? "p2" : "p1";
      const nextBoardHistory = board_history.concat(isWon ? [turn, 0] : [turn]);

      await db.ActiveGames.update(
        {
          board_history: nextBoardHistory,
          turn_player: nextTurnPlayer,
          counter: max_duration,
        },
        {
          where: {
            game_id,
          },
        },
      );

      io.to(game_id).emit("turn-change", nextTurnPlayer);
      io.to(game_id).emit("update-board", nextTurnPlayer, nextBoardHistory);
      io.to(game_id).emit("countdown", max_duration);

      if (isWon) {
        // await db.History.create({
        //   game_id,
        //   board_history: nextBoardHistory,
        //   winner: turn_player,
        //   loser: turn_player === "p1" ? "p2" : "p1",
        // });
        await db.ActiveGames.destroy({ where: { game_id } });

        io.to(game_id).emit("game-over");
      }
    });

    socket.on(
      "send-chat",
      async (gameId, username: string, message: string) => {
        io.to(gameId).emit("add-chat-history", username, message);
      },
    );

    socket.on("disconnect", () => {
      console.log("disconnected", socket.id);
    });
  });
};

export { applySocketsMiddlewares };
