import React from 'react'
import classNames from 'classnames'

import styles from './CarouselArrow.module.scss'

const CarouselArrow = ({ title, style, position, onClick, className }) => {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      style={{ transform: position === 'left' && 'rotate(180deg)' }}
      className={classNames(styles.button, styles[style], className)}
    >
    </button>
  )
}

export default CarouselArrow
