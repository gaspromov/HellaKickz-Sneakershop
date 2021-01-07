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
import callbacksRoutes from './routes/callbacks.js'
import uploadsRoutes from './routes/uploads.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const server = express()

server.use(express.static(path.resolve(__dirname, '..', 'client', 'build')))
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
server.use('/api/v1/callbacks', callbacksRoutes)
server.use('/api/v1/uploads', uploadsRoutes)

server.get('*', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'self'; script-src * 'self' 'unsafe-inline'; style-src * 'self' 'unsafe-inline'; img-src * 'self' data: https: blob:;"
  )
  return res.sendFile(
    path.resolve(__dirname, '..', 'client', 'build', 'index.html')
  )
})

export default server
