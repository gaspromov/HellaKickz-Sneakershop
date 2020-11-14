import jwt from 'jsonwebtoken'
import express from 'express'

import loginValidator from '../validators/auth.validator.js'
import limiter from '../middleware/limit.middleware.js'
import config from '../config/config.js'
import validate from '../middleware/error.middleware.js'
import { sendMessage } from '../utils/helper.functions.js'

const router = express.Router()

router.post('/', loginValidator, validate, limiter, (req, res) => {
  try {
    const { login, password } = req.body
    const accessToken = jwt.sign(
      { login, password },
      config.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15d'
      }
    )
    return res.status(200).json({ accessToken })
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

export default router
