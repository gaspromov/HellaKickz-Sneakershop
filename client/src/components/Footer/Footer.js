import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Footer.module.scss'
import cactusLogo from '../../assets/images/cactusLogo.svg'

const Footer = () => {
  const onLinkMouseDown = (e) => {
    e.preventDefault()
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.contacts}>
          <p className={styles.phone}><span className={styles.phoneCode}>+7 </span>(999) 123-33-42</p>
          <p className={styles.callback}>Заказать обратный звонок</p>
          <ul className={styles.socialMenu}>
            <li className={styles.socialIcon}><a href="https://www.instagram.com/hellakickz_/" target="_blank"></a></li>
            <li className={styles.socialIcon}><a href="https://t.me/hellakickz" target="_blank"></a></li>
            <li className={styles.socialIcon}><a href="https://api.whatsapp.com/send/?phone=79854920460&text&app_absent=0" target="_blank"></a></li>
          </ul>
        </div>
        <ul className={styles.menu}>
          <li className={styles.menuItem}><NavLink to="/faq" className={styles.menuLink}>FAQ</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/faq" className={styles.menuLink}>Доставка</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/faq" className={styles.menuLink}>Обмен и возврат</NavLink></li>
          <li className={styles.menuItem}><NavLink to="/faq" className={styles.menuLink}>Как подобрать размер</NavLink></li>
        </ul>
      </div>
      <div className={styles.policy}>
        <p className={styles.policyMessage}>Пользовательское соглашение</p>
        <picture className={styles.cactusLogoPicture}>
          <a href="https://CactusWeb.io">
            <img src={cactusLogo} alt="Логотип CactusWeb" className={styles.cactusLogoImage} />
          </a>
        </picture>
      </div>
    </footer>
  )
}

export default Footer
