import validator from 'express-validator'
import jwt from 'jsonwebtoken'
import express from 'express'

import loginValidator from '../validators/auth.validator.js'
import limiter from '../middleware/limit.middleware.js'
import config from '../config/config.js'

const router = express.Router()
const { validationResult } = validator

router.post('/', loginValidator, limiter, (req, res) => {
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ message: errors.array()[0].msg })
    }
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
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

export default router
