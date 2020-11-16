import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../store/user/actions'
import { NavLink } from 'react-router-dom'
import Button from '../Button/Button'

import styles from './AdminHeader.module.scss'
import logoAdmin from '../../assets/images/logoAdmin.svg'

const AdminHeader = () => {
  const { isLoggedIn } = useSelector(({ user }) => user)
  const dispatch = useDispatch()

  const onLogoutButtonClick = () => {
    dispatch(logout())
  }

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <img src={logoAdmin} alt="Лого админки" width={300} height={31} className={styles.logo} />
        {isLoggedIn && (
          <NavLink to="/admin/auth">
            <Button type="button" style="regular" className={styles.logoutButton} text="Logout" onClick={onLogoutButtonClick} />
          </NavLink>
        )}
      </div>
    </header>
  )
}

export default AdminHeader
