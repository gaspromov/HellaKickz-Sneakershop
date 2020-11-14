import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import config from '../config/config.js'

export default (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    if (!token) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    const admin = jwt.verify(token, config.ACCESS_TOKEN_SECRET)
    const isLoginSame = bcrypt.compare(admin.login, config.ADMIN_LOGIN)
    const isPasswordSame = bcrypt.compare(admin.password, config.ADMIN_PASSWORD)
    if (!isLoginSame || !isPasswordSame) {
      return res.status(401).json({ message: 'Нет авторизации' })
    }
    return next()
  } catch (e) {
    return res.status(401).json({ message: 'Нет авторизации' })
  }
}
