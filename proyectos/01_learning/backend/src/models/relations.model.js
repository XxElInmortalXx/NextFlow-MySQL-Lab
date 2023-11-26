import { User } from './user.model.js'
import { Post } from './post.model.js'
import { Comment } from './comment.model.js'

User.hasMany(Post, { foreignKey: 'postId', as: 'post' })
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' })

User.hasMany(Comment, { foreignKey: 'commentId', as: 'comment' })
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' })

Post.hasMany(Comment, { foreignKey: 'commentId', as: 'comment' })
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' })
