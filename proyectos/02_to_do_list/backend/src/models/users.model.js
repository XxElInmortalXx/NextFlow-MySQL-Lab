import { Model, DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../config/db.config.js";

class Users extends Model {}

Users.init(
  {
    user_id: {
      type: DataTypes.CHAR(60),
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    first_name: {
      type: DataTypes.CHAR(32),
      allowNull: false,
    },
    last_name: {
      type: DataTypes.CHAR(32),
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR(32),
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(60),
      allowNull: false,
    },
    token: {
      type: DataTypes.CHAR(60),
      defaultValue: UUIDV4
    },
  },
  {
    sequelize,
    modelName: "Users",
  }
);

export {
  Users
}