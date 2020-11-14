import React from 'react'
import Button from '../Button/Button'

import styles from './AdminHeader.module.scss'
import logoAdmin from '../../assets/images/logoAdmin.svg'

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <img src={logoAdmin} alt="Лого админки" width={300} height={31} className={styles.logo} />
        <Button type="button" style="regular" className={styles.logoutButton} text="Logout" />
      </div>
    </header>
  )
}

export default AdminHeader
