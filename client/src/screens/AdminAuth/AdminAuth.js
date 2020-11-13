import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../store/user/actions'
import classNames from 'classnames'
import Button from '../../components/Button/Button'

import styles from './AdminAuth.module.scss'

const AdminAuth = ({ history }) => {
  const [login, setLogin] = useState('')
  const [password, setPassword] = useState('')
  const { loading, error, isLoggedIn } = useSelector(({ user }) => user)
  const inputClassName = classNames('inputText', styles.input)
  const dispatch = useDispatch()

  useEffect(() => {
    isLoggedIn && history.push('/')
  }, [isLoggedIn])

  const onLoginChange = (e) => {
    setLogin(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(login(login, password))
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.title}>Login</h1>
        <input
          type="text"
          onChange={onLoginChange}
          placeholder="Login"
          style={{ marginBottom: '10px' }}
          required
          className={inputClassName} />
        <input
          type="password"
          onChange={onPasswordChange}
          placeholder="Password"
          style={{ marginBottom: '30px' }}
          required
          className={inputClassName}
        />
        <Button
          type="submit"
          style="regular"
          pt={10}
          pb={9}
          width={120}
          text="Login"
        />
      </form>
    </div>
  )
}

export default AdminAuth
