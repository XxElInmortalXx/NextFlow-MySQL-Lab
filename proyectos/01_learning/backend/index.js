import express from 'express'
import cors from 'cors'
import authRoute from './src/routes/auth.routes.js'
import postRoute from './src/routes/post.routes.js'
import commentRoute from './src/routes/comment.routes.js'
import dotenv from 'dotenv'
import { db } from './src/config/db.js'

db()
dotenv.config()

const app = express()
app.use(express.json())

// cors
const whiteList = ['http://localhost:3000', undefined]
const corsOptions = {
  origin: (origin, callBack) => {
    if (whiteList.includes(origin)) {
      callBack(null, true)
    } else {
      callBack(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions))

// routes
app.use('/api-v1/auth/', authRoute)
app.use('/api-v1/post/', postRoute)
app.use('/api-v1/comment/', commentRoute)

// port
const PORT = process.env.PORT || 4000

// listen
app.listen(PORT, () => {
  console.log(`------ Server in port ${PORT}`)
})
