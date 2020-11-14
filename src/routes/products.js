import express from 'express'

import {
  createAndUpdateValidator,
  deleteValidator,
  readValidator
} from '../validators/products.validator.js'
import Product from '../models/Product.js'
import auth from '../middleware/auth.middleware.js'
import validate from '../middleware/error.middleware.js'
import { sendMessage } from '../utils/helper.functions.js'

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

router.put('/', auth, createAndUpdateValidator, validate, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.body.id,
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
})

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    return res.status(200).json(products)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже')
  }
})

router.get('/:id', readValidator, validate, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const sameProducts = await Product.find({ code: product.code })
    return res.status(200).json({ product, sameProducts })
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

router.delete('/', auth, deleteValidator, validate, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.body.id)
    if (!product) {
      return sendMessage(res, 400, 'Не удалость удалить товар')
    }
    return res.status(200).json(product)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

export default router
