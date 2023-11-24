import express from 'express'
import { useVerifiy, userLogin, userRegister } from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/register')
  .post(userRegister)
router.route('/verify/:token')
  .get(useVerifiy)
router.route('/login')
  .post(userLogin)
export default router
