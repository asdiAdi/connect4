import {
  generateBoard,
  getWinningPositions,
  placeBoard,
  validateTurn,
} from "./game";
import { Board, BoardHistory } from "../types/game";

const emptyBoard: Board = [
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
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
      1, -1, 1, -1, 1, -1, 2, -2, 2, -2, 2, -2, 3, -3, 3, -3, 3, -3, 4, -4, 4,
      -4, 4, -4, 5, -5, 5, -5, 5, -5, 6, -6, 6, -6, 6, -6, 7, -7, 7, -7, 7, -7,
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
      1, -2, 3, -4, 5, -6, 7, -7, 6, -5, 4, -3, 2, -1, 1, -2, 3, -4, 5, -6, 7,
      -7, 6, -5, 4, -3, 2, -1, 1, -2, 3, -4, 5, -6, 7, -7, 6, -5, 4, -3, 2, -1,
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
  [
    [1, 1, 1, -2, -2, -2],
    [
      ["p1", "p2", null, null, null, null, null],
      ["p1", "p2", null, null, null, null, null],
      ["p1", "p2", null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
      [null, null, null, null, null, null, null],
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
    // expect(() => generateBoard([0])).toThrow();
    expect(() => generateBoard([1, 1, 1, 1, 1, 1, 1])).toThrow();
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

describe("getWinningPositions test cases", () => {
  it("Should return empty array when no patterns are found", () => {
    expect(getWinningPositions(generateBoard([]))).toEqual([]);
    expect(getWinningPositions(fullBoard)).toEqual([]);
  });
  it("Should return true when horizontal pattern is found", () => {
    expect(
      getWinningPositions(generateBoard([1, -1, 2, -1, 3, -1, 4])),
    ).toEqual(expect.arrayContaining(["a1", "a2", "a3", "a4"]));
    expect(
      getWinningPositions(
        generateBoard([-1, 2, -3, 4, -5, 6, -7, 7, -7, 6, -7, 5, -7, 4]),
      ),
    ).toEqual(expect.arrayContaining(["b7", "b6", "b5", "b4"]));
  });
  it("Should return true when vertical pattern is found", () => {
    expect(
      getWinningPositions(generateBoard([1, -2, 1, -3, 1, -4, 1])),
    ).toEqual(expect.arrayContaining(["a1", "b1", "c1", "d1"]));
    expect(
      getWinningPositions(
        generateBoard([-1, 2, -3, 4, -5, 6, -7, 6, -7, 5, -7, 4, -7]),
      ),
    ).toEqual(expect.arrayContaining(["a7", "b7", "c7", "d7"]));
  });
  it("Should return true when diagonal slash pattern is found", () => {
    expect(
      getWinningPositions(
        generateBoard([1, -2, 2, -3, 3, -4, 3, -4, 4, -7, 4]),
      ),
    ).toEqual(expect.arrayContaining(["a1", "b2", "c3", "d4"]));
    expect(
      getWinningPositions(
        generateBoard([
          -1, 2, -3, 4, -5, 6, -7, 4, -5, 5, -6, 6, -7, 6, -7, 7, -6, 7,
        ]),
      ),
    ).toEqual(expect.arrayContaining(["e7", "d6", "c5", "b4"]));
  });
  it("Should return true when diagonal backslash pattern is found", () => {
    expect(
      getWinningPositions(
        generateBoard([-7, 6, -6, 5, -5, 1, -5, 4, -4, 4, -4]),
      ),
    ).toEqual(expect.arrayContaining(["a7", "b6", "c5", "d4"]));
    expect(
      getWinningPositions(
        generateBoard([
          -1, 1, -1, 1, -1, 1, -7, 2, -2, 2, -2, 2, -3, 3, -3, 3, -4, 4, -7, 4,
        ]),
      ),
    ).toEqual(expect.arrayContaining(["c4", "d3", "e2", "f1"]));
  });
});

describe("validate turn test cases", () => {
  it("should would ", () => {
    // invalid inputs
    expect(validateTurn(0, [])).toBe(false);

    // max row
    expect(validateTurn(8, [])).toBe(false);
    expect(validateTurn(-100, [])).toBe(false);

    // max column
    expect(validateTurn(-2, [1, 1, 1, 1, 1, 1, 1])).toBe(false);
    expect(validateTurn(-1, [1, 1, 1, 1, 1, 1])).toBe(false);
    expect(validateTurn(7, [-6, -6, -6, -6, -6, -6, -6])).toBe(false);
    expect(validateTurn(6, [-6, -6, -6, -6, -6, -6])).toBe(false);

    // valid
    expect(validateTurn(-3, [3, 3, 3, 3, 3])).toBe(true);
    expect(validateTurn(-2, [3, 3, 3, 3, 3, 3])).toBe(true);
    expect(validateTurn(5, [-5, -5, -5, -5, -5])).toBe(true);
    expect(validateTurn(3, [-5, -5, -5, -5, -5, -5])).toBe(true);
  });
});
