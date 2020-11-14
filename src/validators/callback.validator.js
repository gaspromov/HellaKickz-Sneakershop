import validator from 'express-validator'

const { body, param } = validator

export const createValidator = [
  body('name', 'Укажите имя').exists().trim().notEmpty(),
  body('number', 'Укажите контакты').exists().trim().notEmpty()
]

export const idValidator = [
  param('id', 'Некорректный ID').exists().trim().notEmpty().isMongoId()
]
