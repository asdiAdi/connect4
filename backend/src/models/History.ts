import { DataTypes, Sequelize, Model, UUIDV4 } from "sequelize";

export interface IHistory extends Model {
  game_id: string;
  board_history: number[];
  winner: string;
  player_one: string;
  player_one_score: number;
  player_two: string;
  player_two_score: number;
}

const History = (sequelize: Sequelize) =>
  sequelize.define<IHistory>(
    "histories",
    {
      history_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: UUIDV4,
        unique: true,
      },
      game_id: {
        type: DataTypes.UUID,
        references: {
          model: "active_games",
          key: "game_id",
        },
        allowNull: false,
        // defaultValue: UUIDV4,
      },
      board_history: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      winner: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      player_one: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      player_one_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      player_two: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      player_two_score: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

export default History;
