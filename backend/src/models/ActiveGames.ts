import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  UUIDV4,
  Model,
} from "sequelize";
import { TurnPlayer } from "../types/game";

export interface IActiveGames
  extends Model<
    InferAttributes<IActiveGames>,
    InferCreationAttributes<IActiveGames>
  > {
  game_id: string;
  board_history: number[];
  max_duration: number;
  turn_player: TurnPlayer;
  is_paused: boolean;
}

const ActiveGames = (sequelize: Sequelize) =>
  sequelize.define<IActiveGames>(
    "active_games",
    {
      game_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: UUIDV4,
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
        defaultValue: false,
      },
    },
    {
      timestamps: false,
    },
  );

export default ActiveGames;
