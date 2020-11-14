import express from 'express'

import {
  createAndUpdateValidator,
  deleteValidator,
  readValidator
} from '../validators/products.validator.js'
import Product from '../models/Product.js'
import auth from '../middleware/auth.middleware.js'
import checkValidateError from '../middleware/error.middleware.js'
import checkUploadFormat from '../middleware/format.middleware.js'
import { uploadFiles } from '../utils/helper.functions.js'

const router = express.Router()

router.post(
  '/',
  auth,
  createAndUpdateValidator,
  checkValidateError,
  checkUploadFormat,
  async (req, res) => {
    try {
      const { photos } = req.files
      const photosPath = uploadFiles(photos, 'products')
      const product = await Product.create({
        ...req.body,
        sizes: Array.from(new Set(req.body.sizes)),
        photos: photosPath
      })
      return res.status(200).json(product)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
  }
)

router.put(
  '/',
  auth,
  createAndUpdateValidator,
  checkValidateError,
  checkUploadFormat,
  async (req, res) => {
    try {
      let photosPath
      if (req.files) {
        const { photos } = req.files
        photosPath = uploadFiles(photos, 'products')
      } else {
        photosPath = req.body.photos
      }
      const product = await Product.findByIdAndUpdate(
        req.body.id,
        {
          ...req.body,
          sizes: Array.from(new Set(req.body.sizes)),
          photos: photosPath
        },
        { new: true }
      )
      return res.status(200).json(product)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
  }
)

router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    return res.status(200).json(products)
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.get('/:id', readValidator, checkValidateError, async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
    const sameProducts = await Product.find({ code: product.code })
    return res.status(200).json({ product, sameProducts })
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.delete(
  '/',
  auth,
  deleteValidator,
  checkValidateError,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.body.id)
      if (!product) {
        return res.status(400).json({ message: 'Не удалось удалить товар' })
      }
      return res.status(200).json(product)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
  }
)

export default router
