import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './MobileMenu.module.scss'

const MobileMenu = ({ isOpen, onMobileMenuLinkClick }) => {
  const onMenuLinkClick = () => {
    onMobileMenuLinkClick()
  }

  return (
    <nav style={{ transform: isOpen ? 'scale(1,1)' : 'scale(1,0)' }} className={styles.nav}>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <NavLink to="/catalog" onClick={onMenuLinkClick} className={styles.menuLink}>Каталог</NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/catalog/?categories=clothes" onClick={onMenuLinkClick} className={styles.menuLink}>Одежда</NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/catalog/?categories=accessory" onClick={onMenuLinkClick} className={styles.menuLink}>Аксессуары</NavLink>
        </li>
        <li className={styles.menuItem}>
          <NavLink to="/catalog/?categories=sneakers" onClick={onMenuLinkClick} className={styles.menuLink}>Обувь</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default MobileMenu
