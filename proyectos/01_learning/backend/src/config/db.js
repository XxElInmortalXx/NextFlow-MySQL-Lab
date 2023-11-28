import { sequelize } from './db.config.js'
import { applyRelations } from '../models/relations.model.js'

export const db = async () => {
  try {
    await sequelize.authenticate()
    applyRelations()
    await sequelize.sync({ alter: true })
    console.log('------ Connect to db successful')
  } catch (error) {
    console.error('------ Error to connect to db:', error)
  }
}
