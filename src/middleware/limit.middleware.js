import rateLimit from 'express-rate-limit'

export default rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  skipSuccessfulRequests: true,
  message: {
    message: 'Превышено максимальное количество попыток входа. Попробуйте позже'
  }
})
