import jwt from 'jsonwebtoken'
import { Users } from '../models/users.model.js'

const validateToken = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization
      const { user_id } = jwt.decode(token, process.env.JWT_SECRET)
      const user = await Users.findOne({ where: { user_id } })
      req.user = user.dataValues
      next()
    } catch (error) {
      return res.status(401).json({ msg: 'Invalid token' })
    }
  } else {
    return res.status(401).json({ msg: 'Unauthorized, you need login' })
  }
}

export { validateToken }
