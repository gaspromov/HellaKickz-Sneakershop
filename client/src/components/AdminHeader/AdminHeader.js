import React from 'react'
import logoAdmin from '../../assets/images/logoAdmin.svg'

import styles from './AdminHeader.module.scss'

const AdminHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <img src={logoAdmin} alt="Лого админки" className={styles.logo} />
      </div>
    </header>
  )
}

export default AdminHeader
