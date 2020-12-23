import validator from 'express-validator'

const { body, param } = validator

export const slideValidator = [
  param('id', 'Некорректное ID')
    .exists()
    .trim()
    .notEmpty()
    .isInt({ min: 0, max: 2 }),
  body('photo', 'Укажите фотографию').exists().trim().notEmpty()
]

export const hotValidator = [
  param('id', 'Некорректное ID')
    .exists()
    .trim()
    .notEmpty()
    .isInt({ min: 0, max: 3 }),
  body('photo', 'Укажите фотографию').exists().trim().notEmpty()
]

export const feedbackValidator = [
  param('id', 'Некорректное ID')
    .exists()
    .trim()
    .notEmpty()
    .isInt({ min: 0, max: 5 }),
  body('photo', 'Укажите фотографию').exists().trim().notEmpty(),
  body('name', 'Укажите имя').exists().trim().notEmpty(),
  body('subs', 'Укажите количество подписчиков').exists().trim().notEmpty(),
  body('feedback', 'Укажите отзыв').exists().trim().notEmpty()
]
