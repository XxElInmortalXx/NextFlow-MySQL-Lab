import jwt from 'jsonwebtoken'

const generateJWT = (id) => {
  const token = jwt.sign({ id }, 'secretJWT', {
    expiresIn: 1000 * 60 * 60 * 24 * 60
  })
  return token
}

const decodeJWT = (token) => {
  const decoded = jwt.decode(token, 'secretJWT')
  return decoded
}

const verifyJWT = (token) => {
  const decoded = jwt.verify(token, 'secretJWT')
  return decoded
}

export { generateJWT, decodeJWT, verifyJWT }
