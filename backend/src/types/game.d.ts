type Turn = number;
type TurnPlayer = "p1" | "p2";

type BoardCell = TurnPlayer | null;
type Board = BoardCell[][];
type CellName = `${string}${number}`;

// 0 = game end
// 1 2 3 4 5 6 7 = player 1 turns
// -1 -2 -3 -4 -5 -6 -7 = player 2 turns
type BoardHistory = Array<Turn>;

export { Turn, TurnPlayer, Win, BoardCell, Board, BoardHistory, CellName };
