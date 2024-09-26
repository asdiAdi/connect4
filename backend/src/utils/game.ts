// game is read based on move history
import {
  Board,
  BoardCell,
  BoardHistory,
  Turn,
  TurnPlayer,
} from "../types/game";

// check turn player based on board count, private function
// const getTurnPlayer = (board: Board): TurnPlayer => {
//   let turnPlayer: TurnPlayer = "p1";
//   // turnPlayer can be computed by the number turns on the board
//   for (let j = 0; j < board[0].length; j++) {
//     for (let i = 0; i < board.length; i++) {
//       if (board[i][j] === 0) {
//         // skip entire column since there are no more chips here
//         break;
//       } else {
//         turnPlayer = turnPlayer === "p1" ? "p2" : "p1";
//       }
//     }
//   }
//
//   return turnPlayer;
// };

// check if array has winning positions, private function
const checkArray = (arr: BoardCell[]): boolean => {
  let turnPlayer: BoardCell = 0;
  let winningPositions: BoardCell[] = [];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] !== 0) {
      if (arr[i] === turnPlayer) {
        winningPositions.push(arr[i]);
      } else {
        turnPlayer = arr[i];
        winningPositions = [arr[i]];
      }
    } else {
      turnPlayer = arr[i];
      winningPositions = [];
    }

    if (winningPositions.length === 4) {
      return true;
    }
  }

  return false;
};

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

// validates and mutates the board
const placeBoard = (turn: Turn, turnPlayer: TurnPlayer, board: Board): void => {
  // validate if turn is valid
  if (turn < 1 || turn > 7 || board[5][turn - 1] !== 0) {
    throw new Error("Invalid turn number");
  }

  // validate if computed turnPlayer is the same as current turnPlayer
  // if (turnPlayer !== getTurnPlayer(board)) {
  //   throw new Error("Turn player not valid");
  // }

  let index = 0;
  while (board[index][turn - 1] !== 0) {
    index++;
  }
  board[index][turn - 1] = turnPlayer;
};

// find victory condition where there is 4 in a row/column/diagonal
const isGameFinished = (board: Board): boolean => {
  // convert row/col/diagonal to an array
  const horizontal: Board = board;
  const vertical: Board = [];
  const slash: Board = [];
  const backslash: Board = [];

  // convert matrix into an array based on direction
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      if (vertical[j]) {
        vertical[j][i] = cell;
      } else {
        vertical[j] = [cell];
      }

      const si = board[i].length - 1 + i - j;
      if (slash[si]) {
        slash[si][slash[si].length] = cell;
      } else {
        slash[si] = [cell];
      }

      const bsi = j + i;
      if (backslash[bsi]) {
        backslash[bsi][backslash[bsi].length] = cell;
      } else {
        backslash[bsi] = [cell];
      }
    }
  }

  // iterate through all arrays and check if there is a winning combination
  const allArrays = [horizontal, vertical, slash, backslash];
  for (let i = 0; i < allArrays.length; i++) {
    for (let j = 0; j < allArrays[i].length; j++) {
      if (checkArray(allArrays[i][j])) {
        return true;
      }
    }
  }

  // check if board is full
  return board.every((arr) => arr.every((val) => val !== 0));
};

export { generateBoard, placeBoard, isGameFinished };
