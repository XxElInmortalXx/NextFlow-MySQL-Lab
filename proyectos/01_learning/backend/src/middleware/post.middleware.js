import { decodeJWT } from '../utils/index.js'
import { User } from '../models/user.model.js'

const postMiddleware = async (req, res, next) => {
  if (req.headers.authorization) {
    try {
      const token = req.headers.authorization
      const { id } = decodeJWT(token)
      const user = await User.findAll({ where: { id } })
      req.user = user[0].dataValues
      next()
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' })
    }
  } else {
    return res.status(401).json({ error: 'Unauthorized' })
  }
}

export { postMiddleware }
