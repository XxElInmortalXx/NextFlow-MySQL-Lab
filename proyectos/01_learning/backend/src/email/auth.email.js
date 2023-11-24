import { createTransporter } from '../config/nodemailer.config.js'

export const sendEmailVerification = async ({ token, email }) => {
  const transporter = createTransporter(
    'sandbox.smtp.mailtrap.io',
    2525,
    '40b192de97be6f',
    '7c84468ceaf5df'
  )

  // enviar el email
  await transporter.sendMail({
    from: '"blog potente" ejemplo@ejemplo.com',
    to: email,
    subject: 'Email Verification',
    text: 'Hello world',
    html: `<a href='http://localhost:4000/api-v1/auth/verify/${token}'>Hello world</a>`
  })
}
