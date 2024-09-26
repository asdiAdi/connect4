// on
import { Board, BoardHistory, Turn, TurnPlayer } from "types/game";

type SocketEvents = "setup-board" | "countdown";

type ServerToClientEvents = {
  // noArg: () => void;
  // basicEmit: (a: number, b: string, c: Buffer) => void;
  // withAck: (d: string, callback: (e: number) => void) => void;
  error: () => void;

  event: (value: SocketEvents) => void;
  "setup-board": (boardHistory: BoardHistory) => void;
  countdown: (num: number) => void;
  "turn-change": (turnPlayer: TurnPlayer) => void;
};

// emit
type ClientToServerEvents = {
  // hello: () => void;
  "join-room": (roomId: string) => void;
  "start-game": (config: Config) => void;
  "place-board": (turn: Turn) => void;
};

// config
type Config = {
  maxDuration: number;
};

// store
type SocketStoreProps = {
  isConnected: boolean;
};
type SocketStore = SocketStoreProps & {
  setIsConnected: (connection: boolean) => void;
  connect: () => void;
  disconnect: () => void;

  startGame: (config?: Config) => void;
  setBoard: (board: Board) => void;
  placeBoard: (turn: Turn) => void;

  pause: boolean;
  board: Board;
  timeLeft: number;
};
export {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketStoreProps,
  SocketStore,
  SocketEvents,
};
