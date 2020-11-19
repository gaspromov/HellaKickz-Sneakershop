import React from 'react'
import classNames from 'classnames'
import { NavLink } from 'react-router-dom'

import styles from './Link.module.scss'

const Link = ({ to, text, className }) => {
  return (
    <NavLink to={to} className={classNames(styles.link, className)}>
      <span className={styles.text}>{text}</span>
    </NavLink>
  )
}

export default Link
