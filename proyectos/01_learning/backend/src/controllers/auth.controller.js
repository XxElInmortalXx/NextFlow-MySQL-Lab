import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'
import { validateRegister, validateLogin } from '../utils/validateAuth.js'
import { sendEmailVerification } from '../email/auth.email.js'
import { generateJWT } from '../utils/index.js'

const userRegister = async (req, res) => {
  const { firstName, lastName, email, password } = req.body
  try {
    // validar que el usuario ya existe
    const result = await User.findAll({ where: { email } })
    if (result.length > 0) {
      return res.status(401).json({
        msg: 'The user already exists'
      })
    }
    // validar req.body
    const validated = validateRegister(req.body)
    if (validated) {
      return res.status(401).json({
        msg: validated
      })
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10)

    // Crear el nuevo usuario con la contraseña hasheada
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    })

    console.log(user)

    const { token } = user.dataValues
    await sendEmailVerification({ token, email })

    // mensaje de éxito
    res.status(201).json({
      msg: 'User created successfully, check your email'
    })
  } catch (error) {
    res.status(500).json({
      msg: error.message
    })
  }
}

const useVerifiy = async (req, res) => {
  const { token } = req.params
  try {
    const result = await User.findAll({ where: { token } })
    if (result.length > 0) {
      await User.update({ token: null }, { where: { token } })
      return res.status(200).json({
        msg: 'User verified successfully'
      })
    }
    return res.status(401).json({
      msg: 'Token invalid'
    })
  } catch (error) {
    res.status(500).json({
      msg: error.message
    })
  }
}

const userLogin = async (req, res) => {
  const { email, password } = req.body
  try {
    // validar req.body
    const validated = validateLogin(req.body)
    if (validated) {
      return res.status(401).json({
        msg: validated
      })
    }
    // validar que el usuario existe
    const result = await User.findAll({ where: { email } })
    if (result.length === 0) {
      return res.status(401).json({
        msg: 'The user does not exist'
      })
    }
    // validar que el usuario esté confirmado
    if (result[0].token !== null) {
      return res.status(401).json({
        msg: 'The user is not confirmed'
      })
    }
    // validar password hasheado
    const passwordCorrect = await bcrypt.compare(password, result[0].password)
    if (!passwordCorrect) {
      return res.status(401).json({
        msg: 'The password is incorrect'
      })
    }
    // Generar token
    const token = generateJWT(result[0].id)
    // mensaje de éxito
    res.status(200).json({
      msg: 'Is login',
      token
    })
  } catch (error) {
    res.status(500).json({
      msg: error.message
    })
  }
}

const userForgot = () => {
  console.log('desde forgot')
}

export { userRegister, useVerifiy, userLogin, userForgot }
