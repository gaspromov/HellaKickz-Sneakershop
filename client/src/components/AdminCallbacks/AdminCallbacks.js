import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  fetchCallbacks,
  readCallback,
  deleteCallback
} from '../../store/callback/actions'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'

import styles from './AdminCallbacks.module.scss'
import mockData from '../../assets/mock/callbacks'

const AdminCallbacks = () => {
  const { loading, loaded, error, entities } = useSelector(({ callbacks }) => callbacks)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCallbacks())
  }, [])

  const onDeleteCallbackButtonClick = async (id) => {
    await dispatch(deleteCallback(id))
    dispatch(fetchCallbacks())
  }

  const onReadCallbackButtonClick = async (id) => {
    await dispatch(readCallback(id))
    dispatch(fetchCallbacks())
  }

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
              {loaded && entities.map(({ _id, link, brand, model, color, size, name, number, createdAt, isRead }) => {
                return (
                  <tr key={_id}>
                    <td className={styles.itemInfo}>
                      <NavLink to={link || ''} className={styles.link}>{`${brand} ${model} ${color}`}</NavLink>
                    </td>
                    <td className={styles.itemInfo}>{size}</td>
                    <td className={styles.itemInfo}>{name}</td>
                    <td className={styles.itemInfo}>{number}</td>
                    <td className={styles.itemInfo}>{createdAt}</td>
                    <td className={classNames(styles.itemInfo, styles.editCell)}>
                      {isRead
                        ? <button type="button" onClick={() => onDeleteCallbackButtonClick(_id)} className={styles.deleteCallbackButton}></button>
                        : <button type="button" onClick={() => onReadCallbackButtonClick(_id)} className={styles.readCallbackButton}></button>
                      }
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
