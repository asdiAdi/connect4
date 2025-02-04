import { DataTypes, Sequelize, Model } from "sequelize";

export interface IUser extends Model {
  id: string;
  username: string;
  password: string;
}

const Users = (sequelize: Sequelize) =>
  sequelize.define<IUser>(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
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
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  );

export default Users;
