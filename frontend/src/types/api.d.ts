export type Active_Game = {
  game_id: string;
  board_history: BoardHistory;
  turn_player: TurnPlayer;
  max_duration: number;
  is_paused: boolean;
  counter: number;
  player_one: string;
  player_one_score: number;
  player_two: string;
  player_two_score: number;
};

export type Active_Games = Active_Game[];

export type Past_Game = {
  game_id: string;
  history_id: string;
  board_history: BoardHistory;
  winner: string;
  player_one: string;
  player_one_score: number;
  player_two: string;
  player_two_score: number;
};

export type Past_Games = Past_Game[];
