import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Link from '../Link/Link'

import styles from './SubMenu.module.scss'
import defaultImage from '../../assets/images/default.jpg'
import yeezy from '../../assets/images/yeezy.jpg'
import nike from '../../assets/images/nike.jpg'
import jordan from '../../assets/images/jordan.jpg'

const SubMenu = ({ isOpen, onCategoryMenuLinkClick }) => {
  const [photo1, setPhoto1] = useState(defaultImage)

  const onCategoryMouseEnter = (e) => {
    switch (e.currentTarget.dataset.category) {
      case 'yeezy':
        setPhoto1(yeezy)
        break
      case 'nike':
        setPhoto1(nike)
        break
      case 'jordan':
        setPhoto1(jordan)
        break
    }

  }

  const onMenuLinkClick = () => {
    onCategoryMenuLinkClick()
  }

  return (
    <div style={{ display: isOpen ? 'flex' : 'none' }} className={styles.subMenu}>
      <div className={styles.categoriesWrapper}>
        <div className={styles.categories}>
          <div data-category="yeezy" onMouseEnter={onCategoryMouseEnter} className={styles.category}>
            <NavLink to='/catalog?brands=Yeezy' onClick={onMenuLinkClick} className={styles.title}>Yeezy</NavLink>
            <ul>
              <li className={styles.menuItem}>
                <NavLink to='/catalog?search=yeezy 350' onClick={onMenuLinkClick} className={styles.menuLink}>Yeezy 350</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalog?search=yeezy 500' onClick={onMenuLinkClick} className={styles.menuLink}>Yeezy 500</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalog?search=yeezy 700' onClick={onMenuLinkClick} className={styles.menuLink}>Yeezy 700</NavLink>
              </li>
            </ul>
          </div>
          <div data-category="jordan" onMouseEnter={onCategoryMouseEnter} className={styles.category}>
            <NavLink to='/catalog?brands=Air jordan' onClick={onMenuLinkClick} className={styles.title}>Air Jordan</NavLink>
            <ul data-category="jordan">
              <li className={styles.menuItem}>
                <NavLink to='/catalog?search=jordan 1 high' onClick={onMenuLinkClick} className={styles.menuLink}>Jordan 1 High</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalog?search=jordan 1 mid' onClick={onMenuLinkClick} className={styles.menuLink}>Jordan 1 Mid</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalog?search=jordan 1 low' onClick={onMenuLinkClick} className={styles.menuLink}>Jordan 1 Low</NavLink>
              </li>
            </ul>
          </div>
          <div data-category="nike" onMouseEnter={onCategoryMouseEnter} className={styles.category}>
            <NavLink to='/catalog?brands=Nike' onClick={onMenuLinkClick} className={styles.title}>Nike</NavLink>
            <ul data-category="nike">
              <li className={styles.menuItem}>
                <NavLink to='/catalog?search=dunk' onClick={onMenuLinkClick} className={styles.menuLink}>Dunk</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalog?search=air force' onClick={onMenuLinkClick} className={styles.menuLink}>Air Force</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalog?search=off white' onClick={onMenuLinkClick} className={styles.menuLink}>& Off-White</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/catalog/?categories=sneakers" text="Смотреть все" className={styles.link} />
      </div>
      <div className={styles.photos}>
        <img src={photo1} width={250} height={250} className={styles.photo} />
      </div>
    </div>
  )
}

export default SubMenu
