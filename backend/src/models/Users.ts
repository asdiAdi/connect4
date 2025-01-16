import { DataTypes, Sequelize, Model, UUIDV4 } from "sequelize";

export interface IUser extends Model {
  user_id: string;
  username: string;
  password: string;
}

const Users = (sequelize: Sequelize) =>
  sequelize.define<IUser>(
    "users",
    {
      user_id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        defaultValue: UUIDV4,
        unique: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    },
  );

export default Users;
