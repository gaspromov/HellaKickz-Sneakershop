import validator from 'express-validator'

const { body } = validator

export const hotValidator = [
  body('link', 'Укажите ссылку').exists().trim().notEmpty().isURL()
]

export const feedbackValidator = [
  body('name', 'Укажите имя').exists().trim().notEmpty(),
  body('subs', 'Укажите количество подписчиков').exists().trim().notEmpty(),
  body('feedback', 'Укажите отзыв').exists().trim().notEmpty()
]
