import React from 'react'

import styles from './Button.module.scss'

const Button = ({ type, style, pt, pb, width, text }) => {
  return (
    <button
      type={type}
      style={{ paddingTop: pt, paddingBottom: pb, width: width }}
      className={styles[style]}
    >
      {text}
    </button>
  )
}

export default Button
