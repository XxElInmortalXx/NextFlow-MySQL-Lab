import { Sequelize } from 'sequelize'

export const sequelize = new Sequelize('learning', 'root', 'root', {
  host: 'localhost',
  logging: false,
  dialect: 'mysql',
  define: {
    freezeTableName: true
  }
})
