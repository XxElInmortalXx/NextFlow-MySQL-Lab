import { decodeJWT } from '../utils/index.js'
import { User } from '../models/user.model.js'

const validateToken = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization
      const { id } = decodeJWT(token)
      const user = await User.findAll({ where: { id } })
      req.user = user[0].dataValues
      next()
    } catch (error) {
      return res.status(401).json({ msg: 'Invalid token' })
    }
  } else {
    return res.status(401).json({ msg: 'Unauthorized, you need login' })
  }
}

export { validateToken }
