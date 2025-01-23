// on
import { Board, BoardHistory, Turn, TurnPlayer } from "types/game";
import { Active_Game, Past_Game } from "types/api";
import { PlayerData } from "types/global";

type SocketEvents = "setup-board" | "countdown" | "update-board" | "game-over";

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
  "game-over": (winner: string) => void;
  pause: (isPaused: boolean) => void;
  "add-player-two": (name: name) => void;
  "observer-count": (num: number) => void;
  "add-chat-history": (user: string, message: string) => void;
};

// emit
type ClientToServerEvents = {
  // hello: () => void;
  "join-room": (roomId: string) => void;
  "start-game": (gameId, maxDuration) => void;
  "place-board": (gameId: string, turn: Turn) => void;
  initialize: (gameId: string, username: string) => void;
  "send-chat": (gameId: string, username: string, message: string) => void;
};

// store
type SocketStoreProps = {
  isConnected: boolean;
};
type SocketStore = SocketStoreProps & {
  winner: string;
  chatHistory: { user: string; message: string }[];
  sendChat: (gameId: string, username: string, message: string) => void;
  addChatHistory: (user: string, message: string) => void;
  setIsConnected: (connection: boolean) => void;
  connect: (gameId: string, username: string) => void;
  disconnect: () => void;

  startGame: (gameId: string, maxDuration: number) => void;
  setBoard: (bh: boardHistory) => void;
  placeBoard: (gameId: string, turn: Turn) => void;
  updateBoard: (turnPlayer: TurnPlayer, bh: BoardHistory) => void;
  endGame: (winner: string) => void;

  isPaused: boolean;
  isWon: false | string;
  board: Board;
  counter: number;
  turnPlayer: TurnPlayer;
  observerCount: number;

  playerOne: PlayerData;
  playerTwo: PlayerData;
  setTurnPlayer: (player: TurnPlayer) => void;
  setCounter: (counter: number) => void;
  setObserverCount: (count: number) => void;
  setGame: (game: Active_Game | Past_Game) => void;
  setPause: (isPaused: boolean) => void;
  setPlayerTwo: (name: string) => void;
};
export {
  ServerToClientEvents,
  ClientToServerEvents,
  SocketStoreProps,
  SocketStore,
  SocketEvents,
};
