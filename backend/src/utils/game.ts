// game is read based on move history
import { Board, BoardHistory, Turn } from "../types/global";

const generateBoard = (bh: BoardHistory): Board => {
  let board: Board = new Array(6)
    .fill(0)
    .map(() => new Array(7).fill(0).map(() => 0));

  for (let i = 0; i < bh.length; i++) {}
  return board;
};

const validateGame = (turn: Turn, bh: BoardHistory): boolean => {
  let board: Board = generateBoard(bh);

  return false;
};

const isWon = (): boolean => {
  return false;
};

export { generateBoard, validateGame, isWon };
