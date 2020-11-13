import React from 'react'
import classNames from 'classnames'
import Button from '../../components/Button/Button'

import styles from './AdminAuth.module.scss'

const AdminAuth = () => {
  const inputClassName = classNames('inputText', styles.input)

  const onSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <h1 className={styles.title}>Login</h1>
        <input type="text" placeholder="Login" style={{ marginBottom: '10px' }} className={inputClassName} />
        <input type="password" placeholder="Password" style={{ marginBottom: '30px' }} className={inputClassName} />
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
