import { Users } from '../models/users.model.js'
import { Tasks } from '../models/tasks.model.js'

export const modelRelations = async () => {
  Users.hasMany(Tasks, { foreignKey: 'user_id' })
  Tasks.belongsTo(Users, { foreignKey: 'user_id' })
}
