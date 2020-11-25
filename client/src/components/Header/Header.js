import React, { useState, useEffect } from 'react'
import useWindowWidth from '../../hooks/useWindowWidth'
import { NavLink } from 'react-router-dom'
import Menu from '../Menu/Menu'
import MobileMenu from '../MobileMenu/MobileMenu'

import styles from './Header.module.scss'
import logo from '../../assets/images/logo.svg'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const width = useWindowWidth()

  useEffect(() => {
    if (width >= 870 && isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [width])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.querySelector('header').style.boxShadow = '0 0 0 9999px rgba(0, 0, 0, 0.2)'
    } else {
      document.querySelector('header').style.boxShadow = 'none'
    }
  }, [isMobileMenuOpen])

  const onMenuToggleButtonClick = () => {
    setIsMobileMenuOpen((prevIsMobileMenuOpen) => !prevIsMobileMenuOpen)
  }

  const onMobileMenuLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className={styles.header}>
      <Menu />
      <div className={styles.mobileWrapper}>
        <NavLink to="/"><img src={logo} alt="Лого" className={styles.logo} /></NavLink>
        <button type="button" onClick={onMenuToggleButtonClick} className={isMobileMenuOpen ? styles.closeIcon : styles.hamburgerIcon}></button>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onMobileMenuLinkClick={onMobileMenuLinkClick} />
    </header>
  )
}

export default Header
