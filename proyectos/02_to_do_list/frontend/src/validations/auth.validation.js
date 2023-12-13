// expresiones regulares
const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const loginValidation = (formData) => {
  const { email, password } = formData

  if (email.length === 0) {
    return 'Email is empty'
  }
  if (!isEmail.test(email)) {
    return 'Email is invalid'
  }
  if (email.length >= 32) {
    return 'Email is too big'
  }
  if (password.length === 0) {
    return 'Password is empty'
  }
  if (password.length <= 3) {
    return 'Password is too short'
  }
  if (password.length >= 16) {
    return 'Password is too big'
  }
  return null
}

const registerValidation = (formData) => {
  const { first_name, last_name, email, password } = formData

  if (first_name.length === 0) {
    return 'First name is empty'
  }
  if (first_name.length <= 3) {
    return 'Fisrt name is too short'
  }
  if (first_name.length >= 32) {
    return 'Fisrt name is too big'
  }
  if (last_name.length === 0) {
    return 'Last name is empty'
  }
  if (last_name.length <= 3) {
    return 'Last name is too short'
  }
  if (last_name.length >= 32) {
    return 'Last name is too big'
  }
  if (email.length === 0) {
    return 'Email is empty'
  }
  if (!isEmail.test(email)) {
    return 'Email is invalid'
  }
  if (email.length >= 32) {
    return 'Email is too big'
  }
  if (password.length === 0) {
    return 'Password is empty'
  }
  if (password.length <= 3) {
    return 'Password is too short'
  }
  if (password.length >= 16) {
    return 'Password is too big'
  }
  return null
}

const forgotPasswordValidation = (formData) => {
  const { email } = formData

  if (email.length === 0) {
    return 'Email is empty'
  }
  if (!isEmail.test(email)) {
    return 'Email is invalid'
  }
  if (email.length >= 32) {
    return 'Email is too big'
  }
  return null
}

const recoverPasswordValidation = (formData) => {
  const { password } = formData
  if (password.length === 0) {
    return 'Password is empty'
  }
  if (password.length <= 3) {
    return 'Password is too short'
  }
  if (password.length >= 16) {
    return 'Password is too big'
  }
  return null
}

export {
  loginValidation,
  registerValidation,
  forgotPasswordValidation,
  recoverPasswordValidation
}
