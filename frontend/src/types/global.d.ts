import React from "react";

export type ColorName =
  | "black"
  | "indigo"
  | "medium-purple"
  | "light-coral"
  | "mustard-yellow"
  | "white";

export type PlayerData = {
  name: string;
  score: number;
};

export type GameType = "pvp" | "pve";

export type GameState = {
  gameType: GameType;
  playerOne: PlayerData;
  playerTwo: PlayerData;
  setGameType: (type: GameType) => void;

  maxDuration: number; // in seconds
  // turnPlayer: "p1" | "p2";
  // setTurnPlayer: (turn: GameState["turnPlayer"]) => void;
};
