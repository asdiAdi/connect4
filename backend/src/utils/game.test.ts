import { generateBoard, placeBoard } from "./game";
import { Board, BoardHistory } from "../types/global";

const emptyBoard: Board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

const fullBoard: Board = [
  ["p1", "p1", "p1", "p1", "p1", "p1", "p1"],
  ["p2", "p2", "p2", "p2", "p2", "p2", "p2"],
  ["p1", "p1", "p1", "p1", "p1", "p1", "p1"],
  ["p2", "p2", "p2", "p2", "p2", "p2", "p2"],
  ["p1", "p1", "p1", "p1", "p1", "p1", "p1"],
  ["p2", "p2", "p2", "p2", "p2", "p2", "p2"],
];

// [[history],[board]]
const historyToBoard: (BoardHistory | Board)[][] = [
  [
    [
      1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4, 4, 4, 4, 4, 5,
      5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 7, 7, 7, 7, 7, 7,
    ],
    [
      ["p1", "p1", "p1", "p1", "p1", "p1", "p1"],
      ["p2", "p2", "p2", "p2", "p2", "p2", "p2"],
      ["p1", "p1", "p1", "p1", "p1", "p1", "p1"],
      ["p2", "p2", "p2", "p2", "p2", "p2", "p2"],
      ["p1", "p1", "p1", "p1", "p1", "p1", "p1"],
      ["p2", "p2", "p2", "p2", "p2", "p2", "p2"],
    ],
  ],
  [
    [
      1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4,
      3, 2, 1, 1, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 1,
    ],
    [
      ["p1", "p2", "p1", "p2", "p1", "p2", "p1"],
      ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
      ["p1", "p2", "p1", "p2", "p1", "p2", "p1"],
      ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
      ["p1", "p2", "p1", "p2", "p1", "p2", "p1"],
      ["p2", "p1", "p2", "p1", "p2", "p1", "p2"],
    ],
  ],
];

describe("generateBoard test cases", () => {
  it("Should return an empty 6x7 board", () => {
    expect(generateBoard([])).toEqual(emptyBoard);
  });
  it("Should return a board based on game history", () => {
    expect(generateBoard([])).toEqual(emptyBoard);

    for (let i = 0; i < historyToBoard.length; i++) {
      const history = historyToBoard[i][0] as BoardHistory;
      const board = historyToBoard[i][1] as Board;
      expect(generateBoard(history)).toEqual(board);
    }
  });
  it("Should return an error on invalid history", () => {
    expect(() => generateBoard([0])).toThrow();
    expect(() => generateBoard([1, 1, 1, 1, 1, 1, 1])).toThrow();
    //@ts-expect-error test if passed with an invalid type
    expect(() => generateBoard(["test"])).toThrow();
  });
});

describe("placeBoard test cases", () => {
  it("Input board should not mutate", () => {
    const board = generateBoard([]);
    const newBoard = placeBoard(2, board);
    expect(newBoard).not.toEqual(board);
  });
  it("Should throw an error on invalid turn", () => {
    expect(() => placeBoard(10, emptyBoard)).toThrow();
    expect(() => placeBoard(2, fullBoard)).toThrow();
  });
  it("Should return a board with placed turn", () => {
    expect(placeBoard(1, generateBoard([1]))).toEqual(generateBoard([1, 1]));
    expect(placeBoard(6, generateBoard([5, 4, 3, 5, 2, 5, 1]))).toEqual(
      generateBoard([5, 4, 3, 5, 2, 5, 1, 6]),
    );
    expect(placeBoard(4, generateBoard([6, 5, 4, 3, 2]))).toEqual(
      generateBoard([6, 5, 4, 3, 2, 4]),
    );
    expect(
      placeBoard(2, generateBoard([6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1])),
    ).toEqual(generateBoard([6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 2]));
  });
});
