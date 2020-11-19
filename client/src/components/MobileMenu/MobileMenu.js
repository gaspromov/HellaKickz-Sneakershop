import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './MobileMenu.module.scss'

const MobileMenu = ({ isOpen, onMobileMenuLinkClick }) => {
  const onMenuLinkClick = () => {
    onMobileMenuLinkClick()
  }

  return (
    <nav style={{ display: isOpen ? 'flex' : 'none' }} className={styles.nav}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <NavLink to="/" onClick={onMenuLinkClick} className={styles.menuLink}>Каталог</NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/" onClick={onMenuLinkClick} className={styles.menuLink}>Одежда</NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/" onClick={onMenuLinkClick} className={styles.menuLink}>Аксессуары</NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/" onClick={onMenuLinkClick} className={styles.menuLink}>Обувь</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default MobileMenu
