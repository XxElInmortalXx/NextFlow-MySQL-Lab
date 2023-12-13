import { Model, DataTypes, UUIDV4 } from 'sequelize'
import { sequelize } from '../config/db.config.js'

class Users extends Model {}

Users.init({
    user_id: {
        type: DataTypes.CHAR(60),
        defaultValue: UUIDV4,
        primaryKey: true,
    },
    username: {
        type: DataTypes.CHAR(32),
        allowNull: false
    },
    password: {
        type: DataTypes.CHAR(32),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Users'
})

export {
  Users
}