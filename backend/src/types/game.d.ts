type Turn = number;
type TurnPlayer = "p1" | "p2";

type CellName = `${string}${number}`;

type BoardCell = {
  value: TurnPlayer | null;
  row: number;
  col: number;
  name: CellName;
};
type Board = BoardCell[][];

// 0 = game end
// 1 2 3 4 5 6 7 = player 1 turns
// -1 -2 -3 -4 -5 -6 -7 = player 2 turns
type BoardHistory = Array<Turn>;

export { Turn, TurnPlayer, Win, BoardCell, Board, BoardHistory, CellName };
