import { Post } from '../models/post.model.js'
import { Comment } from '../models/comment.model.js'
import { validateComment } from '../utils/validateComment.js'

const getComments = async (req, res) => {
  try {
    const { id } = req.params
    const result = await Post.findAll({
      where: { id },
      include: { all: true }
    })
    // validar que haya resultados
    if (Object.keys(result).length === 0) {
      return res.status(404).json({
        msg: 'comment not found'
      })
    }
    return res.status(200).json({
      msg: 'comments retrieved',
      result
    })
  } catch (error) {
    return res.status(500).json({
      msg: error.message
    })
  }
}

const addComment = async (req, res) => {
  try {
    // validar comment
    const { comment } = req.body
    const validated = validateComment(comment)
    if (validated) {
      return res.status(401).json({
        msg: validated
      })
    }
    // traer comentarios
    const { id } = req.params
    const result = await Comment.create({
      text: comment,
      postId: id,
      userId: req.user.id
    })
    // mensaje de éxito
    return res.status(200).json({
      msg: 'comment added',
      result
    })
  } catch (error) {
    return res.status(500).json({
      msg: error.message
    })
  }
}

export { getComments, addComment }
