import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const generateJWT = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: 1000 * 60 * 60 * 24 * 60
  })
  return token
}

const decodeJWT = (token) => {
  const decoded = jwt.decode(token, process.env.JWT_SECRET)
  return decoded
}

const verifyJWT = (token) => {
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded
}

export { generateJWT, decodeJWT, verifyJWT }
