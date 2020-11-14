import { isAvailableFormat } from '../utils/helper.functions.js'

export default (req, res, next) => {
  if (req.method.toLowerCase() === 'post' && !req.files) {
    return res.status(400).json({ message: 'Загрузите фоторграфии' })
  }
  if (req.method.toLowerCase() === 'put' && !req.files) {
    return next()
  }
  const { photos } = req.files
  if (!photos.every(isAvailableFormat)) {
    return res.status(400).json({ message: 'Некорректный формат изображений' })
  }
  return next()
}
