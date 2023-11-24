import { isEmail } from './regulateExperssions.js'

const validateRegister = (user) => {
  const { firstName, lastName, email, password } = user
  // validar que el nombre no esté vacío
  if (firstName === '') {
    return 'The firstName is empty'
  }
  // validar que el nombnre no sea muy largo
  if (firstName.length > 20) {
    return 'The firstName is too long'
  }
  // validar que el apellido no esté vacío
  if (lastName === '') {
    return 'The firstName is empty'
  }
  // validar que el apellido no sea muy largo
  if (lastName.length > 20) {
    return 'The lastName is too long'
  }
  // validar que el email no esté vacío
  if (email === '') {
    return 'The email is empty'
  }
  // validar que el email tenga formato email
  if (!isEmail.test(email)) {
    return 'The email is invalid'
  }
  // validar que el password no esté vacío
  if (password === '') {
    return 'The password is empty'
  }
  // validar que el password tenga mas de 3 caracteres
  if (password.length <= 3) {
    return 'the password is too short'
  }

  return null
}

const validateLogin = (user) => {
  const { email, password } = user
  // validar que el email no esté vacío
  if (email === '') {
    return 'The email is empty'
  }
  // validar que el email tenga formato email
  if (!isEmail.test(email)) {
    return 'The email is invalid'
  }
  // validar que el password no esté vacío
  if (password === '') {
    return 'The password is empty'
  }
  // validar que el password tenga mas de 3 caracteres
  if (password.length <= 3) {
    return 'the password is too short'
  }

  return null
}

export {
  validateRegister,
  validateLogin
}
