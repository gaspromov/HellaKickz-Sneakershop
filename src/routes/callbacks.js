import express from 'express'
import {
  createValidator,
  idValidator
} from '../validators/callback.validator.js'
import Callback from '../models/Callback.js'
import validate from '../middleware/error.middleware.js'
import auth from '../middleware/auth.middleware.js'
import { sendMessage } from '../utils/helper.functions.js'

const router = express.Router()

router.post('/', createValidator, validate, async (req, res) => {
  try {
    const callback = await Callback.create({
      ...req.body
    })
    return res.status(200).json(callback)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

router.put('/:id', auth, idValidator, validate, async (req, res) => {
  try {
    const callback = await Callback.findByIdAndUpdate(
      req.params.id,
      {
        isRead: true
      },
      { new: true }
    )
    return res.status(200).json(callback)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

router.get('/', auth, async (req, res) => {
  try {
    const callbacks = await Callback.find()
    return res.status(200).json(callbacks)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

router.delete('/:id', auth, idValidator, validate, async (req, res) => {
  try {
    const callback = await Callback.findByIdAndDelete(req.params.id)
    if (!callback) {
      return sendMessage(res, 400, 'Не удалось удалить заявку')
    }
    return res.status(200).json(callback)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

export default router
