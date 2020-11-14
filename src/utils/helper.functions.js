import path from 'path'
import crypto from 'crypto'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export const isAvailableFormat = file => {
  const filetypes = /jpeg|png|jpg/
  const extname = path.extname(file.name).toLowerCase()
  const { mimetype } = file
  return filetypes.test(extname) && filetypes.test(mimetype)
}

export const uploadFiles = (photos = [], dirname) => {
  return photos.map(photo => {
    const photoName =
      crypto.randomBytes(8).toString('hex') + path.extname(photo.name)
    const photoPath = path.join(__dirname, '..', '..', 'uploads', dirname)
    photo.mv(path.join(photoPath, photoName))
    return path.join(`/${dirname}`, photoName)
  })
}
