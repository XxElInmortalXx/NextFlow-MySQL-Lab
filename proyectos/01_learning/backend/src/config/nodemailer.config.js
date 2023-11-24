import nodemailer from 'nodemailer'

export const createTransporter = (host, port, user, pass) => {
  return nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    }
  })
}
