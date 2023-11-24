import { sequelize } from './db.config.js'

export const db = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    console.log('------ Connect to db successful')
  } catch (error) {
    console.error('------ Error to connect to db:', error)
  }
}
