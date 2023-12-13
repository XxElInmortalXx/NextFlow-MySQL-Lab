import express from 'express'
import { getUser, userLogin, userRegister } from '../controllers/users.controller.js'
import { validateToken } from '../middleware/verifyToken.js'

const router = express.Router()

router.route('/auth/register')
  .post(userRegister)
router.route('/auth/login')
  .post(userLogin)
router.route('/get-user')
  .get(validateToken, getUser)

export default router