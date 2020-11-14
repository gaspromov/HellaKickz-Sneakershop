import validator from 'express-validator'

const { body, param } = validator

const sneakersSizes = Array(23)
  .fill('')
  .map((_, index) => {
    if (!index) return '4'
    return (4 + index * 0.5).toString()
  })

const clothesSizes = ['xs', 's', 'm', 'l', 'xl', 'xxl', 'one size']

export const createAndUpdateValidator = [
  body('photos', 'Укажите фотографии').exists().isArray(),
  body('brand', 'Укажите бренд').exists().trim().notEmpty(),
  body('model', 'Укажите модель').exists().trim().notEmpty(),
  body('color', 'Укажите цвет').exists().trim().notEmpty(),
  body('code', 'Укажите артикул').exists().trim().notEmpty(),
  body('price', 'Укажите цену').exists().trim().notEmpty().isInt({ min: 0 }),
  body('category', 'Укажите тип')
    .exists()
    .trim()
    .notEmpty()
    .isIn(['sneakers', 'clothes', 'accessory', 'childish']),
  body('sizes', 'Укажите размеры')
    .exists()
    .isArray()
    .custom((value, { req }) => {
      const { category } = req.body
      const sizes = Array.from(new Set(value))
      let isValid
      if (category === 'sneakers' || category === 'childish') {
        isValid = sizes.every(v => {
          return sneakersSizes.includes(v.toString())
        })
      } else if (category === 'clothes') {
        isValid = sizes.every(v => {
          return clothesSizes.includes(v.toString())
        })
      } else if (category === 'accessory') {
        isValid = sizes.every(v => {
          return v.toString().toLowerCase().trim() === 'one size'
        })
      }
      return isValid ? true : Promise.reject(new Error('Некорректные размеры'))
    })
]

export const deleteValidator = [
  body('id', 'Некорректный ID').exists().trim().notEmpty().isMongoId()
]

export const readValidator = [
  param('id', 'Некорректный ID').exists().trim().notEmpty().isMongoId()
]
