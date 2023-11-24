import { Post } from '../models/post.model.js'

const newPost = (req, res) => {
  const { title, description, userId } = req.body
  const newPost = { title, description, userId }
  return Post.create(newPost)
}

export {
  newPost
}
