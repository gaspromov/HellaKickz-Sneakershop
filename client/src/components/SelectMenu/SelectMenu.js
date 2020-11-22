import React from 'react'

import styles from './SelectMenu.module.scss'

const SelectMenu = ({ children, innerProps }) => {
  return (
    <div {...innerProps} className={styles.menu}>
      {children}
    </div>
  )
}

export default SelectMenu
