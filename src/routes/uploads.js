import express from 'express'
import {
  isAvailableFileFormat,
  sendMessage,
  uploadFile
} from '../utils/helper.functions.js'
import auth from '../middleware/auth.middleware.js'

const router = express.Router()

router.post('/:dirname', auth, (req, res) => {
  try {
    const { dirname } = req.params
    if (!req.files) {
      return sendMessage(res, 400, 'Загрузите файл')
    }
    const { file } = req.files
    if (Array.isArray(file)) {
      return sendMessage(res, 400, 'Неверное количество файлов')
    }
    if (!isAvailableFileFormat(file)) {
      return sendMessage(res, 400, 'Некорректный формат')
    }
    const filePath = uploadFile(file, dirname)
    return res.status(200).json({ filePath })
  } catch (error) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', error)
  }
})

export default router
