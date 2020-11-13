import jwt from 'jsonwebtoken'
import config from '../config/config.js'

export default (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'Нет авторизации' })
  }
  const admin = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
  if (admin.login !== config.ADMIN_LOGIN) {
    return res.status(401).json({ message: 'Нет авторизации' })
  }
  return next()
}
