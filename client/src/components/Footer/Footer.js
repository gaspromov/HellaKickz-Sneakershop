import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.contacts}>
          <p className={styles.phone}>+7 (999) 123-33-42</p>
          <p className={styles.callback}>Заказать обратный звонок</p>
          <ul className={styles.socialMenu}>
            <li className={styles.socialIcon}><a href="/">f</a></li>
            <li className={styles.socialIcon}><a href="/"></a></li>
            <li className={styles.socialIcon}><a href="/"></a></li>
          </ul>
        </div>
        <ul className={styles.menu}>
          <li className={styles.menuItem}><NavLink to="/" className={styles.menuLink}>FAQ</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/" className={styles.menuLink}>Доставка</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/" className={styles.menuLink}>Обмен и возврат</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/" className={styles.menuLink}>Как подобрать размер</NavLink></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
