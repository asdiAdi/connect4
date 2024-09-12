type Turn = number;
type TurnPlayer = "p1" | "p2";
type Win = "!";

type BoardCell = TurnPlayer | 0;
type Board = BoardCell[][];

type BoardHistory = Array<Turn | Win>;

export { Turn, TurnPlayer, Win, BoardCell, Board, BoardHistory };
