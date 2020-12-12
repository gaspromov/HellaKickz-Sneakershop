import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts, deleteProduct } from '../../store/product/actions'
import useDebounce from '../../hooks/useDebounce'
import { NavLink } from 'react-router-dom'
import classNames from 'classnames'
import Button from '../Button/Button'
import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'

import styles from './AdminItems.module.scss'

const AdminItems = () => {
  const { loading, loaded, error, entities } = useSelector(({ products }) => products)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedId, setSelectedId] = useState('')
  const [search, setSearch] = useDebounce('', 500)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [])

  useEffect(() => {
    dispatch(fetchProducts(search))
  }, [search])

  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onTrashIconClick = (id) => {
    openModal()
    setSelectedId(id)
  }

  const onDeleteProductButtonClick = async () => {
    dispatch(deleteProduct(selectedId))
    dispatch(fetchProducts())
    closeModal()
  }

  const renderTable = () => {
    if (loading) {
      return <p className="message">Подождите...</p>
    }

    if (loaded && entities.length === 0) {
      return <p className="message">Данные отсутствуют</p>
    }

    if (error) {
      return <p className="error">{error}</p>
    }

    return (
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
              {entities.map(({ _id, brand, model, code, price }) => {
                return (
                  <tr key={_id}>
                    <td className={styles.itemInfo}>{brand}</td>
                    <td className={styles.itemInfo}>{model}</td>
                    <td className={styles.itemInfo}>{code}</td>
                    <td className={styles.itemInfo}>{price.toLocaleString('ru')} руб.</td>
                    <td className={styles.itemInfo}>
                      <NavLink to={`/admin/edit/${_id}`} className={styles.editItemLink}>
                        <button type="button" className={styles.editItemButton}></button>
                      </NavLink>
                      <button type="button" onClick={openModal} onClick={() => onTrashIconClick(_id)} className={styles.deleteItemButton}></button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <Modal open={isModalOpen} onClose={closeModal} classNames={{ overlay: styles.overlay }} animationDuration={0} center>
        <div className="modal">
          <p className="modalTitle">Внимание</p>
          <p className="modalText">Вы уверены, что хотите удалить этот товар?</p>
          <div className={styles.modalButtons}>
            <Button type="button" style="regular" className={styles.modalButton} text="Удалить" onClick={onDeleteProductButtonClick} />
            <Button type="button" style="black" className={styles.modalButton} text="Отменить" onClick={closeModal} />
          </div>
        </div>
      </Modal>

      <h2 className="visually-hidden">Товары</h2>
      <div className={styles.buttons}>
        <NavLink to="/admin/add">
          <Button type="button" style="regular" className={styles.addButton} text="New item" />
        </NavLink>
        <input
          type="text"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className={classNames('inputText', styles.searchBar)}
        />
      </div>
      {renderTable()}
    </div >
  )
}

export default AdminItems
