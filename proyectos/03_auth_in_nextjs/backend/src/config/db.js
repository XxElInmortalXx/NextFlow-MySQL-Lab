import { sequelize } from './db.config.js'

export const db = async () => {
    try {
        await sequelize.authenticate()
        console.log('------ Database connected successfully.')
        await sequelize.sync()
        console.log('------ Database synced successfully.')
    } catch (error) {
        console.error('------ Unable to connect to the database:', error)
    }
}