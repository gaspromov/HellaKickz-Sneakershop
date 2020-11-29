import React from 'react'

import styles from './SizeTable.module.scss'
import nikeAdult from '../../assets/sizes/nikeAdult'
import adidasAdult from '../../assets/sizes/adidasAdult'
import nikeChildishTable from '../../assets/sizes/nikeChildishTable'
import adidasChildishTable from '../../assets/sizes/adidasChildishTable'

const SizeTable = ({ type }) => {
  const renderThead = () => {
    return (
      <thead className={styles.thead}>
        <tr>
          <th className={styles.header}>Длина стопы</th>
          {type !== 'adidasChildish' && <th className={styles.header}>RU</th>}
          <th className={styles.header}>EU</th>
          <th className={styles.header}>US</th>
          <th className={styles.header}>UK</th>
        </tr >
      </thead >
    )
  }

  const renderSizesArray = () => {
    switch (type) {
      case 'nikeAdult':
        return nikeAdult
      case 'adidasAdult':
        return adidasAdult
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
              {type !== 'adidasChildish' && <td>{ru}</td>}
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
    <div className={styles.container}>
      <table className={styles.table}>
        {renderThead()}
        {renderTbody()}
      </table>
    </div>
  )
}

export default SizeTable
