import express from 'express'

import {
  createAndUpdateValidator,
  idValidator
} from '../validators/products.validator.js'
import Product from '../models/Product.js'
import auth from '../middleware/auth.middleware.js'
import validate from '../middleware/error.middleware.js'
import {
  filterArray,
  sanitizeParams,
  sendMessage
} from '../utils/helper.functions.js'

const router = express.Router()

router.post('/', auth, createAndUpdateValidator, validate, async (req, res) => {
  try {
    const product = await Product.create({
      ...req.body,
      sizes: Array.from(new Set(req.body.sizes))
    })
    return res.status(200).json(product)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

router.put(
  '/:id',
  auth,
  createAndUpdateValidator,
  idValidator,
  validate,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          ...req.body,
          sizes: Array.from(new Set(req.body.sizes))
        },
        { new: true }
      )
      return res.status(200).json(product)
    } catch (e) {
      return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
    }
  }
)

router.get('/', async (req, res) => {
  try {
    const { search, category, brand, sizes } = sanitizeParams(req.query)
    const { sort } = req.query
    let products = await Product.find().sort(sort)

    products = search
      ? filterArray(products, ['brand', 'model', 'code'], search)
      : products

    products = category
      ? filterArray(products, ['category'], category)
      : products

    products = brand ? filterArray(products, ['brand'], brand) : products

    if (sizes) {
      sizes.split(',').forEach(size => {
        products = filterArray(products, ['sizes'], size)
      })
    }

    return res.status(200).json(products)
  } catch (e) {
    console.log(e)
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже')
  }
})

router.get('/:id', idValidator, validate, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const sameProducts = await Product.find({ code: product.code })
    return res.status(200).json({ product, sameProducts })
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

router.delete('/:id', auth, idValidator, validate, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)
    if (!product) {
      return sendMessage(res, 400, 'Не удалость удалить товар')
    }
    return res.status(200).json(product)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

export default router
