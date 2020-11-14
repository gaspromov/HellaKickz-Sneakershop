import React from 'react'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import styles from './AdminCallbacks.module.scss'
import mockData from '../../assets/mock/callbacks'

const AdminCallbacks = () => {
  return (
    <div>
      <h2 className="visually-hidden">Заказы</h2>
      <div className={styles.tableWrapper}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.header}>Item</th>
                <th className={styles.header}>Size</th>
                <th className={styles.header}>Name</th>
                <th className={styles.header}>Data</th>
                <th className={styles.header}>Date</th>
                <th className={styles.header}>Status</th>
              </tr>
            </thead>
            <tbody>
              {mockData.map(({ _id, item, size, name, data, date }) => {
                return (
                  <tr key={_id}>
                    <td className={styles.itemInfo}>
                      <NavLink to="/" className={styles.link}>{item}</NavLink>
                    </td>
                    <td className={styles.itemInfo}>{size}</td>
                    <td className={styles.itemInfo}>{name}</td>
                    <td className={styles.itemInfo}>{data}</td>
                    <td className={styles.itemInfo}>{date}</td>
                    <td className={classNames(styles.itemInfo, styles.editCell)}>
                      <button type="button" className={styles.deleteCallbackButton}></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AdminCallbacks
