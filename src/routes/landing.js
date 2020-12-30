import express from 'express'

import auth from '../middleware/auth.middleware.js'
import { sendMessage } from '../utils/helper.functions.js'
import Slide from '../models/Slide.js'
import Hot from '../models/Hot.js'
import {
  feedbackValidator,
  hotValidator,
  slideValidator
} from '../validators/landing.validator.js'
import validate from '../middleware/error.middleware.js'
import Feedback from '../models/Feedback.js'

const router = express.Router()

router.post('/slides/:id', auth, slideValidator, validate, async (req, res) => {
  try {
    const { photo, link } = req.body
    const { id } = req.params
    const slide = await Slide.findOneAndUpdate(
      { index: id },
      { index: id, photo, link },
      { upsert: true }
    )
    return res.status(200).json(slide)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

router.post('/hots/:id', auth, hotValidator, validate, async (req, res) => {
  try {
    const { photo, link } = req.body
    const { id } = req.params
    const hot = await Hot.findOne({ index: id })
    if (!hot) {
      const newHot = await Hot.create({
        index: id,
        photo,
        link
      })
      return res.status(200).json(newHot)
    }
    hot.photo = photo
    hot.link = link
    await hot.save()
    return res.status(200).json(hot)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

router.post(
  '/feedbacks/:id',
  auth,
  feedbackValidator,
  validate,
  async (req, res) => {
    try {
      const { photo, name, subs, feedback } = req.body
      const { id } = req.params
      const f = await Feedback.findOne({ index: id })
      if (!f) {
        const newF = await Feedback.create({
          index: id,
          photo,
          name,
          subs,
          feedback
        })
        return res.status(200).json(newF)
      }
      f.photo = photo
      f.name = name
      f.subs = subs
      f.feedback = feedback
      await f.save()
      return res.status(200).json(f)
    } catch (e) {
      return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
    }
  }
)

router.get('/slides', async (req, res) => {
  try {
    const slides = await Slide.find().sort('index')
    return res.status(200).json(slides)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

router.get('/hots', async (req, res) => {
  try {
    const hots = await Hot.find().sort('index')
    return res.status(200).json(hots)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

router.get('/feedbacks', async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort('index')
    return res.status(200).json(feedbacks)
  } catch (e) {
    return sendMessage(res, 500, 'Что-то пошло не так, попробуйте позже', e)
  }
})

export default router
