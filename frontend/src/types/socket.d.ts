// on
import { Board, BoardHistory, Turn, TurnPlayer } from "types/game";

type SocketEvents = "setup-board" | "countdown" | "update-board";

type ServerToClientEvents = {
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
  error: () => void;

  event: (value: SocketEvents) => void;
  "setup-board": (boardHistory: BoardHistory) => void;
  countdown: (num: number) => void;
  "turn-change": (turnPlayer: TurnPlayer) => void;
  "update-board": (turnPlayer: TurnPlayer, bh: BoardHistory) => void;
};

// emit
type ClientToServerEvents = {
  // hello: () => void;
  "join-room": (roomId: string) => void;
  "start-game": (gameId, maxDuration) => void;
  "place-board": (gameId: string, turn: Turn) => void;
  initialize: (gameId: string) => void;
};

// store
type SocketStoreProps = {
  isConnected: boolean;
};
type SocketStore = SocketStoreProps & {
  setIsConnected: (connection: boolean) => void;
  connect: (gameId: string) => void;
  disconnect: () => void;

  startGame: (gameId: string, maxDuration: number) => void;
  setBoard: (bh: boardHistory) => void;
  placeBoard: (gameId: string, turn: Turn) => void;
  updateBoard: (turnPlayer: TurnPlayer, bh: BoardHistory) => void;

  pause: boolean;
  board: Board;
  timeLeft: number;
  turnPlayer: TurnPlayer;

  setTurnPlayer: (player: TurnPlayer) => void;
};
export {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketStoreProps,
  SocketStore,
  SocketEvents,
};
