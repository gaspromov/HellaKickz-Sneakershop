import React, { useState, useEffect, useRef } from 'react'
import useWindowWidth from '../../hooks/useWindowWidth'
import { NavLink } from 'react-router-dom'
import Menu from '../Menu/Menu'
import MobileMenu from '../MobileMenu/MobileMenu'

import styles from './Header.module.scss'
import logo from '../../assets/images/logo.svg'

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const width = useWindowWidth()
  const headerRef = useRef()

  useEffect(() => {
    if (width >= 870 && isMobileMenuOpen) {
      setIsMobileMenuOpen(false)
    }
  }, [width])

  const handleOutsideClick = (e) => {
    if (!headerRef.current.contains(e.target)) {
      setIsMobileMenuOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick)

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.querySelector('header').style.boxShadow = '0 0 0 9999px rgba(0, 0, 0, 0.2)'
      document.querySelector('body').style.height = '100%'
      document.querySelector('body').style.overflow = 'hidden'
    } else {
      document.querySelector('header').style.boxShadow = 'none'
      document.querySelector('body').style.height = 'unset'
      document.querySelector('body').style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  const onLogoClick = () => {
    setIsMobileMenuOpen(false)
  }

  const onMenuToggleButtonClick = () => {
    setIsMobileMenuOpen((prevIsMobileMenuOpen) => !prevIsMobileMenuOpen)
  }

  const onMobileMenuLinkClick = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header ref={headerRef} className={styles.header}>
      <Menu />
      <div className={styles.mobileWrapper}>
        <NavLink to="/" onClick={onLogoClick}><img src={logo} alt="Лого" className={styles.logo} /></NavLink>
        <button type="button" onClick={onMenuToggleButtonClick} className={isMobileMenuOpen ? styles.closeIcon : styles.hamburgerIcon}></button>
      </div>
      <MobileMenu isOpen={isMobileMenuOpen} onMobileMenuLinkClick={onMobileMenuLinkClick} />
    </header>
  )
}

export default Header
