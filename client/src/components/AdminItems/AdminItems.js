import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../store/product/actions'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import Button from '../Button/Button'

import styles from './AdminItems.module.scss'
import mockData from '../../assets/mock/items'

const AdminItems = () => {
  const { loading, loaded, error, entities } = useSelector(({ products }) => products)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  return (
    <div>
      <h2 className="visually-hidden">Товары</h2>
      <div className={styles.buttons}>
        <NavLink to="/admin/add">
          <Button type="button" style="regular" className={styles.addButton} text="New item" />
        </NavLink>
        <input type="text" placeholder="Search" className={classNames('inputText', styles.searchBar)} />
      </div>
      <div className={styles.tableWrapper}>
        <div className={styles.tableScroll}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.headers}>
                <th className={styles.header}>Brand</th>
                <th className={styles.header}>Item name</th>
                <th className={styles.header}>Style</th>
                <th className={styles.header}>Price</th>
                <th className={styles.header}>Edit</th>
              </tr>
            </thead>
            <tbody>
              {loaded && entities.map(({ _id, brand, model, code, price }) => {
                return (
                  <tr key={_id}>
                    <td className={styles.itemInfo}>{brand}</td>
                    <td className={styles.itemInfo}>{model}</td>
                    <td className={styles.itemInfo}>{code}</td>
                    <td className={styles.itemInfo}>{price}</td>
                    <td className={styles.itemInfo}>
                      <NavLink to="/admin/edit" className={styles.editItemLink}>
                        <button type="button" className={styles.editItemButton}></button>
                      </NavLink>
                      <button type="button" className={styles.deleteItemButton}></button>
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

export default AdminItems
