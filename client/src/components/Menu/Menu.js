import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import SubMenu from '../SubMenu/SubMenu'
import { Link } from 'react-scroll'

import styles from './Menu.module.scss'
import logo from '../../assets/images/logo.svg'
import logoSmall from '../../assets/images/logoSmall.svg'

const Menu = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false)

  const onShoeLinkMouseEnter = () => {
    setIsSubMenuOpen(true)
  }

  const onShoeLinkMouseLeave = () => {
    setIsSubMenuOpen(false)
  }

  const onCategoryMenuLinkClick = () => {
    setIsSubMenuOpen(false)
  }

  return (
    <div className={styles.wrapper}>
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <NavLink to="/catalogue" className={styles.menuLink}>Каталог</NavLink>
          </li>
          <li className={styles.menuItem} onMouseEnter={onShoeLinkMouseEnter} onMouseLeave={onShoeLinkMouseLeave}>
            <NavLink to={{ pathname: `/catalogue`, state: { category: 'sneakers' } }} className={styles.menuLink}>Обувь</NavLink>
            <SubMenu isOpen={isSubMenuOpen} onCategoryMenuLinkClick={onCategoryMenuLinkClick} />
          </li>
          <li className={styles.menuItem}>
            <NavLink to={{ pathname: `/catalogue`, state: { category: 'clothes' } }} className={styles.menuLink}>Одежда</NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to={{ pathname: `/catalogue`, state: { category: 'accessory' } }} className={styles.menuLink}>Аксессуары</NavLink>
          </li>
        </ul>
        <NavLink to="/">
          <picture>
            <source srcSet={logo} media="(min-width: 1100px)" />
            <source srcSet={logoSmall} media="(min-width: 870px)" />
            <img src={logoSmall} alt="Лого" className={styles.logo} />
          </picture>
        </NavLink>
        <ul className={styles.menu}>
          <li className={styles.menuItem}>
            <NavLink to="/faq" className={styles.menuLink}>FAQ</NavLink>
          </li>
          <li className={styles.menuItem}>
            <Link className={styles.menuLink} to="about" smooth={true} duration={500}>О нас</Link>
          </li>
          <li className={styles.menuItem}>
            <Link className={styles.menuLink} to="feedbacks" smooth={true} duration={500}>Отзывы</Link>
          </li>
          <li className={styles.menuItem}>
            <Link className={styles.menuLink} to="contacts" smooth={true} duration={500}>Контакты</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Menu
