import React from 'react'
import classNames from 'classnames'

import styles from './Button.module.scss'

const Button = ({ type, style, className, text, onClick }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classNames(styles[style], className)}
    >
      {text}
    </button>
  )
}

export default Button
