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

const getPosts = async (req, res) => {
  try {
    const result = await Post.findAll({ include: { all: true } })
    return res.status(200).json({
      msg: 'posts retrieved',
      result
    })
  } catch (error) {
    return res.status(500).json({
      msg: error.message
    })
  }
}

const getPost = async (req, res) => {
  const { id } = req.params
  try {
    const result = await Post.findAll({ where: { id }, include: { all: true } })
    // validar que haya resultados
    if (Object.keys(result).length === 0) {
      return res.status(404).json({
        msg: 'post not found'
      })
    }
    return res.status(200).json({
      msg: 'posts retrieved',
      result
    })
  } catch (error) {
    return res.status(500).json({
      msg: error.message
    })
  }
}

export { newPost, getPosts, getPost }
