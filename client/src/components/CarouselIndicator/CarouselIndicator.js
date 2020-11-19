import React from 'react'
import classNames from 'classnames'

import styles from './CarouselIndicator.module.scss'

const CarouselIndicator = ({ style, isSelected, onClick }) => {
  return (
    <li className={classNames(styles[style], isSelected && styles[`${style}Selected`])} onClick={onClick}>
    </li>
  )
}

export default CarouselIndicator
