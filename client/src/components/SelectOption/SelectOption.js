import React from 'react'

import styles from './SelectOption.module.scss'

const SelectOption = ({ children, innerProps }) => {
  return (
    <div {...innerProps} className={styles.option}>
      {children}
    </div>
  )
}

export default SelectOption
