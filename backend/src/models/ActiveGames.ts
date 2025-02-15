import { DataTypes, Sequelize, UUIDV4, Model } from "sequelize";
import { TurnPlayer } from "../types/game";

export interface IActiveGames extends Model {
  id: number;
  game_id: string;
  board_history: number[];
  max_duration: number;
  turn_player: TurnPlayer;
  is_paused: boolean;
  is_won: boolean;
  counter: number;
  player_one: string;
  player_one_score: number;
  player_one_connection: string;
  player_two: string;
  player_two_score: number;
  player_two_connection: string;
  created_at: Date;
  updated_at: Date;
}

const ActiveGames = (sequelize: Sequelize) =>
  sequelize.define<IActiveGames>(
    "active_games",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      game_id: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        allowNull: false,
        unique: true,
      },
      board_history: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        defaultValue: [],
      },
      max_duration: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 30,
      },
      turn_player: {
        type: DataTypes.CHAR(2),
        allowNull: false,
        defaultValue: "p1",
      },
      is_paused: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      is_won: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      counter: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      player_one: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      player_one_score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      player_one_connection: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      player_two: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
      player_two_score: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      player_two_connection: {
        type: DataTypes.STRING,
        defaultValue: "",
      },
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

export default ActiveGames;
