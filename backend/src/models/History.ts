import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  UUIDV4,
  Model,
} from "sequelize";
import { TurnPlayer } from "../types/game";

export interface IHistory
  extends Model<InferAttributes<IHistory>, InferCreationAttributes<IHistory>> {
  game_id: string;
  board_history: number[];
  winner: TurnPlayer;
  loser: TurnPlayer;
}

const History = (sequelize: Sequelize) =>
  sequelize.define<IHistory>(
    "history",
    {
      game_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
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
