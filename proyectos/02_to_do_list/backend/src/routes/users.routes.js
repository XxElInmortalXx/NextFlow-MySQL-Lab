import express from 'express'
import { authLogin, authRegister, getUser } from '../controllers/users.controller.js'
import { verifyToken } from '../middleware/verifyToken.js'
const router = express.Router()

router.route('/auth/register')
    .post(authRegister)
router.route('/auth/login')
    .post(authLogin)
router.route('/get-user')
    .get(verifyToken, getUser)
export default router