import express from 'express'
import { newPost } from '../controllers/posts.controller.js'
import { postMiddleware } from '../middleware/post.middleware.js'

const router = express.Router()

router.route('/new-post')
  .post(postMiddleware, newPost)

export default router
