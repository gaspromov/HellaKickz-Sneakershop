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
            <NavLink to="/catalog" className={styles.menuLink}>Каталог</NavLink>
          </li>
          <li className={styles.menuItem} onMouseEnter={onShoeLinkMouseEnter} onMouseLeave={onShoeLinkMouseLeave}>
            <NavLink to="/catalog/?categories=sneakers" id="sneakerLink" className={styles.menuLink} style={{ borderBottom: isSubMenuOpen && '2px solid #ec7f62' }}>Обувь</NavLink>
            <SubMenu isOpen={isSubMenuOpen} onCategoryMenuLinkClick={onCategoryMenuLinkClick} />
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/catalog/?categories=clothes" className={styles.menuLink}>Одежда</NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/catalog/?categories=accessory" className={styles.menuLink}>Аксессуары</NavLink>
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
            <NavLink to="/#about" className={styles.menuLink}>О нас</NavLink>
          </li>
          <li className={styles.menuItem}>
            <NavLink to="/#feedbacks" className={styles.menuLink}>Отзывы</NavLink>
          </li>
          <li className={styles.menuItem}>
            <Link className={styles.menuLink} to="contacts" smooth={true} duration={0}>Контакты</Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}

export default Menu
