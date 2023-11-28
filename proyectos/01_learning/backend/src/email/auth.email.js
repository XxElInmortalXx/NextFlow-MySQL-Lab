import { createTransporter } from '../config/nodemailer.config.js'

export const sendEmailVerification = async ({ token, email }) => {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )

  // enviar el email
  await transporter.sendMail({
    from: '"blog potente" ejemplo@ejemplo.com',
    to: email,
    subject: 'Email Verification',
    text: 'Verify your account',
    html: `<a href='${process.env.CLIENT_URL}/auth/verify/${token}'>Verify your account</a>`
  })
}

export const sendEmailForgot = async ({ token, email }) => {
  const transporter = createTransporter(
    process.env.EMAIL_HOST,
    process.env.EMAIL_PORT,
    process.env.EMAIL_USER,
    process.env.EMAIL_PASS
  )

  // enviar el email
  await transporter.sendMail({
    from: '"blog potente" ejemplo@ejemplo.com',
    to: email,
    subject: 'Recupera tu cuenta',
    text: 'Write your new password',
    html: `<a href='${process.env.CLIENT_URL}/auth/recover/${token}'>Write your new password</a>`
  })
}
