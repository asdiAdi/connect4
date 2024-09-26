import { generateBoard, isGameFinished, placeBoard } from "./game";
import { Board, BoardHistory } from "../types/game";

const emptyBoard: Board = [
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0],
];

// no winners
const fullBoard: Board = [
  ["p2", "p2", "p1", "p1", "p1", "p2", "p2"],
  ["p2", "p1", "p1", "p2", "p2", "p1", "p1"],
  ["p1", "p2", "p1", "p1", "p1", "p2", "p2"],
  ["p1", "p1", "p2", "p2", "p2", "p1", "p1"],
  ["p2", "p2", "p2", "p1", "p1", "p2", "p2"],
  ["p1", "p2", "p1", "p2", "p1", "p1", "p2"],
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
  it("Input board should mutate", () => {
    const board = generateBoard([]);
    placeBoard(2, "p1", board);
    expect(board).toEqual(generateBoard([2]));
  });
  it("Should throw an error on invalid turn", () => {
    expect(() => placeBoard(10, "p1", emptyBoard)).toThrow();
    expect(() => placeBoard(2, "p1", fullBoard)).toThrow();
  });
  // it("Should throw an error on invalid turn player", () => {
  //   expect(() => placeBoard(1, "p2", emptyBoard)).toThrow();
  //   expect(() => placeBoard(1, "p1", generateBoard([1]))).toThrow();
  // });
  it("Should mutate the board with placed turn", () => {
    const boardA = generateBoard([1]);
    const boardB = generateBoard([5, 4, 3, 5, 2, 5, 1]);
    const boardC = generateBoard([6, 5, 4, 3, 2]);
    const boardD = generateBoard([6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1]);
    placeBoard(1, "p2", boardA);
    placeBoard(6, "p2", boardB);
    placeBoard(4, "p2", boardC);
    placeBoard(2, "p1", boardD);

    expect(boardA).toEqual(generateBoard([1, 1]));
    expect(boardB).toEqual(generateBoard([5, 4, 3, 5, 2, 5, 1, 6]));
    expect(boardC).toEqual(generateBoard([6, 5, 4, 3, 2, 4]));
    expect(boardD).toEqual(
      generateBoard([6, 6, 5, 5, 4, 4, 3, 3, 2, 2, 1, 1, 2]),
    );
  });
});

describe("isGameFinished test cases", () => {
  it("Should return false when no patterns are found", () => {
    expect(isGameFinished(generateBoard([]))).toBe(false);
  });
  it("Should return false when board is full", () => {
    expect(isGameFinished(fullBoard)).toBe(true);
  });
  it("Should return true when horizontal pattern is found", () => {
    expect(isGameFinished(generateBoard([1, 1, 2, 1, 3, 1, 4]))).toBe(true);
    expect(
      isGameFinished(generateBoard([1, 2, 3, 4, 5, 6, 7, 7, 7, 6, 7, 5, 7, 4])),
    ).toBe(true);
  });
  it("Should return true when vertical pattern is found", () => {
    expect(isGameFinished(generateBoard([1, 2, 1, 3, 1, 4, 1]))).toBe(true);
    expect(
      isGameFinished(generateBoard([1, 2, 3, 4, 5, 6, 7, 6, 7, 5, 7, 4, 7])),
    ).toBe(true);
  });
  it("Should return true when diagonal slash pattern is found", () => {
    expect(
      isGameFinished(generateBoard([1, 2, 2, 3, 3, 4, 3, 4, 4, 7, 4])),
    ).toBe(true);
    expect(
      isGameFinished(
        generateBoard([1, 2, 3, 4, 5, 6, 7, 4, 5, 5, 6, 6, 7, 6, 7, 7, 6, 7]),
      ),
    ).toBe(true);
  });
  it("Should return true when diagonal backslash pattern is found", () => {
    expect(
      isGameFinished(generateBoard([7, 6, 6, 5, 5, 1, 5, 4, 4, 4, 4])),
    ).toBe(true);
    expect(
      isGameFinished(
        generateBoard([
          1, 1, 1, 1, 1, 1, 7, 2, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 7, 4,
        ]),
      ),
    ).toBe(true);
  });
});
