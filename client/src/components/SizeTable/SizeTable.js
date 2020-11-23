import React from 'react'

import styles from './SizeTable.module.scss'
import sneakersTable from '../../assets/sizes/sneakersTable'
import nikeChildishTable from '../../assets/sizes/nikeChildishTable'
import adidasChildishTable from '../../assets/sizes/adidasChildishTable'

const SizeTable = ({ type }) => {
  const renderThead = () => {
    return (
      <thead className={styles.thead}>
        <tr>
          <th className={styles.header}>Длина стопы</th>
          {type === 'sneakers' && <th className={styles.header}>RU</th>}
          <th className={styles.header}>US</th>
          <th className={styles.header}>UK</th>
          <th className={styles.header}>EU</th>
        </tr >
      </thead >
    )
  }

  const renderSizesArray = () => {
    switch (type) {
      case 'sneakers':
        return sneakersTable
      case 'nikeChildish':
        return nikeChildishTable
      case 'adidasChildish':
        return adidasChildishTable
    }
  }

  const renderTbody = () => {
    return (
      <tbody>
        {renderSizesArray().map(({ cm, ru, eu, us, uk }) => {
          return (
            <tr key={cm} className={styles.row}>
              <td className={styles.cmCell}>{cm}</td>
              {ru && <td>{ru}</td>}
              <td>{eu}</td>
              <td>{us}</td>
              <td>{uk}</td>
            </tr>
          )
        })}
      </tbody>
    )
  }

  return (
    <table className={styles.table}>
      {renderThead()}
      {renderTbody()}
    </table>
  )
}

export default SizeTable
