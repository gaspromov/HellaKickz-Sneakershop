import React from 'react'

import styles from './ExpandIcon.module.scss'

const ExpandIcon = ({ isOpen }) => {
  return (
    <button type="button" style={{ transform: !isOpen && 'rotate(-90deg)' }} className={styles.icon}></button>
  )
}

export default ExpandIcon
