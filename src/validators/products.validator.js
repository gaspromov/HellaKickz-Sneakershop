import validator from 'express-validator'

const { body, param } = validator

export const createAndUpdateValidator = [
  body('photos', 'Укажите фотографии').exists().isArray(),
  body('brand', 'Укажите бренд').exists().trim().notEmpty(),
  body('model', 'Укажите модель').exists().trim().notEmpty(),
  body('code', 'Укажите артикул').exists().trim().notEmpty(),
  body('price', 'Укажите цену').exists().trim().notEmpty().isInt({ min: 1 }),
  body('category', 'Укажите тип')
    .exists()
    .trim()
    .notEmpty()
    .isIn(['sneakers', 'clothes', 'accessory', 'childish']),
  body('sizes', 'Укажите размеры').exists().isArray()
]

export const idValidator = [
  param('id', 'Некорректный ID').exists().trim().notEmpty().isMongoId()
]
