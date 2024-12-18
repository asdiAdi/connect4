import { DataTypes, Sequelize, Model, UUIDV4 } from "sequelize";
import { TurnPlayer } from "../types/game";

export interface IHistory extends Model {
  game_id: string;
  board_history: number[];
  winner: TurnPlayer;
  loser: TurnPlayer;
}

const History = (sequelize: Sequelize) =>
  sequelize.define<IHistory>(
    "history",
    {
      history_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: 0,
        unique: true,
      },
      game_id: {
        type: DataTypes.UUID,
        references: {
          model: "active_games",
          key: "game_id",
        },
        allowNull: false,
        defaultValue: UUIDV4,
      },
      board_history: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
      },
      // TODO: winner and loser should be user ID
      winner: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      loser: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

export default History;
