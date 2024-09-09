// game is read based on move history
import { Board, BoardHistory, Turn, TurnPlayer } from "../types/global";

// makes board based on history and validates if board is possible
const generateBoard = (bh: BoardHistory): Board => {
  const board: Board = new Array(6)
    .fill(0)
    .map(() => new Array(7).fill(0).map(() => 0));

  // store last turn index per column
  const boardMemory: number[] = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < bh.length; i++) {
    const turn = bh[i];
    if (typeof turn === "number") {
      // error handling
      if (turn < 1 || turn > 7 || boardMemory[turn - 1] >= 6) {
        throw new Error("Invalid Turn number");
      }

      // store turnPlayer on board
      board[boardMemory[turn - 1]][turn - 1] = i % 2 === 0 ? "p1" : "p2";
      boardMemory[turn - 1] += 1;
    } else if (turn === "!") {
      // game is won
    } else {
      throw new Error("Invalid Data");
    }
  }

  return board;
};

const placeBoard = (
  turn: Turn,
  board: Board,
  turnPlayer?: TurnPlayer,
): Board => {
  // prevent mutation
  const _board = board.map((row) => [...row]);
  let _turnPlayer: TurnPlayer = "p1";
  // turnPlayer can be computed by the number turns on the board
  if (turnPlayer === undefined) {
    for (let j = 0; j < _board[0].length; j++) {
      for (let i = 0; i < _board.length; i++) {
        if (_board[i][j] === 0) {
          // skip entire column since there are no more chips here
          break;
        } else {
          _turnPlayer = _turnPlayer === "p1" ? "p2" : "p1";
        }
      }
    }
  } else {
    _turnPlayer = turnPlayer;
  }

  if (turn < 1 || turn > 7 || _board[5][turn - 1] !== 0) {
    throw new Error("Invalid Turn number");
  }

  let index = 0;
  while (_board[index][turn - 1] !== 0) {
    index++;

    if (index === 7) {
      throw new Error("Invalid Turn count");
    }
  }
  _board[index][turn - 1] = _turnPlayer;

  console.log(index);

  return _board;
};

const isWon = (): boolean => {
  return false;
};

export { generateBoard, placeBoard, isWon };
