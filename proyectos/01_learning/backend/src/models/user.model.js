import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from '../config/db.config.js'

export class User extends Model {}

User.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  token: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: UUIDV4
  },
  postId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commentId: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'User'
})
