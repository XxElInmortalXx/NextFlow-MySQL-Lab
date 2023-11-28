import { Comment } from './comment.model.js'
import { User } from './user.model.js'
import { Post } from './post.model.js'

export const applyRelations = () => {
  // Relaciones entre User y Post
  User.hasMany(Post, { foreignKey: 'userId', as: 'posts' })
  Post.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  // Relaciones entre User y Comment
  User.hasMany(Comment, { foreignKey: 'userId', as: 'comments' })
  Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' })

  // Relaciones entre Post y Comment
  Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments' })
  Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' })
}
