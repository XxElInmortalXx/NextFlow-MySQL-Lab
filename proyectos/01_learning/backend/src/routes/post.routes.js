import express from 'express'
import { newPost } from '../controllers/posts.controller.js'

const router = express.Router()

router.route('/new-post')
  .post(newPost)

export default router
