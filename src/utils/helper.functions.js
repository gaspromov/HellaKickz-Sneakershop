import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const isAvailableFileFormat = file => {
  const filetypes = /jpeg|png|jpg/
  const extname = path.extname(file.name).toLowerCase()
  const { mimetype } = file
  return filetypes.test(extname) && filetypes.test(mimetype)
}

export const uploadFile = (file, dirname) => {
  const fileName =
    crypto.randomBytes(8).toString('hex') + path.extname(file.name)
  const filePath = path.join(__dirname, '..', '..', 'uploads', dirname)
  file.mv(path.join(filePath, fileName))
  return path.join(`/${dirname}`, fileName)
}

export const sendMessage = (res, status, message, error) => {
  if (error) console.error(error.message)
  return res.status(status).json({ message })
}
