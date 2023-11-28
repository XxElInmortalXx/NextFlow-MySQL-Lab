import express from 'express'
import { getPost, getPosts, newPost } from '../controllers/posts.controller.js'
import { validateToken } from '../middleware/post.middleware.js'

const router = express.Router()

router.route('/new-post')
  .post(validateToken, newPost)
router.route('/get-posts')
  .get(getPosts)
router.route('/get-post/:id')
  .get(getPost)

export default router
