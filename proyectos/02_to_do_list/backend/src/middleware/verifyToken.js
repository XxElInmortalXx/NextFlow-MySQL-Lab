import { Users } from "../models/users.model.js"
import { decodeJWT } from "../utils/jwt.js"

const verifyToken = async (req, res, next) => {
  const jwt = req.headers.authorization
  if (jwt) {
    try {
      const { id } = decodeJWT(jwt)
      const user = await Users.findAll({ where: { user_id: id } })
      req.user = user[0].dataValues
      next()
    } catch (error) {
      res.status(401).json({
        error: error.message
      })
    }
  } else {
    res.status(401).json({
      error: 'jwt is empty'
    })
  }
}

export {
  verifyToken
}
