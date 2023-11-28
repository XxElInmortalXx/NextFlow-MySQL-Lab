import bcrypt from 'bcrypt'
import { User } from '../models/user.model.js'
import { validateRegister, validateLogin, validateForgot, validateRecover } from '../utils/validateAuth.js'
import { sendEmailForgot, sendEmailVerification } from '../email/auth.email.js'
import { generateId, generateJWT } from '../utils/index.js'

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

const userForgot = async (req, res) => {
  const { email } = req.body
  try {
    // validar email
    const validated = validateForgot(email)
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
    // generar token
    const newToken = generateId()
    // actualizar token
    await User.update({ token: newToken }, { where: { email } })
    // enviar email
    await sendEmailForgot({ token: newToken, email })
    // mensaje de éxito
    res.status(200).json({
      msg: 'Email sent successfully'
    })
  } catch (error) {
    res.status(500).json({
      msg: error.message
    })
  }
}

const userRecover = async (req, res) => {
  try {
    // validar password
    const { password } = req.body
    const validated = validateRecover(password)
    if (validated) {
      return res.status(401).json({
        msg: validated
      })
    }
    // validar si token es válido existe
    const { token } = req.params
    const user = await User.findAll({ where: { token } })
    if (Object.keys(user).length === 0) {
      return res.status(401).json({
        msg: 'The token is not valid'
      })
    }
    // actualizar contraseña
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.update({ password: hashedPassword }, { where: { token } })
    // actualizar token
    await User.update({ token: null }, { where: { token } })
    // mensaje de éxito
    res.status(200).json({
      msg: 'Password reset successfully'
    })
  } catch (error) {
    res.status(500).json({
      msg: error.message
    })
  }
}

export { userRegister, useVerifiy, userLogin, userForgot, userRecover }
