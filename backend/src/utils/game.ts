// game is read based on move history
import {
  Board,
  BoardCell,
  BoardHistory,
  Turn,
  TurnPlayer,
} from "../types/game";
import { CellName } from "../types/game";
import { intToString } from "./string";

// check if array has winning positions, private function
const checkArray = (positions: number[][], board: Board): CellName[] => {
  let cell: BoardCell = null;
  let winningPositions: CellName[] = [];

  for (let i = 0; i < positions.length; i++) {
    const cur = board[positions[i][0]][positions[i][1]];
    const name: CellName = `${intToString(positions[i][0] + 1)}${positions[i][1] + 1}`;

    if (cur !== null) {
      if (cur === cell) {
        winningPositions.push(name);
      } else {
        cell = cur;
        winningPositions = [name];
      }
    } else {
      cell = cur;
      winningPositions = [];
    }

    if (winningPositions.length === 4) {
      return winningPositions;
    }
  }

  return [];
};

// makes board based on history and validates if board is possible
const generateBoard = (bh: BoardHistory): Board => {
  const board: Board = new Array(6)
    .fill(0)
    .map(() => new Array(7).fill(0).map(() => null));

  // store last turn index per column
  const boardMemory: number[] = [0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < bh.length; i++) {
    const turn = bh[i];
    const turnIndex = Math.abs(turn) - 1;

    // error handling
    if (
      turn < -7 ||
      turn > 7 ||
      boardMemory[turnIndex] >= 6 ||
      (turn === 0 && i < bh.length - 1)
    ) {
      throw new Error("Invalid Turn number");
    }

    // store turnPlayer on board
    board[boardMemory[turnIndex]][turnIndex] = turn > 0 ? "p1" : "p2";
    boardMemory[turnIndex] += 1;
  }

  return board;
};

// validates and mutates the board
const placeBoard = (turn: Turn, turnPlayer: TurnPlayer, board: Board): void => {
  // validate if turn is valid
  if (turn < -7 || turn > 7 || board[5][turn - 1] !== null) {
    throw new Error("Invalid turn number");
  }

  // validate if computed turnPlayer is the same as current turnPlayer
  // if (turnPlayer !== getTurnPlayer(board)) {
  //   throw new Error("Turn player not valid");
  // }

  let index = 0;
  while (board[index][turn - 1] !== null) {
    index++;
  }
  board[index][turn - 1] = turnPlayer;
};

// find victory condition where there is 4 in a row/column/diagonal
const getWinningPositions = (board: Board): CellName[] => {
  // convert row/col/diagonal to an array
  const horizontal: number[][][] = [];
  const vertical: number[][][] = [];
  const slash: number[][][] = [];
  const backslash: number[][][] = [];

  // convert matrix into an array based on direction
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const position = [i, j];
      if (horizontal[i]) {
        horizontal[i][j] = position;
      } else {
        horizontal[i] = [position];
      }

      if (vertical[j]) {
        vertical[j][i] = position;
      } else {
        vertical[j] = [position];
      }

      const si = board[i].length - 1 + i - j;
      if (slash[si]) {
        slash[si][slash[si].length] = position;
      } else {
        slash[si] = [position];
      }

      const bsi = j + i;
      if (backslash[bsi]) {
        backslash[bsi][backslash[bsi].length] = position;
      } else {
        backslash[bsi] = [position];
      }
    }
  }

  // iterate through all arrays and check if there is a winning combination
  const allArrays = [horizontal, vertical, slash, backslash];
  for (let i = 0; i < allArrays.length; i++) {
    for (let j = 0; j < allArrays[i].length; j++) {
      const winningPositions = checkArray(allArrays[i][j], board);
      if (winningPositions.length === 4) {
        return winningPositions;
      }
    }
  }

  return [];
};

const isBoardFull = (bh: BoardHistory) => {
  return bh.length === 42;
};

// validates turn based on boardHistory
const validateTurn = (turn: Turn, bh: BoardHistory): boolean => {
  // invalid input check
  if (turn === 0) {
    return false;
  }

  // max column check
  if (turn < -7 || turn > 7) {
    return false;
  }

  // max row check
  const boardMemory: number[] = [0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i <= bh.length; i++) {
    const _turn = i == bh.length ? turn : bh[i];
    const turnIndex = Math.abs(_turn) - 1;
    if (boardMemory[turnIndex] >= 6) {
      return false;
    }
    boardMemory[turnIndex] += 1;
  }

  return true;
};

export {
  generateBoard,
  placeBoard,
  getWinningPositions,
  validateTurn,
  isBoardFull,
};
