import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from '../config/db.config'

export class Comment extends Model {}

Comment.init({
  id: {
    type: DataTypes.STRING,
    defaultValue: UUIDV4,
    primaryKey: true
  },
  text: {
    type: DataTypes.STRING,
    allowNull: false
  },
  userId: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  sequelize,
  nameModel: 'Comment'
})
