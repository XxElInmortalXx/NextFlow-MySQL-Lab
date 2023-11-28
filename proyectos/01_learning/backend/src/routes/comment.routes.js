import express from 'express'
import { addComment, getComments } from '../controllers/comment.controller.js'
import { validateToken } from '../middleware/post.middleware.js'

const router = express.Router()

router.route('/get-comments/:id')
  .get(getComments)
router.route('/add-comment/:id')
  .post(validateToken, addComment)
export default router
