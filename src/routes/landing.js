import express from 'express'

import auth from '../middleware/auth.middleware.js'
import { isAvailableFormat, uploadFiles } from '../utils/helper.functions.js'
import Slide from '../models/Slide.js'
import Hot from '../models/Hot.js'
import {
  feedbackValidator,
  hotValidator
} from '../validators/landing.validator.js'
import checkValidateError from '../middleware/error.middleware.js'
import Feedback from '../models/Feedback.js'

const router = express.Router()

router.post('/slides/:id', auth, async (req, res) => {
  try {
    const { photo } = req.files
    const { id } = req.params
    if (id > 2 || id < 0) {
      return res.status(400).json({ message: 'Некорректное ID' })
    }
    if (!isAvailableFormat(photo)) {
      return res
        .status(400)
        .json({ message: 'Некорректный формат изображения' })
    }
    const photoPath = uploadFiles([photo], 'slides')[0]
    const slide = await Slide.findOne({ id })
    if (!slide) {
      const newSlide = await Slide.create({
        id,
        photo: photoPath
      })
      return res.status(200).json(newSlide)
    }
    slide.photo = photoPath
    await slide.save()
    return res.status(200).json(slide)
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.post(
  '/hots/:id',
  auth,
  hotValidator,
  checkValidateError,
  async (req, res) => {
    try {
      const { link } = req.body
      const { id } = req.params
      if (id > 3 || id < 0) {
        return res.status(400).json({ message: 'Некорректное ID' })
      }
      const hot = await Hot.findOne({ id })
      if (!req.files && hot) {
        hot.link = link
        await hot.save()
        return res.status(200).json(hot)
      }
      const { photo } = req.files
      if (!isAvailableFormat(photo)) {
        return res
          .status(400)
          .json({ message: 'Некорректный формат изображения' })
      }
      const photoPath = uploadFiles([photo], 'hots')[0]
      if (!hot) {
        const newHot = await Hot.create({
          id,
          photo: photoPath,
          link
        })
        return res.status(200).json(newHot)
      }
      hot.photo = photoPath
      hot.link = link
      await hot.save()
      return res.status(200).json(hot)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
  }
)

router.post(
  '/feedbacks/:id',
  auth,
  feedbackValidator,
  checkValidateError,
  async (req, res) => {
    try {
      const { name, subs, feedback } = req.body
      const { id } = req.params
      if (id > 5 || id < 0) {
        return res.status(400).json({ message: 'Некорректное ID' })
      }
      const feedbackModel = await Feedback.findOne({ id })
      if (!req.files && feedbackModel) {
        feedbackModel.name = name
        feedbackModel.subs = subs
        feedbackModel.feedback = feedback
        await feedbackModel.save()
        return res.status(200).json(feedbackModel)
      }
      const { photo } = req.files
      if (!isAvailableFormat(photo)) {
        return res
          .status(400)
          .json({ message: 'Некорректный формат изображения' })
      }
      const photoPath = uploadFiles([photo], 'feedbacks')[0]
      if (!feedbackModel) {
        const newFeedbackModel = await Feedback.create({
          id,
          photo: photoPath,
          name,
          subs,
          feedback
        })
        return res.status(200).json(newFeedbackModel)
      }
      feedbackModel.photo = photoPath
      feedbackModel.name = name
      feedbackModel.subs = subs
      feedbackModel.feedback = feedback
      await feedbackModel.save()
      return res.status(200).json(feedbackModel)
    } catch (e) {
      console.log(e)
      return res
        .status(500)
        .json({ message: 'Что-то пошло не так, попробуйте позже' })
    }
  }
)

router.get('/slides', async (req, res) => {
  try {
    const slides = await Slide.find()
    return res.status(200).json(slides)
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.get('/hots', async (req, res) => {
  try {
    const hots = await Hot.find()
    return res.status(200).json(hots)
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
    return res.status(200).json(feedbacks)
  } catch (e) {
    console.log(e)
    return res
      .status(500)
      .json({ message: 'Что-то пошло не так, попробуйте позже' })
  }
})

export default router
