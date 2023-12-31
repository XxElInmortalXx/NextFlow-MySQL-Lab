import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from '../config/db.config.js'

export class Post extends Model {}

Post.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  },
  commentId: {
    type: DataTypes.STRING
  }
}, {
  sequelize,
  modelName: 'Post'
})
