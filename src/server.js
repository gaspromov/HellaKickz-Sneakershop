import compression from 'compression'
import { fileURLToPath } from 'url'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import path from 'path'
import cors from 'cors'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const server = express()

server.use(express.static(path.resolve(__dirname, '..', 'public')))
server.use(express.urlencoded({ extended: true }))
server.use(morgan('tiny'))
server.use(express.json())
server.use(compression())
server.use(helmet())
server.use(cors())

server.get('*', (req, res) => {
  res.setHeader(
    'Content-Security-Policy',
    "default-src * 'self'; script-src * 'self' 'unsafe-inline'; style-src * 'self' 'unsafe-inline'; img-src * 'self' data: https:;"
  )
  return res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'))
})

export default server
