import { Model, DataTypes, UUIDV4 } from "sequelize";
import { sequelize } from "../config/db.config.js";

class Tasks extends Model {}

Tasks.init(
  {
    task_id: {
      type: DataTypes.CHAR(60),
      defaultValue: UUIDV4,
      primaryKey: true,
      allowNull: false
    },
    title: {
      type: DataTypes.CHAR(32),
      allowNull: false,
    },
    content: {
      type: DataTypes.CHAR(200),
      allowNull: false,
    },
    url: {
      type: DataTypes.CHAR(32),
      allowNull: false,
    },
    user_id: {
      type: DataTypes.CHAR(60),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Tasks",
  }
);

export {
  Tasks
}