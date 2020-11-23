import React from 'react'

import styles from './SelectControl.module.scss'
import arrowUp from '../../assets/images/arrowUp.svg'

const SelectControl = ({ children, innerProps, menuIsOpen }) => {
  return (
    <div {...innerProps} className={styles.control} style={{ backgroundImage: menuIsOpen && `url('${arrowUp}')` }}>
      {children}
    </div>
  )
}

export default SelectControl
