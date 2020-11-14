import fileUpload from 'express-fileupload'
import compression from 'compression'
import { fileURLToPath } from 'url'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'

import authRoutes from './routes/auth.js'
import productsRoutes from './routes/products.js'
import landingRoutes from './routes/landing.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const server = express()

server.use(express.static(path.resolve(__dirname, '..', 'public')))
server.use(express.static(path.resolve(__dirname, '..', 'uploads')))
server.use(express.urlencoded({ extended: true }))
server.use(morgan('dev'))
server.use(express.json())
server.use(compression())
server.use(helmet())
server.use(cors())
server.use(
  fileUpload({
    createParentPath: true,
    abortOnLimit: true,
    responseOnLimit: JSON.stringify({
      message: 'Размер файла слишком большой'
    }),
    limits: {
      fileSize: 10 * 1024 * 1024
    }
  })
)

server.use('/api/v1/auth', authRoutes)
server.use('/api/v1/products', productsRoutes)
server.use('/api/v1/landing', landingRoutes)

server.get('*', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'self'; script-src * 'self' 'unsafe-inline'; style-src * 'self' 'unsafe-inline'; img-src * 'self' data: https:;"
  )
  return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

export default server
