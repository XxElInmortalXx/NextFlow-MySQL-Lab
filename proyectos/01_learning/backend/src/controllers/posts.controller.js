import { Post } from '../models/post.model.js'
import { validatePost } from '../utils/validatePost.js'

const newPost = async (req, res) => {
  try {
    const validated = validatePost(req.body)
    if (validated) {
      return res.status(400).json({
        msg: validated
      })
    }
    const result = await Post.create({
      ...req.body,
      userId: req.user.id
    })
    return res.status(201).json({
      msg: 'post created',
      result
    })
  } catch (error) {
    return res.status(500).json({
      msg: error.message
    })
  }
}

export { newPost }
