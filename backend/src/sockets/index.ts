import { Server } from "socket.io";
import { BoardHistory, TurnPlayer } from "../types/game";
import { Timeout } from "../types/global";
import { randomString } from "../utils/random";
import ActiveGames from "../models/ActiveGames";

// const chat = require("./chat");
// mimic activeGame on database
type ActiveGame = {
  game_id: string;
  board_history: BoardHistory;
  max_duration: number;
  turn_player: TurnPlayer;
};
const activeGames: ActiveGame[] = [];

const setActiveGame = (
  gameId: string,
  change: {
    boardHistory?: BoardHistory;
    counter?: number;
    turnPlayer?: TurnPlayer;
  },
) => {
  activeGames.map((game) =>
    game.game_id === gameId ? { ...game, ...change } : game,
  );
};

const boardHistory: BoardHistory = [];

const countDown = ({
  maxDuration,
  callback,
  onEndCallback,
}: {
  maxDuration: number;
  callback: (num: number) => void;
  onEndCallback: () => void;
}): Timeout => {
  let count = maxDuration;
  return setInterval(() => {
    count--;
    callback(count);

    if (count == 0) {
      onEndCallback();
      count = maxDuration;
    }
  }, 1000);
};

const applySocketsMiddlewares = (io: Server) => {
  io.on("connection", (socket) => {
    console.log(`New connection: ${socket.id}`);
    // const middlewares = require("../middlewares").socketMiddlewares;
    // middlewares.forEach((middleware) => middleware(socket, () => {}));
    // chat(socket);

    // should have a unique identifier per id

    const counters: { gameId: string; interval: Timeout }[] = [];

    socket.on("start-game", async (config: { maxDuration: number }) => {
      console.log("game started", config);
      // TODO: create game id, Active Game, History
      //generate board and put to history
      //link game id to users or socket ids

      const newGameId = randomString(8);
      const x = await ActiveGames.create({
        game_id: newGameId,
        board_history: [],
        max_duration: config.maxDuration,
        turn_player: "p1",
        is_paused: false,
      });
      console.log(x);

      const interval = countDown({
        maxDuration: config.maxDuration,
        callback: (num) => {
          setActiveGame(newGameId, { counter: num });
          socket.emit("countdown", { timeLeft: num });
        },
        onEndCallback: () => {
          // const player =
          //
          // activeGame.turnPlayer = player;
          // socket.emit("turn-change", { turnPlayer: player });
        },
      });

      counters.push({ gameId: newGameId, interval: interval });
      socket.emit("setup-board", { boardHistory });
    });

    socket.on("place-board", (turn: number) => {
      boardHistory.push(turn);
      socket.emit("place-board", boardHistory);
    });

    socket.on("disconnect", () => {
      console.log(`Disconnected: ${socket.id}`);
    });
  });
};

// io.on("connection", (socket) => {
//   console.log("a user connected");
//   const userId = socket.id;
//   socket.on("join-room", (roomId) => {
//     try {
//       if (!hasRoomId(roomId)) {
//         socket.emit("error", { text: `No room with id ${roomId}` });
//         socket.disconnect();
//       } else {
//         socket.join(roomId);
//         if (!hasPlayer1(roomId) && !hasPlayer2(roomId)) {
//           //   assign player 1
//           rooms[roomId].push({ userId, role: "player1", name: "" });
//         } else if (!hasPlayer1(roomId) && hasPlayer2(roomId)) {
//           //   assign player 1
//           //   This should not trigger ever
//           rooms[roomId].push({ userId, role: "player1", name: "" });
//         } else if (hasPlayer1(roomId) && !hasPlayer2(roomId)) {
//           //   assign player 2
//           rooms[roomId].push({ userId, role: "player2", name: "" });
//         } else {
//           //   assign watcher
//           rooms[roomId].push({ userId, role: "watcher", name: "" });
//         }
//       }
//
//       console.log({ rooms });
//     } catch (err) {
//       socket.emit("error", err);
//     }
//   });
//
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
//
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

export { applySocketsMiddlewares };
