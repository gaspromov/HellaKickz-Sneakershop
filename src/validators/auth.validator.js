import bcrypt from 'bcryptjs'
import validator from 'express-validator'

import config from '../config/config.js'

const { body } = validator

export default [
  body('login', 'Некорректные данные')
    .exists()
    .trim()
    .notEmpty()
    .custom(async value => {
      try {
        const areSame = await bcrypt.compare(value, config.ADMIN_LOGIN)
        if (!areSame) {
          return Promise.reject(new Error('Некорректные данные'))
        }
        return areSame
      } catch (e) {
        return Promise.reject(new Error('Неизвестная ошибка'))
      }
    }),
  body('password', 'Некорректные данные')
    .exists()
    .trim()
    .notEmpty()
    .custom(async value => {
      try {
        const areSame = await bcrypt.compare(value, config.ADMIN_PASSWORD)
        if (!areSame) {
          return Promise.reject(new Error('Некорректные данные'))
        }
        return areSame
      } catch (e) {
        return Promise.reject(new Error('Неизвестная ошибка'))
      }
    })
]
