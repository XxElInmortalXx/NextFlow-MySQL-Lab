import express from 'express'
import { useVerifiy, userForgot, userLogin, userRecover, userRegister } from '../controllers/auth.controller.js'

const router = express.Router()

router.route('/register')
  .post(userRegister)
router.route('/verify/:token')
  .get(useVerifiy)
router.route('/login')
  .post(userLogin)
router.route('/forgot')
  .post(userForgot)
router.route('/recover/:token')
  .post(userRecover)
export default router
