import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Link from '../Link/Link'

import styles from './SubMenu.module.scss'
import default1 from '../../assets/images/default1.jpg'
import yeezy1 from '../../assets/images/yeezy1.jpg'
import nike1 from '../../assets/images/nike1.jpg'
import jordan1 from '../../assets/images/jordan1.jpg'

const SubMenu = ({ isOpen, onCategoryMenuLinkClick }) => {
  const [photo1, setPhoto1] = useState(default1)

  const onCategoryMouseEnter = (e) => {
    switch (e.currentTarget.dataset.category) {
      case 'yeezy':
        setPhoto1(yeezy1)
        break
      case 'nike':
        setPhoto1(nike1)
        break
      case 'jordan':
        setPhoto1(jordan1)
        break
      default:
        setPhoto1(default1)
        break
    }

  }

  const onCategoryMouseLeave = () => {
    setPhoto1(default1)
  }

  const onMenuLinkClick = () => {
    onCategoryMenuLinkClick()
  }

  return (
    <div style={{ transform: isOpen ? 'scale(1,1)' : 'scale(1,0)' }} className={styles.subMenu}>
      <div className={styles.categoriesWrapper}>
        <div className={styles.categories}>
          <div data-category="yeezy" onMouseEnter={onCategoryMouseEnter} onMouseLeave={onCategoryMouseLeave} className={styles.category}>
            <NavLink to='/catalogue?brands=Yeezy' onClick={onMenuLinkClick} className={styles.title}>Yeezy</NavLink>
            <ul>
              <li className={styles.menuItem}>
                <NavLink to='/catalogue?search=yeezy 350' onClick={onMenuLinkClick} className={styles.menuLink}>Yeezy 350</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalogue?search=yeezy 500' onClick={onMenuLinkClick} className={styles.menuLink}>Yeezy 500</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalogue?search=yeezy 700' onClick={onMenuLinkClick} className={styles.menuLink}>Yeezy 700</NavLink>
              </li>
            </ul>
          </div>
          <div data-category="nike" onMouseEnter={onCategoryMouseEnter} onMouseLeave={onCategoryMouseLeave} className={styles.category}>
            <NavLink to='/catalogue?brands=Nike' onClick={onMenuLinkClick} className={styles.title}>Nike</NavLink>
            <ul data-category="nike">
              <li className={styles.menuItem}>
                <NavLink to='/catalogue?search=dunk' onClick={onMenuLinkClick} className={styles.menuLink}>Dunk</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalogue?search=air force' onClick={onMenuLinkClick} className={styles.menuLink}>Air Force</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalogue?search=off-white' onClick={onMenuLinkClick} className={styles.menuLink}>x Off-White</NavLink>
              </li>
            </ul>
          </div>
          <div data-category="jordan" onMouseEnter={onCategoryMouseEnter} onMouseLeave={onCategoryMouseLeave} className={styles.category}>
            <NavLink to='/catalogue?brands=Air jordan' onClick={onMenuLinkClick} className={styles.title}>Air Jordan</NavLink>
            <ul data-category="jordan">
              <li className={styles.menuItem}>
                <NavLink to='/catalogue?search=jordan 1 high' onClick={onMenuLinkClick} className={styles.menuLink}>Jordan 1 High</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalogue?search=jordan 1 mid' onClick={onMenuLinkClick} className={styles.menuLink}>Jordan 1 Mid</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to='/catalogue?search=jordan 1 low' onClick={onMenuLinkClick} className={styles.menuLink}>Jordan 1 Low</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/catalogue/?categories=sneakers" text="Смотреть все" className={styles.link} />
      </div>
      <div className={styles.photos}>
        <img src={photo1} width={250} height={250} className={styles.photo} />
      </div>
    </div>
  )
}

export default SubMenu
