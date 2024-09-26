import { DataTypes, Sequelize } from "sequelize";
const sequelize = new Sequelize("postgres::memory");

const ActiveGames = sequelize.define("ActiveGames", {
  game_id: {
    type: DataTypes.CHAR(8),
    allowNull: false,
  },
  board_history: {
    type: DataTypes.ARRAY(DataTypes.INTEGER),
    allowNull: false,
  },
  max_duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  turn_player: {
    type: DataTypes.CHAR(2),
    allowNull: false,
  },
  is_paused: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
});

export default ActiveGames;
