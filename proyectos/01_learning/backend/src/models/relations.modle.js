import { User } from './auth.model.js'
import { Posts } from './posts.model.js'

User.hasMany(Posts, { foreignKey: 'postId', as: 'post' })
Posts.belongsTo(User, { foreignKey: 'userId', as: 'user' })
