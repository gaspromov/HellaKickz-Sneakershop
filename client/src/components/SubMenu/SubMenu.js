import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Link from '../Link/Link'

import styles from './SubMenu.module.scss'
import default1 from '../../assets/images/default1.jpg'
import default2 from '../../assets/images/default2.jpg'
import yeezy1 from '../../assets/images/yeezy1.jpg'
import yeezy2 from '../../assets/images/yeezy2.jpg'
import nike1 from '../../assets/images/nike1.jpg'
import nike2 from '../../assets/images/nike2.jpg'
import jordan1 from '../../assets/images/jordan1.jpg'
import jordan2 from '../../assets/images/jordan2.jpg'

const SubMenu = ({ isOpen, onCategoryMenuLinkClick }) => {
  const [photo1, setPhoto1] = useState(default1)
  const [photo2, setPhoto2] = useState(default2)

  const onCategoryMouseEnter = (e) => {
    switch (e.currentTarget.dataset.category) {
      case 'yeezy':
        setPhoto1(yeezy1)
        setPhoto2(yeezy2)
        break
      case 'nike':
        setPhoto1(nike1)
        setPhoto2(nike2)
        break
      case 'jordan':
        setPhoto1(jordan1)
        setPhoto2(jordan2)
        break
      default:
        setPhoto1(default1)
        setPhoto2(default2)
        break
    }

  }

  const onCategoryMouseLeave = () => {
    setPhoto1(default1)
    setPhoto2(default2)
  }

  const onMenuLinkClick = () => {
    onCategoryMenuLinkClick()
  }

  return (
    <div style={{ transform: isOpen ? 'scale(1,1)' : 'scale(1,0)' }} className={styles.subMenu}>
      <div className={styles.categoriesWrapper}>
        <div className={styles.categories}>
          <div data-category="yeezy" onMouseEnter={onCategoryMouseEnter} onMouseLeave={onCategoryMouseLeave} className={styles.category}>
            <h3 className={styles.title}>Yeezy</h3>
            <ul>
              <li className={styles.menuItem}>
                <NavLink to={{ pathname: `/catalogue`, state: { search: 'yeezy 350' } }} onClick={onMenuLinkClick} className={styles.menuLink}>Yeezy 350</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to={{ pathname: `/catalogue`, state: { search: 'yeezy 500' } }} onClick={onMenuLinkClick} className={styles.menuLink}>Yeezy 500</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to={{ pathname: `/catalogue`, state: { search: 'yeezy 700' } }} onClick={onMenuLinkClick} className={styles.menuLink}>Yeezy 700</NavLink>
              </li>
            </ul>
          </div>
          <div data-category="nike" onMouseEnter={onCategoryMouseEnter} onMouseLeave={onCategoryMouseLeave} className={styles.category}>
            <h3 className={styles.title}>Nike</h3>
            <ul data-category="nike">
              <li className={styles.menuItem}>
                <NavLink to={{ pathname: `/catalogue`, state: { search: 'dunk' } }} onClick={onMenuLinkClick} className={styles.menuLink}>Dunk</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to={{ pathname: `/catalogue`, state: { search: 'air force' } }} onClick={onMenuLinkClick} className={styles.menuLink}>Air Force</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to={{ pathname: `/catalogue`, state: { search: 'off-white' } }} onClick={onMenuLinkClick} className={styles.menuLink}>x Off-White</NavLink>
              </li>
            </ul>
          </div>
          <div data-category="jordan" onMouseEnter={onCategoryMouseEnter} onMouseLeave={onCategoryMouseLeave} className={styles.category}>
            <h3 className={styles.title}>Air Jordan</h3>
            <ul data-category="jordan">
              <li className={styles.menuItem}>
                <NavLink to={{ pathname: `/catalogue`, state: { search: 'jordan 1 high' } }} onClick={onMenuLinkClick} className={styles.menuLink}>Jordan 1 High</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to={{ pathname: `/catalogue`, state: { search: 'jordan 1 mid' } }} onClick={onMenuLinkClick} className={styles.menuLink}>Jordan 1 Mid</NavLink>
              </li>
              <li className={styles.menuItem}>
                <NavLink to={{ pathname: `/catalogue`, state: { search: 'jordan 1 low' } }} onClick={onMenuLinkClick} className={styles.menuLink}>Jordan 1 Low</NavLink>
              </li>
            </ul>
          </div>
        </div>
        <Link to="/catalogue" text="Смотреть все" className={styles.link} />
      </div>
      <div className={styles.photos}>
        <img src={photo1} width={250} height={250} className={styles.photo} />
        <img src={photo2} width={250} height={250} className={styles.photo} />
      </div>
    </div>
  )
}

export default SubMenu
