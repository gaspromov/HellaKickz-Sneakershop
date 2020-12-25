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
    const {
      search = '',
      categories = '',
      brands = '',
      sizes = ''
    } = sanitizeParams(req.query)
    const { sort } = req.query
    const searchArr = search.replace(/\s+/g, ' ').trim().split(' ')
    const brandArr = brands.split(',')
    const products = await Product.find().sort(sort || '-createdAt')

    let result = []

    products.forEach(p => {
      const brandAndModel = p.brand + p.model
      const isNeed = searchArr.every(s => {
        return brandAndModel.toLowerCase().includes(s)
      })
      if (isNeed) {
        result.push(p)
      }
    })

    if (categories) {
      categories.split(',').forEach(category => {
        result = filterArray(result, ['category'], category)
      })
    }

    if (brands) {
      result = result.filter(p => {
        return brandArr.some(b => {
          return p.brand.toLowerCase().includes(b.toLowerCase())
        })
      })
    }

    if (sizes) {
      sizes.split(',').forEach(size => {
        result = filterArray(result, ['sizes'], size)
      })
    }

    return res.status(200).json(result)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
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
