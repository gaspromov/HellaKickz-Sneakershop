import validator from 'express-validator'

const { validationResult } = validator

export default (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg })
  }
  return next()
}
