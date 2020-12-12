import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { auth } from '../../store/user/actions'
import useInput from '../../hooks/useInput'
import classNames from 'classnames'
import Button from '../../components/Button/Button'

import styles from './AdminAuth.module.scss'

const AdminAuth = ({ history }) => {
  const login = useInput('')
  const password = useInput('')
  const { loading, error, isLoggedIn } = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  useEffect(() => {
    isLoggedIn && history.push('/admin/dashboard')
  }, [isLoggedIn])

  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(auth(login.value, password.value))
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.title}>Login</h1>
        <p className={classNames(styles.message, error && styles.error)}>
          <>
            {loading && 'Подождите...'}
            {error}
          </>
        </p>
        <input
          type="text"
          {...login.bind}
          placeholder="Login"
          style={{ marginBottom: '10px' }}
          className={styles.input} />
        <input
          type="password"
          {...password.bind}
          placeholder="Password"
          style={{ marginBottom: '30px' }}
          className={styles.input}
        />
        <Button type="submit" style="regular" className={styles.loginButton} text="Login" />
      </form>
    </div>
  )
}

export default AdminAuth
