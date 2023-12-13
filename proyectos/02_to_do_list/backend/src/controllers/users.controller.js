import { Users } from '../models/users.model.js'
import { generateJWT } from '../utils/jwt.js';
import { loginValidation, registerValidation } from '../validations/users.validation.js';

const authRegister = async (req, res) => {
  try {
    const data = req.body
    // validar register
    const validated = registerValidation(data)
    if (validated) {
      return res.status(400).json({
        error: validated
      })
    }
    // usuario ya existe
    const user = await Users.findOne({ where: { email: data.email } })
    if (user) {
      return res.status(400).json({
        error: 'User all ready exist'
      })
    }
    // enviar email

    // crear el usuario
    await Users.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: data.password
    })
    // mensaje de exito
    res.status(200).json({
      msg: "register...",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
};

const authLogin = async (req, res) => {
  try {
    const data = req.body
    const validated = loginValidation(data)
    if (validated) {
      return res.status(400).json({
        error: validated
      })
    }
    // usuario no existe
    const user = await Users.findOne({ where: { email: data.email} })
    if (!user) {
      return res.status(400).json({
        error: 'User not found'
      })
    }
    // usuario confirmado

    // contraseña correcta
    if (user.dataValues.password !== data.password) {
      return res.status(400).json({
        error: 'Incorrect password'
      })
    }
    // generar jwt
    const jwt = generateJWT(user.dataValues.user_id)
    // mensaje de exito
    res.status(200).json({
      msg: 'Login...',
      jwt
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

const getUser = async (req, res) => {
  try {
    res.status(200).json({
      msg: req.user
    })
  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
}

export { authRegister, authLogin, getUser };
