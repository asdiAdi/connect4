// game is read based on move history
import { Board, BoardCell, BoardHistory, Turn } from "../types/game";
import { CellName } from "../types/game";
import { intToString } from "./string";

// makes board based on history and validates if board is possible
const generateBoard = (bh: BoardHistory): Board => {
  const board: Board = new Array(6).fill(0).map((_, row) =>
    new Array(7).fill(0).map((_, col) => ({
      value: null,
      row,
      col,
      name: `${intToString(row + 1)}${col + 1}`,
    })),
  );

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
    board[boardMemory[turnIndex]][turnIndex].value = turn > 0 ? "p1" : "p2";
    boardMemory[turnIndex] += 1;
  }

  return board;
};

// validates and mutates the board
const placeBoard = (turn: Turn, board: Board): void => {
  // validate if turn is valid
  if (turn < -7 || turn > 7 || board[5][turn - 1].value !== null) {
    throw new Error("Invalid turn number");
  }

  let index = 0;
  while (board[index][turn - 1].value !== null) {
    index++;
  }

  board[index][turn - 1].value = turn > 0 ? "p1" : "p2";
};

// find victory condition where there is 4 in a row/column/diagonal
const getWinningPositions = (board: Board): CellName[] => {
  // 0-5 horizontal
  // 6-12 vertical
  // 13-18 slash
  // 19-24 backSlash
  const allArrays: BoardCell[][] = new Array(25).fill(0).map(() => []);

  // convert matrix into an array based on direction
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      const cell = board[i][j];
      //horizontal
      allArrays[i][j] = cell;

      // vertical
      allArrays[j + 6][i] = cell;

      // slash
      const si = i - j + 16;
      if (si >= 13 && si <= 18) {
        allArrays[si][allArrays[si].length] = cell;
      }

      // backslash
      const bsi = i + j + 16;
      if (bsi >= 19 && bsi <= 24) {
        allArrays[bsi][allArrays[bsi].length] = cell;
      }
    }
  }

  // iterate and check if there is a winning combination on each array
  let value: BoardCell["value"] = null;
  let winningPositions: CellName[] = [];

  for (let i = 0; i < allArrays.length; i++) {
    for (let j = 0; j < allArrays[i].length; j++) {
      const cell = allArrays[i][j];

      if (cell.value === value) {
        winningPositions.push(cell.name);
      } else {
        value = cell.value;
        winningPositions = [cell.name];
      }

      if (winningPositions.length === 4 && value !== null) {
        return winningPositions;
      }
    }

    winningPositions = [];
  }

  return winningPositions;
};

const isBoardFull = (bh: BoardHistory) => {
  return bh.length === 42;
};

// validates turn based on boardHistory
// const validateTurn = (turn: Turn, bh: BoardHistory): boolean => {
//   // invalid input check
//   if (turn === 0) {
//     return false;
//   }
//
//   // max column check
//   if (turn < -7 || turn > 7) {
//     return false;
//   }
//
//   // max row check
//   const boardMemory: number[] = [0, 0, 0, 0, 0, 0, 0];
//   for (let i = 0; i <= bh.length; i++) {
//     const _turn = i == bh.length ? turn : bh[i];
//     const turnIndex = Math.abs(_turn) - 1;
//     if (boardMemory[turnIndex] >= 6) {
//       return false;
//     }
//     boardMemory[turnIndex] += 1;
//   }
//
//   return true;
// };

export {
  generateBoard,
  placeBoard,
  getWinningPositions,
  // validateTurn,
  isBoardFull,
};
